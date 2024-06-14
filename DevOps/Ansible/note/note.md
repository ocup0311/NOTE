##### <!-- 收起 -->

<!----------- ref start ----------->

[vagrant-ansible 腳本]: ../../Vagrant/src/code/sample07-ansible/README.md
[Ansible Doc]: https://docs.ansible.com/ansible/latest/
[YAML Doc]: https://yaml.org/
[Index of all Modules]: https://docs.ansible.com/ansible/latest/collections/index_module.html
[Ansible Collections]: https://github.com/ansible-collections
[Ansible-lint is not available. Kindly check the path or disable validation using ansible-lint]: https://github.com/ansible/vscode-ansible/issues/763
[Ansible 入門]: https://www.youtube.com/playlist?list=PLfQqWeOCIH4BDoRx8lpXXl4hqSD4GSDU5
[官方 Best Practices]: https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html
[Understanding variable precedence]: https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#understanding-variable-precedence

<!------------ ref end ------------>

# Ansible

> DATE: 6 (2023)
> REF: [Ansible 入門]

## # <mark>TODO:待整理筆記</mark>

- 兩種用法

  - `ansible -i inventory.ini -m ping`
  - `ansible-playbook playbook.yml -i inventory.ini`
  - 每個 host 不會按照順序執行，是並行，所以呈現的內容並非有序

- core

  - Inventory

    - 設定每台主機的資訊

  - Playbook

    - 設定每台主機要執行的 Task

  - Module

    - Task 的執行內容
    - 一般是使用平台提供的，可在 [Index of all Modules] 查詢
    - 為一種 Plugin。Module 主要是用在 VM 上執行的 Task

- Inventory

  - 設定每台主機的資訊
  - 固定名稱資料夾

    - `group_vars`

      - 只對放 inventory.ini 中 group 名稱有效
      - EX. `all.yml`, `web.yml`

    - `host_vars`

      - 只對放 inventory.ini 中 host 名稱有效
      - EX. `ansible-node1.yml`

    - 註：
      - 名稱、相對位置固定不能錯
      - 資料夾內檔案名稱參照 inventory.ini 中的命名 (.yml)
      - 優先順序：範圍越小越優先 (EX. host > group > all) (REF: [Understanding variable precedence])

- playbook

  - 主要構成

    - hosts
    - remote_user
    - tasks
      - name
      - plugin (module)

  - 介紹

    - `vars`

      - 優先順序： vars_files 後者 > vars_files 前者 > vars

    - `loop`

      - `{{ item }}`：為關鍵字，代表該次 loop 到的變數
      - `with_items`、`with_nested`..etc 建議轉移成使用 `loop`+`query`
      - > In most cases, loops work best with the loop keyword instead of with_X style loops. The loop syntax is usually best expressed using filters instead of more complex use of query or lookup.
      - EX. `with_nested` --> `loop: "{{ query('nested', list_1, list_2, list_3) }}"`
      - query 已經包含 `wantlist=True`

    - `when`

      - 預設為 and
      - 需要 or，則要寫 `or`

        ```yml
        # EX. and
        when:
          - condition1
          - condition2

        # EX. or
        when: (condition1) or (condition2)
        ```

  - PLAY RECAP

    - ok：執行成功，沒變動
    - changed：執行成功，有變動
    - unreachable
    - failed：執行失敗
    - skipped
    - rescued
    - ignored

- yaml

  - 記得冒號後要空格
  - 三種格式：

    - key-value
    - list

      ```yml
      # 等同於 JSON： ["a", "b", "c"]

      - a
      - b
      - b
      ```

    - dictionary

      ```yml
      # 等同於 JSON： "dic": {"a": 1, "b": 2, "c": 3}

      dic:
        aa: 1
        bb: 2
        cc: 3
      ```

- `ansible.cfg`

  - 設定 config
  - 優先順序，由上往下開始查詢，找到即使用該檔案

    - 設定在環境變數 ANSIBLE_CONFIG 的位置 (`export ANSIBLE_CONFIG=xxx/xxx/ansible.cfg`)
    - 當前 shell 所在位置 (`./ansible.cfg`)
    - home (`~/.ansible.cfg`)
    - `/etc/ansible/ansible.cfg`

  - <mark>TODO:</mark> 再研究哪些內容適合放在哪裡

- 技巧：

  - 加上 `-vv` 可以印出 debug 資訊

