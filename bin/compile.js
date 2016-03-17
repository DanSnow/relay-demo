require('babel-register');

const compiler = require('webpack')(require('../webpack.config').default);

const statsConfig = {
  colors: true,
  hash: false,
  timings: true,
  chunks: false,
  chunkModules: false,
  modules: false
};

compiler.run(function(err, stats) {
  const jsonStats = stats.toJson(statsConfig);
  console.log(stats.toString(statsConfig));

  if (err) {
    console.log('Fatal err');
    process.exit(1);
  } else if (jsonStats.errors.length > 0) {
    console.log(jsonStats.errors);
    process.exit(1);
  }
});
