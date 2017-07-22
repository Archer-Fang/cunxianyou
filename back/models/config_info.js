/**
 * Created by XT on 2017/7/22.
 */
module.exports = function(sequelize, DataTypes) {
    var config = sequelize.define('config', {
        config_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        config_content: {
            type: DataTypes.STRING
        },
        config_title: {
            type: DataTypes.STRING
        },
        config_type: {
            type: DataTypes.INTEGER
        },
        create_time:{
            type: DataTypes.DATE
        },
        manager_id: {
            type: DataTypes.INTEGER
        },
        update_time: {
            type: DataTypes.DATE
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
    return config;
};