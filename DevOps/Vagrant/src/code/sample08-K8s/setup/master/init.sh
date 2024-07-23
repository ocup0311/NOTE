#!/bin/bash

subnet=192.168.56
node_ip=$(ip -o -4 addr show | awk -v subnet="$subnet" '$4 ~ subnet {print $4}' | cut -d/ -f1)
node_port=6443
cidr_network="10.244.0.0/16"
network_interface=$(ip -o -4 addr show | awk -v ip=$node_ip '$4 ~ ip {print $2}')
config_file="/vagrant/setup/kubeadm-config.yml"
flannel_file="/vagrant/setup/kube-flannel.yml"
env_file="/vagrant/share/.env"

echo '[TASK1] 預先下載 images'
sudo kubeadm config images pull


echo '[TASK2] kubeadm init'
sudo kubeadm init --config $config_file


echo '[TASK3] 設定 .kube'
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
echo '---------- Node 狀態 ----------'
kubectl get nodes -A -o wide
echo '---------- Pod 狀態 ----------'
kubectl get pods -A -o wide


echo '[TASK4] 設定自動補全'
source <(kubectl completion bash)
echo "source <(kubectl completion bash)" >> ~/.bashrc


echo '[TASK5] 設定 Network Policy (Flannel) '
sudo sed -i "/--iface/s/--iface[^ ]*/--iface=$network_interface/" $flannel_file
sudo sed -i "/net-conf.json:/,/}/{s|\"Network\": \"[^\"]*\"|\"Network\": \"$cidr_network\"|}" $flannel_file
kubectl apply -f $flannel_file
echo '---------- Node 狀態 ----------'
kubectl get nodes -A -o wide
echo '---------- Pod 狀態 ----------'
kubectl get pods -A -o wide


echo '[TASK6] 輸出 token 供 worker 加入'
token=$(kubeadm token create --ttl 30m)
pubkey_hash=$(openssl x509 -in /etc/kubernetes/pki/ca.crt -pubkey -noout | \
             openssl pkey -pubin -outform DER | \
             openssl dgst -sha256 | \
             awk '{print $2}')
echo "TOKEN=$token" > $env_file
echo "PUBKEY_HASH=$pubkey_hash" >> $env_file
echo "APISERVER_IP=$node_ip" >> $env_file
echo "APISERVER_PORT=$node_port" >> $env_file


echo '[TASK7] 初始化完成 移除設定腳本'
sudo rm -rf /vagrant/setup/
