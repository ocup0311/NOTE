#!/bin/bash

bridge=$1
namespace=$2
addr=$3

vethBR=veth-$namespace
vethNS=eth00-$namespace

# 新增 namespace 並將 veth 與 bridge 連接
sudo ip netns add $namespace
sudo ip link add $vethBR type veth peer name $vethNS

# 設定並啟動 namespace 的 veth 
sudo ip link set $vethNS netns $namespace
sudo ip netns exec $namespace ip addr add $addr dev $vethNS
sudo ip netns exec $namespace ip link set $vethNS up

# 加入並啟動 bridge 的 veth
sudo ip link set $vethBR up
sudo brctl addif $bridge $vethBR
