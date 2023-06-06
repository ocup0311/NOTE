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

[Vagrant]: https://youtu.be/4nK_S-mU6_o?list=PLfQqWeOCIH4B6YAEXMr6cx4AfnKNBLbZO
[Ansible]: https://youtu.be/K0e7tjh3NFk?list=PLfQqWeOCIH4BDoRx8lpXXl4hqSD4GSDU5
[Prometheus]: https://prometheus.io/
[LibreNMS]: https://www.librenms.org/
[Zabbix]: https://www.zabbix.com/
[sysdig]: https://sysdig.com/
[cURL]: https://www.ruanyifeng.com/blog/2011/09/curl.html
[CVE]: https://cve.mitre.org/
[Snyk]: https://snyk.io/
[Trivy]: https://github.com/aquasecurity/trivy#how-to-pronounce-the-name-trivy
[Mixmax (多推)]: https://www.mixmax.com/demo
[Mixmax-介紹]: https://youtu.be/NXEDqzqnmRo

 <!-- ref -->

# 工具簡介

<!-- Linux -->

- <details close>
  <summary>Linux</summary>

  - [cURL]

    - `Command Line URL viewer`
    - 一種命令行工具，作用是發出網路請求，然後得到和提取數據，顯示在"標準輸出"（stdout）上面。

  </details>

<!-- 程式碼安全性檢查 -->

- <details close>
  <summary>程式碼安全性檢查</summary>

  - 根據 [CVE] 檢查

    - 需留意 CVE 的更新

    - [Snyk]

      - 線上，需開放 github 讀取權限給他

    - [Trivy]

      - 安裝在電腦，用指令針對不同檔案進行檢查，也可檢查 image

  </details>

<!-- 管理與溝通 -->

- <details close>
  <summary>管理與溝通</summary>

  - [Mixmax (多推)]

    - 約時間系統
    - [Mixmax-介紹]
    - EX. 可以把時間表嵌入在 email，對方點時間就會確定

  </details>

<!-- 環境監控 -->

- <details close>
  <summary>環境監控</summary>

  - [LibreNMS]

    ![](./src/image/GPT_Monitor_LibreNMS.png)

  - [Zabbix]

    ![](./src/image/GPT_Monitor_Zabbix.png)

  - [Prometheus]

    ![](./src/image/GPT_Monitor_Prometheus.png)

  - [Sysdig]

    ![](./src/image/GPT_Monitor_Sysdig.png)

  </details>

<!-- 系統管理 -->

- <details close>
  <summary>系統管理</summary>

  - [Vagrant]

  - [Ansible]

  </details>
