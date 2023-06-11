#!/bin/bash

echo "[TASK 1] Disable and turn off SWAP"
sed -i '/swap/d' /etc/fstab
swapoff -a

# echo "[TASK 2] Stop and Disable firewall"
# systemctl disable --now ufw >/dev/null 2>&1
echo "[TASK 2] Set firewall"
sudo iptables -A INPUT -p tcp -m multiport --dports 6443,2379,2380,10250,10259,10257 -j ACCEPT
sudo iptables -A INPUT -p tcp --match multiport --dports 30000:32767 -j ACCEPT


echo "[TASK 3] Enable and Load Kernel modules"
cat >>/etc/modules-load.d/containerd.conf<<EOF
overlay
br_netfilter
EOF
modprobe overlay
modprobe br_netfilter

echo "[TASK 4] Add Kernel settings"
cat >>/etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
EOF
sysctl --system >/dev/null 2>&1

echo "[TASK 5] Add apt repo for containerd runtime"
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "[TASK 6] Install containerd runtime"
sudo apt -qq update >/dev/null 2>&1
sudo apt install -qq -y containerd.io >/dev/null 2>&1
containerd config default >/etc/containerd/config.toml
systemctl restart containerd
systemctl enable containerd >/dev/null 2>&1

echo "[TASK 7] Add apt repo for kubernetes"
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
# 另一個方式： apt-key deprecated
# curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - 
# apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main" >/dev/null 2>&1

echo "[TASK 8] Install Kubernetes components (kubeadm, kubelet and kubectl)"
sudo apt -qq update >/dev/null 2>&1
sudo apt install -qq -y kubeadm=1.27.0-00 kubelet=1.27.0-00 kubectl=1.27.0-00 >/dev/null 2>&1
sudo apt-mark hold kubelet kubeadm kubectl