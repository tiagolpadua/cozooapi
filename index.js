var http = require('http')
    , app = require('./config/express')
    , db = require('./config/database');

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Servidor escutando na porta: ' + this.address().port);
});
