# AWS Info, the access key and secret key will be passed using environment variable
provider "aws" {
  version = "~> 2.46"
  region  = "us-east-1"
}

locals {
  availability_zones = {
    "us-east-1" = ["us-east-1a", "us-east-1b"]
    "us-west-2" = ["us-west-2a", "us-west-2b"]
  }
}

module "rds" {
  source            = "./modules/rds"
  environment       = var.environment
  project           = var.project
  db_engine         = var.db_engine
  db_engine_version = var.db_engine_version
  db_port           = var.db_port
  jump_server_ip    = var.jump_server_ip
  allocated_storage = "20"
  database_name     = var.project
  database_username = var.database_username
  database_password = var.database_password
  subnet_ids        = var.private_subnets_ids
  vpc_id            = var.vpc_id
  instance_class    = "db.t3.medium"
  etl_ip = var.etl_ip
}

#provider ansiblevault {
#  root_folder = "../.env"
#  vault_pass  = var.ansible_vault_pass
#}

#data "ansiblevault_string" "envfile_contents" {
#  encrypted = file("../.env/${var.environment}.env")
#}

#output "envfile_contents" {
#  value = data.ansiblevault_string.envfile_contents.value
#}

#data "external" "envfile_data" {
#  program = ["python", "${path.module}/scripts/parse_env_file.py"]
#
#  query = {
#    data = data.ansiblevault_string.envfile_contents.value
#  }
#}

#output "envfile" {
#  value = data.external.envfile_data.result
#}
