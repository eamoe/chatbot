let mix = require('laravel-mix');

mix.js('src_bootstrap/js/main.js', 'js/')
    .sass('src_bootstrap/scss/main.scss', 'css/')
    .setPublicPath('public/');
