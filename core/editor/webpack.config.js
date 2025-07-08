const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/load.js',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, '../../public')
    },
    proxy: [
      {
        context: ['/api', '/avatar', '/avatar.svg', '/docs'],
        target: 'http://localhost'
      }
    ],
    hot: true,
    compress: true,
    port: 9000
  },
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      title: 'Output Management'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx']
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }], '@babel/react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // test: /\.svg$/,
        include: [
          /icons/
        ],
        use: [
          '@svgr/webpack'
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.zip$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  externals: {
    react: 'React',
    // 'bootstrap-icons': 'BootStrapIcons',
    'react-dom': 'ReactDOM',
    '@douyinfe/semi-ui': 'SemiUI'
  }
}
