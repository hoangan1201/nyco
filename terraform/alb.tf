## Security Group for ALB
resource "aws_security_group" "alb" {
  name   = "${var.environment}-alb-${var.project}"
  vpc_id = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_lb" "web" {
  name               = "${var.environment}-alb-${var.project}-2"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id, var.http_access_sg_id, var.default_sg_id]
  subnets            = var.private_subnets_ids
  idle_timeout       = 4000

  tags = {
    environment = var.environment
    Name        = "${var.environment}-alb-${var.project}"
  }
}

resource "aws_lb_target_group" "web_instance" {
  name     = "${var.environment}-tg-${var.project}"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 1800
    enabled         = true
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
    path                = "/static/health.html"
    port                = 8000
  }

  tags = {
    Name        = "${var.environment}-alb-target-group-${var.project}"
    Environment = var.environment
  }

}
resource "aws_lb_listener" "web_http" {
  load_balancer_arn = aws_lb.web.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}


resource "aws_lb_listener" "web_https" {
  load_balancer_arn = aws_lb.web.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.acm_cert_internal

  default_action {
    target_group_arn = aws_lb_target_group.web_instance.arn
    type             = "forward"
  }
}



resource "aws_lb_listener_rule" "web_http" {
  depends_on   = [aws_lb_target_group.web_instance]
  listener_arn = aws_lb_listener.web_http.arn
  priority     = 100
  action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}

resource "aws_lb_listener_rule" "web_https" {
  depends_on   = [aws_lb_target_group.web_instance]
  listener_arn = aws_lb_listener.web_https.arn
  priority     = 99
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web_instance.arn
  }
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}

## Security Group for ALB
resource "aws_security_group" "alb-public" {
  name   = "${var.environment}-public-alb-${var.project}"
  vpc_id = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
resource "aws_lb" "web-public" {
name               = "${var.environment}-alb-public-${var.project}-2"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id, var.http_access_sg_id, var.default_sg_id]
  subnets            = var.private_subnets_ids
  idle_timeout       = 4000

  tags = {
    environment = var.environment
    Name        = "${var.environment}-alb-${var.project}"
  }
}

resource "aws_lb_target_group" "web-public_instance" {
  name     = "${var.environment}-public-tg-${var.project}"
  port     = 8000
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 1800
    enabled         = true
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
    path                = "/static/health.html"
    port                = 8000
  }

  tags = {
    Name        = "${var.environment}-public-alb-target-group-${var.project}"
    Environment = var.environment
  }
}


resource "aws_lb_listener" "web-public_http" {
  load_balancer_arn = aws_lb.web-public.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "web-public_https" {
  load_balancer_arn = aws_lb.web-public.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.acm_cert_public

  default_action {
    target_group_arn = aws_lb_target_group.web-public_instance.arn
    type             = "forward"
  }
}

resource "aws_lb_listener_rule" "web-public_http" {
  depends_on   = [aws_lb_target_group.web-public_instance]
  listener_arn = aws_lb_listener.web-public_http.arn
  priority     = 100
  action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}

resource "aws_lb_listener_rule" "web-public_https" {
  depends_on   = [aws_lb_target_group.web-public_instance]
  listener_arn = aws_lb_listener.web-public_https.arn
  priority     = 99
  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web-public_instance.arn
  }
  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}
