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
[Migrate to Compose V2]: https://docs.docker.com/compose/migrate/
[學習範本]: https://github.com/stars/ocup0311/lists/docker-%E7%AF%84%E4%BE%8B%E5%AD%B8%E7%BF%92
[RAFT]: http://thesecretlivesofdata.com/raft/
[Play with Docker]: https://labs.play-with-docker.com/
[鳥哥 iptables]: https://linux.vbird.org/linux_server/centos6/0250simple_firewall.php#netfilter
[初探 IPTABLES 流動之路 - 以 Docker 為範例]: https://www.hwchiu.com/iptables-1.html
[Docker - iptables 小知識]: https://www.gss.com.tw/blog/%E6%AF%8F%E6%97%A5%E5%B0%8F%E7%9F%A5%E8%AD%98-19-docker-%E7%B6%B2%E8%B7%AF%E7%AF%87-3-iptables

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

  - docker-buildx

    - manjaro 需再自行下載 `sudo pacman -Sy docker-buildx`

  - [Migrate to Compose V2]

    - ubuntu 下載最新 docker 時，已下載 V2
    - `sudo apt-get install docker-compose-plugin`
    - Compose V1 已經不維護了
    - 指令更改`docker-compose`-->`docker compose`

### # 問題集中區

- <mark>TODO:Q</mark> container 中下載的軟體是由什麼方式放在 host？當 host 已有需下載的軟體時，怎麼做？當 host 沒有時，怎麼做？還是不管 host 有沒有，在 host 中都是只有分配一個空間給 docker 使用，而 host 不知道是哪些軟體？

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

  - <mark>TODO:</mark> volume 的所有方法，都只有掛載？也就是只有在掛載的位置上有儲存資料？目前簡單測試 `sshfs` 方式也是只有設定為 volume 端有資料，若將那台 host 斷開連線，則其他 host 無法讀寫資料，且會卡住。

