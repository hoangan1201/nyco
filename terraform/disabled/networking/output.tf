output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnets_ids" {
  value = concat(aws_subnet.public_subnet.*.id)
}

output "private_subnets_ids" {
  value = concat(aws_subnet.private_subnet.*.id)
}

output "default_sg_id" {
  value = aws_security_group.default.id
}

output "http_access_sg_id" {
  value = aws_security_group.http_access_sg.id
}

output "security_groups_ids" {
  value = [aws_security_group.default.id]
}
