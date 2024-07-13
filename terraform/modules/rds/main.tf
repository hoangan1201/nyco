/*====
RDS
======*/

/* subnet used by rds */
resource "aws_db_subnet_group" "rds_subnet_group" {
  name        = "${var.environment}-rds-subnet-group-${var.project}"
  description = "RDS subnet group"
  subnet_ids  = var.subnet_ids
  tags = {
    environment = var.environment
  }
}

/* Security Group for resources that want to access the Database */
resource "aws_security_group" "db_access_sg" {
  vpc_id      = var.vpc_id
  name        = "${var.environment}-db-access-sg-${var.project}"
  description = "Allow access to RDS"

  ingress {
    description      = "ETL job"
    from_port        = 5432
    to_port          = 5432
    protocol         =  "tcp"
    cidr_blocks      = var.etl_ip
  }

  tags = {
    Name        = "${var.environment}-db-access-sg-${var.project}"
    environment = var.environment
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "${var.environment}-rds-sg-${var.project}"
  description = "${var.environment} Security Group"
  vpc_id      = var.vpc_id
  tags = {
    Name        = "${var.environment}-rds-sg-${var.project}"
    environment = var.environment
  }

  // allows traffic from the SG itself
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }

  //allow traffic for specific TCP port
  ingress {
    from_port       = var.db_port
    to_port         = var.db_port
    protocol        = "tcp"
    security_groups = [aws_security_group.db_access_sg.id]
  }

  // allow trafic to DB from a jump server
  ingress {
    from_port   = var.db_port
    to_port     = var.db_port
    protocol    = "tcp"
    cidr_blocks = ["${var.jump_server_ip}/32"]
  }

  ingress {
    from_port        = 5432
    to_port          = 5432
    protocol         =  "tcp"
    cidr_blocks      = var.etl_ip
  }

  // outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "rds" {
  identifier                = "${var.environment}-db-${var.project}"
  backup_retention_period   = 5
  backup_window             = "00:05-00:35"
  allocated_storage         = var.allocated_storage
  engine                    = var.db_engine
  engine_version            = var.db_engine_version
  instance_class            = var.instance_class
  apply_immediately         = true
  multi_az                  = var.multi_az
  name                      = var.database_name
  username                  = var.database_username
  password                  = var.database_password
  db_subnet_group_name      = aws_db_subnet_group.rds_subnet_group.id
  vpc_security_group_ids    = [aws_security_group.rds_sg.id]
  storage_encrypted         = true
  skip_final_snapshot       = true
  publicly_accessible       = false
  final_snapshot_identifier = "${var.environment}-rds-snapshot-${var.project}"
  tags = {
    environment = var.environment
    project_name = var.project
  }
}


