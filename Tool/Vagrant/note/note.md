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

[Vagrant入門系列]: https://youtu.be/4nK_S-mU6_o?list=PLfQqWeOCIH4B6YAEXMr6cx4AfnKNBLbZO
[Vagrant Cloud]: https://app.vagrantup.com/boxes/search
[Vagrantfile Doc]: https://developer.hashicorp.com/vagrant/docs/vagrantfile

<!------------ ref end ------------>

# Vagrant

> DATE: 6 (2023)
> REF: [Vagrant 入門系列]

## <mark># TODO: 待整理</mark>

- 講師習慣：

  - 稱 Vagrant Box 為 Vagrant 鏡像
  - 在 windows 中，更偏好使用 VirtualBox，而不是 Hyper-V (因為提供的 box 比較多與 VirtualBox 相容？)

- 細節觀察：

  - 使用 vagrant 管理 VirtualBox 啟動 VM 時，不需開啟 VirtualBox 應用程式

  - `vagrant destory` 後重開，才會換一台 VM

  - `.vagrant/machines/` 中手動改掉 folder 名稱，vagrant 會找不到

  - 創建多個 VM 的預設：

    - 使用 "mac + VirtualBox" 會分配在固定 ip 127.0.0.1 但不同 port
    - 使用 "windows + Hyper-V" 會分配在不同 ip 172.17.xx.xx 但都在 port 22

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
  <summary><mark>TODO: 待補充</mark>providers & provisioners</summary>

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

    - EX. 當想要同步檔案到 VM 時，可能會說可以安裝 VirtualBox Guest Additiions，不建議直接安裝，而是從 vagrant plugin 來安裝 (`vagrant plugin install vagrant-vbguest`)

  </details>

## # 基礎

<!-- Box -->

- <details close>
  <summary>Box</summary>

  - [Vagrant Cloud] 網頁中有提供 Vagrant Box 可使用

  - <details close>
    <summary></summary>

    </details>

  <!-- 打包 box (以 virtualbox 為例，不同 provider 細節不同，指令也不同) -->

  - <details close>
    <summary>打包 box (以 virtualbox 為例，不同 provider 細節不同，指令也不同)</summary>

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

      <!-- 需安裝 VirtualBox Guest Additions -->

      - <details close>
        <summary>需安裝 VirtualBox Guest Additions</summary>

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

  </details>

<!-- 同步資料夾 -->

- <details close>
  <summary>同步資料夾</summary>

  <!-- provider 可能有各自的方法 -->

  - <details close>
    <summary>provider 可能有各自的方法</summary>

    - 沒設定則會使用 provider 當前的方法

    - EX. VirtualBox 有 VirtualBox Guest Additiions

      - 需安裝
      - 可以自動隨時同步
      - 設定 `type: "virtualbox"`

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

  </details>

<!-- Provisioning -->

- <details close>
  <summary>Provisioning</summary>

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

    - 未知原因講師在 windows VirtualBox 用 `vagrant ssh` 也需要密碼

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

---

## # 踩雷實錄

- <details close>
  <summary></summary>

  </details>

---

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---
