const path = require('path');

const {merge} = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const common = require('./webpack.common.js');


module.exports = merge(common, {
	target: "web",
	name: "dev",
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: [
			path.join(__dirname, 'dist'),
			path.join(__dirname, 'assets'),
		],
		compress: true,
		port: 9000,
		host: 'localhost',

	},
	plugins: [
		new FaviconsWebpackPlugin({
			logo: 'src/assets/svg/peep-2.svg',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader","postcss-loader"],
			}
		]
	}
})