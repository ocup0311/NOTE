##### <!-- 收起 -->

<!----------- ref start ----------->

[CKA 考試完全指南（2022 版）]: https://www.udemy.com/course/k8s-chinese/
[Play with Kubernetes]: https://labs.play-with-k8s.com/
[kubeadm 官方]: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
[Kubernetes Best practices (官方)]: https://kubernetes.io/docs/setup/best-practices/
[apt-key is deprecated]: https://itsfoss.com/apt-key-deprecated/
[Linux 如何永久儲存 iptables 的設定？]: https://magiclen.org/iptables-save-permanently/
[K8sGPT]: https://k8sgpt.ai/

<!------------ ref end ------------>

# Kubernetes

> DATE: 6 (2023) , 7 (2024)
> REF: [CKA 考試完全指南（2022 版）] | [Kubernetes Best practices (官方)]

## # 簡介

- Container Orchestration：管理編排多個 container 的工具
- Google 在 2015 開源釋出
- 基本架構

  - Kubernets Master (control plane)

    - API Server (kubectl)：Server
    - etcd (/etc distributed)：分散式 key-value DB
    - Controller Manager：管理不同的 Controller
    - Scheduler：調度決定 Pod 在哪一個 Node 上運行

  - Worker Node

    - Kubelet：管理該 Node 的 Pod
    - Kube Proxy：管理該 Node 的 Pod Network
    - Container Runtime (Pod)

  ![](../src/image/K8s_intro.png)
  ![](../src/image/K8s_Architecture.png)

- 集群搭建工具

  - 稱作 cluster deployment tools 或 cluster provisioning tools
  - 用於簡化 K8s 集群的部署和初始化過程，快速建立 Kubernets Master
  - 常用工具選擇比較

    - kubeadm
    - microk8s
    - minikube

    - 我的解讀：microk8s 跟 minikube 只有單節點 Kubernets Master，要多節點需要另外用其他工具來處理。kubeadm 直接包含這部分

    ![](../src/image/GPT_cluster_provisioning_tool.png)

---

## # 安裝與設定

