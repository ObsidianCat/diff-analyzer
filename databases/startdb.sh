#!/bin/bash
# Start MongoDB and Redis databases.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

# Initializes a MongoDB database on project_root/data/mongo/
(
  mkdir -p "${DIR}/../data/mongo"
  mongod --dbpath "${DIR}/../data/mongo" &
)


# On exit script kill databases
trap 'killall mongod; exit' SIGINT EXIT
while true; do read; done