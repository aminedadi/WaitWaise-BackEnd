const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./models"); 
const  { Queue } = require("./models")
const  { QueueMember } = require("./models")
//const  { Company } = require("./models")
//const  { Client } = require("./models")


app.use(cors());
app.use(function(req,body,next){
  body.setHeader ('Access-Control-Allow-Origin' ,'http://localhost:4200');
  next();
});
app.use(bodyParser.json());

db.sequelize.sync().then((req)=>{
  app.listen(3000,()=>{
      console.log("server running");
  })
})

app.post('/insert_queue',cors (),(req, res)=>{
  Queue.create({
    queue_name : req.body.queue_name,
    queue_type: req.body.queue_type,
    queue_capacity:req.body.queue_capacity,
    starting_time: req.body.time_start,
    ending_time:req.body.time_end,
    notification_type:req.body.notification_type,
  }).catch((err)=>{
    if(err){
      console.log("error log " + err);
    }
    
  },res=>{console.log(res.message)});

})

app.get('/get_queues',cors (),async (req, res)=>{
    queues = await Queue.findAll({raw: true}); 
    console.log("All Qs:", queues);
    console.log("All Qs:", queues[0].queue_name);
    /* console.log("All Qs:", queues.map(a => (a.get({plain: true}))));*/
    res.send({quee : queues});
})



app.get('/get_queue/id/:id',cors(),async (req,res)=>{
  q = await Queue.findAll({where: {
    id: req.params.id
    
  }});
  console.log(q); 
 
})
/* app.get('/get_companies', cors(), async (req, res)=>{
  companies await Company.findAll({raw: true});
})
 */


















/* 
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('my_db', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } */