const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')

const outputPath = path.join(__dirname, 'build')
const outputFile = 'server.js'
const builtServer = path.join(outputPath, outputFile)

const compiler = webpack({
  name: 'server',
  mode: 'development',
  entry: [
    'webpack/hot/poll?1000',
    './src/index'
  ],
  output: {
    path: outputPath,
    filename: outputFile
  },
  target: 'node',
  module: {
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})

compiler.watch({}, (errors, stat) => {})

const compilerPromise = new Promise((resolve, reject) =>
  compiler.hooks.done.tap('server', (stats) => {
    if (!stats.hasErrors()) return resolve()
    reject('Failed to compile')
  })
)

compilerPromise.then(() => {
  console.log('Starting server..')
  spawn('node', [builtServer], { stdio: 'inherit' })
}).catch(console.error)
