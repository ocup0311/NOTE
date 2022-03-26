# Git by ssh

> DATE: 10.2020
> REF: [多 Git 帳號 1](https://medium.com/@hyWang/%E5%A6%82%E4%BD%95%E5%9C%A8%E4%B8%80%E5%8F%B0%E9%9B%BB%E8%85%A6%E4%BD%BF%E7%94%A8%E5%A4%9A%E5%80%8Bgit%E5%B8%B3%E8%99%9F-907c8eadbabf) | [多 Git 帳號 2](https://www.itread01.com/content/1549692930.html) | [SSH](https://jennycodes.me/posts/security-ssh)

- 步驟：

  - 產生 SSH-Key 給指定 email

    ```
    $ ssh-keygen -t rsa -C "電子郵件"
    ```

  - 將 SSH-Key 儲存到指定位置。
    （若尚未建過 ssh ，則須先用預設的 id_rsa，此時會自動建立 .ssh 資料夾）
    #Generating public/private rsa key pair.
    #Enter file in which to save the key (/Users/UserName/.ssh/id_rsa):

    ```
    $ /Users/UserName/.ssh/id_rsa_xxx
    ```

  - 查看是否新增成功：

    ```
    $ ls -al ~/.ssh
    ```

    成功出現新增的 ssh：

    ```
    -rw------- 1 username staff 2655 10 24 21:05 id_rsa_xxx
    -rw-r--r-- 1 username staff 575 10 24 21:05 id_rsa_xxx.pub
    ```

  - 將新私鑰新增到 SSH agent 中：
    （預設只讀 id_rsa，為了讓 SSH 識別新私鑰，需將其新增到 SSH agent 中）
    （若有重啟的話，需要重新此段）

    ```
    $ ssh-add ~/.ssh/id_rsa_xxx
    ```

  - 複製 SSH 公鑰：
    （用 cat 打開公鑰 ".pub" 複製公鑰內容字串 ）

    ```
    $ cat ~/.ssh/id_rsa_xxx.pub
    ```

  - 將 SSH 公鑰 貼至 GitHub 中：
    （Github：右上/settings/SSH and GPG keys/New SSH key）

  - 使用 vi 去設定 .ssh/config：
    （其實就是往 config 中新增一個 Host）

    ```
    $ vi ~/.ssh/config
    ```

    config 參考格式：

    ```
    #Default GitHub (EMAIL1)
    Host NAME1
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa

    #Second GitHub (EMAIL2)
    Host NAME2
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_2
    ```

  - 測試連結是否正常：

    ```
    // 改為：( NAME 為 ~/.ssh/config 中設定的)
    $ ssh -T git@NAME
    ```

    有成功連結：
    Hi UserName! You’ve successfully authenticated, but GitHub does not provide shell access.

  - 改變 git clone 的方式：

    ```
    // 原來的：
    $ git clone git@github.com:UserName/repository

    // 改為：( NAME 為 ~/.ssh/config 中設定的)
    $ git clone git@NAME:UserName/repository
    ```

  - 取消 Global 設定並設定各 Repository 的 User 資料：
    （每 clone 新的 repository 後，重新設定 User 資料）

    ```
    // 取消 Global 設定
    $ git config --global --unset user.name
    $ git config --global --unset user.email

    // 設定各 Repository 的 User 資料
    $ git config user.email "電子郵件"
    $ git config user.name "使用者名稱"
    ```
