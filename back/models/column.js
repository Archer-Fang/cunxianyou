/**
 * Created by HUI on 2017-05-31.
 */
module.exports = function(sequelize, DataTypes) {
    //Model变量名必须与表名一致
    var column = sequelize.define('column', {
        column_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        column_title: {
            type: DataTypes.STRING
        },
        parent_column_id: {
            type: DataTypes.INTEGER
        },
        column_type: {
            type: DataTypes.INTEGER
        },
        column_sort:{
            type: DataTypes.INTEGER
        },
        link_url:{
            type: DataTypes.STRING
        },
        back_link_url:{
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER
        },
        icon_url:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
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
    return column;
};