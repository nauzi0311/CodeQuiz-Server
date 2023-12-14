var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { ReadJSONFile} = require('../library');
const { GetCourseText } = require('./constValue');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,level] = ScoreData(req.body);
    var id_list = [];
    var title_list = [];
    for(i = 1;i <= level;i++) {
        if(i >= 30){
            break;
        }
        if( i == 11 || i == 13 ||
            i == 25 || i == 28){
            continue;
        }
        var path = './data/'+ GetCourseText() +'/' + i + '/';
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

module.exports = router;