resource "aws_elasticache_cluster" "redis" {
  cluster_id = "${var.environment}-${var.project}"
  engine     = "redis"
  node_type  = length(regexall("production", var.environment)) > 0 ? "cache.t3.medium" : "cache.t3.small"
  # @todo(george): Will probably want to figure out clustering for production
  num_cache_nodes      = 1
  apply_immediately    = length(regexall("production", var.environment)) > 0 ? true : false
  parameter_group_name = "default.redis3.2"
  subnet_group_name    = aws_elasticache_subnet_group.redis_sng.name
  engine_version       = "3.2.10"
}

resource "aws_elasticache_subnet_group" "redis_sng" {
  name       = "${var.environment}-${var.project}-redis-subnetgroup"
  subnet_ids = var.private_subnets_ids
}

resource "aws_security_group_rule" "allow_redis_ingress" {
  security_group_id = var.default_sg_id
  protocol          = "tcp"
  type              = "ingress"
  from_port         = var.environment == "stg" ? "6379" : "6378"
  to_port           = "6379"
  cidr_blocks       = ["0.0.0.0/0"]
  description = var.environment

}
