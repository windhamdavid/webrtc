var client = require('twilio')(process.env.account_sid, process.env.auth_token)

client.sms.messages.create({
    to:'+18037123283',
    from:'8037124787',
    body:'a person wants to chat online'
}, function(error, message) {
    if (!error) {
        console.log('Success! SID:');
        console.log(message.sid);
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Error!');
    }
});