<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!--  style  -->

###### <!-- ref -->

[零基礎七天入門linux]: https://www.udemy.com/course/linux-zh/learn/lecture/8531918#content
[manjaro]: https://manjaro.org
[linux newbie: running manjaro on macbookpro]: https://medium.com/@pswoo/linux-newbie-running-manjaro-on-macbookpro-5db4672351c9
[classic sysadmin: how to securely transfer files between servers with scp]: https://www.linuxfoundation.org/blog/blog/classic-sysadmin-how-to-securely-transfer-files-between-servers-with-scp
[linux directory structure]: https://www.thegeekstuff.com/2010/09/linux-file-system-structure/
[vi/vim]: https://vim.rtorr.com/

 <!-- ref -->

# Linux

> DATE: 3 (2023)
> REF: [零基礎七天入門 Linux]

## 1. 基本介紹

- Linux Distribution (發行版) = Linux + 附加的 APP(如 命令列介面)

  - Redhat：常見，商用需買 license
  - Ubuntua：新手友好。曜宇覺得太髒
  - Centos：免費的 Redhat（source code 跟 Redhat 一模一樣？）
  - [Manjaro]：曜宇推薦，[Linux Newbie: Running Manjaro on MacBookPro]
  - GNOME：桌面潮

- VM 安裝

  - 名詞

    - IDE Controller (Integrated Drive Electronics)
    - Optical (光碟)
    - Floppy (軟碟)

  - 調整

    - Storage/IDE 選擇剛剛下載的 ISO 檔 (EX. Manjaro)
    - System 開機順序調整：Optical -> Floppy -> Hard Disk。如此會從 Optical 啟動(也就上上面選的 IDE)
    - 顯示：調整 Scale Factor 比例放大，較舒服

  - Error

    - <mark>TODO:</mark> md5 檢查 ISO
    - manjaro 安裝： `rsync 失敗 錯誤碼：11`
      --> 空間不夠，約需要 9.5G 硬碟

---

## <mark>TODO:待整理筆記</mark>

- 查當前使用的 shell

  ```shell
  $ echo $SHELL
  /bin/zsh
  ```

- Ubuntua 的 terminal 打不開 （同機器設定上，manjaro 可以正常開啟 terminal）

  ```txt
  On modern-day computers, we usually use the word terminal
  to refer to software programs known as terminal emulators.
  ```

  - 未知原因，無法在桌面打開 terminal emulator
  - 須注意是否有 focus 在 VM
  - 改成直接切換 tty 來使用
    - mac 須以 `command+shift+Fx` 分別切換到 F1 ~ F12 設定的內容
    - 組合快捷鍵也可以使用 Fn 方式來使用 F1 ~ F12
    - 我的機器上：`F1` 登入頁、`F2` 桌面、`F3 ~ F6` 為 tty3 ~ tty6、`F7 ~ F12` 沒反應

