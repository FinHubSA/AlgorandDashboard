# Check if postgresql is running
sudo netstat -plunt |grep postgres

# Start postgresql server
sudo service postgresql start
sudo /etc/init.d/postgresql restart