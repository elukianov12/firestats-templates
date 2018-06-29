# Стартовый Webpack проект

Собирает статические страницы. В работе можно использовать Sass и Pug.

Доступные команды:

``` json  
    "clean": "del-cli dist",
    "dev": "webpack --mode development",
    "build": "del-cli dist; webpack --mode production && serve ./dist",
    "watch": "webpack --mode development --watch",
    "start": "webpack-dev-server --content-base build/ --mode development --open"
```

Создан по урокам из [этого](https://habr.com/post/350886/) поста

## Что есть в сборке

- Bootstrap 4
- jQuery
- SASS
- PostCSS
- Autoprefixer
- Pug
- visuallyhidden class

## Как работать со сборкой

Все файлы которые находятся в `./src/html/views/` будут собираться в html файл с таким же названием.

### Нужно реализовать

- Генерацию спрайтов (png|svg)
- Генерацию favicon
- Минификация изображений
- Удаление неиспользуемого CSS кода
- ...

### Ошибки

#### JS

- $ определяется как `ƒ $(selector, [startNode]) { [Command Line API] }`  в консоли. Но если ввести jQuery, то выпадает: `Uncaught ReferenceError: jQuery is not defined`

### Исправления

- sass (выполнен фикс путей к файлам внутри стилей с помощью resolve-url-loader)
- babel
- копирование картинок  и шрифтов
- Подключение шаблонизатора PUG
- Копирование оставшихся файлов
- Если добавить картинку внутри CSS компилятор выдает ошибку / Исправлено