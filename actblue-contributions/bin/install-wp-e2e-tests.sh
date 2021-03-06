#!/bin/bash

set -e

# Ensure MySQL connection is up before proceeding.
until mysqlshow -uwordpress -pwordpress -hdb wordpress; do
  >&2 echo "Waiting for MySQL ..."
  sleep 1
done

# Drop the database if it exists.
mysql -u $WORDPRESS_DB_USER -p$WORDPRESS_DB_PASSWORD -h $WORDPRESS_DB_HOST -e "drop database $WORDPRESS_DB_NAME"
mysql -u $WORDPRESS_DB_USER -p$WORDPRESS_DB_PASSWORD -h $WORDPRESS_DB_HOST -e "create database $WORDPRESS_DB_NAME"

if [ -f wp-config.php ]; then
	rm wp-config.php
fi

# Configure WordPress
echo "Configuring WordPress..."
wp config create \
	--allow-root \
	--dbname=$WORDPRESS_DB_NAME \
	--dbuser=$WORDPRESS_DB_USER \
	--dbpass=$WORDPRESS_DB_PASSWORD \
	--dbhost=$WORDPRESS_DB_HOST

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
