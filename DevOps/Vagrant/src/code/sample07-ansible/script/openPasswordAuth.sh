hostname
echo "Current user is $USER to run openPasswordAuth.sh ---------------------------------- "

# 先開啟可使用密碼登入
sudo sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
sudo systemctl restart sshd.service
