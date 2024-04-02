const express = require('express');
const router = express.Router();
const mysqlConnection = require("../utils/database");


router.get('/get_companies',(request, result)=>{
    sql=`select * from companies;`;
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("none")
            result.send({ success: false, message: 'no company yet' });
        }else{ 
          //  console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, companiesList : res }); 
        }  
    });
})


router.post('/getCompanyId',(req, result)=>{
    sql = `select company_id from companies where user_id = ${req.body.userId} `;
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("no company with this id")
            result.send({ success: false, message: 'no company yet' });
        }else{
            //console.log("Result: " + JSON.stringify(res[0].company_id));
            result.send({ success: true, company_id : res[0].company_id }); 
        }  
    });
});

router.post('/getQueuesByCompanyId',(req, result)=>{
    sql = `select * from queues where company_id = ${req.body.company_id} `;
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            //console.log("no queues for this company")
            result.send({ success: false, message: 'company has no queue yet' });
        }else{
            //console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, queuesList : res }); 
        }  
    });
});


module.exports = router;