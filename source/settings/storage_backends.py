from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage


class FilerS3Boto3Storage(S3Boto3Storage):
    '''
    Wraps the S3BotoStorage class and provides some attributes and methods that filer is expecting
    '''
    base_url = None

    def __init__(self, *args, **kwargs):
        kwargs['bucket'] = settings.AWS_STORAGE_BUCKET_NAME
        super(FilerS3Boto3Storage, self).__init__(*args, **kwargs)
        self.base_url = self.url('')

class FilerS3Boto3SecureStorage(FilerS3Boto3Storage):
    '''
    It seems like the version of django-storages can't send signed urls to cloudfront. We will go to s3 directly for private files
    '''
    base_url = None
    def __init__(self, *args, **kwargs):
        super(FilerS3Boto3SecureStorage, self).__init__(*args, **kwargs)
        self.querystring_auth = True
        self.custom_domain = None
        self.secret_key = settings.AWS_S3_SECRET_ACCESS_KEY
