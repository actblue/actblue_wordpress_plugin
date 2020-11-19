# ActBlue Contributions Plugin and Docker Setup

## Installation

Run the following to build and start the containers:

```
docker-compose up -d --build
```

Note that you'll need to make sure your ports 80 and 443 are free.

Once complete, you should be able to access your WordPress site at http://localhost or https://localhost.

The docker container will mount the local `actblue/` directory into the `wp-content/plugins/` directory, so local changes will be reflected directly on the container.
