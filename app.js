const express = require('express');


const profileRoute = require('./routes/profileRoute');


const server = express();

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(express.static(__dirname + '/public'));

server.use('/', profileRoute);






server.listen(4000);