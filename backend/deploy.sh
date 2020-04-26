#!/bin/sh

echo Hello World
java -Djava.library.path=./dynamodb_local_latest/DynamoDBLocal_lib -jar ./dynamodb_local_latest/DynamoDBLocal.jar -sharedDb -port 9999 &
python3 run.py