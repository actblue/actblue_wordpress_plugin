# ActBlue Contributions Plugin and Docker Setup

This repository holds the source code for the ActBlue WordPress plugin, as well as a docker container that can be used to spin up a local environment containing WordPress (with the plugin installed and activated). The container comes with SSL support and PHP unit tests with PHPUnit](https://phpunit.de).

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) to get the local environment set up and running via a docker container (note that this has only been tested with the Mac version).
- [yarn](https://classic.yarnpkg.com/en/) to manage JavaScript dependencies, including those required to build editor blocks.

You'll also need to ensure that your ports 80 and 443 are free.


## Installation

First, install the JavaScript dependencies:

```sh
# Install dependencies with yarn:
yarn --cwd actblue-contributions install
```

Once dependencies are installed run the following to build and start the containers:

```sh
docker-compose up -d --build
```

Once complete, you should be able to access your WordPress site at http://localhost or https://localhost. The admin can be accessed at http://localhost/wp-admin. The default username / password credentials for logging in are the following:

username: `admin`
password: `password`

These values can be modified in the `docker-compose.yml` file upon building the container (modify the `WORDPRESS_ADMIN_USER` and `WORDPRESS_ADMIN_PASSWORD` environment variables, respectively).

## Development

The docker container will mount the local `actblue/` directory into the `wp-content/plugins/` directory, so local changes will be reflected directly on the container.

## Testing

PHP unit testing via [PHPUnit 5](https://phpunit.de/getting-started/phpunit-5.html) is installed when building and starting the local docker container. Tests can be written in the `actblue/tests/` directory. Note that a test file _must_ start with the `test-` prefix to be included in the test runner.

To run the PHP unit tests on the container, run the following command (note that the container needs to be running for this to work):

```sh
docker-compose exec wordpress phpunit
```

## Removing the containers

To reset your environment, or to remove the container and all the dependent assets from your machine, run the following. Note that this will entirely reset the state of your container, including your database:

```sh
docker-compose down -v --remove-orphans --rmi local
```

You can also stop the container to free up resources on your machine while still retaining state by running the following:

```sh
docker-composer stop
```

You can run the following command to list the running containers and confirm that the container has been stopped (it won't be listed):

```sh
docker-compose ps
```
