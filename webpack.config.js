import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    root: 'src',
    extensions: ['', '.js', '.jsx']
  },
  module: {}
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = './src/main.js';

webpackConfig.entry = {
  app: [APP_ENTRY_PATH, 'webpack-hot-middleware/client?path=/__webpack_hmr'],
  vendor: [
    'react',
    'react-dom',
    'react-router'
  ]
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: '[name].[hash].js',
  path: __dirname + 'dist',
  publicPath: '/'
};

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    hash: false,
    filename: 'index.html',
    inject: 'body'
  })
];

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin());

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: ['transform-runtime', 'transform-decorators-legacy', __dirname + '/build/babelRelayPlugin'],
    presets: ['es2015', 'react', 'stage-0', 'react-hmre']
  }
},
{
  test: /\.json$/,
  loader: 'json'
}];

export default webpackConfig;