- Network

  - bride

    - Docker Daemon 自動創建一個 `bridge`(也就是 `docker0`)
    - 每開一個 container，docker0 就產生一個 `veth` 跟 container 對接
    - 往外部連接時，透過 `Nat` 轉成 host 的 ip

    ![](https://i.imgur.com/SpRh5lQ.png)

    - 手動建立的 bridge 有 DNS 功能，內建 (docker0) 的沒有

      - EX. `docker container exec -it box1 ping box2` 可用 box2 取代他的 ip

  - host：直接建立在 host 上
  - none：沒有與外部網路連接

  - Docker 所使用的 network 技術：

    - 端口轉發（port forwarding），是靠 `iptables` 完成的
    - 不同的容器通過 `Network namespace` 進行了隔離
      （<mark>TODO:</mark> 沒模擬成功，尚未找出原因）

- compose

  - compose file 跟 docker compose 的 version 是指兩件事
  - 新版的 compose file 已經合併版本，所以不用再定義版本
  - 環境變數默認使用`.env`檔案，並在`.yml`中以 `${ENV_NAME}` 方式來使用

  - 指令規則：

    - 先 Options 後 Commands

      ```sh
      # EX. 先 -f 後 ps
      $ docker compose -f /folder/docker-compose.yml ps
      ```

    - 進行背景執行 `-d`

      ```sh
      # 需注意 -d 是 up 的 Options，所以須加在 up 之後
      $ docker compose -f /folder/docker-compose.yml up -d
      ```

    - 將 `up` 前面的所有 Options 整個想像成一包 compose name，接下來的所有操作，都需要先輸入那整串之後，再使用 Commands

      ```sh
      # EX. 以此 up 的 compose
      $ docker compose -f /folder/docker-compose.yml up -d
      # 使用 stop 時，需如下指令
      $ docker compose -f /folder/docker-compose.yml stop
      ```

  - 更新 compose

    - 修改已經 up 的 compose，可以不先停止，直接再下一次 `up` 指令更新。但一些特需變化需再加上 Options 來處理
      (`docker compose up --help`查看 Options)

      ```sh
      # EX. 有需要重新 build，則需加上 --build，會自動檢查是否有需要更新 build 的需求
      $ docker compose up -d --build
      ```

    - 常用更新指令：
      - `--remove-orphans`：有移除 service 時
      - `--build`：有更改 dockerfile 時
      - `restart`：有更改 volume 時

  - network

    - 如果沒有設定 network，會自動建立一個 network 把所有 service 連起來
    - docker compose 會將 service name 也寫進 DNS

  - scale

    - `--scale flask=3` 是指總共 3 個，而不是再增加 3 個
    - 自動做了 load balance

  - yml：

    - `depends_on`

      - 等待以下 service 啟動，才進行啟動此 service
      - 也可設定依賴在該 service 的 condition
        (EX. 處在 healthy)
      - 不會追蹤狀態，只在 run 時做依賴
        (EX. 若啟動後，被依賴的 service 轉為 unhealthy，依賴的 service 並不會動態調整)

  - <mark>TODO:問題：</mark>

    - docker-compose.yml 可以分多個檔案嗎？

- healthcheck

  - <mark>TODO:Q</mark> 會偏好寫在 dockerfile、run、docker-compose.yml？

    - 我認為更喜歡寫在 dockerfile，但現成 image 大部分沒寫 healthcheck
    - 也可能當要組成更健全的架構時，都會再另外寫一層 dockerfile？

- swarm

  ![](https://i.imgur.com/E1HMtwk.png)

  - ref

    - [RAFT] (<mark>TODO:補看</mark>)

  - node

    - 預設 manager 本身也可當作一個 worker 使用
    - init 之後，會得到加入該 swarm 的 token
    - 可透過 `docker swarm join-token <manager/worker>` 來查詢加入新 manager/worker 的 token
    - <mark>TODO:Q</mark> 使用 `docker swarm join --token <TOKEN> <IP>:<PORT>` 在新主機加入成為 swarm 的新 node 時，背後的網路如何通訊？使用廣播？

  - service

    - `docker service create` 來建立 service
    - 一個 service 可包括多個 replica (container)
    - 某個 replica 的 container exit，會自動補開 container
    - 各種 ID 關係

      - `docker service ls` 中，service id
      - `docker service ps` 中，task id
        ![](https://i.imgur.com/twe5WkU.png)
      - `docker container ls`中，container id
        ![](https://i.imgur.com/p6gGjcO.png)

    - network

      ![](https://i.imgur.com/P8DiltT.jpg)

      - 當加入新 node 後，會同步在該 node 上建立所有的 overlay network

      <!-- overlay -->

      - `overlay`

        - 稱為「東西走向」

        - 用在 node 之間的內部網路連接

        - 使用 VXLAN + UDP 來實現

        - 研究方法：

          - 可用 `sudo tcpdump -i enp0s8 port 4789` 捕抓 VXLAN 封包，以進行測試 (port 4789 為 VXLAN)

      <!-- docker_gwbridge -->

      - `docker_gwbridge` (gate way bridge)

        - 稱為「南北走向」

        - 對外部的網路連接

      <!-- ingress -->

      - `ingress`

        ![](https://i.imgur.com/b9uL3ua.png)

        - 也屬於 overlay，提供給「外部訪問內部」使用

        - 步驟：

          - 使用 -p 5566:80 轉 port，iptables 中的 `DOCKER-INGRESS` chain 會將 local 的 port 5566 轉發到 `docker_gwbridge` 的 port 5566
          - 透過 `ingress-sbox` 連接 `ingress overlay` & `docker_gwbridge`
          - 從`docker_gwbridge` port 5566 進來的會被做一個 MARK
          - 被 MARK 的內容會被 ipvs 進行隨機 load blance 通過 ingress overlay 傳到各個 replica

        - 研究方法：

          - `sudo iptables -vnL -t nat`

            - 用於列出 NAT 表格中的規則，並提供詳細的封包和字節計數信息。這對於了解網絡地址轉換規則的配置和效果非常有用。

          - iptables

            - [Docker - iptables 小知識]

            - 可以看到有一條 Chain `DOCKER-INGRESS` 做了 `tcp dpt:8080 to:172.27.0.2:8080`，也就是將 local 的 8080 轉到 `docker_gwbridge` 的 8080

          - `docker run -it --rm -v /var/run/docker/netns:/netns --privileged=true nicolaka/netshoot nsenter --net=/netns/ingress_sbox `

            - 利用 volume 方式，開一個 container 來查看 ingress-sbox 內部
            - `iptables -vnL -t mangle` 查到從`docker_gwbridge`該 port 進來的會被做一個 MARK：`tcp dpt:8080 MARK set 0x102`

            - 使用 `ipvsadm` 可以看到 `MARK set 0x102` 的內容會被進行隨機 load blance 到各個 replica

          - ipvs

            ![](https://i.imgur.com/PJmPUy4.png)

            - 用來實現 load blance (stateless 分配)
            - `ipvsadm`

## # 其他補充

<!-- 注意事項 -->

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

<!-- 小技巧 -->

- 小技巧：

  <!-- docker image rm $(docker images -q) -->

  - <details close>
    <summary><code>docker image rm $(docker images -q)</code></summary>

    </details>

<!-- 小工具 -->

- 小工具：

  <!-- 學習小工具 -->

  - <details close>
    <summary>學習小工具</summary>

    - [Play with Docker]：UI 操作，快速模擬 docker

    </details>

<!-- 補充學習 -->

- 補充學習：

  <!-- 文件 -->

  - <details close>
    <summary>文件</summary>

    - [Dockerfile reference]

    </details>

  <!-- 範例研究 -->

  - <details close>
    <summary>範例研究</summary>

    - [學習範本]

    </details>

  <!-- iptables -->

  - <details close>
    <summary>iptables</summary>

    - [鳥哥 iptables]

      ![](https://i.imgur.com/ay4aLYh.png)

    - [初探 IPTABLES 流動之路 - 以 Docker 為範例]

      ![](https://i.imgur.com/VxV7WRK.png)

    </details>

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

- Chain PREROUTING (policy ACCEPT 0 packets, 0 bytes)

| pkts | bytes | target         | prot | opt | in  | out | source    | destination |                               |
| ---- | ----- | -------------- | ---- | --- | --- | --- | --------- | ----------- | ----------------------------- |
| 976  | 58826 | DOCKER-INGRESS | all  | --  | \*  | \*  | 0.0.0.0/0 | 0.0.0.0/0   | ADDRTYPE match dst-type LOCAL |
| 3449 | 210K  | DOCKER         | all  | --  | \*  | \*  | 0.0.0.0/0 | 0.0.0.0/0   | ADDRTYPE match dst-type LOCAL |

- Chain INPUT (policy ACCEPT 0 packets, 0 bytes)

- Chain OUTPUT (policy ACCEPT 0 packets, 0 bytes)

| pkts | bytes | target         | prot | opt | in  | out | source    | destination  |                               |
| ---- | ----- | -------------- | ---- | --- | --- | --- | --------- | ------------ | ----------------------------- |
| 129  | 10951 | DOCKER-INGRESS | all  | --  | \*  | \_  | 0.0.0.0/0 | 0.0.0.0/0    | ADDRTYPE match dst-type LOCAL |
| 0    | 0     | DOCKER         | all  | --  | \_  | \*  | 0.0.0.0/0 | !127.0.0.0/8 | ADDRTYPE match dst-type LOCAL |

- Chain POSTROUTING (policy ACCEPT 0 packets, 0 bytes)

| pkts | bytes | target     | prot | opt | in  | out              | source        | destination |                               |
| ---- | ----- | ---------- | ---- | --- | --- | ---------------- | ------------- | ----------- | ----------------------------- |
| 9    | 566   | MASQUERADE | all  | --  | \_  | docker_gwbridge  | 0.0.0.0/0     | 0.0.0.0/0   | ADDRTYPE match src-type LOCAL |
| 5    | 420   | MASQUERADE | all  | --  | \_  | !docker_gwbridge | 172.27.0.0/16 | 0.0.0.0/0   |                               |
| 18   | 1170  | MASQUERADE | all  | --  | \*  | !docker0         | 172.17.0.0/16 | 0.0.0.0/0   |                               |

- Chain DOCKER (2 references)

| pkts | bytes | target | prot | opt | in               | out | source    | destination |     |
| ---- | ----- | ------ | ---- | --- | ---------------- | --- | --------- | ----------- | --- |
| 0    | 0     | RETURN | all  | --  | docker\*gwbridge | \*  | 0.0.0.0/0 | 0.0.0.0/0   |     |
| 0    | 0     | RETURN | all  | --  | docker0          | \_  | 0.0.0.0/0 | 0.0.0.0/0   |     |

- Chain DOCKER-INGRESS (2 references)

| pkts | bytes | target   | prot | opt | in  | out       | source    | destination                     |     |
| ---- | ----- | -------- | ---- | --- | --- | --------- | --------- | ------------------------------- | --- |
| 8    | 488   | DNAT tcp | --   | \*  | \_  | 0.0.0.0/0 | 0.0.0.0/0 | tcp dpt:8080 to:172.27.0.2:8080 |     |
| 1097 | 69289 | RETURN   | all  | --  | \_  | \*        | 0.0.0.0/0 | 0.0.0.0/0                       |     |
