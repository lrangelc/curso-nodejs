const store = require('./store');

function addUser(name) {
    return new Promise(async (resolve, reject) => {
        if (!name) {
            console.error('[userController] name invalid');
            return reject('los datos son incorrectos');
        }
        const fullUser = {
            name: name,
            date: new Date()
        };
        const result = await store.add(fullUser);
        resolve(result);
    });
}

function getUsers(filterUsers) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUsers));
    });
}

function updateUser(id, name) {
    return new Promise(async (resolve, reject) => {
        if (!id || !name) {
            console.error('[userController] No hay usuario o name');
            return reject('los datos son incorrectos');
        }
        const result = await store.update(id, name);
        resolve(result);
    });
}

function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            console.error('[userController] Id invalido');
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
    addUser,
    getUsers,
    updateUser,
    deleteUser
};