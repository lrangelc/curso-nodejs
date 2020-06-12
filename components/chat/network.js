const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    console.log('aqui');
    const filterChats = req.query.chat || null;
    controller.getChats(filterChats)
        .then((chatList) => {
            response.success(req, res, chatList, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.get('/:userId', function (req, res) {
    console.log('here');
    controller.getChats(req.params.userId)
        .then((chatList) => {
            response.success(req, res, chatList, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.post('/', function (req, res) {
    controller.addChat(req.body.users)
        .then((fullChat) => {
            response.success(req, res, fullChat, 201);
        })
        .catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador ' + err);
        });
});

router.patch('/:id', function (req, res) {
    controller.updateChat(req.params.id, req.body.users)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

router.put('/', function (req, res) {
    response.success(req, res, 'chat updated');
});

router.delete('/:id', function (req, res) {
    controller.deleteChat(req.params.id)
        .then((data) => {
            response.success(req, res, `Chat ${req.params.id} deleted`, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

module.exports = router;