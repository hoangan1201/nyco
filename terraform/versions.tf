terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 2.46"
    }
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "2.19.0"
    }
    external = {
      source = "hashicorp/external"
    }
    template = {
      source = "hashicorp/template"
    }
  }
  required_version = ">= 0.13"
}

