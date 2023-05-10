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
[OrbStack (課推)]: https://orbstack.dev/
[minikube (宇推)]: https://dhwaneetbhatt.com/blog/run-docker-without-docker-desktop-on-macos
[掛載 docker.sock 的用意？]: https://ephrain.net/docker-%E6%8E%9B%E8%BC%89-var-run-docker-sock-%E7%9A%84%E7%94%A8%E6%84%8F%EF%BC%9F/
[Buildx]: https://docs.docker.com/go/buildx/
[How to remove intermediate images from a build after the build?]: https://stackoverflow.com/questions/50126741/how-to-remove-intermediate-images-from-a-build-after-the-build
[Dockerfile reference]: https://docs.docker.com/engine/reference/builder/

<!------------ ref end ------------>

# Docker

> DATE: 4, 5 (2023)
> REF: [Docker 容器技术从入门到精通] | [課堂筆記]

### # 簡介

![](https://i.imgur.com/NQOoI0m.png)

### # 安裝與設定

- 不同 OS

  - mac: Docker Desktop (不推)、[OrbStack (課推)]、[minikube (宇推)]
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

- image

  - 建立 image 的各種方法

    ![](https://i.imgur.com/qDaMoxv.png)

    - Registry：Docker Hub, Quay, Harbor..等等

      - `docker search <搜尋關鍵字>`：預設從 Docker Hub 上搜尋
      - `docker search quay.io/<搜尋關鍵字>`：指定 Registry

      ![](https://i.imgur.com/RkO4NVE.png)

  - `docker image build` 探討

    - 延伸問題：

      - Ｑ：dockerfile 裡面寫的某些 apt-get 是在什麼階段下載？包成 image 時、pull image 時、container run 時?

        - 在 build image 時，會將 apt-get 的東西存在 image 中

      - Ｑ：在 image build 時，會使用 cache，那麼其是以哪些內容來進行 hash？

        ![](https://i.imgur.com/Iedr5qv.png)

      - Ｑ：若環境一樣，dockerfile & 使用到的任何 file 都一樣，是否最後 build 出來的 image ID 也會一樣？

        - 測試：即便在同台機器，將前一次的 image、cache 全刪除後，再 build 一次，image ID 已經改變為不相同

        - 研究過程：

          ![](https://i.imgur.com/XE5fVgl.png)

          - 但我會疑惑的點是，因為我用 `docker container ls -a` 並沒查到 intermediate container ，所以我才以為他已經關掉了（當我 apt-get 失敗時，我是可以查到那個 intermediate container 的）

        - 結論：因為 intermediate container 的 container ID 也有 cache

    - 範例研究：

      - `FROM ubuntu:20.04 RUN apt-get update..`，會啟動一個 ubuntu:20.04 的 container，在 container 中 run `apt-get`
      - 若沒有 ubuntu:20.04 的 image 則會自動 pull

      ```dockerfile
      # EX.
      FROM ubuntu:20.04
      RUN apt-get update && \
          DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y python3.9 python3-pip python3.9-dev
      ADD hello.py /
      CMD ["python3", "/hello.py"]
      ```

  - `docker image push` 時，並不會自動將最新一次 push 更新到 latest。而是得另外 push 成 latest

  - `docker container commit` 的方式，每次產生的 image ID 都不同

    - <mark>TODO:Q</mark> 此方法在開發中不常使用?

- scratch：空的 image

- <mark>TODO:</mark> 範例研究： `--restart unless-stopped`

- image build 的架構已更新 (改用 Buildx/BuildKit)

  <br>

  ![](https://i.imgur.com/ynEztD3.png)

  <br>

  - `Buildx` (client) + `BuildKit` (server)
  - `builders`: BuildKit 的 instance
  - [Buildx]

    - 包含 創建 ＆ 管理 builders 的公共建設(utilities)
    - manjaro 需再自行下載 `sudo pacman -Sy docker-buildx`

  <br>

  ![](https://i.imgur.com/TMYoF5C.png)

  - vs 舊版 build

    - cache

      - 舊：當下完全無使用，即刻刪除
      - 新：Least Recently Used（LRU），一段時間未使用才刪除

      ![](https://i.imgur.com/Jwg8EFU.png)

    - build context

      - 舊：會將整個 folder 打包
      - 新：只當需要時，buildkit 才向 buildx 請求

    - builder
      ![](https://i.imgur.com/xwlp8qf.png)

    - <mark>TODO:</mark> 已知手動刪除 cache、builder。手動刪除 intermediate image/container 待研究

      - 手動刪除 cache、builder 請查 `docker buildx` & `docker builder`
      - [How to remove intermediate images from a build after the build?] 可事先以 LABEL 方式標註，來做刪除。但不知未標註時該如何刪除。

    - <mark>TODO:Q</mark> 是否還需要 `.dockerignore` ？
      (因為其作法改為當有需求時，buildkit 才會向 buildx 發送請求。而不像舊的方式會直接打包整個資料夾過去。)

- Dockerfile

  - `FROM` 挑選原則：

    - 盡量官方、開源
    - 盡量精簡小巧 (常用 Alpine Linux，非常輕量的 Linux)
    - 固定版本

  - `RUN`

    - RUN 一次會產生一層 layer，因此盡量將指令集中在一個 RUN，縮小空間 (用 `&& \` 連)
    - 我認為應該只在以功能性或刻意分層時，才寫在不同 RUN（不知實作時是否會有這種需求？）
    - 一些中間過渡所需的軟體，可在使用完後刪除以節省空間（但須寫在同一 RUN 才有用）

  - `ADD` vs `COPY`

    - `ADD` 會自動解壓縮，`COPY` 不會
    - `ADD` 可以從 URL 加過來，`COPY` 只能複製本地檔案
    - `COPY` 會複製檔案權限， `ADD` 不會

  - `ENTRYPOINT`＋`CMD`

    - 兩者都只有最後一個生效
    - `ENTRYPOINT` 為該指令的進入點，`CMD` 為 container run 的默認指令

    - 兩種格式：Shell & Exec

      - Shell:

        ```dockerfile
        CMD echo "hello world"
        ```

      - Exec:

        ```dockerfile
        CMD ["echo", "hello world"]
        ```

  - `LABEL`

    - EX. Name & Version 。只會標註在 metadata 中，而不會直接顯示在 image 上，因此 build 的時候依然需要指定

  - `USER`

    - 須先有 user 才能指定

- Multi-stage builds

  - 前面的過渡層不會保存在 image 中，可以大大降低 image 空間

- 資料保存

  - 默認：

    - container stop，資料還在
    - container rm，資料不在

  - 永久保存：

    - Data Volume：由 Docker 管理 (/var/lib/docker/volumes/)
    - Bind Mount：自訂位置

  <br>

  ![](https://i.imgur.com/DUZqsCY.png)

  - mac 存在 Docker Desktop VM

    ![](https://i.imgur.com/3hxwRmf.png)

  - 連結後，檔案並非 host & container 兩個檔案同步，而是直接操作一個檔案
    (也可以直接在 container 刪除 host 的檔案)

  - 推薦使用 volume 來儲存資料

  - bind mount 可以用來搭建特殊環境，以操作 host 的檔案
    (EX. 搭建 gcc 編譯環境，用來編譯 host 上的檔案)
    (EX. 用 vscode 的 Dev Containers 套件，搭建專案開發環境，以 container 開啟 host 上的專案 folder)

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

  <!-- 盡量不要設定為 root user -->

  - <details close>
    <summary>盡量不要設定為 root user</summary>

    - 可在 dockerfile、container run 中設定
    - <mark>TODO:</mark> 再找機會研究 container 中 root 可造成的風險

    </details>

- 小技巧：

  <!-- docker image rm $(docker images -q) -->

  - <details close>
    <summary><code>docker image rm $(docker images -q)</code></summary>

    </details>

- 小工具：

  - <details close>
    <summary></summary>

    </details>

- 文件補讀：

  - [Dockerfile reference]

---

## # 踩雷實錄

- <details close>
  <summary></summary>

  </details>

---

## # 延伸討論

<!-- host process VS container process -->

- <details close>
  <summary>host process VS container process</summary>

  - [Host PID of a Process Running in a Docker Container]
    解釋 host process VS container process
  - <mark>TODO:</mark> 照著範例走一次

  </details>

<!-- docker.sock -->

- <details close>
  <summary>docker.sock</summary>

  > [掛載 docker.sock 的用意？]

  - <mark>TODO:</mark> 研究哪些情況該用與不用 `docker.sock`
  - <mark>TODO:</mark> 更深入研究 `docker.sock` ＆ `Docker daemon`

  </details>

<!-- docker.socket 跟 docker.service 的關係 -->

- <details close>
  <summary>docker.socket VS docker.service</summary>

  - <mark>TODO:</mark> 研究 docker.socket 跟 docker.service 的關係

  ![](https://i.imgur.com/aaOKVwD.png)

  </details>

---
