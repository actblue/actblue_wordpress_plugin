#!/bin/bash

docker-compose -f docker-compose.e2e-tests.yml -p actblue-contributions-e2e-tests up -d --build

docker-compose -p actblue-contributions-e2e-tests exec wordpress /var/www/html/wp-content/plugins/actblue-contributions/bin/install-wp-e2e-tests.sh

until $(curl --output /dev/null --silent --head --fail http://localhost:8002); do
    printf '.'
    sleep 5
done

npm run test:e2e --prefix=actblue-contributions -- --wordpress-base-url=http://localhost:8002

docker-compose -p actblue-contributions-e2e-tests stop