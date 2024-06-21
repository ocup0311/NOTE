#!/bin/bash

echo "$(hostname): Current user is $USER to run openPasswordAuth.sh ---------------------------------- "
echo '----------------------------------'
close="PasswordAuthentication no" 
open="PasswordAuthentication yes" 
file="/etc/ssh/sshd_config"

while sudo grep -q "$open" $file; do
    echo "[$open] is found. Updating configuration..."
    sudo sed -i "s/$open/$close/g" $file
    sudo systemctl restart sshd.service
    echo "Configuration updated and SSH service restarted."
done

echo "Now is: $close"
echo '----------------------------------'
