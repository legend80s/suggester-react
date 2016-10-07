import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  entry: {
    app: ['./public/src/index.jsx'],
  },

  output: {
    path: path.resolve('./public/dist'),
    filename: 'app.bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },

  module: {
    loaders: [
      {
        test: /.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },

      { test: /\.json$/, loader: 'json' },

      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },

      { test: /\.ttf$|\.woff$|\.woff2$|\.eot$|\.svg$/, loader: 'file?name=fonts/[name].[ext]' },
    ],
  },

  plugins: [
    new ExtractTextPlugin('app.bundle.css'),
  ],
};
