#!/bin/bash

docker-compose -f docker-compose.yml up -d --build

docker-compose exec wordpress composer install

until $(curl --output /dev/null --silent --head --fail http://localhost); do
    printf '.'
    sleep 5
done

echo

docker-compose exec wordpress vendor/bin/phpunit
docker-compose stop