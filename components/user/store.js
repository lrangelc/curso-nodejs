const Model = require('./model');

async function addUser(user) {
    const myUser = new Model(user);
    const newUser = await myUser.save();
    return newUser;
}

async function getUsers(filterUser) {
    let filter = {};
    if (filterUser != null) {
        filter = {
            user: new RegExp(filterUser, 'i')
        };
    }
    const users = await Model.find(filter);
    return users;
}

async function updateUser(id, name) {
    const foundUser = await Model.findOne({ _id: id });
    foundUser.name = name;
    const newUser = await foundUser.save();

    return newUser;
}

async function deleteUser(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    delete: deleteUser
};