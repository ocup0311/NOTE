echo "$(hostname): Current user is $USER to run setupController_closePasswordAuth.sh ---------------------------------- "

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
node="ansible-node"
ip="192.168.50.1"
sudo sh -c "echo $ip\0 ansible-controller >> /etc/hosts"
ssh-keygen -t ed25519 -f ~/.ssh/ansible_ssh_key
touch ~/.ssh/config

for i in {1..2}; do
    sudo sh -c "echo $ip$i $node$i >> /etc/hosts"
    sshpass -p "vagrant" ssh-copy-id -i ~/.ssh/ansible_ssh_key.pub -o StrictHostKeyChecking=no $node$i

    sudo sh -c "echo \
    'Host $node$i \n \
        HostName $ip$i \n \
        User vagrant \n \
        IdentityFile ~/.ssh/ansible_ssh_key \n' \
    >> ~/.ssh/config"

    # 關閉使用密碼登入
    ssh -i ~/.ssh/ansible_ssh_key -o StrictHostKeyChecking=no -t $node$i \
    " \
    echo 'Current terminal is in =>' && hostname && \
    echo '----------------------------------' && \
    echo 'set PasswordAuthentication -> no' && \
    while grep -q 'PasswordAuthentication yes' /etc/ssh/sshd_config; do
        echo '[PasswordAuthentication yes] is found. Updating configuration...'
        sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
        echo 'restart the sshd.service'
        sudo systemctl restart sshd.service
        echo 'Configuration updated and SSH service restarted.'
    done && \
    echo 'Now is: PasswordAuthentication no' && \
    echo '----------------------------------' && \
    exit \
    "
done