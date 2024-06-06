
# Another workaround: need another vagrantfile
vagrant up --provision-with openPasswordAuth,setupController --vagrantfile=Vagrantfile.start && \
vagrant provision --provision-with closePasswordAuth --vagrantfile=Vagrantfile.start