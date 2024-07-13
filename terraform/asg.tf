## Creating Launch Configuration
resource "aws_key_pair" "deployer" {
  # the key_name need to unique here, otherwise Terraform fail if we create 2 environment
  # using this script
  key_name   = "deployer-key-${var.project}-${var.environment}"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1Ko2eTY8LqTPZewZzU9mxSgs45VebSQ/MJFn5DejQHgH1eBqzGaWBAbJBwGq5PEqJ7VlanwGtsfex1aL2Mxa8EhJwkn0j3kaVa/AipaYuAKXS6bgLeziATDcqkg0dPj5BejgNq3jNiq1X/YhiVDClToM6dEYuOsRF679yLCsYGiVDrvwO19Zkre8LTGqzSP9hUH30xdqUzYLsm+ZoHsrh182VP3714VaJ8zfK2L3IZBKqzyD0Mwm++rKB5jrZuWbiaqa45VExnhaX9yZ3FIneip2QklzVmFd3QKHRimiX5DZ1xkm189ZtKHZIztvaD34TIpdolFKLviaNUTjfxCXh devops@blenderbox.com"
}
resource "aws_key_pair" "jumpserver" {
  # the key_name need to unique here, otherwise Terraform fail if we create 2 environment
  # using this script
  key_name   = "jumpserver-key-${var.project}-${var.environment}"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDFNL+Jk6r/5+dsgblpSgH3c0Ay8Ii5L3FZhJYn76DNH9c/8EZGDCryWia0dWQPg8NIM0jhEX5Z8Y5NNFn5Z2lTxsUSwv/c2WLLEXeKVbKlsZH8iyET13P701qTRdaSVB8GrgNCD8T8kPam28ZCTXt30dd9fPO3IJW58xiKu5FtnxJs30iv+Ww9VZ54s6Y6HjN78yrQQ5YwDCfRj9t8gZ4fOWKBcUJRWapHZ/gMNLM491PmOJwxzggNEwzgl3UfAelO6fQahInQvlHr0Q3HojFlbmi6FjeRGW+cgrQcaeN4At4w0MszLVLa6pzU2CAUzRJK67jT+6APSaOGxPomQla5 blenderorders@ip-212-30-1-160"
}
resource "aws_key_pair" "sammy" {
  # the key_name need to unique here, otherwise Terraform fail if we create 2 environment
  # using this script
  key_name   = "sammy-key-${var.project}-${var.environment}"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC6zcQ6B9V9Mvf17unifjiIW2JgmhddDwoUHj9qHn22MUtozobEQzhUqSNfdfXBqnF4ew76cVU4bGr/IspADmetGzT/EzFzIx+es1CiVyIKPxPqvDTOaFexc2FOCCT/raCItfnSCyZ9UlLVH3Nf4iPdu7bYHh/VuMHppj2S5rOnbgBPYk5EtOpy/JvKRCZHM5/X/szVXfztZ1NTWHm2+tyvgv7dTdd/idFjfycxIEeaRWf405xgVonh1e6t4KDVteELTXwhE7CY+Z84uAj2FGITdwOcoXTwmc11VMaJ8YP+9WWdK3VbIfV2kPPvQuooq25co1zYcCbD3w2DdxfXgcuVJCtJIMiHZrkGL4uRUD9VbwqiuN5f9phMnVbc+7wzlIeGLWzW/zFsBCL0cwBbSsEboK6p4V41zYpC0aeQ10G7j/7vZdy2GTPrsQtK3L3A6DqTTocBsqQmMWnLskYKMyiTVfS3TZorybCcp1Mg+e2X/+fcfPxhXjDCx42DXEy2w6uPEXwULiqIfIKLdoSpuiI07EmJZhbz31G+XPvXrpI6UY/Rwu/CjAHEtgx4JJ5iWT0XDqPndrCdNypow+yi9cHtGeKjQywXqyYyZj6IGSnoYaMM3ifIn/RaTt3xH2fhpgyt0HnBmkymglXYKBDgnWZKzN3syKME5cB2D2fqu63zGw== sasteiner@T2UA8111ZYQ"
}

