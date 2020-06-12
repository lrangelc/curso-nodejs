const store = require('./store');

function addChat(name) {
    return new Promise(async (resolve, reject) => {
        if (!name) {
            console.error('[chatController] name invalid');
            return reject('los datos son incorrectos');
        }
        const fullChat = {
            name: name,
            date: new Date()
        };
        const result = await store.add(fullChat);
        resolve(result);
    });
}

function getChats(filterChats) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterChats));
    });
}

function updateChat(id, name) {
    return new Promise(async (resolve, reject) => {
        if (!id || !name) {
            console.error('[chatController] Invalid id or name');
            return reject('los datos son incorrectos');
        }
        const result = await store.update(id, name);
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