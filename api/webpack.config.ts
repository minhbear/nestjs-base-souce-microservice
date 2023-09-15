/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/naming-convention */
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodemonPlugin from 'nodemon-webpack-plugin';
import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as webpack from 'webpack';

const nodeExternals = require('webpack-node-externals');

const config: webpack.Configuration = {
  devtool: 'source-map',
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100']
    })
  ],
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /(node_modules,node_modules_prod)/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.build.json',
          transpileOnly: true
        },
        test: /(.tsx|.ts)?$/
      }
    ]
  },
  optimization: {
    nodeEnv: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  plugins: [
    new NodemonPlugin({
      nodeArgs: ['--enable-source-maps'],
      verbose: false
    }),
    new webpack.DefinePlugin({
      'process.env.WEBPACK_RUNNER': JSON.stringify(true)
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.build.json'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  stats: 'errors-only',
  target: 'node'
};

export default config;
