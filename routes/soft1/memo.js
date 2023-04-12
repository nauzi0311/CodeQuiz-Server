var express = require('express');
require('date-utils');
var router = express.Router();
const fs = require('fs');
const log_file = "./log/soft1/log.txt";

// Hello Worldを返却するAPI
router.get('/', function(req, res, next) {
  const date = new Date();
  const currentTime = date.toFormat('YYYYMMDDHH24MISS');
  var fdata = currentTime + " memo get method called\n";
  fs.appendFile(log_file,fdata,(err) => {if (err) throw err;
    console.log("memo get complete");})
  res.json({'message': 'Hello World'})
})

// memoをPOSTで受け取る
router.post('/', function(req, res, next){
    console.log(req.body)
    const date = new Date();
    const currentTime = date.toFormat('YYYYMMDDHH24MISS');
    var fdata = currentTime + " memo get method called\n";
    fs.appendFile(log_file,fdata,(err) => {if (err) throw err;
    console.log("memo post complete");})
    res.send("Memo Post success");
  })
  
module.exports = router;