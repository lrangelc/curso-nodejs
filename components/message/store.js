const Model = require('./model');

async function addMessage(message) {
    const myMessage = new Model(message);
    const newMessage = await myMessage.save();
    return newMessage;
}

async function getMessages(filterUser) {
    return new Promise((resolve, reject) => {

        let filter = {};
        if (filterUser != null) {
            filter = {
                user: new RegExp(filterUser, 'i')
            };
            // filter = { user: filterUser };
        }
        const messages = Model.find(filter)
            .populate('chatId')
            .populate('userId')
            // .exec((err,populated) => {
            //     if (err) {
            //         reject(err);
            //         return false;
            //     }
            //     resolve(populated);
            // })
            .catch(err => {
                reject(err);
            });
        resolve(messages);
    });
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