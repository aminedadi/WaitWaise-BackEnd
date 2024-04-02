require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const authRoutes = require('./routes/AuthRoutes');
const clientRoutes = require('./routes/client');
const companyRoutes = require('./routes/company');
const queueRoutes = require('./routes/queue');
const subscriptionRoutes = require('./routes/subscription');

const port = 3000;
const app = express();

app.use(
      cors({origin:"*"
    })
  );

app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/subscription', subscriptionRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});









/* var cnx = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "my_db",
    multipleStatements: true,
  });
  const loginData = '';

  cnx.connect(function(err){
    if(err) throw err;
});
  */

//company ok
/* app.get('/get_companies',(request, result)=>{
    sql=`select * from companies;`;
    cnx.query(sql, function (err, res) {
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
 */
//company ok
/* app.post('/getCompanyId',(req, result)=>{
    sql = `select company_id from companies where user_id = ${req.body.userId} `;
    cnx.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("no company with this id")
            result.send({ success: false, message: 'no company yet' });
        }else{
            //console.log("Result: " + JSON.stringify(res[0].company_id));
            result.send({ success: true, company_id : res[0].company_id }); 
        }  
    });
}) */

// client ok
/* app.post('/getClientId',(req, result)=>{
    sql = `select client_id from clients where user_id = ${req.body.userId} `;
    cnx.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("no client with this id")
            result.send({ success: false, message: 'no no client with this id' });
        }else{
            //console.log("Result: " + res[0].client_id);
            result.send({ success: true, client_id : res[0].client_id }); 
        }  
    });
})
 */

//subscru+iption ok
/* app.post('/insert_member',cors (),(req, result)=>{
    sql = `INSERT INTO queuemembers (queue_id, client_id, joined_at)
    SELECT ${req.body.queue_id}, ${req.body.client_id}, '${req.body.joined_at}'
    WHERE NOT EXISTS (
        SELECT 1 FROM queuemembers 
        WHERE client_id = ${req.body.client_id} AND queue_id = ${req.body.queue_id}
    );`
    cnx.query(sql, function (err, res) {
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
 */
//client ok
/* app.post('/getClientQueue',(req, result)=>{
    sql = `select * from queuemembers where client_id = ${req.body.client_id} `;
    cnx.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            //console.log("no queues for this company")
            result.send({ success: false, message: "haven't joined any queue" });
        }else{
            console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, queuesList : res }); 
        }  
    });
}) */

//Queue ok
/* app.post('/insert_queue',cors (),(req, result)=>{
    sql=`INSERT INTO queues (queue_name, queue_type, queue_capacity, starting_time, ending_time, notification_type, company_id) VALUES('${req.body.queue_name}','${req.body.queue_type}','${req.body.queue_capacity}','${req.body.time_start}','${req.body.time_end}','${req.body.notification_type}','${req.body.company_id}');`;
    console.log(' queue_name: '+ `${req.body.queue_name}` + ' queue_type: '+ `${req.body.queue_type}` + ' queue_capacity ' + `${req.body.queue_capacity}` +' starting_time: '+ `${req.body.time_start}`+' ending_time: '+ `${req.body.time_end}` +' notification_type: ' + `${req.body.notification_type}` +' company_id: ' + `${req.body.company_id}`);
    cnx.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            console.log("none")
            result.send({ success: false, message: 'no company yet' });
        }else{ 
            console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, companiesList : res }); 
        }  
    });
  }) */
  

  //Queue ok
  /* app.get('/get_queues',cors (),async (req, result)=>{
    sql=`select * from queues;`;
    cnx.query(sql,[true], function (err, res) {
        if (err) throw err;
        if(res == ''){
            result.send({ success: false, message: 'no queue yet' });
        }else{ 
            //console.log("Result: " + JSON.stringify(res));
            result.json({ success: true, queuesList : res }); 
        }  
    });
  }) */

//company  ok
/* app.post('/getQueuesByCompanyId',(req, result)=>{
    sql = `select * from queues where company_id = ${req.body.company_id} `;
    cnx.query(sql, function (err, res) {
        if (err) throw err;
        if(res == ''){
            //console.log("no queues for this company")
            result.send({ success: false, message: 'company has no queue yet' });
        }else{
            //console.log("Result: " + JSON.stringify(res));
            result.send({ success: true, queuesList : res }); 
        }  
    });
})
 */