var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , routes = require('../app/routes')
    , path = require('path'),
    cors = require('cors');

app.use(cors());

app.set('publicPath', path.join(__dirname, '..', 'public'));
console.log(app.get('publicPath'));
app.use(express.static(app.get('publicPath')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

module.exports = app;