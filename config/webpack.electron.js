const path = require('path');

module.exports = {
  target: 'electron-main',
  devtool: 'source-map',
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '/electron/main.ts')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../electron/build/main/'),
    filename: '[name].js'
  }
};
