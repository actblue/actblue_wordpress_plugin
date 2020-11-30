# ActBlue Contributions Plugin and Docker Setup

This repository holds the source code for the ActBlue WordPress plugin, as well as a docker container that can be used to spin up a local environment containing WordPress (with the plugin installed and activated). The container comes with SSL support and PHP unit tests with PHPUnit](https://phpunit.de).

## Structure

### `actblue-contributions/`
The WordPress plugin source.

### `assets/`
Assets for the plugin. This includes things like banner images and screenshots that go on the plugin page on WordPress.org.

### `docker/`
Configuration files for the local docker image.

## Prerequisites

To get the docker setup up and running you'll need [Docker Desktop](https://www.docker.com/products/docker-desktop) (note that this has only been tested with the Mac version).

You'll also need to ensure that your ports 80 and 443 are free.

## Installation

Run the following to build and start the containers:

```sh
docker-compose up -d --build
```

Once complete, you should be able to access your WordPress site at http://localhost or https://localhost. The admin can be accessed at http://localhost/wp-admin. The default username / password credentials for logging in are the following:

username: `admin`
password: `password`

These values can be modified in the `docker-compose.yml` file upon building the container (modify the `WORDPRESS_ADMIN_USER` and `WORDPRESS_ADMIN_PASSWORD` environment variables, respectively).

## Development

The docker container will mount the local `actblue/` directory into the `wp-content/plugins/` directory, so local changes will be reflected directly on the container.

### Starting the container

You can spin up your docker local docker environment by running the following command:

```sh
docker-compose up -d
```

Note that the `-d` flag will start the container in [detached mode](https://docs.docker.com/compose/reference/up/) which will run the container in the background.

### Removing the container

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

## Testing

PHP unit testing via [PHPUnit 5](https://phpunit.de/getting-started/phpunit-5.html) is installed when building and starting the local docker container. Tests can be written in the `actblue/tests/` directory. Note that a test file _must_ start with the `test-` prefix to be included in the test runner.

To run the PHP unit tests on the container, run the following command (note that the container needs to be running for this to work):

```sh
docker-compose exec wordpress phpunit
```

## Deployment

The distributed code for this plugin is hosted on the WordPress svn repository and is located at http://plugins.svn.wordpress.org/actblue-contributions/. This GitHub repository comes with two scripts that help facilitate the deployment of the plugin assets and source to that svn repository. The scripts will run as a part of CircleCI's continuous integration, but you can also manually deploy the plugin by running them locally.

The scripts take the latest git tag and then upload that version to the svn respository. To release a new version, tag this GitHub repository with a new version tag with the format of `vX.X.X` (the scripts require the leading `v`) and then push the tag to the GitHub repository.

To manually deploy a new version of the plugin:

- Do a `git fetch` to ensure that you have the latest tags from the remote GitHub repository.
- Make sure that all distributable assets have been built. The `actblue-contributions/` directory should hold all distributable files and any relevant assets should be placed in the `assets/` directory.
- Ensure that you have the credentials for the WordPress.org account that has write access to the WordPress svn repository. These credentials can be passed to the script via command line arguments, or be set with the `WP_ORG_PASSWORD` and `WP_ORG_USERNAME` environment variables.

Then run the following scripts:

```sh
# Deploy any assets for the plugin listing on WordPress.org:
./.circleci deploy-assets.sh

# Deploy the plugin source:
./.circleci deploy-plugin.sh

# Both script also accept command line arguments for the WordPress.org username
# and password if those haven't been set as environment variables.
./.circleci deploy-assets.sh -u actblue -p password
```
