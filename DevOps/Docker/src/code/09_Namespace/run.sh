#!/bin/bash

bridge=mydocker0
script=add_ns_to_br.sh
namespace1=ns1
namespace2=ns2
addr1=172.16.1.1
addr2=172.16.1.2

# 安裝工具
sudo apt-get install -u -y bridge-utils

# 建立 bridge
sudo brctl addbr $bridge
brctl show

# 執行腳本將 namespace 與 bridge 連接
sh $script $bridge $namespace1 $addr1/16
sh $script $bridge $namespace2 $addr2/16

# 啟動 bridge
sudo ip link set dev $bridge up

# 設定 bridge 的 icmp 轉發規則
sudo iptables -A FORWARD -i $bridge -p icmp --icmp-type echo-request -j ACCEPT
sudo iptables -A FORWARD -o $bridge -p icmp --icmp-type echo-reply -j ACCEPT

# 測試結果
echo "[Test] use $namespace1 to ping $namespace2..."
sudo ip netns exec $namespace1 ping $addr2