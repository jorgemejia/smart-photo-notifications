const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.post('/new_photo',jsonParser, function (req, res) {
    const postBody = req.body;
    console.log(postBody);
    io.emit('new photo added', { for: 'everyone', data:postBody });
    res.send('POST request to homepage');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});

