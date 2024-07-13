output "rds_address" {
  value = module.rds.rds_address
}

output "redis_address" {
  value = aws_elasticache_cluster.redis.cache_nodes
}

output "public_instance_ip" {
  value = aws_lb_target_group.web_instance
  sensitive = true
}

output "private_instance_ip" {
  value = aws_lb_target_group.web-public_instance
  sensitive = true
}
