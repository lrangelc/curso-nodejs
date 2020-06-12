const { config } = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const router = require('./network/routes');

const PORT = config.port;
const MDBuser = encodeURIComponent(config.mdbUser);
const MDBpassword = encodeURIComponent(config.mdbPassword);
const MDBcluster = config.mdbCluster;
const MDBdb = config.mdbName;
const MDBurl = `mongodb+srv://${MDBuser}:${MDBpassword}@${MDBcluster}-kuuzl.mongodb.net/${MDBdb}?retryWrites=true&w=majority`;

db(MDBurl);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

app.use('/app',express.static('public'));

app.listen(PORT);
console.log(`Application listen on http://localhost:${PORT}`);

console.log(process.env.PORT);