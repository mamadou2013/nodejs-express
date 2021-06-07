const connection = require('../util/db');
const validator = require('validator');

const valid = (input) => input.split(' ').every(function (str) { return validator.isAlphanumeric(str); });

const create = (req,res)=>{
    let data = {name:req.body.name, reference:req.body.reference, phone:req.body.phone};

    if(valid(data.name) &&  !validator.isEmpty(data.name) && valid(data.reference) &&  !validator.isEmpty(data.reference) && valid(data.phone) &&  !validator.isEmpty(data.phone) ){
       if(validator.isAlphanumeric(data.reference) &&  !validator.isEmpty(data.reference)){
        let sql = 'INSERT INTO students SET ?';
        connection.query(sql, data, (err, result)=>{
        if(err) throw err; 
        res.send(JSON.stringify({status: 201, error:null, response:'success'}));
        });
       }else{
        res.send(JSON.stringify({response:'try to enter a valid reference'}));
       }
    }else{
        res.send(JSON.stringify({response:'the fields name, reference and phone are required and must be in a good format'}));
    } 
};

const createPassword = (req,res)=>{
    console.log("password update");
    let user = {username:req.body.username, password:req.body.password};
    console.log(user);
    let sql = "UPDATE `students` SET `password` = '"+`${user.password}`+"'"+"WHERE `reference` LIKE '"+`${user.username}`+"'";
    connection.query(sql,(err,result)=>{
        if(err) {
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            res.send(JSON.stringify({status:201, error:null, response:"user account created successfully"}));
        }
    });
}

const findAll = async (req,res)=>{
    console.log("inside find all students")
    let sql = "SELECT * FROM students ";
    await connection.query(sql, (err,result)=>{
        if(err){
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            res.send(JSON.stringify({status:201, error:null, response:result}));
        }
    });
};

const findById = (req, res)=>{
    let sql = "SELECT *  FROM students WHERE id="+req.params.id;
    connection.query(sql,(err,result)=>{
        if(err){
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            res.send(JSON.stringify({status:201, error:null, response:result}));
        }
    });
};

const studdentAuthentication = (req,res)=>{

    let user = {reference: req.body.reference, phone: req.body.phone}
    console.log(user);
    if(valid(user.reference) && !validator.isEmpty(user.reference) && valid(user.phone) && !validator.isEmpty(user.phone)){
        let sql = "SELECT * FROM `students` WHERE `reference` LIKE '"+`${user.reference}`+"' AND `phone` LIKE '"+`${user.phone}`+"'";
    connection.query(sql,(err,result)=>{
        if(err){
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            if(result.length == 0){
                //console.log(result.length);
                res.send(JSON.stringify({status:202, error:null, response:"user does not exist"})); 
            }else{
                //console.log(result.length);
                res.send(JSON.stringify({status:201, error:null, response:result}));
            }
        } 
    });
    }else{
        res.send(JSON.stringify({message: "Make sure to provide a valid and existing registration number and phone"})); 
    }
   // res.send(JSON.stringify({status:200, error:null, response:refs}));

};

const loginUser = (req,res)=>{
    let user = {username: req.body.username, password: req.body.password}
    //console.log(user);
    if(valid(user.username) && !validator.isEmpty(user.username) && valid(user.password) && !validator.isEmpty(user.password)){
        let sql = "SELECT * FROM `students` WHERE `reference` LIKE '"+`${user.username}`+"' AND `password` LIKE '"+`${user.password}`+"'";
    connection.query(sql,(err,result)=>{
        if(err){
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            if(result.length == 0){
                //console.log(result.length);
                res.send(JSON.stringify({status:202, error:null, response:"user does not exist"})); 
            }else{
                //console.log(result.length);
                res.send(JSON.stringify({status:201, error:null, response:result}));
            }
        } 
    });
    }else{
        res.send(JSON.stringify({status:501, message: "Make sure to provide a valid and existing registration number and phone"})); 
    }
}

module.exports = {
    create,
    findAll,
    findById,
    studdentAuthentication,
    createPassword,
    loginUser
};