- 延伸`tty`

  - <mark>TODO: 《再研究》</mark> 不同 tty 是不同 process 層級
    ![](https://i.imgur.com/Ak3I3kg.png)

  - <mark>TODO: 《再研究》</mark> 桌面 terminal 與 tty 差異？
    ![](https://i.imgur.com/uykC2JL.png)

  - <mark>TODO: 《再研究》</mark> 是否可將桌面 terminal 分頁，模擬成不同 tty？
    ![](https://i.imgur.com/m48FrIq.png)

- [Linux Directory Structure]

  - 參考大方向，不同發行版，都可能會有不同資料夾結構的使用方式

  ![](https://i.imgur.com/kFT4xj7.png)

- `cat text1.txt text2.txt >> text3.txt`

  - 將 text1.txt text2.txt 合併產生 text3.txt

  ```sh
  # 輸出 text1.txt 到 stdout
  $ cat text1.txt

  # 輸出 text1.txt ＆ text2.txt 到 stdout
  $ cat text1.txt text2.txt

  # 輸出 text1.txt ＆ text2.txt 從 stdout redirect 到 text3.txt
  # 等於將 text1.txt text2.txt 合併到 text3.txt
  $ cat text1.txt text2.txt >> text3.txt
  ```

- `cat`、`more`、`less`、`head`、`tail`

  - `cat`：一次輸出全部
  - `more`：可分次輸出
  - `less`：進階版`more`
  - `head`：頭十行
    - `head -13`：頭十三行
  - `tail`：末十行
    - `tail -f`：可以追蹤變化更新末端 (follow)

- [vi/vim]

  - Command Mode

    ![](https://i.imgur.com/1EGKwZY.png)
    ![](https://i.imgur.com/sapOcEN.png)
    ![](https://i.imgur.com/LLclnbn.png)
    ![](https://i.imgur.com/Nf6y8Dl.png)

  - Insert Mode
  - Visual Mode

- user

  - 可以多個 user 同時登入，同時執行自己的任務

  - 兩大類 user

    - system user

      - 系統內部自動建立
      - 不能用於登入？
        ![](https://i.imgur.com/ksdbKaU.png)
        ![](https://i.imgur.com/V2DzeLP.png)

    - regular users

      -
      - `sudo`、superuser、root

        - ChatGPT 開示：

          ![](https://i.imgur.com/se0tfl7.png)
          ![](https://i.imgur.com/xpxsj19.png)
          ![](https://i.imgur.com/dXBAHpD.png)

        - 總結：

          - root user 的權限即為 superuser 權限
          - 其他 user 透過 sudo，借用 superuser 權限
          - root user 設定：
            - 其他 user 透過 sudo 可使用的 superuser 權限
            - 使用 sudo 時所需的密碼（預設 user 密碼、root 密碼、無密碼）
          - 使用 sudo，輸入當前使用者自己的密碼的用意是，確保是本人正在使用

  - /etc/passwd

    - 可以查看系統中所有 user

    ![](https://i.imgur.com/LVJXYrD.png)
    ![](https://i.imgur.com/Rf1T6D8.png)
    ![](https://i.imgur.com/NI5HpAP.png)

  - /etc/group

    - 紀錄所有 group 的資訊，包含其所涵括的 user

    ![](https://i.imgur.com/v2jbiAD.png)

- root user

  - 一般在系統安裝時自動創建，且沒有設定密碼
  - 一般不建議登入使用，而是需要時使用`sudo`來暫時取得 root 權限
  - 必要時，可使用指令來設定 root 密碼，以進行登入

- terminal head：`$`為普通使用者，`#`為 root 使用者

  - 可使用`su`進行切換使用者

  ```js (因為要讓 # 不是註解顯色，隨便用一個 js)
  // EX.
  // 在 user1 的 terminal 輸入 su root 後，輸入密碼切換到 root
  $ su root
  Password:
  #
  // 也可直接輸入 su，輸入密碼切換到 root
  $ su
  Password:
  #

  // 輸入 exit 回到當前使用者
  # exit
  exit
  $
  ```

- 創建新使用者

  - `useradd <name>`：只創建最基本的 user（一般 user 即可）
  - `adduser <name>`：同時自動建立許多預設內容（需要 sudo）

- 為 user 打開使用 sudo 的權限

  - 在`/etc/sudoers`中新增權限 (`sudo visudo`)
  - 也可以將該 user 加入 sudo group (`usermod -G sudo <username>`)

  ![](https://i.imgur.com/67lnAF8.png)
  ![](https://i.imgur.com/oG2yK6I.png)
  ![](https://i.imgur.com/4NiWj9v.png)
  ![](https://i.imgur.com/ovTX2Km.png)

- 以 sudo 做操作視同為 root，如`sudo touch`的檔案，為 root 所有

- file 資訊釋讀

  - `rwx`：讀取 -- 寫入 -- 執行
  - `rw-r--r--`：檔案擁有者 -- 群組(group) -- 其他使用者

    ![](https://i.imgur.com/VNVXKky.png)

  ![](https://i.imgur.com/K656CyL.png)

- `chmod [options] [mode] <file_name>`

  - EX1. `chmod g+rw test.md` 將該檔案加上 group 的 rw 權限
  - user(u), group(g), others(o), all(a)
  - EX2. `chmod 734` --> rwx-wxr-- ( r:1, w:2, x:4 )

---

- 簡易網路

  - DNS

    - Domain Name System
    - 解析網址成 IP

  - Gateway

    - 網路中用於連接不同網路或子網路的設備或系統。它是數據流傳輸的接口，能夠將數據包從一個網路傳到另一個網路。

  - DHCP

    - Dynamic Host Configuration Protocol
    - 自動分配動態 IP 的協議

  - NAT

    - Network Address Translation
    - 將私有 IP 轉換成公共 IP，從而允許本地網路內的設備連接到互聯網
    - <mark>TODO:Q</mark> 浮動 ip 機制

  - BGP

    - Border Gateway Protocol
    - 處理分析 IP 再轉去正確路線的協議

- 可以用 ping 檢查是否可以正常連接，但有時候結果不準確，因為對方可以設定不讓別人去 ping

---

## 2. 其他補充

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
    <summary>scp</summary>

    > REF: [Classic SysAdmin: How to Securely Transfer Files Between Servers with scp]

    - 只要知道 Ubuntu 的用戶名、密碼、ip，就可以 scp 複製文件進去 Ubuntu

    </details>