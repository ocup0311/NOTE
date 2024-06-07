# 〖Ansible 學習環境〗快速搭建

- 使用方法：

  - 二選一以下方法，來搭建 Ansible 學習環境

    - `cd ./run/setup1/` && `vagrant up`
    - `cd ./run/setup2/` 並執行 [run.sh](./run/setup2/run.sh)

- 使用條件：

  - 需安裝 Vagrant、VirtualBox

- 內容涵蓋：

  - 使用 vagrant 自動創建三台 VM，一台作 Ansible Controller，兩台 Ansible Node
  - 啟動後即可使 Ansible Controller 能連接 Ansible Node

    - 以別名 ansible-node1、ansible-node2 進行
    - 以 ssh key 進行
    - 以 Ansible 指令進行
