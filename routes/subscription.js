const express = require('express');
const cors = require("cors");
const router = express.Router();
const mysqlConnection = require("../utils/database");



router.post('/insert_member',cors (),(req, result)=>{
    sql = `INSERT INTO queuemembers (queue_id, client_id, joined_at)
    SELECT ${req.body.queue_id}, ${req.body.client_id}, '${req.body.joined_at}'
    WHERE NOT EXISTS (
        SELECT 1 FROM queuemembers 
        WHERE client_id = ${req.body.client_id} AND queue_id = ${req.body.queue_id}
    );`
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if (res.affectedRows === 0) {
            console.log("seems like youre already joined in");
            result.send({ success: true, message : "you are already joined in"});  
        }else{
            console.log("joined in succefully");
            result.send({ success: true, message : "joined in succefully"});  
        }
    });
});

module.exports = router ;