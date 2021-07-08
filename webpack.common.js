const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const WebpackDevServer = require('webpack-dev-server');


const isProduction = process.env.NODE_ENV === "production";




const config = {
	entry: {
		main: {import: './src/app/index.js'},
	},
	output: {
		publicPath: "auto",
		path: path.resolve(__dirname,'build'),
		filename: 'assets/js/[name].[contenthash].js',
		pathinfo: true,
		clean:true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			title: "Ahmed BZ",
			template: 'src/pages/index.html',
			chunks: ['main'],
			hash: false,
			inject:true
		}),
		new WebpackManifestPlugin({
			basePath: '',
			filename: '[name][ext]'
		}),


	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', {targets: "defaults"}]
							],
						}
					}
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext][query]',
				}

			},
			{
				test: /\.(pdf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/doc/[hash][ext][query]',
				}

			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[hash][ext][query]'
				}
			}
		]
	}
}

module.exports = config;


//https://stackoverflow.com/questions/50825549/htmlwebpackplugin-add-only-one-entry-point-to-the-generated-html