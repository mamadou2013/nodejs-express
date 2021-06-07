const connection = require('../util/db');

const findProgramById = (req,res)=>{
    let sql = "SELECT *  FROM program WHERE id="+req.body.id;
    connection.query(sql,(err,result)=>{
        if(err){
            res.send(JSON.stringify({status:501, error:1, response:"An error occured"}));
        }else{
            res.send(JSON.stringify({status:201, error:null, response:result}));
        }
    });
}

module.exports = {findProgramById};