/**
 * Created by Friday on 2017/5/11.
 */
module.exports = {
    mysql: {
        dev: {
            database:'zjemsdev',
            username:'zjemsdev',
            password:'zjems2017',
            host:'123.59.128.170',
            port:'3306',
            dateStrings:true
        },
        prod: {
            //'mysql://dreamtouch:Mysql2017@123.59.128.170/gmm?dateStrings=true&connectionLimit=10'
            connectionString: 'placeholder'
        }
    }
};