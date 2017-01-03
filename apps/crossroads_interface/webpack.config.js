var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./web/static/css/app.scss", "./web/static/js/app.js"],
  output: {
    path: "./priv/static",
    filename: "js/app.js"
  },
  resolve: {
    modulesDirectories: [ "node_modules", __dirname + "/web/static/js" ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015"]
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass?includePaths[]=" + __dirname + "/node_modules!autoprefixer?browsers=last 2 versions"
      )
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url?limit=10000'
    },
    {
      test: /\.woff$/,
      loader: 'url?limit=100000'
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite?' + JSON.stringify({angularBaseWorkaround: true })
    }]
  },
  plugins: [
    new ExtractTextPlugin("css/app.css"),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }])
  ]
};
