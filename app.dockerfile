FROM php:8.1-apache
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Set working directory

WORKDIR /var/www

RUN apt update && apt upgrade -y -qq && apt install -y zlib1g-dev libpng-dev libmagickwand-dev libzip-dev git \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include --with-jpeg \
    && docker-php-ext-install calendar gd zip pdo pdo_mysql mysqli exif intl
RUN docker-php-ext-configure intl && docker-php-ext-install mysqli pdo pdo_mysql intl

# Copy existing application directory contents
COPY app /var/www

# Enable Apache mod_rewrite
RUN a2enmod rewrite \
# Enable Apache mod_rewrite
&& a2enmod headers \
# Enable Apache mod_rewrite
&& a2enmod expires

RUN apk

RUN apt-get clean && rm -rf /var/lib/apt/lists/*