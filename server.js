/* const express = require('express');
const app = express();
const http = require('http').createServer(app);
const mysql = require('mysql');

const io = require('socket.io')(http,{cors:{origin:"http://localhost:4200"}});



let currentTurnNumber = 1 ;
let clientsList = {id : 0, socketId : ['']} ;

//connecting to sql

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "my_db"
});

sql='select * from person'
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result[0].first_name);
  });
});

app.use(bodyParser.json());

// Authentication endpoint
app.post('/api/login', async (req, res) => {
  // Handle authentication using dbHandler
  const result = await dbHandler.authenticateUser(req.body.userName, req.body.userPassword);
  res.json(result);
});

// Data retrieval endpoint
app.get('/api/data', async (req, res) => {
  // Retrieve data from the database using dbHandler
  const data = await dbHandler.getData();
  res.json(data);
});

// Serve your static files (HTML, CSS, JS, etc.) from a public folder
app.use(express.static('public'));
/* app.get('/',(req,res)=>{res.sendFile(__dirname+'/index.html')}); */
/*
  io.on('connection', (socket) => {

    console.log('A user connected with id : ' + socket.id);
    clientsList.id += 1 ;
    clientsList.socketId = socket.id;
    clientId = socket.id;
    message = 'your turn is : ' + clientsList.id + 'current turn number is ' + currentTurnNumber; 

    
  io.emit('message', 'this is message from server');    
  socket.on('getTurnNumber', () => {
      // Send the current turn number back to the requesting client
      socket.emit('turnNumber', currentTurnNumber);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 */