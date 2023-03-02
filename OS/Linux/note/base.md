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

 <!-- ref -->

# Functional Programming (FP)

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
