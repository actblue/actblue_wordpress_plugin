#!/bin/bash

echo "Building assets"
yarn --cwd actblue-contributions build

echo "Setting up the WordPress environment"
docker-compose -f docker-compose.e2e-tests.yml -p actblue-contributions-e2e-tests up -d --build

docker-compose -p actblue-contributions-e2e-tests exec wordpress /var/www/html/wp-content/plugins/actblue-contributions/bin/install-wp-e2e-tests.sh

until $(curl --output /dev/null --silent --head --fail http://localhost:8002); do
    printf '.'
    sleep 3
done

echo "Run the end-to-end tests"
npm run test:e2e --prefix=actblue-contributions -- --wordpress-base-url=http://localhost:8002

echo "Stop the environment"
docker-compose -p actblue-contributions-e2e-tests stop