import path from 'path';
import webpack from 'webpack';
import colors from 'colors/safe';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.babel.js';

const HOST = 'http://localhost';
const WEB_PORT = 8080;
const URL = `${HOST}:${WEB_PORT}/`;

config.entry.app.unshift(`webpack-dev-server/client?${URL}`);

const PUBLIC_PATH = path.resolve('./public');
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  // hot: true,
  noInfo: true,
  contentBase: PUBLIC_PATH,
});

/* eslint-disable no-console */
server.listen(WEB_PORT, (error) => {
  if (error) {
    console.error(error);

    return;
  }

  console.log(colors.green(`Static files served at ${PUBLIC_PATH}`));
  console.log(colors.green(`Visit ${URL} to enjoy your nice development trip`));
});
