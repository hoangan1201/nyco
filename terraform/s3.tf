data "aws_iam_policy_document" "django_media_policy" {
  statement {
    sid = "PublicReadForGetBucketObjects"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.django_media.arn}",
      "${aws_s3_bucket.django_media.arn}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }

  statement {
    actions = [
      "s3:*",
    ]

    resources = [
      "${aws_s3_bucket.django_media.arn}",
      "${aws_s3_bucket.django_media.arn}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = ["${var.s3_arn}"]
    }
  }
}

## setup s3 for django media
resource "aws_s3_bucket" "django_media" {
  bucket = "${var.environment}-media-${var.project}"
  acl    = "private"
  force_destroy = false
  cors_rule {
    allowed_headers = ["Authorization"]
    allowed_methods = ["GET"]
    allowed_origins = [
      "https://www.${var.domain}",
      "https://${var.environment}.media.${var.domain}",
    ]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }

  tags = {
    Name        = "${var.environment}-media-${var.project}"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_policy" "my_bucket_policy" {
  bucket = aws_s3_bucket.django_media.id
  policy = data.aws_iam_policy_document.django_media_policy.json
}
