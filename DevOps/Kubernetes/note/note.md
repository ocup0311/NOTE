##### <!-- 收起 -->

<!----------- ref start ----------->

[CKA 考試完全指南（2022 版）]: https://www.udemy.com/course/k8s-chinese/
[Play with Kubernetes]: https://labs.play-with-k8s.com/
[kubeadm 官方]: https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/
[Kubernetes Best practices (官方)]: https://kubernetes.io/docs/setup/best-practices/
[apt-key is deprecated]: https://itsfoss.com/apt-key-deprecated/

<!------------ ref end ------------>

# Kubernetes

> DATE: 6 (2023)
> REF: [CKA 考試完全指南（2022 版）] | [Kubernetes Best practices (官方)]

### # 測試環境

- <details close>
  <summary></summary>

  </details>

---

### # 簡介

- Container Orchestration：管理編排多個 container 的工具
- Google 在 2015 開源釋出
- 基本架構

  - Kubernets Master (control plane)

    - API Server (kubectl)
    - etcd (/etc distributed)：分散式鍵值存儲系統
    - Controller Manager
    - Scheduler

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

### # 安裝與設定

- kubeadm

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

    - 安裝 `CRI- container runtime`、`kubeadm`、`kubelet`、`kubectl`

      - 注意版本相容

  - `install.sh` 步驟

    - 關閉 SWAP

      ![](../src/image/GPT_K8s_SWAP_off.png)

    - 設定 Ports

      - 所有默認端口都可以重新配置

        ![](../src/image/K8s_Ports_Protocols_control.png)
        ![](../src/image/K8s_Ports_Protocols_worker.png)

      - `iptables` 設定防火牆，以較早設定的為主

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
      - 設定可以使用 iptables 跟 ip forward

    - 安裝 apt repo

      - 有兩種方式設定 apt key，但 [apt-key is deprecated]，建議都改成自己管理

    - 安裝 containerd

    - 安裝 kubeadm、kubelet、kubectl

---

### # 基本操作

---

### # 問題集中區

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

- <details close>
  <summary></summary>

  </details>

---
