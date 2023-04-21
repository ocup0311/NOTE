##### <!-- 收起 -->

<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!------------  style  ------------>

<!----------- ref start ----------->

[docker 容器技术从入门到精通]: https://www.udemy.com/course/docker-china/learn/lecture/27213604#overview
[課堂筆記]: https://dockertips.readthedocs.io/en/latest/
[setup docker on manjaro linux]: https://credibledev.com/setup-docker-on-manjaro-linux/

<!------------ ref end ------------>

# Docker

> DATE: 4.2023
> REF: [Docker 容器技术从入门到精通] | [課堂筆記]

### # 簡介

![](https://i.imgur.com/NQOoI0m.png)

### # 安裝與設定

- manjaro: [Setup Docker on Manjaro Linux]
- ubuntua: 可以使用 `get-docker.sh`

- 踩雷

  - 似乎是在同一台 mac 上啟動的兩台 linux VM 同時安裝時，其中一台出現此狀況，過一陣子後，在安裝就通過了

    ```sh
    E: Could not get lock /var/lib/dpkg/lock-frontend. It is held by process 23606 (unattended-upgr)
    E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?
    ```

    ![](https://i.imgur.com/iRHUQmp.jpg)

### # 注意默認值

### # 延伸閱讀

### # 問題集中區

### <mark># TODO: 待整理</mark>

-
