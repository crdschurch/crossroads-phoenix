var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
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

  output: {
    path: "./priv/static",
    filename: "js/[name].js"
  },
  resolve: {
    modulesDirectories: [ "node_modules", __dirname + "/web/static/js", "lib" ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /streamspotAnalytics\.js$/,
        /videojs5-hlsjs-source-handler/
      ],
      loader: "ng-annotate!babel-loader?presets[]=es2015",
    },
    {
      test: /\.json$/,
      loaders: ["json-loader"]
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.html$/,
      loader: 'ng-cache?prefix=[dir]',
      exclude: [/\.ng2component\.html$/]
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass?includePaths[]=" + __dirname + "/node_modules!postcss-loader"
      )
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url?limit=10000'
    },
    {
      test: /\.woff$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite?' + JSON.stringify({angularBaseWorkaround: true })
    }]
  },
  plugins: [
    new ExtractTextPlugin("css/main.css"),
    new CopyWebpackPlugin([{ from: "./web/static/assets" }])
  ]
};
