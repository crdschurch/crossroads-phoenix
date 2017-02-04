var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");


var endpoint = {
  url: 'http://localhost:49380'
};

var environmentVars = require(path.resolve(__dirname, 'environment.config.js'));
var definePlugin = new webpack.DefinePlugin(environmentVars.get());

module.exports = [
  {
  entry: {
    app: ["./web/static/css/main.scss", "./web/static/js/app.js"],
    childcare: './web/static/js/app/childcare_dashboard/childcareDashboard.module.js',
    trips: './web/static/js/app/trips/trips.module.js',
    camps: './web/static/js/app/camps/camps.module.js',
    search: './web/static/js/app/search/search.module.js',
    media: './web/static/js/app/media/media.module.js',
    give: './web/static/js/app/give/give.module.js',
    profile: './web/static/js/app/profile/profile.module.js',
    main: './web/static/js/app/app.js',
    govolunteer: './web/static/js/app/go_volunteer/goVolunteer.module.js',
    ang: "./web/static/js/core/ang.js",
    core: ['./web/static/js/core/core.js'],
    common: ['./web/static/js/app/common/common.module.js'],
    formbuilder: ['./web/static/js/app/formBuilder/formBuilder.module.js'],
    formlybuilder: ['./web/static/js/app/formlyBuilder/formlyBuilder.module.js']
  },
  externals: {
    stripe: 'Stripe',
    moment: 'moment',
  },
  devtool: 'sourcemap',
  output: {
    path: "./priv/static",
    filename: "js/[name].js"
  },
  resolve: {
    modules: [
      "node_modules/",
      __dirname + "/web/static/js/",
      __dirname + "/web/static/lib/"
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /streamspotAnalytics\.js$/,
        /videojs5-hlsjs-source-handler/
      ],
      use: [
      "ng-annotate-loader", "babel-loader?presets[]=es2015"
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader' ]
    },
    {
      test: /\.html$/,
      loader: 'ng-cache-loader?prefix=[dir]',
      exclude: [/\.ng2component\.html$/]
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: "style-loader",
        loader: "css-loader!sass-loader?includePaths[]=" + __dirname + "/node_modules!postcss-loader",
        //publicPath: "/css"
      })
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url-loader?limit=10000'
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
    },
    {
      test: /\.(eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    },
    {
      test:/\.svg(\?v=\d+\.\d+\.\d+)?$/,
      include: [ path.resolve(__dirname, "web/static/fonts")],
      loaders: 'url-loader?limit=10000&mimetype=image/svg+xml',
    },
    {
      test: /\.svg$/,
      include: [ path.resolve(__dirname, "web/static/icons")], 
      loader: 'svg-sprite-loader?' + JSON.stringify({angularBaseWorkaround: true })
    }
    ],
    noParse: [
      /video\.js$|videosjs\-chromecast\.js/,
      /videojs5-hlsjs-source-handler/,
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "css/main.css",
      disable: false,
      allChunks: true
    }),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }]),
    definePlugin,
    /*new webpack.optimize.UglifyJsPlugin({*/
      //comments: false,
      //compress: { warnings: false },
      //sourceMap: true,
      //mangle: false,
      //output: { ascii_only: true }
    /*})*/

  ]},
  //require('./node_modules/crds-connect/webpack.config.js'),
  //require('./node_modules/angular2-phoenix/webpack.config.js')
];
