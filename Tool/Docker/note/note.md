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
[host pid of a process running in a docker container]: https://www.baeldung.com/linux/docker-container-process-host-pid

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

  - `docker container run -it -u $(id -u):$(id -g) --name container_name image_name`
  - `-u $(id -u):$(id -g)`以設定使用 builder user 在 docker 中執行，未指定則為 root
  - container 裡的 root 是另外建立可用來使用 container 內部的權限的 user。跟主機 root 為不同的 user

    ![](https://i.imgur.com/tOtQyfr.png)
    ![](https://i.imgur.com/x9fx0kd.png)

- 踩雷

  - 似乎是在同一台 mac 上啟動的兩台 linux VM 同時安裝時，其中一台出現此狀況，過一陣子後，在安裝就通過了

    ```sh
    E: Could not get lock /var/lib/dpkg/lock-frontend. It is held by process 23606 (unattended-upgr)
    E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), is another process using it?
    ```

    ![](https://i.imgur.com/iRHUQmp.jpg)

  - 執行 `sudo docker container run -it manjarolinux/base`

    - 出現錯誤：

      ```sh
      ERRO[0131] error waiting for container:

      docker: Post "http://%2Fvar%2Frun%2Fdocker.sock/v1.42/containers/6e0067bf32173e5e55907b38eaa071632453d45700ed46e8fffb121dcabd6242/start": dial unix /var/run/docker.sock: i/o timeout.
      ```

    - manjaro 的 terminal 卡住了，VM 整個黑頻無法排解
    - 目前只能以「還原」來解決
    - 後來將記憶體從 4GB 改為 8GB，就正常了（但不確定是否只是剛好，還是真的需要這麼高配置）

### # 注意默認值

- [Host PID of a Process Running in a Docker Container]
  解釋 host process VS container process

### # 問題集中區

### <mark># TODO: 待整理</mark>

- container 與 image 關係

  - container 可視為執行中的 image，其在 image layer 上加上`read-write`，形成 container layer

    ![](https://i.imgur.com/W85FYbx.png)

  - 執行中的 container 可以再輸出為 image，保留當下的狀態

- 「container 即 process」

  - 範例：

    - 啟動一個 ngmix container 的步驟如下：
    - 由 containerd-shim 先產生一個 process，也就是建立一個 container (PID 18728)
    - 再從 18728 fork 出 ngnix
    - `docker container exec -it` 出一個 shell，也是從 18728 fork 出來

    ![](https://i.imgur.com/Mxb7YGA.png)

  ![](https://i.imgur.com/w4w1YE2.png)

- 建立 image 的各種方法

  ![](https://i.imgur.com/qDaMoxv.png)

  - Registry：Docker Hub, Quay, Harbor..等等

    - `docker search <搜尋關鍵字>`：預設從 Docker Hub 上搜尋
    - `docker search quay.io/<搜尋關鍵字>`：指定 Registry

    ![](https://i.imgur.com/RkO4NVE.png)

## # 其他補充

- 注意事項：

  <!-- 盡量練習新的指令 -->

  - <details close>
    <summary>盡量練習新的指令</summary>

    - 以後版本若要完全捨棄舊版指令時，才不用改一堆腳本
    - EX.`docker container run`取代`docker run`
    - EX.`docker container rm`取代`docker rm`
    - EX.`docker container stop`取代`docker stop`
    - EX.`docker container ls`取代`docker ps`

    </details>

  <!-- 盡量不要用 attach 模式 -->

  - <details close>
    <summary>盡量不要用 attach 模式</summary>

    - 使用`-d`detach 模式、`logs`輸出、`exec`輸入取代

      ```shell
      # EX.
      $ docker container run -d image_name
      $ docker container logs container_name
      $ docker container exec -it container_name shell_name
      ```

    - attach 很難關掉：有些情況`ctr+p ctr+q`沒作用，`ctr+c`之後又會把 container stop

    </details>

- 小技巧：

  - <details close>
    <summary></summary>

    </details>

- 小工具：

  - <details close>
    <summary></summary>

    </details>

---

## # 踩雷實錄

- <details close>
  <summary></summary>

  </details>

---

## # 延伸討論

<!-- docker.socket 跟 docker.service 的關係 -->

- <details close>
  <summary>docker.socket VS docker.service</summary>

  - <mark>TODO:</mark> 研究 docker.socket 跟 docker.service 的關係

  ![](https://i.imgur.com/aaOKVwD.png)

  </details>

---
