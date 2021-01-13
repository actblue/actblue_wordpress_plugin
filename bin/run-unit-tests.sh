#!/bin/bash

docker-compose -f docker-compose.yml up -d --build

until $(curl --output /dev/null --silent --head --fail http://localhost); do
    printf '.'
    sleep 5
done

echo

docker-compose exec wordpress phpunit
docker-compose stop