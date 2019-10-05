const PORT = process.env.PORT || 3000;

var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

var serve = serveStatic('public/', { 'index': ['index.html'] })

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(PORT);
console.log(`Server running on port ${PORT}`)