resource "aws_launch_configuration" "web" {
  name_prefix                 = "web-${var.project}-${var.environment}"
  image_id                    = var.amis[var.region]
  instance_type               = "t3.medium"
  security_groups             = concat(var.security_groups_ids, [module.rds.db_access_sg_id])
  key_name                    = aws_key_pair.sammy.key_name
  associate_public_ip_address = false
  user_data                   = data.template_file.init.rendered

  lifecycle {
    create_before_destroy = true
  } 

  root_block_device {
  volume_type           = "gp2"
  volume_size           = 64
  delete_on_termination = true
  encrypted             = true
  }
}

resource "aws_autoscaling_group" "web" {
  launch_configuration = aws_launch_configuration.web.id
  min_size             = 1
  max_size             = 7
  desired_capacity     = 1
  target_group_arns    = [aws_lb_target_group.web_instance.arn]
  vpc_zone_identifier  = var.private_subnets_ids
  provisioner "local-exec" {
    command = "./getips.sh"
  }

  tag {
    key                 = "Name"
    value               = "${var.environment}-asg-${var.project}"
    propagate_at_launch = true
  }
  tag {
    key                 = "environment"
    value               = "${var.environment}"
    propagate_at_launch = true
  }
  tag {
    key                 = "project_name"
    value               = "${var.project}"
    propagate_at_launch = true
  }
}

data "template_file" "init" {
  template = "${file("ec2-init.sh.tpl")}"

  vars = {
    ansible_vault_pass       = var.ansible_vault_pass
    docker_container_name    = var.docker_container_name
    docker_network_name      = var.docker_network_name
    docker_registry_host     = var.docker_registry_host
    docker_registry_username = var.docker_registry_username
    docker_registry_password = var.docker_registry_password
    docker_image_name        = var.docker_image_name
    docker_image_tag         = var.docker_image_tag
    environment              = var.environment
    INTERNAL                 = "True"
    db_username              = var.database_username
    db_password              = var.database_password
    db_host                  = module.rds.rds_address
    db_name                  = var.project
    nginx_auth_basic         = var.nginx_auth_basic
    test                     = "YES-1"
    #cloudwatch_group         = aws_cloudwatch_log_group.containerlogs.name
  }
}

resource "aws_launch_configuration" "web-public" {
  name_prefix                 = "web-${var.project}-public-${var.environment}"
  image_id                    = var.amis[var.region]
  instance_type               = "t3.medium"
  security_groups             = concat(var.security_groups_ids, [module.rds.db_access_sg_id])
  key_name                    = aws_key_pair.jumpserver.key_name
  associate_public_ip_address = false
  user_data                   = data.template_file.init-public.rendered
  root_block_device {
  volume_type           = "gp2"
  volume_size           = 64
  delete_on_termination = true
  encrypted             = true
  }
}


data "template_file" "init-public" {
  template = "${file("ec2-init.sh.tpl")}"

  vars = {
    ansible_vault_pass       = var.ansible_vault_pass
    docker_container_name    = var.docker_container_name
    docker_network_name      = var.docker_network_name
    docker_registry_host     = var.docker_registry_host
    docker_registry_username = var.docker_registry_username
    docker_registry_password = var.docker_registry_password
    docker_image_name        = var.docker_image_name
    docker_image_tag         = var.docker_image_tag
    environment              = var.environment
    INTERNAL                 = "False"
    db_username              = var.database_username
    db_password              = var.database_password
    db_host                  = module.rds.rds_address
    db_name                  = var.project
    nginx_auth_basic         = var.nginx_auth_basic
    test                     = "NO-2"
    #cloudwatch_group         = aws_cloudwatch_log_group.containerlogs.name
  }
}

resource "aws_autoscaling_group" "web-public" {
  launch_configuration = aws_launch_configuration.web-public.id
  min_size             = 1
  max_size             = 6
  desired_capacity     = 1
  target_group_arns    = [aws_lb_target_group.web-public_instance.arn]
  vpc_zone_identifier  = var.private_subnets_ids

  lifecycle {
    create_before_destroy = true
  }

  tag {
    key                 = "Name"
    value               = "${var.environment}-asg-public-${var.project}"
    propagate_at_launch = true
  }
  tag {
    key                 = "environment"
    value               = "${var.environment}"
    propagate_at_launch = true
  }
  tag {
    key                 = "project_name"
    value               = "${var.project}"
    propagate_at_launch = true
  }

}
