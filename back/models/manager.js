/**
 * Created by HUI on 2017-05-18.
 */
module.exports = function(sequelize, DataTypes) {
    //Model变量名必须与表名一致
    var manager = sequelize.define('manager', {
        manager_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        manager_name: {
            type: DataTypes.STRING
        },
        manager_real_name: {
            type: DataTypes.STRING
        },
        manager_pwd_md5: {
            type: DataTypes.STRING
        },
        telephone:{
            type: DataTypes.STRING
        },
        manager_status:{
            type: DataTypes.INTEGER
        },
        create_time: {
            type: DataTypes.DATE
        },
        update_time: {
            type: DataTypes.DATE
        },
        operator_id: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return manager;
};
