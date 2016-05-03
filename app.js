/*!
 * main entrance
**/

'use strict'

let init = require('jade-press').init
,co = require('co')
,config = require('./config')

co(init(config))
.then(function(app) {

	let port = config.local.port

	app.listen(port, '127.0.0.1', function() {
		console.log('' + new Date(), config.local.siteName, 'runs on port', port)
	})

}, function(err) {
	console.error(err.stack || err)
})