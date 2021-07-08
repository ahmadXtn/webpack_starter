const path = require('path');
const glob = require('glob')

const common = require('./webpack.common.js');
const {merge} = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const terserJsPlugin = require('terser-webpack-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


const PATHS = {
	src: path.join(__dirname, 'src')
}

module.exports = merge(common, {
	mode: 'production',
	target: "web",
	name: "prod",
	output: {
		path: path.resolve(__dirname, 'build'),
	},
	optimization: {
		minimizer: [new terserJsPlugin({parallel: true})],
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: "[id].css"
		}),
		new FaviconsWebpackPlugin({
			logo: 'src/assets/svg/peep-2.svg',
			mode: 'webapp',
			devMode: 'webapp',
			favicons: {
				appName: 'Portfolio',
				appDescription: 'My Personal Website',
				developerName: 'Me',
				developerURL: null,
				background: '#ddd',
				theme_color: '#333',
				icons: {
					coast: false,
					yandex: false
				}
			}
		}),
		new CssMinimizerPlugin(),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [],
		}),
	],

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
		]
	}
});