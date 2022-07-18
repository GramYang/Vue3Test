const path=require('path')

module.exports = {
  //使用template模板语法需要加上这个
  runtimeCompiler:true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
          path.resolve(__dirname,'./src/assets/styl/index.styl')
      ]
    }
  }
}
