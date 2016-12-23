var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var endpoint = {
  url: 'http://localhost:49380'
};

var environmentVars = require(path.resolve(__dirname, 'environment.config.js'));
var definePlugin = new webpack.DefinePlugin(environmentVars.get());

module.exports = {
  entry: {
    childcare: './web/static/js/childcare_dashboard/childcareDashboard.module.js',
    trips: './web/static/js/trips/trips.module.js',
    camps: './web/static/js/camps/camps.module.js',
    search: './web/static/js/search/search.module.js',
    media: './web/static/js/media/media.module.js',
    give: './web/static/js/give/give.module.js',
    profile: './web/static/js/profile/profile.module.js',
    main: './web/static/js/app.js',
    ang: './web/static/core/ang.js',
    govolunteer: './web/static/js/go_volunteer/goVolunteer.module.js',
    core: ['./web/static/core/core.js'],
    common: ['./web/static/js/common/common.module.js'],
    formbuilder: ['./web/static/js/formBuilder/formBuilder.module.js'],
    formlybuilder: ['./web/static/js/formlyBuilder/formlyBuilder.module.js']
  },
  watchPattern: ['web/static/js/**/**', 'web/static/core/**/**'],
  externals: {
    stripe: 'Stripe',
    moment: 'moment',
  },
  context: __dirname,
  output: {
    path: './priv/static/js',
    publicPath: '/assets/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'sourcemap',
  debug: true,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'web/static/js'),
          path.resolve(__dirname, 'web/static/core'),
          path.resolve(__dirname, 'node_modules/angular-stripe')
        ],
        exclude: [
          /streamspotAnalytics\.js$/,
          /videojs5-hlsjs-source-handler/
        ],
        loader: 'ng-annotate!babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['image?bypassOnDebug&optimizationLevel=7&interlaced=false']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'ng-cache?prefix=[dir]',
        exclude: [/\.ng2component\.html$/]
      },
      {
        test: /\.json$/,
        loaders: ["json-loader"]
      },
    ],
    noParse: [
      path.join(__dirname, "node_modules", "video.js", "dist", "video.js"),
      /videojs5-hlsjs-source-handler/,
      path.join(__dirname, "node_modules", "videojs-chromecast", "dist", "videojs-chromecast.js")
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    definePlugin
  ]
};
