const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', function (req, res) {
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
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

router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

router.put('/', function (req, res) {
    // res.send('message updated');
    response.success(req, res, 'message updated');
});

router.delete('/:id', function (req, res) {
    controller.deleteMessage(req.params.id)
        .then((data) => {
            response.success(req, res, `Message ${req.params.id} deleted`, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, 'Error en el controlador ' + err);
        });
});

module.exports = router;