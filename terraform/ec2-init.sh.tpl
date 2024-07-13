#!/bin/bash

apt-get install -y auditd
apt-get update
apt-get install -y python3-pip
pip install runlike

echo '{"userland-proxy": false}' > /etc/docker/daemon.json
chmod 644 /etc/docker/daemon.json
echo -e "\
    -w /usr/lib/systemd/system/docker.socket -k docker \n\
    -w /etc/default/docker -k docker \n\
    -w /etc/docker/daemon.json -k docker \n\
    -w /usr/bin/docker-containerd -k docker \n\
    -w /usr/bin/docker-runc -k docker \n\
    -w /usr/bin/docker -k docker \n\
    -w /var/lib/docker -k docker \n\
    -w /etc/docker -k docker" >> /etc/audit/audit.rules

sudo systemctl restart docker

docker login -u "${docker_registry_username}" -p '${docker_registry_password}' "${docker_registry_host}"

docker network create ${docker_network_name}

# django app
docker pull index.docker.io/${docker_registry_username}/${docker_image_name}:${docker_image_tag}
docker run -p 8000:80 --name ${docker_container_name} --restart unless-stopped --network ${docker_network_name} \
  -e "ENVIRONMENT=${environment}" \
  -e "ANSIBLE_VAULT_PASS=${ansible_vault_pass}" \
  -e "NGINX_AUTH_BASIC=${nginx_auth_basic}" \
  -e "INTERNAL=${INTERNAL}" \
  -d index.docker.io/${docker_registry_username}/${docker_image_name}:${docker_image_tag}
  --security-opt=no-new-privileges
  --read-only

docker pull index.docker.io/containrrr/watchtower
docker run --name watchtower --restart unless-stopped -v /root/.docker/config.json:/config.json -v /var/run/docker.sock:/var/run/docker.sock -d index.docker.io/containrrr/watchtower --cleanup  --interval 30 --revive-stopped
           --security-opt=no-new-privileges
           --read-only
           --include-restarting


# Setup swapfile
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo sysctl vm.swappiness=10
