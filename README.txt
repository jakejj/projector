Start in dev mode:

foreman start -f Procfile.dev

Build Webpack assets for production (using npm scripts):

./node_modules/.bin/webpack -d --watch --config='./config/webpack.config.js'