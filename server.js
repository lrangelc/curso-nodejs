const { config } = require('./config');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');

const router = require('./network/routes');

const PORT = config.port;
const MDBuser = encodeURIComponent(config.mdbUser);
const MDBpassword = encodeURIComponent(config.mdbPassword);
const MDBcluster = config.mdbCluster;
const MDBdb = config.mdbName;
const MDBurl = `mongodb+srv://${MDBuser}:${MDBpassword}@${MDBcluster}-kuuzl.mongodb.net/${MDBdb}?retryWrites=true&w=majority`;

db(MDBurl);

// app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

socket.connect(server);

router(app);

app.use(config.publicRoute, express.static('public'));

server.listen(PORT, function () {
    console.log(`Application listen on ${config.host}:${PORT}`);
});