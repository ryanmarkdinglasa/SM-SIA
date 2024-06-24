/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[jt]sx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
          },
        },
      },
    ],
  },
  output: {
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
    path: webpackPaths.srcPath,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new NodePolyfillPlugin(),
  ],
  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    fallback: {
      url: require.resolve('url'),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode/'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder/'),
      sys: require.resolve('util/'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      util: require.resolve('util/'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
      mssql: require.resolve('mssql'),
    },
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  stats: 'errors-only',
};

export default configuration;
