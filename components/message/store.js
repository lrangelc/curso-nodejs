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

async function addMessage(message) {
    const myMessage = new Model(message);
    const newMessage = await myMessage.save();
    return newMessage;
}

async function getMessages(filterUser) {
    let filter = {};
    if (filterUser != null) {
        filter = {
            user: new RegExp(filterUser, 'i')
        };
        // filter = { user: filterUser };
    }
    const messages = await Model.find(filter);
    return messages;
}

async function updateMessage(id, message) {
    const foundMessage = await Model.findOne({ _id: id });
    foundMessage.message = message;
    const newMessage = await foundMessage.save();

    return newMessage;
}

async function deleteMessage(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    update: updateMessage,
    delete: deleteMessage
    // get:
};