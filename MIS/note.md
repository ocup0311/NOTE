<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 10%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!-- --------------------- style --------------------- -->

##### <!-- ref -->

[ccna 教學]: https://youtu.be/gxbqIMqBgPc

<!-- ref -->

# CCNA 網路基本認識

> DATE: 6 (2022)
> REF: [CCNA 教學]

- 終端設備：(如 手機、電腦、Hub..等)
- 存取設備：終端機進入到網路的第一個網路設備 (如 Switch、Hub..等)

---

- Hub（集線器）：早期設備，已棄用

  - 被 Switch 取代

  - port：

    - 編號： 種類 ＋ slot/number
      (eg. fa0/1,fa0/2,fa0/3,e0/1,e0/2...)
      - fa(fe?): fast ethernet（快速乙太網路）為目前主流 (最快 100M)
      - e: ethernet（乙太網路）(最快 10M)
      - G: (最快 1G)

  - 共享匯流排(shared bus)：資料傳輸時，連接 Hub 的所有終端設備都會接收到(Multiple Access)

    - 乙太網路，都是 Multiple Access

      - EX. PC1 傳送給 PC3，則路徑為：
        - PC1 --> Hub --> 其他所有 PC
        - PC3 再傳 ping 回給 PC1

    - ping 封包，屬於 ICMP 協定

- Switch（交換器）：

---

- MAC（實體位址）：電腦的「網路卡」的身分證

  - OUI + NIC
  - OUI 需跟協會申請
  - 16 進位表示方法有：

    - `0123.4567.897e` (Cisco IOS)(網路設備)
    - `01-23-45-67-89-7e` (windows)
    - `01:23:45:67:89:7e`

  - `7th bit`：

    - 0 = 全球唯一
    - 1 = 本地自己管理
    - 大部分是 `0`，有些協定會改成 `1` (eg. EUI-64)

  - `8th bit`：

    - 0 = unicast
    - 1 = multicast | broadcast
    - 大部分是 `0`

  - 查詢指令：
    - Windows: `ipconfig/all`
    - Mac OS: `/sbin/ifconfig`

<div class="imgBox" >
  <img src="./image/MAC_ID.png" alt="MAC_ID.png" />
</div>

---

- RJ45：網路線接頭規格統一
