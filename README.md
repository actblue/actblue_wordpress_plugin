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

### `bin/`

Includes scripts that perform utility actions like manually archiving the plugin, running end-to-end tests locally, and bumping the plugin version.

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

This repository includes PHP unit tests and end-to-end tests to confirm plugin functionality. Both testing suites are run as a part of CircleCI'c continuous integration step, and are available via local scripts as well.

### PHP Unit testing
PHP unit testing via [PHPUnit 5](https://phpunit.de/getting-started/phpunit-5.html) is installed when building and starting the local docker container. Tests can be written in the `actblue/tests/` directory. Note that a test file _must_ start with the `test-` prefix to be included in the test runner.

To start the container and run the PHP unit tests on the container, run the following command (note that port 80 on your computer will need to be free):

```sh
./bin/run-unit-tests.sh
```

#### Writing tests

The PHP unit tests can be found in the `actblue-contributions/tests/` directory. Any file in that directory that has a filename with `test-` prepended to it will be run as a part of the testing script.

### End-to-end testing

End-to-end testing is handled via the [WordPress e2e suite](https://make.wordpress.org/core/2019/06/27/introducing-the-wordpress-e2e-tests/), which uses [Jest](https://jestjs.io/) as a testing/asserting framework and [Puppeteer](https://pptr.dev/) to communicate with the browser.

To run the tests locally, you'll need [Docker](https://www.docker.com/) installed on your machine to run the environment to test against. The entire local testing process can be run with the following script:

```sh
./bin/run-e2e-tests.sh
```

This script will build the plugin assets with yarn, then spin up a docker container containing WordPress. Once that is set up, the script will run the end-to-end tests on the container, then stop and tear down the environment.

#### Testing different WordPress versions

The end-to-end script can take a `--version` flag that will allow you to set the WordPress version to test against:

```sh
./bin/run-e2e-tests.sh --version 5.4
```

The `version` flag can accept a version number, 'latest', or 'nightly'.

#### Writing tests

Tests are located in the `actblue-contributions/e2e-tests/` directory. Any JavaScript file that has the `.spec.js` suffix will be used to look for tests to run. In addition to using [Jest](https://jestjs.io/) as the testing framework and [Puppeteer](https://pptr.dev/) to communicate with the browser, the [WordPress `e2e-test-utils` package](https://developer.wordpress.org/block-editor/packages/packages-e2e-test-utils/) is also used to handle WordPress-specific actions.

## Deployment

The distributed code for this plugin is hosted on the WordPress svn repository and is located at http://plugins.svn.wordpress.org/actblue-contributions/. This GitHub repository comes with a script that helps facilitate the deployment of the plugin assets and source to that svn repository. The script will run as a part of CircleCI's continuous integration, but you can also manually deploy the plugin by running it locally.

### Releasing a new version

To release a new version of the plugin via automatic deployment:

0. First, make sure that the username and password for the WordPress.org account that has write access to the WordPress svn repository have been added as `WP_ORG_USERNAME` and `WP_ORG_PASSWORD` environment variables in the CircleCI project (see the [CircleCI docs](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project) for instructions on how to add environment variables).

1. Create a release branch off of the `develop` branch with the corresponding version number:

   ```sh
   git checkout -b release-0.0.0
   ```

2. Bump the plugin version:

   ```sh
   ./bin/bump-version.sh
   ```

3. Commit these changes and push to GitHub:

   ```sh
   git add .
   git commit -m "Version bump to 0.0.0"
   git push origin release-0.0.0
   ```

4. PR the release branch into the `main` branch via the GitHub GUI. Once the checks have passed, merge the PR into `main`.

5. Locally, pull down the latest from `main`, and create a new annotated tag for the new version release. Note that this tag label _must_ have a leading `v` (for example, `v1.0.0`) so that the CircleCI and the deployment scripts can identify it.

    ```sh
    git checkout main
    git pull origin main
    git tag -a v0.0.0 -m "Release 0.0.0"
    ```

6. Push the tag to the GitHub repository. ***Note that this action will trigger a deployment to the WordPress svn repository.***

    ```sh
    git push origin --tags
    ```

7. Finally, merge the `main` branch brack into the `develop` branch to align both branches.

    ```sh
    git checkout develop
    git pull origin develop
    git merge main
    git push origin develop
    ```

### Manual deployment

To manually deploy a new version of the plugin from your local machine:

1. Do a `git fetch` to ensure that you have the latest tags from the remote GitHub repository. The scripts will deploy the latest tagged version of the plugin, using the tag label to determine the version number to deploy to the WordPress svn repository.

2. Make sure that all distributable assets have been built. The `actblue-contributions/` directory should hold all distributable files and any relevant assets should be placed in the `assets/` directory.

   ```sh
   yarn --cwd actblue-contributions build
   ```

3. Ensure that you have the username and password for the WordPress.org account that has write access to the WordPress svn repository. These credentials can be passed to the script via command line arguments, or be set with the `WP_ORG_USERNAME` and `WP_ORG_PASSWORD` environment variables.

Then run the following script:

```sh
# Deploy the plugin assets and source files to the WordPress.org repository:
./.circleci deploy-plugin.sh

# Both script also accept command line arguments for the WordPress.org username
# and password if those haven't been set as environment variables.
./.circleci deploy-plugin.sh -u actblue -p password
```

There is also a utility script that can be used to _only_ deploy the assets for the WordPress.org plugin listing. This script has the same requirements and can take the same parameters as the `deploy-plugin.sh` script.

```sh
./.circleci deploy-assets.sh
```