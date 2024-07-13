variable "environment" {
  description = "The environment"
}

variable "project" {
  description = "The project"
}

variable "db_engine" {
  description = "The database engine"
}

variable "db_engine_version" {
  description = "The database engine version"
}

variable "db_port" {
  description = "The database port"
}

variable "jump_server_ip" {
  description = "The jump server ip"
}

variable "subnet_ids" {
  type        = list
  description = "Subnet ids"
}

variable "vpc_id" {
  description = "The VPC id"
}

//variable "allowed_security_group_id" {
//  description = "The allowed security group id to connect on RDS"
//}

variable "allocated_storage" {
  default     = "20"
  description = "The storage size in GB"
}

variable "instance_class" {
  description = "The instance type"
}

variable "multi_az" {
  default     = false
  description = "Muti-az allowed?"
}

variable "database_name" {
  description = "The database name"
}

variable "database_username" {
  description = "The username of the database"
}

variable "database_password" {
  description = "The password of the database"
}

variable "etl_ip" {
  description = "The ip address for the etl job"
}
