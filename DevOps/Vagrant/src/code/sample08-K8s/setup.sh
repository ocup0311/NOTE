#!/bin/bash

VERSION="v1.30"
FULL_VERSION="1.30.3-1.1"

echo "[TASK 1] Install required tools"
sudo apt -qq update >/dev/null 2>&1
apt-get install -qq -y apt-transport-https ca-certificates curl gpg >/dev/null 2>&1


echo "[TASK 2] Disable and turn off SWAP"
sed -i '/swap/d' /etc/fstab
swapoff -a


echo "[TASK 3] Set firewall"
sudo iptables -A INPUT -p tcp -m multiport --dports 6443,2379,2380,10250,10259,10257 -j ACCEPT
sudo iptables -A INPUT -p tcp --match multiport --dports 30000:32767 -j ACCEPT
# 簡單入門則直接關閉所有防火牆
# echo "[TASK 3] Stop and Disable firewall"
# systemctl disable --now ufw >/dev/null 2>&1


echo "[TASK 4] Enable and Load Kernel modules"
cat >>/etc/modules-load.d/containerd.conf<<EOF
overlay
br_netfilter
EOF
modprobe overlay
modprobe br_netfilter


echo "[TASK 5] Add Kernel settings"
cat >>/etc/sysctl.d/kubernetes.conf<<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
EOF
sysctl --system >/dev/null 2>&1


echo "[TASK 6] Add apt repo for containerd runtime"
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


echo "[TASK 7] Install containerd runtime"
sudo apt -qq update >/dev/null 2>&1
sudo apt install -qq -y containerd.io >/dev/null 2>&1
containerd config default >/etc/containerd/config.toml
# 調整為使用 Systemd 管理 Cgroup
sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
systemctl restart containerd
systemctl enable containerd >/dev/null 2>&1


echo "[TASK 8] Add apt repo for kubernetes"
curl -fsSL https://pkgs.k8s.io/core:/stable:/$VERSION/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/$VERSION/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list > /dev/null


echo "[TASK 9] Install Kubernetes components (kubeadm, kubelet, kubectl)"
sudo apt -qq update >/dev/null 2>&1
sudo apt install -qq -y kubeadm=$FULL_VERSION kubelet=$FULL_VERSION kubectl=$FULL_VERSION >/dev/null 2>&1


echo "[TASK 10] Hold the version of Kubernetes components (kubelet, kubeadm, kubectl)"
sudo apt-mark hold kubelet kubeadm kubectl