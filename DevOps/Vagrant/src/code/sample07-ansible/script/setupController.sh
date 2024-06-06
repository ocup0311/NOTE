hostname
echo "Current user is $USER to run setupController.sh ---------------------------------- "

# install something
echo "install something ---------------------------------- "
sudo apt-get -y update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common sshpass

# Add apt repo for docker
echo "Add apt repo for docker ---------------------------------- "
sudo mkdir /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# install docker
echo "install docker ---------------------------------- "
sudo apt-get -y update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io

# enable docker
echo "start docker ---------------------------------- "
sudo systemctl start docker
echo "enable docker ---------------------------------- "
sudo systemctl enable docker

# set docker group
echo "set docker group ---------------------------------- "
if [ ! $(getent group docker) ]; then
    sudo groupadd docker
fi

sudo gpasswd -a $USER docker
sudo service docker restart

# install ansible
echo "install ansible ---------------------------------- "
sudo apt-get -y update
sudo apt-add-repository -y -u ppa:ansible/ansible
sudo apt-get -y install ansible

# check
source ~/.bashrc
echo "check docker ---------------------------------- "
docker version
echo "check compose ---------------------------------- "
docker compose version
echo "check ansible ---------------------------------- "
ansible --version

# generate ssh key & connect to other nodes
echo "setup ssh key ---------------------------------- "

hosts=("192.168.50.10 ansible-controller" "192.168.50.11 ansible-node1" "192.168.50.12 ansible-node2")
for host in "${hosts[@]}"; do
    sudo sh -c "echo $host >> /etc/hosts"
done

ssh-keygen -t ed25519 -f ~/.ssh/ansible_ssh_key -N ""

nodes=("ansible-node1" "ansible-node2")
for node in "${nodes[@]}"; do
    sshpass -p "vagrant" ssh-copy-id -i ~/.ssh/ansible_ssh_key.pub -o StrictHostKeyChecking=no $node 
done