- 安裝 kubeadm

  - [kubeadm 官方]

    - 基於 Debian 和 Red Hat
    - 至少 2GB RAM
    - 至少 CPU 2 核心
    - Node 限制：

      - 需能互連
      - 不能有重複的 Host name、MAC address、product_uuid （尤其是 VM 需要檢查）

        - `/sys/class/dmi/id/product_uuid`

      - 開啟所需 port

        - 用 `netcat` 檢查，EX. `nc 127.0.0.1 6443`

      - 禁用 SWAP

        - SWAP：為記憶體管理技術，當物理記憶體不夠時，能借用一部分硬碟來儲存部分記憶體內容
        - 因為 K8s 就是要用容器化方式來擴展，藉由硬體資訊來判斷如何分配，資源不夠就分配到其他硬體，而無需再用 SWAP 這種技術來緩解，反而使用了 SWAP 會讓 K8s 誤判硬體資源

          ![](../src/image/GPT_K8s_SWAP_off.png)

    - 安裝 `CRI- container runtime`、`kubeadm`、`kubelet`、`kubectl`

      - 注意版本相容

    - CGroup Driver

      - `container runtime` 和 `kubelet` 需使用相同的 CGroup Driver

  - `install.sh` 步驟

    - 安裝必須的基本工具

    - 關閉 SWAP

    - 設定 Ports

      - REF: [Linux 如何永久儲存 iptables 的設定？]

      - 所有默認端口都可以重新配置

        ![](../src/image/K8s_Ports_Protocols_control.png)
        ![](../src/image/K8s_Ports_Protocols_worker.png)

      - `iptables` 設定防火牆，以較早設定的為主

        - 因為符合條件後就會按照設定往下一步，所以更後面的設定就不會被經過

        ```sh
        # EX. 先設定 ACCEPT 再設定成 DROP，則為 ACCEPT
        $ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
        $ sudo iptables -P INPUT DROP
        $ sudo iptables -A INPUT -p tcp --dport 22 -j DROP
        $ sudo iptables -L INPUT
        Chain INPUT (policy DROP)
        target     prot opt source               destination
        ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh
        DROP       tcp  --  anywhere             anywhere             tcp dpt:ssh

        # EX. 再將 ACCEPT 刪除後，則為 DROP
        $ sudo iptables -D INPUT 1
        $ client_loop: send disconnect: Broken pipe
        ```

    - 設定所需 Kernel modules

      - 新增在 `/etc/modules-load.d/containerd.conf`
      - `overlay`：提供容器以 overlay 掛載文件系統，從而實現容器之間的隔離和效率
      - `br_netfilter`：用於在容器網絡之間進行橋接和網絡封包過濾

    - 設定 Kernel 網路參數

      - 新增在 `/etc/sysctl.d/kubernetes.conf`
      - 設定使 K8s 可以使用 `iptables` 跟 `ip forward`

    - 加入 apt repo

      - 有兩種方式設定 apt key，但 [apt-key is deprecated]，建議都改成用 `gpg` 自己管理

    - 安裝 containerd

    - 安裝 kubeadm、kubelet、kubectl

    - 調整為使用 `Systemd` 管理 Cgroup (而不使用 cgroupfs)

      - 新版預設也已經改為使用 Systemd
      - 優點：一致、穩定、兼容

    - 鎖定版本，避免自動升級

      - 透過 `apt-mark hold` 可以鎖定版本
      - 使用特定版本的金鑰，更新版本也須記得更新金鑰

  - 安裝後啟動前，此時 kubelet 每隔幾秒就會重啟，因為它陷入一個等待 kubeadm 指令的死循環

  - 踩雷

    - `install.sh` 最後步驟安裝 kubelet, kubeadm, kubectl，無法一次成功

      - 因為有修改到 `/etc/apt/sources.list.d/`，使 apt repo 有改變，所以需要再次 `apt update`

      ```sh
      # 錯誤訊息如下
      E: Unable to locate package kubelet
      E: Unable to locate package kubeadm
      E: Unable to locate package kubectl
      E: No packages found
      ```

- 初始化

  - 步驟

    - 快速範例：`sudo kubeadm init --apiserver-advertise-address=192.168.56.10  --pod-network-cidr=10.244.0.0/16`
    -

  - 初始化時，會自動偵測硬體有沒有符合最低標準，太低則會報錯不做初始化
  - 發生初始化錯誤時，可使用 `sudo kubeadm init --v=5` 來看更詳細錯誤
  - 主要動作：使用 `/etc/kubernetes/manifests` 中的 .yml 來建立 control plane (以一個 static Pods 的形式)

  - <mark>雷</mark> 初始化失敗後，需要手動做許多方面的清理，才能再次 init

    - 此次我主要清了 GPT 所提步驟 1 2 3 5

    ![](../src/image/GPT_kubeadm_init_clean.png)

---

## # 基本操作

---

## # 問題集中區

- <details close>
  <summary></summary>

  </details>

---

## # 其他補充

<!-- 注意事項 -->

- 注意事項：

<!-- 小技巧 -->

- 小技巧：

<!-- 小工具 -->

- 小工具：

  <!-- 學習工具 -->

  - <details close>
    <summary>學習工具</summary>

    - [Play with Kubernetes]：UI 操作，快速模擬 Kubernetes

    </details>

  <!-- 開發工具 -->

  - <details close>
    <summary>開發工具</summary>

    - [K8sGPT]

    </details>

<!-- 補充學習 -->

- 補充學習：

  <!-- 文件 -->

  - <details close>
    <summary>文件</summary>

    </details>

  <!-- 範例研究 -->

  - <details close>
    <summary>範例研究</summary>

    </details>

---

## # 踩雷實錄

---

## # 延伸討論

<!-- CGroup Driver -->

- <details close>
  <summary>CGroup Driver</summary>

  - container runtime 和 kubelet 需使用相同的 CGroup Driver
  - 使用不同的會造成哪些問題？

  </details>

---

## # <mark>待整理筆記</mark>

- CNI (Container Network Interface)

4. 安裝
5. 看文件 30
