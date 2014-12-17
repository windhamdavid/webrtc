var twilio = require('twilio'),
    http = require('http');

http.createServer(function (req, res) {
    var resp = new twilio.TwimlResponse();
    resp.say({voice:'woman'}, 'Welcome to the office of David A. Windham. David is not available at this time.');
 
    resp.gather({ timeout:30 }, function() {
        this.say('To Leave a messaage, press 1. For immediate support, press 2.');
    });
 
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());
 
}).listen(1337);
 
console.log('Twiml Server started on port 1337');