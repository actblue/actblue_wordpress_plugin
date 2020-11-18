FROM richarvey/nginx-php-fpm:1.9.0

RUN apk update && apk add mysql-client openssl subversion

# Create the SSL certificates.
RUN openssl req -x509 -nodes -days 365 -subj "/C=US/ST=New York/O=ActBlue/CN=localhost" -addext "subjectAltName=DNS:localhost" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

# Install and configure WP CLI.
RUN wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar; \
  chmod +x wp-cli.phar; \
  mv wp-cli.phar /usr/local/bin/; \
  # Workaround for root usage scolding.
  echo -e "#!/bin/bash\n\n/usr/local/bin/wp-cli.phar \"\$@\" --allow-root\n" > /usr/local/bin/wp; \
  chmod +x /usr/local/bin/wp;

# Install phpunit for unit tests.
RUN wget -O phpunit https://phar.phpunit.de/phpunit-7.phar; \
  chmod +x phpunit; \
  mv phpunit /usr/local/bin/;

# Download WordPress. Here we can identify any version of WordPress we'd like to test on.
RUN wp core download

# Copy custom configuration files into location expected by nginx-php-fpm.
# See https://github.com/richarvey/nginx-php-fpm/blob/master/docs/nginx_configs.md
COPY docker/conf /var/www/html/conf

# Copy startup scripts into location expected by nginx-php-fpm.
# See https://github.com/richarvey/nginx-php-fpm/blob/master/docs/scripting_templating.md
COPY docker/scripts /var/www/html/scripts

# Copy the plugin into the right place, so we can set up unit testing.
COPY actblue /var/www/html/wp-content/plugins/actblue
