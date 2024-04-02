/* const Client = require('./Client'); */
module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User",{
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull :  false,
            validate:{ notEmpty: true }
    },  
        user_name: {
            type : DataTypes.STRING,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        user_password: {
            type : DataTypes.TEXT,
            allowNull :  false,
            validate:{
                notEmpty: true
            }
        },  
        userType: {
            type : DataTypes.TEXT,
            allowNull :  false,
            validate:{
                notEmpty: true
            },
        },  
    });

      
    return User;
}