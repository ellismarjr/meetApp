#!/bin/bash

if [ "$#" -lt 1 ]
then
	echo "Usage mode: $0 start|stop"
	echo "Example $0 start"
	echo "Example $0 stop"
else
  echo "Starting databases..."
  docker $1 database
  docker $1 mongomeetapp
  docker $1 redismeetapp
fi