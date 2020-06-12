const model = require('./model');

async function addChat(chat) {
    const myChat = new model.Model(chat);
    const newChat = await myChat.save();
    return newChat;
}

async function getChats(filterChat) {
    let filter = {};
    if (filterChat != null) {
        filter = {
            chat: new RegExp(filterChat, 'i')
        };
    }
    const chats = await model.Model.find(filter);
    return chats;
}

async function updateChat(id, name) {
    try {
        if (model.objectIdIsValid(id)) {
            const foundChat = await model.Model.findOne({ _id: id });
            if (foundChat) {
                foundChat.name = name;
                const newChat = await foundChat.save();

                return newChat;
            }
        }
        else {
            throw `invalid id ${id}`
        }
    } catch (err) {
        console.error(err);
    }
    return null;
}

async function deleteChat(id) {
    if (model.objectIdIsValid(id)) {
        return model.Model.deleteOne({ _id: id });
    } else {
        throw `invalid id ${id}`
    }
}

module.exports = {
    add: addChat,
    list: getChats,
    update: updateChat,
    delete: deleteChat
};