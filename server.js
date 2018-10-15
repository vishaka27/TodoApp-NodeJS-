var http = require('http');
var url = require('url');
var querystring = require('querystring');
var myModule = require('./mymodule');
var markDown = require('markdown').markdown;

var eventEmitter = require('events').EventEmitter;

var game = new eventEmitter();

var server = http.createServer();

server.on('request', function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if ('firstname' in params && 'lastname' in params) {
        res.write('Your name is-' + params['firstname'] + ' ' + params['lastname']);
    }
    if (page == '/') {
        res.write('<br/>You\'re at the reception desk. How can i help you?');
    } else if (page == '/basement') {
        res.write('You\'re in wine cellar');
    } else if (page == '/floor/1/bedroom') {
        res.write('Private area');
    } else {
        res.write('Error!!!!! No room found');
    }
    // res.write('<!DOCTYPE html>'+
    // '<html>'+
    // '<head>'+
    // ' <meta charset="utf-8" />'+
    // ' <title>My Node.js page!</title>'+
    // ' </head>'+ 
    // ' <body>'+
    // ' <p>Here is a paragraph of <strong>HTML</strong>!</p>'+
    // ' </body>'+
    // '</html>');
    res.end();
});

game.emit('gameover', 'You lose!');
game.emit('newplayer', 'Mario', 35); //send the name of the player who just arrived and gives their age

game.on('gameover', function(message) {
    console.log(message);
});

myModule.sayHello();
myModule.sayGoodBye();

console.log(markDown.toHTML('A paragraph in **markdown**!'));
// var http = require('http');

// var instructionsNewVariable = function(req, res) {
//     res.writeHead(200);
//     res.end('Hi everybody');
// }

// var server = http.createServer(instructionsNewVariable);

// server.on('close', function() {
//     console.log('GoodBye!');
// });

server.listen(8080);
// server.close();
