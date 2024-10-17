import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import fs from "fs";
import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "./src");
const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const pagesDir = path.resolve(__dirname, "./src/pages");
const appDir = path.resolve(__dirname, "./src/app");

const folders = ["fonts", "assets"];
const copyFolders = (folders) => {
	return folders.map((folder) => {
		const fromPath = path.resolve(publicDir, `./${folder}`);
		const toPath = buildDir;
		if (!fs.existsSync(fromPath)) {
			console.warn(`Source folder: ${fromPath} does not exist`);
		}
		return {
			from: fromPath,
			to: toPath,
			noErrorOnMissing: true,
		};
	});
};


export default async (env, { mode }) => {
	const isDev = mode === "development"
	return {
		mode,
		entry: path.join(appDir, "app.js"),
		output: {
			path: buildDir,
			filename: "js/[name].js",
			clean: true,
		},
		devServer: {
			static: {
				directory: publicDir,
			},
			port: 8888,
			open: true,
			historyApiFallback: true,
			hot: true,
			watchFiles: [
				"src/**/*.js",
				"src/**/*.css",
				"src/**/*.html",
				"src/**/*.json",
			],
		},
		module: {
			rules: [
				{
					test: /\.pcss$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								importLoaders: 1,
								sourceMap: isDev ? true : false,
							},
						},
						"postcss-loader",
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				template: path.join(pagesDir, "index.js"),
			}),
			new MiniCssExtractPlugin({
				filename: "styles/[name][hash].css",
			}),
			new webpack.DefinePlugin({
				"process.env.API_URL": JSON.stringify(env.API_URL),
			}),
			new CopyPlugin({
				patterns: copyFolders(folders),
			}),
		],

		resolve: {
			alias: {
				"#shared": path.resolve(__dirname, "src/shared"),
				"#entities": path.resolve(__dirname, "src/entities"),
				"#pages": path.resolve(__dirname, "src/pages"),
				"#features": path.resolve(__dirname, "src/features"),
				"#app": path.resolve(__dirname, "src/app"),
				"#widgets": path.resolve(__dirname, "src/widgets"),
			},
			extensions: [".js", ".pcss"],
		},
		optimization: {
			minimize: !isDev, //В режиме продакшена
			minimizer: [
				new CssMinimizerPlugin(), //Минификация CSS
				new TerserPlugin(),
			],
		},
		devtool: isDev ? "source-map" : false,

	}
}
