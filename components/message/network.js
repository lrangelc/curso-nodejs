const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    controller.getMessages()
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.post('/', function (req, res) {
    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch((err) => {
            response.error(req, res, 'Informacion invalida', 400, 'Error en el controlador ' + err);
        });
});

router.put('/', function (req, res) {
    // res.send('message updated');
    response.success(req, res, 'message updated');
});

router.delete('/', function (req, res) {
    console.log(req.body);
    // res.send('message deleted');
    response.success(req, res, 'message deleted');

});

module.exports = router;