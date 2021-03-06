const { config } = require('../../config');
const PORT = config.port;
const store = require('./store');
const socket = require('../../socket').socket;

function addMessage(chatId, userId, message, file) {
    return new Promise(async (resolve, reject) => {
        if (!chatId || !userId || !message) {
            console.error('[messageController] No hay chat, usuario o mensaje');
            return reject('los datos son incorrectos');
        }
        let fileUrl = '';
        if (file) {
            fileUrl = `${config.host}:${PORT}${config.publicRoute}/${config.filesRoute}/${file.filename}`;
        }
        const fullMessage = {
            chatId: chatId,
            userId: userId,
            message: message,
            date: new Date(),
            fileUrl: fileUrl
        };
        const result = await store.add(fullMessage);

        socket.io.emit('message', fullMessage);

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
            console.error('[messageController] No hay id o mensaje');
            return reject('los datos son incorrectos');
        }
        const result = await store.update(id, message);
        resolve(result);
    });
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            console.error('[messageController] Id invalido');
            return reject('los datos son incorrectos');
        }
        store.delete(id)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};