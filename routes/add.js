var express = require('express');
const { json, type } = require('express/lib/response');
var router = express.Router();
const fs = require('fs');

router.post('/', function(req, res, next) {
    console.log(req.body);
    var id = req.body.id;
    var title = req.body.title;
    var question = req.body.question;
    var output = req.body.output;
    var answer = req.body.answer;
    var exp = req.body.exp;
    var point = req.body.point;
    var restrict = req.body.restrict;
    var jfile = './data/' + id + '.json';

    var data = {"id":id,"title":title,"question":question,"output":output,"answer":answer,"exp":exp,"point":point,"restrict":restrict};
    fs.writeFileSync(jfile,JSON.stringify(data,null,'    '));
    const date = new Date();
    const currentTime = date.toFormat('YYYYMMDDHH24MISS');
    var fdata = currentTime + " module " + "{add} " + data + "\n";
    fs.appendFile("log.txt",fdata,(err) => {if (err) throw err;
    console.log("index complete");})
    res.json(data);
});

module.exports = router;