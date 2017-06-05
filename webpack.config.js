// config/webpack.config.js
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CleanPlugin = require('clean-webpack-plugin'); // 文件夹清除工具

// 配置目录
// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置
const path = require('path');
// const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
// const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
// const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
// const BUILD_PATH = path.join(ROOT_PATH, './public/assets'); // 最后输出放置公共资源的目录

module.exports = {
  // context: path.join(__dirname, '../'), // 设置webpack配置中指向的默认目录为项目根目录
  // entry: {
  //   index: './public/pages/index.js',
  //   public: './public/pages/public.js'
  // },
  entry: {//配置入口文件，有几个写几个
    index: './src/index.js'
    //list: './src/list.js'
    //about: './src/about.js'
  },
  output: {
    path: path.resolve(__dirname,'./dist/'), // 设置输出目录
    publicPath: '', //模板、样式、脚本、图片等资源对应的server上的路径
    filename: 'build.js', // 输出文件名
    //filename: 'js/[name].[hash:6].js', //根据对应入口名称，生成对应js名称
    //chunkFilename: 'js/[id].chunk.js'  //chunk生成的配置
  },
  devServer: {
    //启动服务实现热加载
    inline: true,
    port:8080
  },
  module: {
    loaders: [
      // loader 扔在这里
       // style & css & less loader
      { test: /\.css$/,loader: "style-loader!css-loader"},
      { test: /\.less$/,loader: "style-loader!css-loader!less-loader"},
      // babel loader
      {
        test: /\.js|jsx$/,
        //exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
          // 如果安装了React的话
          // presets: ['react', 'es2015']
        }
      },
      // image & font
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
      // {
      //   test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file-loader?name=./fonts/[name].[ext]'
      // },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'url',
      //   query: {
      //       limit: 30720, //30kb 图片转base64。设置图片大小，小于此数则转换。
      //       name: '../images/[name].[ext]?' //输出目录以及名称
      //   }
      // }
    ]
  },
  // resolve: {
  //   //root: [],
  //   // 设置require或import的时候可以不需要带后缀
  //   extensions: ['','.js', '.less', '.css'] // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
  // },
  plugins: [
    // 插件扔在这里
    // new CleanPlugin(['dist']), //清空dist文件夹
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common', //讲公共模块提取，生成名为‘vendors’的chunk
    //   minChunks: 3 //提取至少3个模块共有的部分
    // }),
    // new ExtractTextPlugin('css/[name].[hash:6].css'), //提取css行内样式，转化为link引入
    // new webpack.optimize.UglifyJsPlugin({ // js压缩
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new CopyWebpackPlugin([
    //   {frome:'./src/images', to: './images'} // 拷贝图片
    // ])
    // //自动生成一个html文件
    new htmlWebpackPlugin({
      template: __dirname+"/index.html"
    })
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new ExtractTextPlugin("style.css")
  ]
}