const model = require('./model');

async function addChat(chat) {
    const myChat = new model.Model(chat);
    const newChat = await myChat.save();
    return newChat;
}

async function getChats(userId) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (userId != null) {
            filter = {
                users: userId
            };
        }
        const chats = model.Model.find(filter)
            .populate('users')
            .catch(err => {
                reject(err);
            });
        resolve(chats);
    });
}

async function updateChat(id, users) {
    try {
        if (model.objectIdIsValid(id)) {
            const foundChat = await model.Model.findOne({ _id: id });
            if (foundChat) {
                foundChat.users = users;
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