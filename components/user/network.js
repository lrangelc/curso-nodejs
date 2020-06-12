const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    const filterUsers = req.query.user || null;
    controller.getUsers(filterUsers)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.post('/', function (req, res) {
    controller.addUser(req.body.name)
        .then((fullUser) => {
            response.success(req, res, fullUser, 201);
        })
        .catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador ' + err);
        });
});

router.patch('/:id', function (req, res) {
    controller.updateUser(req.params.id, req.body.name)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

router.put('/', function (req, res) {
    response.success(req, res, 'user updated');
});

router.delete('/:id', function (req, res) {
    controller.deleteUser(req.params.id)
        .then((data) => {
            response.success(req, res, `User ${req.params.id} deleted`, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

module.exports = router;