- v2.10 的升級為大更新

  - Module 被拆分出來到不同 repo，只剩下常用的主要功能在主要 repo 中
  - 剩下的被歸類為 Plugin，由第三方開發維護，被放在 [Ansible Collections]
  - v2.9 的寫法會在執行時被自動對照轉換為新的，依然可以執行

    - EX. `mysql_user` --> `community.mysql.mysql_user`
    - 有趣的是，用 v2.10 語法，在 v2.9.27 軟體也能執行

  - 更新必須刪除舊版本重新安裝，不可直接升級
  - Ansible Collections 有些會隨安裝 Ansible 一起安裝，有些需另外安裝 `ansible-galaxy collection install [COLLECTIONS]`

- file

  - file

    -

  - copy

    - 不會直接創建 folder
    - `backup`：被覆蓋的檔案都會保留紀錄

  - template

    - 需用 `Jinja` 寫 (`.j2`)
    - 可以製作 template 依照 host_vars 的變數帶入生成各自 host 的 file

  - 注意

    - `become_method: ansible.builtin.sudo` 只是指定方法，依然需要搭配 `become: true` 才能使用
    - `File permissions unset or incorrect.`：需要設定 mode
    - 若沒指定 owner，則因為使用 sudo，都會變成 root
    - directory 記得開 x 權限

- system

  - ping

    -

  - gather_facts

    - 預設 true
    - 開啟後，可以用 `debug` 印出相關變數 (可利用 `ansible all -m gather_facts` 看有哪些變數)
    - `ansible all -m gather_facts --tree ./facts`：將 gather_facts 內容輸出到 `./facts/` 中保存

  - user

    - `present`

      - 自動建立 `/home/user/`

    - `absent`

      - `remove` 將 `/home/user/` 刪除

    - `password`

      - 必須是經過 hash 處理
      - 可用 `password_hash('sha512')` 處理，可能需另外安裝 `passlib`
      - 按往例會放在 env 等，不會放在 code

  - group

    - `present`、`absent`

## # 簡介

- <details close>
  <summary></summary>

  </details>

## # 安裝與設定

- 相關設定已製作成 [vagrant-ansible 腳本]，在 vagrant 啟動時直接安裝設定完成，可參考其中細節

  - 安裝 ansible
  - 在 `/etc/hosts` 中設定 ip:name 配對
  - 設定使用 ssh key 連線
    - 生成 ssh key
    - 傳送公鑰給其他 node
    - 在 `~/.ssh/config` 中設定連線所需私鑰
    - 關閉 node 密碼登入功能

## # 基礎

## # 問題

<mark>TODO:</mark> 找時間在 vagrant-ansible 設定中新增更新 ubuntu 版本 & 更新 ansible 版本，以最新版練習。或是設定兩個 controller 來比較新舊版差異 (v2.10 前後)

## # 其他補充

- 注意事項：

  - <details close>
    <summary></summary>

    </details>

- 小技巧：

  - <details close>
    <summary></summary>

    </details>

- 小工具：

  - <details close>
    <summary></summary>

    </details>

- 補充學習：

  <!-- 文件 -->

  - <details close>
    <summary>文件</summary>

    - [Ansible Doc]
    - [YAML Doc]

    </details>

  <!-- Best Practices -->

  - <details close>
    <summary>Best Practices</summary>

    - [官方 Best Practices]

    </details>

---

## # 踩雷實錄

<!-- vscode Ansible 插件 -->

- <details close>
  <summary>vscode Ansible 插件</summary>

  - 安裝 vscode Ansible 插件後，還得自行安裝 Ansible-lint，否則報錯 [Ansible-lint is not available. Kindly check the path or disable validation using ansible-lint]

  </details>

<!-- 以自己管理 trusted.gpg.d 方式執行 apt 安裝 -->

- <details close>
  <summary>以自己管理 trusted.gpg.d 方式執行 apt 安裝</summary>

  - 指定 apt repo 時不能用 `ansible_architecture` 變數。這會顯示如 x86_64 形式，而不是所需要的 amd64
  - GPG keys 格式：

    - 透過 curl 下載下來的 GPG key 是 ASCII 格式
    - apt will not accept ASCII GPG keys saved with .gpg extension
    - 而 ansible 找不到提供 `--dearmor` 方法，將 ASCII 轉為 binary (只想到可直接用 command 寫)
    - 並非只能用 `.gpg` 的 GPG key，`.asc` 也能用 (直接將輸出設為 .asc 格式即可)

  - REF: [How can I manage keyring files in trusted.gpg.d with ansible playbook since apt-key is deprecated?]

  </details>

---

## # 延伸討論

- <details close>
  <summary></summary>

  </details>

---
