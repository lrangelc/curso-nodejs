const model = require('./model');

async function addUser(user) {
    const myUser = new model.Model(user);
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
    const users = await model.Model.find(filter);
    return users;
}

async function updateUser(id, name) {
    try {
        if (model.objectIdIsValid(id)) {
            const foundUser = await model.Model.findOne({ _id: id });
            if (foundUser) {
                foundUser.name = name;
                const newUser = await foundUser.save();

                return newUser;
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

async function deleteUser(id) {
    if (model.objectIdIsValid(id)) {
        return model.Model.deleteOne({ _id: id });
    } else {
        throw `invalid id ${id}`
    }
}

module.exports = {
    add: addUser,
    list: getUsers,
    update: updateUser,
    delete: deleteUser
};