const express = require('express');
const router = express.Router();
const mysqlConnection = require("../utils/database");
const jwt = require('jsonwebtoken');

//signup
router.post('/signup', (req, res)=>{
    console.log(req.body);
    data = req.body;
    mysqlConnection.query(`select user_name from users Where user_name = '${data.user_name}';`, function (err, result) {
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
            mysqlConnection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("user signed seccesfully ");
                res.send({success: true})
            });
        } 
    });
});

//login
router.post('/login', (req, res) => {
    this.loginData = req.body;
    console.log('Received loginData:', this.loginData);
    
    sql=`select user_name, user_id from users Where user_name = '${this.loginData.user_name}' and user_password = '${this.loginData.user_password}' and user_type = '${this.loginData.user_type}';`
    console.log(sql);
    mysqlConnection.query(sql,[true], function (err, result) {
        if (err) throw err;
        if(result == ''){
            console.log("none")
            res.json({ success: false, message: 'Incorrect Username or password' });
        }else{ 

            user = {name : req.body.user_name, Role : req.body.user_type, id: result[0].user_id}
            console.log("Result: " + result[0]);
            accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
            res.json({ success: true, message: 'user logd in successfuly', accessToken : accessToken });
            
        }           
    });
       
});


module.exports = router;