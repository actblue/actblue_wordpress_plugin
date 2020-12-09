# ActBlue Contributions Plugin and Docker Setup

This repository holds the source code for the ActBlue WordPress plugin, as well as a docker container that can be used to spin up a local environment containing WordPress (with the plugin installed and activated). The container comes with SSL support and PHP unit tests with PHPUnit](https://phpunit.de).

## Structure

### `actblue-contributions/`
The WordPress plugin source.

### `assets/`
Assets for the plugin. This includes things like banner images and screenshots that go on the plugin page on WordPress.org.

### `docker/`
Configuration files for the local docker image.

### `.circleci/`
Configuration for continuous integration via CircleCI. This directory also holds two bash scripts that help facilitate the deployment of the plugin to the WordPress svn repository.


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
docker-compose stop
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

### Releasing a new version

To release a new version of the plugin via automatic deployment:

0. First, make sure that the username and password for the WordPress.org account that has write access to the WordPress svn repository have been added as `WP_ORG_USERNAME` and `WP_ORG_PASSWORD` environment variables in the CircleCI project (see the [CircleCI docs](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) for instructions on how to add environment variables).

1. Create a release branch off of the `develop` branch with the corresponding version number:

   ```sh
   git checkout -b release-#.#.#
   ```

2. Bump the version numbers in the plugin directory:
    - `package.json`
    - `composer.json`
    - Inside the `actblue-contributions.php` file:
        - `Version` in the docblock at the top of the file.
        - `ACTBLUE_PLUGIN_VERSION` constant.

3. Commit these changes and push to GitHub:

    ```sh
    git add .
    git commit -m "Version bump to #.#.#"
    git push origin release-#.#.#
    ```

4. PR the release branch into the `main` branch via the GitHub GUI. Feel free to add release notes to this PR. Once the checks have passed, merge the PR into `main`.

5. [Create a new release](https://github.com/actblue/wordpress_plugin/releases/new) in GitHub. Making sure to target the `main` branch, add a tag label that matches the version you're bumping to. Note that this tag label _must_ have a leading `v` (for example, `v1.0.0`) so that the CircleCI and the deployment scripts can identify it. Then add a release title and any release notes and hit `Publish Release`. This will trigger CircleCI to deploy this tagged version of the plugin to the WordPress svn repository with the matching version number.

<img width="990" alt="Screen Shot 2020-12-03 at 10 02 03 AM" src="https://user-images.githubusercontent.com/3286676/101071232-28ea5100-3551-11eb-8375-048206c32432.png">

### Manual deployment

To manually deploy a new version of the plugin from your local machine:

1. Do a `git fetch` to ensure that you have the latest tags from the remote GitHub repository. The scripts will deploy the latest tagged version of the plugin, using the tag label to determine the version number to deploy to the WordPress svn repository.

2. Make sure that all distributable assets have been built. The `actblue-contributions/` directory should hold all distributable files and any relevant assets should be placed in the `assets/` directory.

    ```sh
    yarn --cwd actblue-contributions build
    ```

3. Ensure that you have the username and password for the WordPress.org account that has write access to the WordPress svn repository. These credentials can be passed to the script via command line arguments, or be set with the `WP_ORG_USERNAME` and `WP_ORG_PASSWORD` environment variables.

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
