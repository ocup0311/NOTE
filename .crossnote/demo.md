`sh`

```sh
# 123
## 123
$ git push
```

<!-- asfasdf -->

`shell`

```shell
# 當超過該 doc 的 createAt 10 秒後，會自動刪除該 doc
> db.people.createIndex({ createAt: 1 }, { expireAfterSeconds: 10 })
```

`sql`

```sql
-- EX. 原本用 ; 結尾
> SELECT * FROM users;

-- 改成用 # 結尾
> DELIMITER #
> SELECT * FROM users#

-- exit 後恢復 ;
> exit
$ mysql -r root -p
> SELECT * FROM users;
```

`yml`

```yml
# EX. and
when:
  - condition1
  - condition2

# EX. or
when: (condition1) or (condition2)
```

`typescript`

```typescript
// EX. 自動 import from "./@class/TicketSystem/index.js"
import { TrainTicketSystem } from './@class/TicketSystem'
```

# txt

```txt
123
321
在哪裏
```

# vagrantfile

```ruby
# 用 if 判斷迴圈執行到最後一台 VM 時
if machine_id == N
  machine.vm.provision :ansible do |ansible|
    # 需要將 limit 設定成 all，讓所有 VM 都執行 ansible 動作
    ansible.limit = "all"
    ansible.playbook = "playbook.yml"
  end
end
```

# dockerfile

```dockerfile
# 1234
## 1234
CMD ["echo", "hello world"]
```

# c

```c
int main(int n, string p[])
{
    if(n > 1) printf("%s\n", p[1]);
    else printf("Hi~\n");
}
```

# python

```python
name = "John"
age = 30
print(f"My name is {name} and I am {age} years old.")

# My name is John and I am 30 years old.
```

- `make -a --test cmd` 測試這段看起來怎樣
- 測試：`/make/a/test/path`
- `make -a MY_TEST_WORD=makeTestingWord --long --test cmd`

```dockerfile
CMD echo "hello world"
```

![](../DevOps/Docker/src/image/github_action1.webp)
