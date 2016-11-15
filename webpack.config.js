module.exports = {
  entry: "./app.js",

  output: {
    filename: "bundle.js"
  }, 
  module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /node_modules/,
       // loaders: ['babel']
       // ,
       loader: 'babel',
       query: {
         presets: ['react', 'es2015'] 
       }
     }
   ]
 },
 resolve: {
   extensions: ['', '.js', '.es6']
 },
}

