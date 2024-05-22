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

- providers VS provisioners

- [Vagrant Cloud] 網頁中有提供 `Vagrant Box` 可使用

- 講師習慣：

  - 稱 Vagrant Box 為 Vagrant 鏡像
  - 在 windows 中，更偏好使用 VirtualBox，而不是 Hyper-V (因為提供的 box 比較多與 VirtualBox 相容？)

- 細節觀察：

  - 使用 vagrant 管理 VirtualBox 啟動 VM 時，不需開啟 VirtualBox 應用程式
  - `vagrant destory` 後重開，才會換一台 VM
  - `vagrant ssh` 連線時不用輸入 VM 的使用者密碼，但以 `ssh` 連線則需要輸入密碼（此部分未知原因講師在 windows VirtualBox 用 `vagrant ssh` 也需要密碼）
  - `.vagrant/machines/` 中手動改掉 folder 名稱，vagrant 會找不到
  -

- Vagrantfile 語法為 `Ruby`

  - `do` 開頭必定會配對 `end` 結尾
  -

- `vagrant up` 同時生成 private key ，並將 VM 的 ssh key 設定完成

## # 簡介

- 管理 VM 的工具

  ![](https://i.imgur.com/cynfQpa.png)
  ![](https://i.imgur.com/5HFlrYo.png)

- Hypervisor Type1 & Type2

  - 可否不需底層 OS ，直接裝在硬體上的差異

  <br>

  ![](https://i.imgur.com/GpugaSn.png)

  <br>

  ![](https://i.imgur.com/KnwFUf9.jpg)

- Vagrant vs Terraform

  - Vagrant 用在管理開發環境 (管理本機)
  - Terraform 用在建立 infrastructure (管理雲端)

## # 安裝與設定

## # 問題集中區

- 不知為何 `PasswordAuthentication` 在 vagrant ssh-config 是 no，但在 VM 的 /etc/ssh/sshd_config 中是 yes

  > Ｑ： vagrant ssh-config 中的設定是設定我主機的內容，還是設定 VM 上的內容。結果 GPT 跟 Gemini 似乎答案相反。
  >
  > GPT：
  > vagrant ssh-config 命令生成的配置文件內容主要是針對本地主機（Host）的 SSH 客戶端設定，用於配置如何通過 SSH 連接到 Vagrant 管理的虛擬機（VM）
  >
  > Gemini：
  > Vagrant ssh-config 檔案中的設定會套用到 Vagrant 虛擬機上的 SSH 伺服器。

## # 其他補充

- 注意事項：

  - <details close>
    <summary></summary>

    </details>

- 小技巧：

  <!-- 指令自動補全 -->

  - <details close>
    <summary>指令自動補全</summary>

    - 我查的時候已經棄用 homebrew，改為由 vagrant 直接管理，所以用下列方式安裝
    - `vagrant autocomplete install --zsh`

    </details>

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
