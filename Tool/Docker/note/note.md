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

- 不同 OS

  - mac: 用 desktop 方便，也可用 OrbStack 替代
  - manjaro: [Setup Docker on Manjaro Linux]
  - ubuntua: 可以使用 `get-docker.sh`

- 啟動 container

  - `docker run -it -u $(id -u):$(id -g) --name container_name image_name`
  - `-u $(id -u):$(id -g)`以設定使用 builder user 在 docker 中執行，未指定則為 root

- 踩雷

  - 似乎是在同一台 mac 上啟動的兩台 linux VM 同時安裝時，其中一台出現此狀況，過一陣子後，在安裝就通過了

    ```sh
    E: Could not get lock /var/lib/dpkg/lock-frontend. It is held by process 23606 (unattended-upgr)
    E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?
    ```

    ![](https://i.imgur.com/iRHUQmp.jpg)

  - 執行 `sudo docker run -it manjarolinux/base`

    - 出現錯誤：

      ```sh
      ERRO[0131] error waiting for container:

      docker: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.42/containers/6e0067bf32173e5e55907b38eaa071632453d45700ed46e8fffb121dcabd6242/start": dial unix /var/run/docker.sock: i/o timeout.
      ```

    - manjaro 的 terminal 卡住了，VM 整個黑頻無法排解
    - 目前只能以「還原」來解決
    - 後來將記憶體從 4GB 改為 8GB，就正常了（但不確定是否只是剛好，還是真的需要這麼高配置）

### # 注意默認值

### # 延伸閱讀

### # 問題集中區

### <mark># TODO: 待整理</mark>

-
