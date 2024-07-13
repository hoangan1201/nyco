import json
import sys
import hmac
import hashlib
import base64

# Values that are required to calculate the signature. These values should
# never change.
DATE = "11111111"
SERVICE = "ses"
MESSAGE = "SendRawEmail"
TERMINAL = "aws4_request"
VERSION = 0x04

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def calculateKey(secretAccessKey, region):
    signature = sign(("AWS4" + secretAccessKey).encode('utf-8'), DATE)
    signature = sign(signature, region)
    signature = sign(signature, SERVICE)
    signature = sign(signature, TERMINAL)
    signature = sign(signature, MESSAGE)
    signatureAndVersion = bytes([VERSION]) + signature
    smtpPassword = base64.b64encode(signatureAndVersion)
    return smtpPassword.decode('utf-8')

if __name__ == "__main__":
    data_in = json.loads(sys.stdin.read())
    if 'secret' in data_in and 'region' in data_in:
        credentials = calculateKey(data_in['secret'], data_in['region'])
        data_out = {
            'credentials': credentials
        }
        sys.stdout.write(json.dumps(data_out))
        sys.stdout.flush()
    else:
        sys.stderr.write("secret and region need to set to calculate AWS SES SMTP credentials")
        sys.stderr.flush()