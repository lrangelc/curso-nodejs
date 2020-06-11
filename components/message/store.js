const { config } = require('../../config');

const db = require('mongoose');
const Model = require('./model');

const MDBuser = encodeURIComponent(config.mdbUser);
const MDBpassword = encodeURIComponent(config.mdbPassword);
const MDBcluster = config.mdbCluster;
const MDBdb = config.mdbName;
const uri = `mongodb+srv://${MDBuser}:${MDBpassword}@${MDBcluster}-kuuzl.mongodb.net/${MDBdb}?retryWrites=true&w=majority`;

db.Promise = global.Promise;

db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('[db] Conectada con éxito'))
    .catch(err => console.error('[db] Error al tratar de conectar', err));

function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessages() {
    const messages = await Model.find();
    return messages;
}

module.exports = {
    add: addMessage,
    list: getMessages,
    // get:
    // update:
    // delete:
};