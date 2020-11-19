#!/bin/bash

set -e

# Ensure MySQL connection is up before proceeding.
until mysqlshow -uwordpress -pwordpress -hdb wordpress; do
  >&2 echo "Waiting for MySQL ..."
  sleep 1
done

# Configure WordPress
if [ ! -f wp-config.php ]; then
	echo "Configuring WordPress..."
	wp config create --allow-root --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$WORDPRESS_DB_PASSWORD --dbhost=$WORDPRESS_DB_HOST --extra-php <<PHP
/* Set home / site URL based on incoming request for local development to avoid SSL headaches */
\$schema = \$_SERVER['REQUEST_SCHEME'];
\$host = parse_url('$WORDPRESS_URL', PHP_URL_HOST);
\$port = parse_url('$WORDPRESS_URL', PHP_URL_PORT);
\$path = parse_url('$WORDPRESS_URL', PHP_URL_PATH);
\$port = \$port ? ":$port" : '';
\$url = "\$schema://\${host}\${port}\${path}";
define('WP_HOME',    \$url);
define('WP_SITEURL', \$url);

/* Logging */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', '/var/www/html/logs/error.log');
define('WP_DEBUG_DISPLAY', false);
PHP
fi

# Run WP install if it's not already installed.
if ! $(wp core is-installed); then
	wp core install \
		--allow-root \
		--url="$WORDPRESS_URL" \
		--title="$WORDPRESS_TITLE" \
		--admin_user="$WORDPRESS_ADMIN_USER" \
		--admin_email="$WORDPRESS_ADMIN_EMAIL" \
		--admin_password="$WORDPRESS_ADMIN_PASSWORD"

	# Activate the actblue plugin.
	wp plugin activate actblue-contributions
fi

# Install the tests
if [ ! -d /tmp/wordpress-tests-lib ]; then
bash /var/www/html/wp-content/plugins/actblue/bin/install-wp-tests.sh wordpress_tests root root db
fi
