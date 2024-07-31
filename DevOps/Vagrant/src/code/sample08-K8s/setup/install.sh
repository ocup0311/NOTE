#!/bin/bash

VERSION="v1.30"
FULL_VERSION="1.30.3-1.1"

echo "[TASK 1] Install required tools"
sudo apt-get -qq -y update >/dev/null 2>&1
sudo apt-get install -qq -y apt-transport-https ca-certificates curl gpg >/dev/null 2>&1


echo "[TASK 2] Disable and turn off SWAP"
sudo sed -i '/swap/d' /etc/fstab
sudo swapoff -a


echo "[TASK 3] Set firewall"
sudo iptables -A INPUT -p tcp -m multiport --dports 6443,2379,2380,10250,10259,10257 -j ACCEPT
sudo iptables -A INPUT -p tcp --match multiport --dports 30000:32767 -j ACCEPT


echo "[TASK 4] Enable and Load Kernel modules"
sudo tee -a /etc/modules-load.d/containerd.conf >/dev/null 2>&1 <<EOF
overlay
br_netfilter
EOF
sudo modprobe overlay
sudo modprobe br_netfilter


echo "[TASK 5] Add Kernel settings"
sudo tee -a /etc/sysctl.d/kubernetes.conf >/dev/null 2>&1 <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
EOF
sudo sysctl --system >/dev/null 2>&1


echo "[TASK 6] Add apt repo for containerd runtime"
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null 2>&1


echo "[TASK 7] Install containerd runtime"
sudo apt-get -qq -y update >/dev/null 2>&1
sudo apt-get install -qq -y containerd.io >/dev/null 2>&1
sudo containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
# 調整為使用 Systemd 管理 Cgroup
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
# 調整 sandbox 版本，v1.30 會下載 3.9
sudo sed -i 's|sandbox_image = ".*"|sandbox_image = "registry.k8s.io/pause:3.9"|' /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd >/dev/null 2>&1


echo "[TASK 8] Add apt repo for kubernetes"
curl -fsSL https://pkgs.k8s.io/core:/stable:/$VERSION/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/$VERSION/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list >/dev/null 2>&1


echo "[TASK 9] Install Kubernetes components (kubeadm, kubelet, kubectl)"
sudo apt-get -qq -y update >/dev/null 2>&1
sudo apt-get install -qq -y kubeadm=$FULL_VERSION kubelet=$FULL_VERSION kubectl=$FULL_VERSION >/dev/null 2>&1


echo "[TASK 10] Hold the version of Kubernetes components (kubelet, kubeadm, kubectl)"
sudo apt-mark hold kubelet kubeadm kubectl


echo "[TASK 11] Install network tools"
sudo apt-get -qq -y update >/dev/null 2>&1
sudo apt-get install -qq -y bridge-utils net-tools >/dev/null 2>&1


echo "[TASK 12] Install other tools"
sudo apt-get -qq -y update >/dev/null 2>&1
sudo apt-get install -qq -y jq >/dev/null 2>&1