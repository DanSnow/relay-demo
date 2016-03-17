import graphqlHTTP from 'express-graphql';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import schema from './data/schema';
import webpackConfig from './webpack.config.js';

const app = express();
const compiler = webpack(webpackConfig);

app.use('/graphql', graphqlHTTP({ schema, pretty: true, graphiql: true }));
const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    hot: true,
    lazy: false,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
app.use(middleware);

app.use(webpackHotMiddleware(compiler));
app.get('*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(webpackConfig.output.path + '/index.html'));
  res.end();
});

console.log('Server online!');
app.listen(3000);
