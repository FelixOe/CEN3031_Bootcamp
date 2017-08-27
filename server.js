var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
    console.log('Handling request');

    var parsedUrl = url.parse(request.url);

    response.setHeader('Content-Type', 'application/json');

    if (request.method == 'GET' && parsedUrl.pathname == '/listings') {
        response.statusCode = 200;
        response.end(JSON.stringify(listingData));

        console.log('Sending 200');
    }
    else {
        response.statusCode = 404;
        response.write('Bad gateway error');
        response.end();

        console.log('Sending 404');
    }
};

server = http.createServer(requestHandler);

server.listen(port, function () {
    console.log('Server is listening');
});

fs.readFile('listings.json', 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        throw err;
    }

    listingData = JSON.parse(data);
});
