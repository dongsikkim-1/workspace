module.exports = {
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: 'public/sw.js',
        // ...other Workbox options...
    }
  },
  devServer: {
      //https:true,
      disableHostCheck:true
  }    
  ,runtimeCompiler: true
}