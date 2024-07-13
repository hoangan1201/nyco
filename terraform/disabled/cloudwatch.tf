# Create cloudwatch group
resource "aws_cloudwatch_log_group" "containerlogs" {
  name              = "${var.project}-logs-${var.environment}"
  retention_in_days = 30
  tags = {
    environment = var.environment
    project     = var.project
  }
}

# Grant permission for ec2 instances to write logs to cloudwatch
resource "aws_iam_role" "ec2_cloudwatch_role" {
  name = "CloudwatchWriter-${var.project}-${var.environment}"
  tags = {
    project     = var.project
    environment = var.environment
  }
  assume_role_policy = data.aws_iam_policy_document.ec2_cloudwatch_reader_policy.json
}

data "aws_iam_policy_document" "ec2_cloudwatch_reader_policy" {
  statement {
    actions = ["logs:PutLogEvents"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}
