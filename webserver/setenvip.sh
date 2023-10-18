#!/bin/bash

# Get the local IP address
IP_ADDRESS=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')

update_env() {
  local env_file=$1
  # Check if the file exists, if not, create it
  [ ! -f $env_file ] && touch $env_file

  # Check if IP_ADDRESS exists in the .env file
  if grep -q "IP_ADDRESS=" $env_file; then
    # Update the .env file
    sed -i '' "s/IP_ADDRESS=.*/IP_ADDRESS='${IP_ADDRESS}'/" $env_file
  else
    # Add IP_ADDRESS to the .env file
    echo "IP_ADDRESS='${IP_ADDRESS}'" >> $env_file
  fi
}

# Update both .env files
update_env ".env"
update_env "../.env"

echo "IP_ADDRESS updated to ${IP_ADDRESS}"
