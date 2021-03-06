const mongoose = require('mongoose');
const collectionName = 'user';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: { type: String, required: true },
    date: Date
});

const Model = mongoose.model(collectionName, mySchema, collectionName);

function objectIdIsValid(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

// module.exports = model;

module.exports = {
    Model,
    objectIdIsValid
};