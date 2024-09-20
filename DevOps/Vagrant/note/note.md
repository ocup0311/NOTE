##### <!-- 收起 -->

<!----------- ref start ----------->

[Vagrant 入門系列]: https://youtu.be/4nK_S-mU6_o?list=PLfQqWeOCIH4B6YAEXMr6cx4AfnKNBLbZO
[Vagrant Cloud]: https://app.vagrantup.com/boxes/search
[Vagrantfile Doc]: https://developer.hashicorp.com/vagrant/docs/vagrantfile

<!------------ ref end ------------>

# Vagrant

> DATE: 6 (2024)
> REF: [Vagrant 入門系列]

## # 簡介

<!-- 管理 VM 的工具 -->

- <details close>
  <summary>管理 VM 的工具</summary>

  ![](https://i.imgur.com/cynfQpa.png)
  ![](https://i.imgur.com/5HFlrYo.png)

  </details>

<!-- Hypervisor Type1 & Type2 -->

- <details close>
  <summary>Hypervisor Type1 & Type2</summary>

  - 可否不需底層 OS ，直接裝在硬體上的差異

  <br>

  ![](https://i.imgur.com/GpugaSn.png)

  <br>

  ![](https://i.imgur.com/KnwFUf9.jpg)

  </details>

<!-- Vagrant vs Terraform -->

- <details close>
  <summary>Vagrant vs Terraform</summary>

  - Vagrant 用在管理開發環境 (管理本機)
  - Terraform 用在建立 infrastructure (管理雲端)

  </details>

<!-- providers & provisioners -->

- <details close>
  <summary>providers & provisioners</summary>

  - providers：用於創建和管理 VM 的基礎架構，如 Virtualbox
  - provisioners：用於在 VM 創建後對其執行任務，如 Ansible

  </details>

- <details close>
  <summary>host & guest</summary>

  - 在 mac 使用 Virtualbox 創建 VM --> host 為 mac，guest 為 VM

  </details>

## # 安裝與設定

<!-- mac 按習慣透過 Homebrew -->

- <details close>
  <summary>mac 按習慣透過 Homebrew</summary>

  - `brew install --cask vagrant`

  </details>

<!-- 指令自動補全 -->

- <details close>
  <summary>指令自動補全</summary>

  - 我查的時候已經棄用 homebrew，改為由 vagrant 直接管理，所以用下列方式安裝
  - `vagrant autocomplete install --zsh`

  </details>

<!-- vagrant plugin -->

- <details close>
  <summary>vagrant plugin</summary>

  - 可透過 `vagrant plugin list` 查看已安裝項目
  - 一些功能推薦從 vagrant plugin 來安裝。

    - EX. 當想要同步檔案到 VM 時，可能會說可以安裝 Virtualbox Guest Additiions，不建議直接安裝，而是從 vagrant plugin 來安裝 (`vagrant plugin install vagrant-vbguest`)

  </details>

## # 基礎

<!-- Provider -->

- <details close>
  <summary>Provider</summary>

  - 使用 vagrant 管理 Virtualbox 時，可以不用開啟 Virtualbox 的應用程式，可以背景執行，應用程式只是提供 UI 讓你使用

  </details>

<!-- Box -->

- <details close>
  <summary>Box</summary>

  - <details close>
    <summary>Vagrant Cloud 網頁中有提供 Vagrant Box 可使用</summary>

    - [Vagrant Cloud]
    - 使用時養成習慣要指定版本
    - 其上對 box 的描述資訊有點少

    </details>

  <!-- 打包 box (以 Virtualbox 為例，不同 provider 細節不同，指令也不同) -->

  - <details close>
    <summary>打包 box (以 Virtualbox 為例，不同 provider 細節不同，指令也不同)</summary>

    <!-- vagrant package --base [VM name or ID] -->

    - <details close>
      <summary><code>vagrant package --base [VM name or ID]</code></summary>

      - `VBoxManage list vms` 查詢 VM ID

      </details>

    <!-- 注意事項 -->

    - <details close>
      <summary>注意事項</summary>

      <!-- 關閉該 VM -->

      - <details close>
        <summary>關閉該 VM</summary>

        - 因為得確保其處於一個不會變動的靜態狀態
        - 不需手動操作，package 時，會自動關閉

        </details>

      <!-- 需安裝 Virtualbox Guest Additions -->

      - <details close>
        <summary>需安裝 Virtualbox Guest Additions</summary>

        - 共用資料夾功能需能正常運作
        - 可以進行一些最佳化提高效能

        </details>

      <!-- 需要有 insecure_public_key -->

      - <details close>
        <summary>需要有 insecure_public_key</summary>

        - 因為初始化時是以 insecure_private_key 登入，之後再替換成新生成的 private_key

        </details>

      <!-- 清除不需要的檔案、敏感信息 -->

      - <details close>
        <summary>清除不需要的檔案、敏感信息</summary>

        - 暫存文件、日誌文件等
        - SSH 密鑰、密碼等

        </details>

      </details>

    <!-- Box File Format -->

    - <details close>
      <summary>Box File Format</summary>

      - package 後會在該資料夾中產生一個 package.box，為一個壓縮檔 tarball (tar, tar.gz, zip)

      - `vagrant box add --name=ubuntu/ocup ./package.box` 加入本地端，會解壓縮到 `~/.vagrant.d/` 中的 box，包含

        - VM artifacts (required) - 主要的 VM image，包含一個 `.ovf` 跟至少一個 `.vmdk`
        - metadata.json (required) - 標註 provider 資訊
        - info.json - 提供 `vagrant box list -i` 所顯示的內容
        - Vagrantfile - 預設設定

      </details>

    <!-- 發布到 vagrant cloud 需要有 checksum 驗證 -->

    - <details close>
      <summary>發布到 vagrant cloud 需要有 checksum 驗證</summary>

      - 可以簡單驗證檔案是否有損毀或遭到竄改
      - 先生成所選類型的 checksum，再貼到 cloud 上的驗證欄位
        - EX. 用 `sha1sum package.box` 生成 SHA1 值

      </details>

    </details>

  </details>

<!-- Vagrantfile -->

- <details close>
  <summary>Vagrantfile</summary>

  <!-- Vagrantfile 語法為 `Ruby` -->

  - <details close>
    <summary>Vagrantfile 語法為 <code>Ruby</code></summary>

    - `do` 開頭必定會配對 `end` 結尾
    - property 賦值寫法如 `config.vm.box = "box"`
    - method 寫法如 `config.vm.synced_folder ".", "/vagrant", disabled: true"`

    </details>

  <!-- box 的 vagrantfile -->

  - <details close>
    <summary>box 的 vagrantfile</summary>

    - box 的資料夾裡也會有他自己的 vagrantfile，需注意有哪些設定 (`~/.vagrant.d/`)
    - 同一屬性，project 層的 vagrantfile 會蓋掉 box 的

    </details>

  </details>

<!-- 指令相關 -->

- <details close>
  <summary>指令相關</summary>

  <!-- vagrant up -->

  - <details close>
    <summary><code>vagrant up</code></summary>

    - 同時生成 private key ，並將 VM 的 ssh key 設定完成
    - 按照設定完成 網路配置、資料同步、軟體安裝、腳本執行..等

    </details>

  <!-- vagrant destory -->

  - <details close>
    <summary><code>vagrant destory</code></summary>

    - `vagrant destory` 後重新 up，才會真正換一台 VM

    </details>

  </details>

<!-- 同步資料夾 -->

- <details close>
  <summary>同步資料夾</summary>

  <!-- provider 可能有各自的方法 -->

  - <details close>
    <summary>provider 可能有各自的方法</summary>

    - 沒設定則會使用 provider 當前的方法

    - EX. Virtualbox 有 Virtualbox Guest Additiions

      - 需安裝
      - 可以自動隨時同步
      - 設定 `type: "Virtualbox"`

    </details>

  <!-- vagrant 也有提供方法 `type: "rsync"` -->

  - <details close>
    <summary>vagrant 也有提供方法 <code>type: "rsync"</code></summary>

    - 由 `config.vm.synced_folder` 設定

    - 每次 `vagrant up` 跟 `vagrant reload` 都會同步

    - 在 shell 輸入 `vagrant rsync-auto`，啟動監聽自動隨時同步，退出後解除

    </details>

  <!-- 注意 -->

  - <details close>
    <summary>注意</summary>

    <!-- 釐清使用的方法是 copy / mount -->

    - <details close>
      <summary>釐清使用的方法是 copy / mount</summary>

      - `type: "virtualbox"`

        - mount
        - 刪掉 vagrnatfile 中掛載規則，再 reload 後不會解除 mount
        - 重新設定新的任一使用 virtualbox 且不 disabled 的掛載規則，再 reload 後才會重新部署規則

      - `type: "rsync"`

        - copy

      </details>

    <!-- vagrant reload 會有一些舊東西保留著 -->

    - <details close>
      <summary>vagrant reload 會有一些舊東西保留著</summary>

      ```ruby
      # EX.
      # 一開始設定為要同步：
      config.vm.synced_folder ".", "/vagrant", disabled: false

      # 使用 vagrant up 啟動一次，此時 VM 中已經有該檔案
      # 再將設定改成不要同步：
      config.vm.synced_folder ".", "/vagrant", disabled: true

      # 使用 vagrant reload 進行 reload 後
      # 此時在 reload 之前已經同步進 VM 的檔案會繼續存在
      # 因為他只是改成不要去同步而不是刪除原本已存在的檔案
      ```

      </details>

    <!-- 可以分別設定數個同步路徑，但目標資料夾不能重複，否則只會被最後一次覆蓋掉 -->

    - <details close>
      <summary>可以分別設定數個同步路徑，但目標資料夾不能重複，否則只會被最後一次覆蓋掉</summary>

      ```ruby
      # EX.
      # 這樣最後 /vagrant 只會覆蓋成 test/
      # 而不是同時擁有 src/、test/ 兩者的檔案

      config.vm.synced_folder "src/", "/vagrant"
      config.vm.synced_folder "test/", "/vagrant"
      ```

      </details>

    <!-- 預設會將 "." 同步 "/vagrant"，所以若想客製化同步的檔案，可以在最開頭先取消該預設 -->

    - <details close>
      <summary>預設會將 "." 同步 "/vagrant"，所以若想客製化同步的檔案，可以在最開頭先取消該預設</summary>

      ```ruby
      config.vm.synced_folder ".", "/vagrant", disabled: true
      ```

      </details>

    </details>

  </details>

<!-- 網路配置 -->

- <details close>
  <summary>網路配置</summary>

  <!-- 預設網路配置 -->

  - <details close>
    <summary>預設網路配置</summary>

    <!-- 使用 "Virtualbox" -->

    - <details close>
      <summary>使用 "Virtualbox"</summary>

      - 會分配在固定 ip 127.0.0.1 但不同 port (ex. port 22xx)
      - 因為使用 NAT 分配

      </details>

    <!-- 使用 "Hyper-V" -->

    - <details close>
      <summary>使用 "Hyper-V"</summary>

      - 會分配在不同 ip 但都在 port 22 (ex. ip 172.17.xx.xx)
      - 因為其 Network Adapter 是選用 Default Switch 做分配
      - Default Switch 可設定分配哪些範圍的 ip 供其使用
      - 此種方法，在 VM 內部外部都是同一個 ip，並不像 NAT 會進行轉換

      </details>

    - 註：此部分描述預設方式，理論上 provider 應該能選擇使用不同方式來進行 ip 分配轉換

    </details>

  <!-- 基本配置方式 -->

  - <details close>
    <summary>基本配置方式</summary>

    <!-- forwarded_port -->

    - <details close>
      <summary><code>forwarded_port</code></summary>

      - 用來設定轉發 port，例如以 nat 連線時，需用此設定來轉發 port，使本機能夠連進 VM
      - ssh 的轉發一開始就自動設定好，因此能夠連線。但例如要連 ngnix 的 port 80，則須設定轉發到本機的哪個 port

      </details>

    <!-- private_network -->

    - <details close>
      <summary><code>private_network</code></summary>

      <!-- DHCP(Dynamic Host Configuration Protocol) -->

      - <details close>
        <summary>DHCP(Dynamic Host Configuration Protocol)</summary>

        - 在原始碼有明寫預設 ip (教學中講師提到為 `172.28.128.1`)

        </details>

      <!-- Static IP -->

      - <details close>
        <summary>Static IP</summary>

        - 自己設定一個固定的 ip

        </details>

      </details>

    <!-- public_network -->

    - <details close>
      <summary><code>public_network</code></summary>

      - 用以公開讓外網都能連進來

      </details>

    </details>

  <!-- 測試 -->

  - <details close>
    <summary>測試</summary>

    - 安裝 nginx 後，在本機瀏覽器上做連線測試：

      ```ruby
      host.vm.network "forwarded_port", guest: 80, host: 12001
      # --> 可用 localhost:12001

      host.vm.network "private_network", ip: "192.168.50.20"
      # --> 可用 192.168.50.20:80

      host.vm.network "public_network", ip: "192.168.0.10", bridge: "en0: Wi-Fi"
      # --> 可用 192.168.0.10:80
      ```

    </details>

  </details>

<!-- Provisioning -->

- <details close>
  <summary>Provisioning</summary>

  - 啟動時機：(1)第一次 `vagrant up`、(2)`vagrant provision`、(3)`--provision`

  - 基本方式：File、Shell(inline、path)、Ansible

  <!-- 技巧： -->

  - <details close>
    <summary>技巧：</summary>

    - Ansible 可以設置成在最後一個 VM 啟動完後，才一次並行讓所有 VM 一起執行

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

    </details>

  <!-- 注意： -->

  - <details close>
    <summary>注意：</summary>

    - 若需將 file 放進權限較高的地方，建議先用 File Provisioner 放到低權限位置，再用 Shell Provisioner 移動到位
    - 使用 Shell Provisioner 時，需注意當下的 user。預設為 `privileged: true`，會以 root 執行

    </details>

  </details>

<!-- 資料夾解析 -->

- <details close>
  <summary>資料夾解析</summary>

  <!-- ./.vagrant/ -->

  - <details close>
    <summary><code>./.vagrant/</code></summary>

    - `.vagrant/machines/` 中手動改掉 folder 名稱，vagrant 會找不到

    </details>

  <!-- ~/.vagrant.d/ -->

  - <details close>
    <summary><code>~/.vagrant.d/</code></summary>

    </details>

  </details>

## # 問題

<!-- 不知為何 `PasswordAuthentication` 在 vagrant ssh-config 是 no，但在 VM 的 /etc/ssh/sshd_config 中是 yes -->

- <details close>
  <summary>不知為何 <code>PasswordAuthentication</code> 在 vagrant ssh-config 是 no，但在 VM 的 /etc/ssh/sshd_config 中是 yes</summary>

  > Ｑ： vagrant ssh-config 中的設定是設定我主機的內容，還是設定 VM 上的內容。結果 GPT 跟 Gemini 似乎答案相反。
  >
  > GPT：
  > vagrant ssh-config 命令生成的配置文件內容主要是針對本地主機（Host）的 SSH 客戶端設定，用於配置如何通過 SSH 連接到 Vagrant 管理的虛擬機（VM）
  >
  > Gemini：
  > Vagrant ssh-config 檔案中的設定會套用到 Vagrant 虛擬機上的 SSH 伺服器。

  </details>

<!-- 需要輸入 VM 使用者密碼 -->

- <details close>
  <summary>需要輸入 VM 使用者密碼</summary>

  - 待釐清原因在一些地方需要輸入 VM 使用者密碼

    - 目前使用 box:"ubuntu/trusty64" 的設定，會遇到以下情形

      - `vagrant ssh` 連線時不用輸入 VM 的使用者密碼，但以 `ssh` 連線則需要輸入密碼
      - 使用 rsync 有些 box 創建的 VM 會有權限問題，每次都要輸入密碼

    - 未知原因講師在 windows Virtualbox 用 `vagrant ssh` 也需要密碼

  </details>

<!-- 研究 `.vagrant/` 裡的檔案用途。 -->

- <details close>
  <summary>研究 `.vagrant/` 裡的檔案用途。</summary>

  - 例如 bundler 是在有 plugin 的情況下才出現的。有使用 provisioner 時也會出現 `provisioners`

  </details>

<!-- DHCP 未成功，如下 -->

- <details close>
  <summary>DHCP 未成功，如下</summary>

  - 目前有建立出一個 eth2 是由於設定 DHCP 而創建的，但沒有像 eth3 一樣有一個 inet
  - 不知是沒成功創建 DHCP，還是已經創建了但我不會使用

    ```sh
    4: eth2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
        link/ether 08:00:27:ba:5c:34 brd ff:ff:ff:ff:ff:ff
        inet6 fe80::a00:27ff:feba:5c34/64 scope link
          valid_lft forever preferred_lft forever
    5: eth3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
        link/ether 08:00:27:4f:4a:7a brd ff:ff:ff:ff:ff:ff
        inet 192.168.50.21/24 brd 192.168.50.255 scope global eth3
          valid_lft forever preferred_lft forever
        inet6 fe80::a00:27ff:fe4f:4a7a/64 scope link
          valid_lft forever preferred_lft forever
    ```

  </details>

<!-- 再認真研究一下 Vagrant command lifecycle -->

- <details close>
  <summary>再認真研究一下 Vagrant command lifecycle</summary>

  </details>

<!-- Provision 順序調控 -->

- <details close>
  <summary>Provision 順序調控</summary>

  - [Vagrant Multiple VM Provision Order](https://stackoverflow.com/q/70930031/13108209)

  - 找不到可以調整 Provision 順序的方法，因此用了 `--provision-with` 分批次執行

  </details>

## # 其他補充

- 注意事項：

  - <details close>
    <summary></summary>

    </details>

- 小技巧：

  <!-- 方便使用 ssh 連線 -->

  - <details close>
    <summary>方便使用 ssh 連線</summary>

    - 因為使用 vagrant 必須在對應的 vagrantfile 位置，較為不方便
    - 可以將 `vagrant ssh-config` 資訊，整個複製到 `~/.ssh/config` 方便使用 ssh 來連線

    </details>

  <!-- 測試可用 insecure_private_key -->

  - <details close>
    <summary>測試可用 insecure_private_key</summary>

    - 不安全
    - 測試時為了方便連接，可用 insecure_private_key
    - vagrantfile 設定 `config.ssh.insert_key = false` 可讓其用 insecure_private_key，而不再另外生成 private key
    - insecure_private_key 在 `~/.vagrant.d/`

    </details>

- 小工具：

  - <details close>
    <summary></summary>

    </details>

- 補充學習：

  <!-- 文件 -->

  - <details close>
    <summary>文件</summary>

    - [Vagrantfile Doc]

    </details>

<!-- 講師習慣 -->

- <details close>
  <summary>講師習慣</summary>

  - 稱 "Vagrant Box" 為 "Vagrant 鏡像"
  - 在 windows 中，更偏好使用 Virtualbox，而不是 Hyper-V (因為提供的 box 比較多與 Virtualbox 相容？)

  </details>

---

## # 踩雷實錄

<!-- sample-ansible 的 ssh key 設定 -->

- <details close>
  <summary>sample-ansible 的 ssh key 設定</summary>

  <!-- 所遇狀況： -->

  - <details close>
    <summary>所遇狀況：</summary>

    - 前情：

      - 我使用 vagrant 創建三個 virtualbox VM 想用來學習 ansible。
      - 欲將 VM1 當作 controller 控制 VM2, VM3。

    - 我卡在：

      - 我在 VM1 使用 ssh-copy-id 把公鑰傳給 VM2 時，`Permission denied (publickey).`

    - 已經做的事：

      - `/etc/hosts` 已設定
      - VM1 可以 ping VM2
      - VM2 確定能被 ssh 連，因為本機能連
      - VM2 的 `/etc/ssh/sshd_config` 已設定如下，並且 `sudo systemctl restart ssh`

        - `PubkeyAuthentication yes`
        - `AuthorizedKeysFile .ssh/authorized_keys`

      - 有清理過 VM1 的 `~/.ssh/known_hosts` 重試幾次
      - 直接將 VM1 的公鑰手動複製去 VM2 `~/.ssh/authorized_keys`
      - 檢查過 VM1 的私鑰 `600` 公鑰 `644`
      - 如下重新設定開通 port 22

        - `sudo ufw allow 22/tcp`
        - `sudo ufw enable`
        - `sudo ufw status`

      - 用 `telnet VM2 22` 測試 port 22 可以連接
      - 用 `sudo cat /var/log/auth.log` 查看 log 來思考解決方法

    </details>

  <!-- 關鍵問題： -->

  - <details close>
    <summary>關鍵問題：</summary>

    - 忽略了「因為用 vagrant 創建，已經關閉密碼登入，沒辦法用 ssh-copy-id 傳公鑰」
    - 忘記要寫入 `~/.ssh/config` 才能直接 `ssh ansible-node1`

    </details>

  <!-- 解決方法： -->

  - <details close>
    <summary>解決方法：</summary>

    - 直接將 VM1 的公鑰手動複製去 VM2 `~/.ssh/authorized_keys`
    - 先開啟密碼登入，設定好再關閉 (此方法較易用 vagrant 的腳本實現，暫選用此法)

    </details>

  </details>

---

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---
