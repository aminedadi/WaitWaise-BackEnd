// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const router = express.Router();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

var cnx = mysql.createConnection({
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
 

//signup
router.post('/api/signup', (req, res)=>{
    console.log(req.body);
    data = req.body;
    cnx.query(`select user_name from users Where user_name = '${data.user_name}';`, function (err, result) {
        if (err) throw err;
        if(Object.keys(result).length !== 0 ){
            console.log("Username Already in Use")

        }else{
            if(data.user_type === 'client'){
                sql = `START TRANSACTION;
                INSERT INTO users (user_name, user_password, user_type) VALUES ('${data.user_name}','${data.user_password}','${data.user_type}');
                SET @last_user_id := LAST_INSERT_ID();
                INSERT INTO clients (user_id, full_name, phone_number,email) VALUES (@last_user_id,'${data.full_name}','${data.phone_number}','${data.email}');
                COMMIT;`;
                console.log(`RREGULAR USER => username ${data.user_name}, pass ${data.user_password} , type ${data.user_type}, fullname ${data.full_name}, number ${data.phone_number}, email ${data.email}`)
            }else{
                sql = `START TRANSACTION;
                INSERT INTO users (user_name, user_password, user_type) VALUES ('${data.user_name}','${data.user_password}','${data.user_type}');
                SET @last_user_id := LAST_INSERT_ID();
                INSERT INTO companies (user_id, business_name, business_phone,business_email,address,type_of_business) VALUES (@last_user_id,'${data.business_name}','${data.business_phone}','${data.business_email}','${data.address}','${data.type_of_business}');
                COMMIT;`;
                console.log(`COMPANY => username ${data.user_name}, pass ${data.user_password} , type ${data.user_type}, fullname ${data.business_name}, number ${data.business_phone}, email ${data.business_email}, adress ${data.address}, b type ${data.type_of_business}`);
            }
            cnx.query(sql, function (err, result) {
                if (err) throw err;
                console.log("user signed seccesfully ");
            });
        } 
    });
});

//login
app.post('/api/login', (req, res) => {
    this.loginData = req.body;
    console.log('Received loginData:', this.loginData);
    
    sql=`select user_name from users Where user_name = '${this.loginData.user_name}' and user_password = '${this.loginData.user_password}' and user_type = '${this.loginData.user_type}';`
    console.log(sql);
    cnx.query(sql, function (err, result) {
        if (err) throw err;
        if(result == ''){
            console.log("none")
            res.json({ success: false, message: 'Incorrect Username or password' });
        }else{ 
            console.log("user : " + req.body.user_name);
            user = {name : req.body.user_name, Role : req.body.user_type}
            console.log("Result: " + JSON.stringify(result));
            accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'user logd in successfuly', accessToken : accessToken });
            
        }           
    });
       
});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
