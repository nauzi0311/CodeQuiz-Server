var express = require('express');
var router = express.Router();
require('date-utils');

const child_process = require("child_process");
const course = 'soft1'
const { WriteAddFile, GenerateTimestamp, GetSchoolNum,ReadJSONFile} = require('../library');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,id] = QuestData(req.body);
    const file_name = GetFileNameFromId(id);
    const detail_data = ReadJSONFile(file_name);

    var log_data = GenerateTimestamp() + " access detail " + GetSchoolNum(device,course) + " id:" + id + "\n";
    WriteAddFile("./log/soft1/log.txt",log_data);
    WriteAddFile("./log/soft1/" + GetSchoolNum(device,course) + ".txt",log_data);
    console.log("detail complete");
    res.json(detail_data);
});


function QuestData(body){
    return [body.device,body.id];
}

function GetFileNameFromId(id){
    console.log("id:" + id);
    var course,times;
    console.log("Parse:" + parseInt(String(id).charAt(0)));
    switch(parseInt(String(id).charAt(0))){
        case 1:
        course = "soft1";
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
    times = parseInt(String(id/100).substring(1));
    console.log("./data/" + course + '/' + times + '/' + id + ".json");
    return "./data/" + course + '/' + times + '/' + id + ".json";
}

module.exports = router;