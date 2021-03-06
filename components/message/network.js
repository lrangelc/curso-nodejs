const { config } = require('../../config');
const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({ dest: `public/${config.filesRoute}/` });

router.get('/', function (req, res) {
    const filterMessages = req.query.userId || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch((err) => {
            response.error(req, res, 'Unexpected Error', 500, err);
        })
});

router.post('/', upload.single('file'), function (req, res) {
    if (req.file) {
        console.log(req.file);
    }
    controller.addMessage(req.body.chatId, req.body.userId, req.body.message, req.file)
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