# 〖K8s (kubeadm) 學習環境〗快速搭建

- 使用方法：

  - 執行 `vagrant up`，來搭建 K8s 學習環境 (透過安裝 kubeadm)

- 使用條件：

  - 需安裝 Vagrant、VirtualBox

- 內容涵蓋：

  - 使用 vagrant 自動創建三台 VM，一台作 K8s Master，兩台 K8s Worker Node
  - 啟動後即自動配對設置完成，使 Worker Node 加入 Master 建立的集群
