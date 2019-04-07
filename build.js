const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')

const outputPath = path.join(__dirname, 'build')
const outputFile = 'server.js'

const compiler = webpack({
  name: 'server',
  mode: 'development',
  entry: [
    'webpack/hot/poll?1000',
    './src/index'
  ],
  target: 'node',
  module: {
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: outputPath,
    filename: outputFile
  }
})

compiler.watch({}, (errors, stat) => {
})

const compilerPromise = new Promise((resolve, reject) =>
  compiler.hooks.done.tap('server', (stats) => {
    if (!stats.hasErrors()) {
      resolve()
    } else {
      reject('Failed to compile')
    }
  })
)

compilerPromise.then(() => {
  console.log('Starting server..')
  spawn('node', [path.join(outputPath, outputFile)], { stdio: 'inherit' })
})
