const db = require('mongoose');

db.Promise = global.Promise;

async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('[db] Conectada con éxito');
    // db.connect(uri, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    //     .then(() => console.log('[db] Conectada con éxito'))
    //     .catch(err => console.error('[db] Error al tratar de conectar', err));
}

module.exports = connect;