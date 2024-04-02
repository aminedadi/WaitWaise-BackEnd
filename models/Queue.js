const db = require('./index.js');
const tableName = 'queques';
module.exports = (sequelize, DataTypes)=>{
    const Queue = sequelize.define("Queue",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull :  false,
            validate:{ notEmpty: true }
        },  
        queue_name: {
            type : DataTypes.STRING,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        queue_type: {
            type : DataTypes.TEXT,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        queue_capacity: {
            type : DataTypes.INTEGER.UNSIGNED,
            allowNull :  false,
            validate:{
                notEmpty: true
            },
        },  
        starting_time: {
            type : DataTypes.TIME,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        ending_time: {
            type : DataTypes.TIME,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        notification_type: {
            type : DataTypes.TEXT,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
    },
    { tableName });
/*     Queue.hasMany(QueueMember); */
    return Queue;
}