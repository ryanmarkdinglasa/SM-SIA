/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import {dependencies as externals} from '../../release/app/package.json';
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
    extensions: ['.html','.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    fallback: {
      
    },
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },
  stats: 'errors-only',
};

export default configuration;
