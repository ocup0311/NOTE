## 快速測試用小抄

- 啟動

```sh
docker container run --name mysql1 --rm \
  -e MYSQL_ROOT_PASSWORD=123 \
  --mount type=bind,source=/vagrant/src,target=/src/ \
  -d mysql:9.1.0

docker exec -it mysql1 sh
```

```sh
mysql -u root -p
Enter password: 123
```

- 建立

```sql
CREATE DATABASE db1;
USE db1;

source /src/idx_with_fn/Table.sql
source /src/idx_with_fn/data.sql
```

```sql
CREATE INDEX idx_k7 ON Table1(k7);
```

- 清理

```sql
DROP TABLE Table1;
DROP INDEX idx_k7 ON Table1;
```
