const { config } = require('./config');
const express = require('express');
const bodyParser = require('body-parser');

const router = require('./network/routes');
const PORT = config.port;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

app.use('/app',express.static('public'));

app.listen(PORT);
console.log(`Application listen on http://localhost:${PORT}`);

console.log(process.env.PORT);