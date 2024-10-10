docker container run --name mysql1 --rm \
  -e MYSQL_ROOT_PASSWORD=123 \
  --mount type=bind,source=/vagrant/src,target=/src/ \
  -d mysql

docker exec -it mysql1 sh

mysql -u root -p