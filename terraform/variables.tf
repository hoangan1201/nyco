variable "instance_count" {
  default = 1
}

variable "region" {
  description = "AWS region for hosting our your network"
  default     = "us-east-1"
}

variable "amis" {
  type        = map
  description = "Base AMI to launch the instances"
  default = {
    "us-east-1" = "ami-0b09e0167d7f5b42a"
    "us-west-2" = "ami-046d1e1ddb29b982e"
  }
}

variable "database_username" {
  description = "AWS RDS username"
  default     = "wdp"
}

variable "database_password" {
  description = "AWS RDS passwords"
}

variable "db_engine" {
  description = "The database engine"
  default     = "postgres"
}

variable "db_engine_version" {
  description = "The database engine version"
  default     = "10.15"
}

variable "db_port" {
  description = "The database port"
  default     = "5432"
}

variable "jump_server_ip" {
  description = "The jump server ip"
  default     = "52.87.95.160"
}


variable "environment" {
  description = "environment"
  default     = "staging"
}

variable "project" {
  description = "project name"
  default     = "wdp"
}

variable "domain" {
  description = "domain"
  default     = "staging-internal.wdp.bbox.ly"
}

variable "domain-public" {
  description = "domain"
  default     = "staging-public.wdp.bbox.ly"
}

variable "application_version" {
  description = "application version for deployment"
  default     = "0.0.1"
}

variable "docker_container_name" {
  description = "The name to give the running container"
}

variable "docker_image_name" {
  description = "The name of the docker image to be used"
}

variable "docker_image_tag" {
  description = "docker image tag to be used"
  default     = "staging"
}

variable "docker_network_name" {
  description = "The name of the docker network to create and launch all containers into"
}

variable "docker_registry_host" {
  description = "docker registry host"
}

variable "docker_registry_username" {
  description = "docker registry username"
}

variable "docker_registry_password" {
  description = "docker registry password"
}

variable "cloudflare_zone_id" {
  description = "the cloudflare zone id for DNS"
  default     = "7360c8be23fe4521002b70f66026aa8c"
}

variable "ansible_vault_pass" {
  description = "Ansible vault pass for decrypting env file"
}

variable "nginx_auth_basic" {
  description = "Enable/disable nginx auth basic"
  default     = "on"
}


variable "vpc_id" {
  description = "aws_vpc.vpc.id"
  default = "vpc-050962a218d421519"
}


variable "private_subnets_ids" {
  description = "concat(aws_subnet.private_subnet.*.id)"
  type    = list(string)
  default = [ "subnet-068ec3ace41dffb38","subnet-01f3d7aface3b89e3"]
}

variable "default_sg_id" {
  description = "aws_security_group.default.id"
  default = "sg-02ebde204c5241e91"
}

variable "http_access_sg_id" {
  description = "aws_security_group.http_access_sg.id"
  default = "sg-0ff23058b92f7ccf6"
}

variable "security_groups_ids" {
  description = "aws_security_group.default.id"
  type    = list(string)
  default = ["sg-02ebde204c5241e91"]
}

variable "ses_user_name" {
  description = "aws_security_group.http_access_sg.id"
  default = "sir_ses"
}

variable ses_arn {
  description = "ses arn"
  default = "arn:aws:iam::167566288869:user/sir_ses"
}

variable ses_secret {
  description = "s3 secret"
}

variable "s3_user_name" {
  description = "aws_security_group.http_access_sg.id"
  default = "sir_s3"
}

variable s3_arn {
  description = "s3 arn"
}

variable acm_cert_internal {
  description = "acm internal arn"
}

variable acm_cert_public {
  description = "acm public arn"
}

variable "etl_ip" {
  description = "The ip address for the etl job"
}
