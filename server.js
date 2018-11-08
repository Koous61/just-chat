var http = require('http');
var fs = require('fs');
var chat = require('./chat');

http.createServer(function (request, response) {
    switch (request.url) {
        case '/': {
            sendFile("index.html", response);
            break;
        }
        case "/subscribe": {
            chat.subscribe(request, response);
            break;
        }
        case '/publish': {
            chat.publish("...");
        }
        default: {
            response.statusCode = 404;
            response.end("Not found");
        }
    }
}).listen(3000);

function sendFile(fileName, response) {
    var fileStream = fs.createReadStream(fileName);
    fileStream
        .on('error', function () {
            response.statusCode = 500;
            response.end("Server error");
        })
}