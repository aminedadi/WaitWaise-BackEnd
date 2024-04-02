const express = require('express');
const cors = require("cors");
const router = express.Router();
const mysqlConnection = require("../utils/database");


router.post('/insert_queue',cors(),(req, result)=>{
    sql=`INSERT INTO queues (queue_name, queue_type, queue_capacity, starting_time, ending_time, notification_type, company_id) VALUES('${req.body.queue_name}','${req.body.queue_type}','${req.body.queue_capacity}','${req.body.time_start}','${req.body.time_end}','${req.body.notification_type}','${req.body.company_id}');`;
    console.log(' queue_name: '+ `${req.body.queue_name}` + ' queue_type: '+ `${req.body.queue_type}` + ' queue_capacity ' + `${req.body.queue_capacity}` +' starting_time: '+ `${req.body.time_start}`+' ending_time: '+ `${req.body.time_end}` +' notification_type: ' + `${req.body.notification_type}` +' company_id: ' + `${req.body.company_id}`);
    mysqlConnection.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("none")
            result.send({ success: false, message: 'no company yet' });
        }else{ 
            console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, companiesList : res }); 
        }  
    });
  })
 
  router.get('/get_queues',cors (),async (req, result)=>{
    sql=`select * from queues;`;
    mysqlConnection.query(sql,[true], function (err, res) {
        if (err) throw err;
        if(res == ''){
            result.send({ success: false, message: 'no queue yet' });
        }else{ 
            //console.log("Result: " + JSON.stringify(res));
            result.json({ success: true, queuesList : res }); 
        }  
    });
  });
  
  router.delete('/delete_queue',cors (),async (req, result)=>{
    sql=`delete from queues where id = ${req.body.id} ;`;
    mysqlConnection.query(sql,[true], function (err, res) {
        if (err) throw err;
        if(res.affectedRows == 0){
            result.send({ success: false, message: 'no queue to delete' });
        }else{ 
            console.log("queue deleted successfully " + JSON.stringify(res));
            result.send({ success: true, message : "queue deleted successfully" }); 
        }  
    });
  });

  router.patch('/update_queue/:id',cors (),async (req, result)=>{
    data = req.body;
    sql=`update from queues set id = ${req.body.id} ;`;
    sql=`UPDATE queues
    SET queue_name = ${data.queue_name},
     queue_type = ${data.queue_type},
     queue_capacity = ${data.queue_capacity},
     starting_time = ${data.starting_time},
     ending_time = ${data.ending_time},
     notification_type = ${data.notification_type},
    WHERE
        id = ${req.params.id * 1} ;`;
    mysqlConnection.query(sql,[true], function (err, res) {
        if (err) throw err;
        if(res.affectedRows == 0){
            result.send({ success: false, message: 'no queue to delete' });
        }else{ 
            console.log("queue deleted successfully " + JSON.stringify(res));
            result.send({ success: true, message : "queue deleted successfully" }); 
        }  
    });
  });


  module.exports = router;