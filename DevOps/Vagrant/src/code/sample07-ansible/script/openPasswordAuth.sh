#!/bin/bash

echo "$(hostname): Current user is $USER to run openPasswordAuth.sh ---------------------------------- "
echo '----------------------------------'
close="PasswordAuthentication no" 
open="PasswordAuthentication yes" 
file="/etc/ssh/sshd_config"

while grep -q "$close" $file; do
    echo "[$close] is found. Updating configuration..."
    sudo sed -i "s/$close/$open/g" $file
    sudo systemctl restart sshd.service
    echo "Configuration updated and SSH service restarted."
done

echo "Now is: $open"
echo '----------------------------------'
