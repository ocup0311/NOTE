hostname
echo "Current user is $USER to run closePasswordAuth.sh ---------------------------------- "

# 關閉使用密碼登入方法
sudo sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/g' /etc/ssh/sshd_config
sudo systemctl restart sshd.service