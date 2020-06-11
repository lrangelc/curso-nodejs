
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    mdbUser: process.env.MDB_USER,
    mdbPassword: process.env.MDB_PASSWORD,
    mdbCluster: process.env.MDB_CLUSTER,
    mdbName: process.env.MDB_NAME
};

module.exports = { config };