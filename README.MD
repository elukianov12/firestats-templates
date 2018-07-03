# Шаблоны для проекта firestats

Собирает статические страницы. В работе можно использовать Sass и Pug.

Доступные команды:

``` json  
    "clean": "del-cli dist",
    "dev": "webpack --mode development",
    "build": "del-cli dist; webpack --mode production && serve ./dist",
    "watch": "webpack --mode development --watch",
    "start": "webpack-dev-server --content-base build/ --mode development --open"
```

## Что есть в сборке
- Material Design Icons
- Bootstrap 4
- jQuery
- SASS
- PostCSS
- Autoprefixer
- Pug

## Как работать со сборкой

Все `pug` файлы которые находятся в `./src/html/views/` будут собираться в html файл с таким же названием.