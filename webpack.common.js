const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const WebpackDevServer = require('webpack-dev-server');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = isProduction
	? MiniCssExtractPlugin.loader
	: "style-loader";


const config = {
	entry: {
		main: {import: './src/app/index.js'},
		home: {import: './src/app/home.js'}
	},
	output: {
		publicPath: "auto",
		path: path.resolve(__dirname,'build'),
		filename: 'assets/js/[name].[contenthash].js',
		pathinfo: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Welcome",
			filename: 'index.html',
			template: 'src/pages/index.html',
			chunks: ['main'],
			hash: false
		}),
		new HtmlWebpackPlugin({
			title: "Home Page",
			filename: 'home.html',
			chunks: ['home'],
			template: 'src/pages/home.html',
			hash: false,
		}),
		new WebpackManifestPlugin({
			basePath: '',
			filename: '[name][ext]'
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: '[name].css'
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [],
		})
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
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[hash][ext][query]',
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