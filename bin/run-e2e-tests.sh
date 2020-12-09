#!/bin/bash

WP_VERSION=latest

NO_VERSION_ERROR="No version specified...defaulting to latest."

while :; do
    case $1 in
        --version)
            if [ "$2" ]; then
                WP_VERSION=$2
                shift
            else
                echo "$NO_VERSION_ERROR"
            fi
            ;;
        --version=?*)
            WP_VERSION=${1#*=}
            ;;
        --version=)
            echo "$NO_VERSION_ERROR"
            ;;
        *)
            break
    esac
    shift
done

echo
echo "Testing with WordPress version: $WP_VERSION"
echo

echo "Building assets"
yarn --cwd actblue-contributions build

echo "Setting up the WordPress environment"
WP_VERSION=$WP_VERSION docker-compose -f docker-compose.e2e-tests.yml -p actblue-contributions-e2e-tests up -d --build

docker-compose -p actblue-contributions-e2e-tests exec wordpress /var/www/html/wp-content/plugins/actblue-contributions/bin/install-wp-e2e-tests.sh

until $(curl --output /dev/null --silent --head --fail http://localhost:8002); do
    printf '.'
    sleep 3
done

docker-compose -p actblue-contributions-e2e-tests exec wordpress wp core version

echo "Run the end-to-end tests"
npm run test:e2e --prefix=actblue-contributions -- --wordpress-base-url=http://localhost:8002

echo "Stop the environment"
docker-compose -p actblue-contributions-e2e-tests down -v --remove-orphans --rmi=local