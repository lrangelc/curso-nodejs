const mongoose = require('mongoose');
const collectionName = 'user';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    date: Date
});

const model = mongoose.model(collectionName, mySchema, collectionName);

module.exports = model;