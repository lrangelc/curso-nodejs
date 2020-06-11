const store = require('./store');

function addMessage(user, message) {
    return new Promise(async (resolve, reject) => {
        if (!user || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('los datos son incorrectos');
        }
        const fullMessage = {
            user: user,
            message: message,
            date: new Date()
        };
        console.log(fullMessage);
        const result = await store.add(fullMessage);
        console.log(result);
        resolve(result);
    });
}

function getMessages(filterMessages) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterMessages));
    });
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            console.error('[messageController] No hay usuario o mensaje');
            return reject('los datos son incorrectos');
        }
        const result = await store.update(id, message);
        resolve(result);
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage
};