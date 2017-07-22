/**
 * Created by cuckoo on 2017/5/26.
 */
module.exports = function(sequelize, DataTypes) {
    var info_notice= sequelize.define('info_notice', {
        notice_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        notice_title: {
            type: DataTypes.STRING
        },
        notice_content: {
            type: DataTypes.STRING
        },
        notice_first_media_url: {
            type: DataTypes.STRING
        },
        browse_times: {
            type: DataTypes.INTEGER
        },
        column_id:{
            type: DataTypes.INTEGER
        },
        sort:{
            type: DataTypes.INTEGER
        },
        create_time: {
            type: DataTypes.DATE
        },
        manager_id: {
            type: DataTypes.INTEGER
        },
        update_time: {
            type: DataTypes.DATE
        },
        is_display: {
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
    return info_notice;
};