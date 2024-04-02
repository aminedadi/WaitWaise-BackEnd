const db = require('./index.js');
const instanceMethods = {
    toJSON() {
        const values = Object.assign({}, this.get());

        return values;
    },
};

module.exports = (sequelize, DataTypes)=>{
    const QueueMember = sequelize.define("QueueMember",{
        member_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull :  false,
                validate:{ notEmpty: true }
        },  
        queue_id: {
                type: DataTypes.INTEGER,
                allowNull :  false,
                validate:{ notEmpty: true },
                references: {
                    model: 'queues', // 'fathers' refers to table name
                    key: 'id', // 'id' refers to column name in fathers table
                }
        },  
        joined_at: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
          }, 
        
    },
    {instanceMethods});
    

    return QueueMember;
}





/*     QueueMember.belongsTo(Queue, {
        foreignKey: {
          name: 'queue_id',
          allowNull: false,
        },
      });
      

    QueueMember.belongsTo(Client, {
        foreignKey: {
          name: 'user_id',
          allowNull: false,
        },
      }); */

/* CREATE TABLE QueueMembers (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    queue_id INT,
    user_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (queue_id) REFERENCES Queues(queue_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ); */