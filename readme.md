
With Node 10.x, when you edit `src/server.js`, the server hot-reloads.

With Node 11.x, hot-reload is not triggered.

I tracked it down to the function `hotDownloadManifest` in `webpack/lib/node/NodeMainTemplate.runtime.js`, which is always returning undefined in Node 11.x. The require statement is failing, even though the manifest file `$hotMainFilename$` exists.
