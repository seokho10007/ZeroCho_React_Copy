const path = require('path');
const webpack = require('webpack');

module.exports = {
	name: 'word-realy-setting',
	mode: 'development', //실서비스: production
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},

	entry: {
		app: ['./client'],
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: { browsers: ['> 1% in KR'] },
								debug: true,
							},
						],
						'@babel/preset-react',
					],
					plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],
				},
			},
		],
	},
	plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],

	output: {
		//현재 폴더 경로를 확인 후 dist 폴더 불러옴 (path = dist)
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist/',
	},
};
