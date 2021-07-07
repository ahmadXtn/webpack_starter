const PATHS =require('./declaration');

const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config=require('./webpack.config');

const options = {
	contentBase: PATHS.dist,
	compress: true,
	port: 8200,
	host: 'localhost',
	hot: true
}


//Server Setup
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);


//Running Server
server.listen(options.port, options.host, () => {
	console.log('dev server listening on port 5000');
});
