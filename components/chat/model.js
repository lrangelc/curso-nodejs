const mongoose = require('mongoose');
const collectionName = 'chat';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    users: [
        {
            type: Schema.ObjectId,
            ref: 'user'
        }
    ],
    date: Date
});

const Model = mongoose.model(collectionName, mySchema, collectionName);

function objectIdIsValid(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

module.exports = {
    Model,
    objectIdIsValid
};