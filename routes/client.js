const express = require('express');
const router = express.Router();
const mysqlConnection = require("../utils/database");


router.post('/getClientId',(req, result)=>{
    sql = `select client_id from clients where user_id = ${req.body.userId} `;
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("no client with this id")
            result.send({ success: false, message: 'no no client with this id' });
        }else{
            //console.log("Result: " + res[0].client_id);
            result.send({ success: true, client_id : res[0].client_id }); 
        }  
    });
});


router.post('/getClientQueue',(req, result)=>{
    sql = `select * from queuemembers where client_id = ${req.body.client_id} `;
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            //console.log("no queues for this company")
            result.send({ success: false, message: "haven't joined any queue" });
        }else{
            console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, queuesList : res }); 
        }  
    });
})



module.exports = router;