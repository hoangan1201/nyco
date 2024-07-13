
data "external" "ses_credential" {
  program = ["python", "${path.module}/scripts/aws_ses_creds.py"]

  query = {
    secret = var.ses_secret
    region = "us-east-1"
  }
}
