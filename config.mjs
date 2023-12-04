import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  devtool:false,
  context: path.resolve(__dirname,'src'),
  optimization: {
    chunkIds: 'named'
  },
  entry: {
		a: "./a.js",
		b: {
			import: "./b.js",
			chunkLoading: false
		},
		c: {
			import: "./b.js",
			asyncChunks: false
		},
		d: {
			import: "./b.js",
			asyncChunks: false,
			runtime: "runtime"
		}
	},
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
    
  },
  target: "web",
	externals: {
		fs: "commonjs fs"
	},
	node: {
		__filename: false
	}
};

export default config;
