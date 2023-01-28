const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: {
		app: './src/main.tsx',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.css', '.scss', '.svg'],
		modules:  [ path.join(__dirname, './src'), path.join(__dirname, './node_modules') ]
	},
	output: {
		path: path.join(__dirname, '../wwwroot/js'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{ test: /\.module\.s[ac]ss$/, use: [
				'style-loader',
				{ loader: 'css-loader', options: { modules: { localIdentName: '[name]__[local]--[hash:base64:5]' } } },
				'sass-loader',
			]},
			{ test: /\.s[ac]ss$/, exclude: /\.module.(s[ac]ss)$/, use: [
				'style-loader',
				'css-loader',
				'sass-loader',
			]},
			{ test: /\.css$/, use: [
				'style-loader',
				'css-loader'
			]},
			{ test: /\.tsx?$/, exclude: /node_modules/, use: [
				{ loader: 'ts-loader', options: { transpileOnly: true } },
			]},
			{ test: /\.js$/, use: 'source-map-loader', enforce: 'pre' },
			{ test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
				generator: { filename: 'fonts/[name][ext]'},
			}
		]
	},
	watchOptions: {
		ignored: ['*css.d.ts', 'node_modules/**', '.yarn/**'],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({ devServer: false }),
	],
	stats:
	{
		hash: false,
		modules: false,
		entrypoints: false,
		assetsSpace: 50,
		groupAssetsByEmitStatus: true,
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](tslib|react|object-assign|loose-envify|js-tokens|react-dom|scheduler|react-router-dom|react-router|history|path-to-regexp|regenerator-runtime|mini-create-react-context|hoist-non-react-statics|react-is|prop-types|tiny-invariant|tiny-warning|@babel|css-loader|style-loader|@fortawesome[\\/]fontawesome-svg-core|@fortawesome[\\/]react-fontawesome)/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
}