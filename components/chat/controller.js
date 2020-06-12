const store = require('./store');

function addChat(users) {
    return new Promise(async (resolve, reject) => {
        if (!users || !Array.isArray(users)) {
            console.error('[chatController] invalid users list');
            return reject('los datos son incorrectos');
        }
        const fullChat = {
            users: users,
            date: new Date()
        };
        const result = await store.add(fullChat);
        resolve(result);
    });
}

function getChats(userId) {
    return new Promise((resolve, reject) => {
        resolve(store.list(userId));
    });
}

function updateChat(id, users) {
    return new Promise(async (resolve, reject) => {
        if (!id || !Array.isArray(users)) {
            console.error('[chatController] invalid id or users list');
            return reject('los datos son incorrectos');
        }
        const result = await store.update(id, users);
        if (result == null) {
            return reject(`los datos son incorrectos ${id}`);
        }
        resolve(result);
    });
}

function deleteChat(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            console.error('[chatController] Id invalido');
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
    addChat,
    getChats,
    updateChat,
    deleteChat
};