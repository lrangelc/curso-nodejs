const mongoose = require('mongoose');
const collectionName = 'message';

const Schema = mongoose.Schema;

const mySchema = new Schema({
    chatId: { type: Schema.ObjectId, ref: 'chat' },
    userId: { type: Schema.ObjectId, ref: 'user' },
    message: { type: String, required: true },
    date: Date,
    fileUrl: String
});

const model = mongoose.model(collectionName, mySchema, collectionName);

module.exports = model;