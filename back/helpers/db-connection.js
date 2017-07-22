/**
 * Created by Friday on 2017/5/11.
 */
var Sequelize = require('sequelize');
var DatabaseInfo = require('../configs/credentials');

module.exports = DbConnection;

function DbConnection()
{

}

var conn;
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    conn=DatabaseInfo.mysql.dev;
} else if (env === 'production'){
    conn=DatabaseInfo.mysql.prod;
} else {
    conn=DatabaseInfo.mysql.dev;
}

DbConnection.prototype.sequelize= new Sequelize(conn.database,conn.username,conn.password,{
    host:conn.host,
    port:conn.port,
    dialect:'mysql',
    timezone:'+08:00',
    pool:{
        max: '10'
    }
});