const mongoose = require('mongoose');
const collectionName = 'message';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user: String,
    message: { type: String, required: true },
    date: Date
});

const model = mongoose.model(collectionName, mySchema, collectionName);

module.exports = model;