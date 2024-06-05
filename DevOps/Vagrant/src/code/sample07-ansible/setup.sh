APT_KEY_PATH= "/etc/apt/keyrings"
DOCKER_KEY_NAME= "docker-archive-keyring.gpg"
UBUNTU_DOCKER= "https://download.docker.com/linux/ubuntu"

echo "Current user is $USER ---------------------------------- "

# install something
echo "install something ---------------------------------- "
sudo apt-get -y update
sudo apt-get -y install apt-transport-https ca-certificates curl software-properties-common

# Add apt repo for docker
echo "Add apt repo for docker ---------------------------------- "
sudo mkdir $APT_KEY_PATH
curl -fsSL $UBUNTU_DOCKER/gpg | sudo gpg --dearmor -o $APT_KEY_PATH/$DOCKER_KEY_NAME
echo   "deb [arch=$(dpkg --print-architecture) signed-by=$APT_KEY_PATH/$DOCKER_KEY_NAME] $UBUNTU_DOCKER \
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
echo "check docker ---------------------------------- "
docker version
echo "check compose ---------------------------------- "
docker compose version
echo "check ansible ---------------------------------- "
ansible --version

# generate ssh key & connect to other nodes

hosts=("192.168.50.10 ansible-controller" "192.168.50.11 ansible-node1" "192.168.50.12 ansible-node2")
for host in "${hosts[@]}"; do
    sudo sh -c "echo $host >> /etc/hosts"
done

ssh-keygen -t ed25519 -f ~/.ssh/ansible_ssh_key3 -N ""

nodes=("ansible-node1" "ansible-node2")
for node in "${nodes[@]}"; do
    ssh-copy-id -i ~/.ssh/ansible_ssh_key.pub $node 
done