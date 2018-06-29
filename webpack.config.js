const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const fs = require('fs');
const autoprefixer = require('autoprefixer');


const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
}

function generateHtmlPlugins(templateDir) { //функция генерации HTML файлов
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [`${name}`],
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views')

module.exports = {
  entry: [
    './src/js/index.js',
    './src/sass/style.sass',
  ],
  output: {
    filename: './js/bundle.js'
  },
  devtool: "source-map",
  module: {

    rules: [
      {
        test: /\.js$/,
        include: paths.src + '/js/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.(png|jp?eg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        enforce: "pre",
        loader: "import-glob-loader"
      },
      {
        test: /\.(sass|scss)$/,
        include: paths.src + '/sass/',
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  plugins: [
                      autoprefixer({
                          browsers:[
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR', 
                            'not ie < 10'
                            ]
                      })
                  ],
                  sourceMap: true
              }
          },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader'
            },
          ]
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new ExtractTextPlugin({ // выходной CSS файл
      filename: './css/style.css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([{
        from: './src/fonts/',
        to: './fonts'
      },
      {
        from: './src/favicon/',
        to: './favicon'
      },
      {
        from: './src/img/',
        to: './img'
      },
      {
        from: './src/uploads/',
        to: './uploads'
      },
    ]),
  ].concat(htmlPlugins)
};