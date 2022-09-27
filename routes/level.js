var express = require('express');
const { json, type } = require('express/lib/response');
var router = express.Router();
const fs = require('fs');

router.post('/', function(req, res, next) {
    console.log(req.body);
    var jfile = './data/level.json'
    var device = req.body.device;
    var level = req.body.level;
    var id = req.body.id;
    var data = JSON.parse(fs.readFileSync(jfile,'utf-8'));
    var add_data = {"device_info":device,"level":level,"id":id};
    data.push(add_data);
    fs.writeFileSync(jfile,JSON.stringify(data,null,'    '));
    if(level != 'beginner'){
        var ufile = './data/user/' + device + '.json';
        var udata = JSON.parse(fs.readFileSync(ufile,'utf-8'));
        if(level == 'intermidiate'){
            udata.level = 6;
        }else{
            udata.level = 12;
        }
        fs.writeFileSync(ufile,JSON.stringify(udata,null,'    '));
    }
    const date = new Date();
    const currentTime = date.toFormat('YYYYMMDDHH24MISS');
    var fdata = currentTime + " " + "module {level} " + device + " " + level + "\n";
    fs.appendFile("log.txt",fdata,(err) => {if (err) throw err;
    console.log("level complete");})
    res.send("Level OK");
});

module.exports = router;