FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite
RUN a2enmod headers

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN printf "<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n" > /etc/apache2/conf-available/allow-override.conf \
    && a2enconf allow-override

COPY . /var/www/html/

EXPOSE 80