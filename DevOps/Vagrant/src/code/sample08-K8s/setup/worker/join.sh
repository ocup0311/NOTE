#!/bin/bash

subnet=192.168.56
NODE_IP=$(ip -o -4 addr show | awk -v subnet="$subnet" '$4 ~ subnet {print $4}' | cut -d/ -f1)
env_file="/vagrant/share/.env"
config_tmp_file="/vagrant/setup/kubeadm-config-template.yml"
config_file="/vagrant/setup/kubeadm-config.yml"


echo '[TASK1] 預先下載 images'
sudo kubeadm config images pull


echo '[TASK2] 生成 kubeadm config'
export NODE_IP
set -a
if [ -f "$env_file" ]; then
  source "$env_file"
else
  echo "Warning: $env_file does not exist."
fi
set +a
envsubst < $config_tmp_file > $config_file


echo '[TASK3] kubeadm join'
sudo kubeadm join --config $config_file


echo '[TASK4] 初始化完成 移除設定腳本'
sudo rm -rf /vagrant/setup/
