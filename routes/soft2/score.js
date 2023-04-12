var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { ReadJSONFile} = require('../library');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,level] = ScoreData(req.body);
    var id_list = [];
    var title_list = [];
    for(i = 1;i <= level;i++) {
        var path = './data/soft2/' + i + '/';
        const filenames = fs.readdirSync(path);
        if(filenames.length > 0) {
            filenames.forEach((fname) => {
                const data = ReadJSONFile(path + fname);
                id_list.push(data.id);
                title_list.push(data.title);
            });
        }
    }
    var json = {"id_list" : id_list,"title_list":title_list};
    res.json(json);
});


function ScoreData(body){
    return [body.device,body.level];
}

function GetFileNameFromId(id){
    console.log(id);
    var course,times;
    console.log(parseInt(id / 1000));
    switch(parseInt(id / 1000)){
        case 1:
            course = "soft1";
            break;
        case 2:
            course = "soft2";
            break;
        default:
            course = "Undefined Course";
            try{
                throw new Error("Error:" + id);
            }catch(e){
                console.log(e.message);
            }
            break;
    }
    times = parseInt(id / 100) % 10;
    console.log("./data/soft2/" + course + '/' + times + '/' + id + ".json");
    return "./data/soft2/" + course + '/' + times + '/' + id + ".json";
}

module.exports = router;