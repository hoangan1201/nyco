ips=""
ids=""
while [ "$ids" = "" ]; do
  ids=$(aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names $ASG --region $REGION --query AutoScalingGroups[].Instances[].InstanceId --output text)
  echo 'searchstring ids'
  echo ids
  sleep 1
done
for ID in $ids;
do
    IP=$(aws ec2 describe-instances --instance-ids $ID --region $REGION --query Reservations[].Instances[].PrivateIpAddress --output text)
    ips="$ips,$IP"
    echo 'searchstring ips'
    echo ips
    echo IP
done
