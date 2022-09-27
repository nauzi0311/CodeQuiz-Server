var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum,ReadJSONFile,GetUserData, WriteNewFile } = require('./library');

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,id] = QuestData(req.body);
    const file_name = GetFileNameFromId(id);
    const detail_data = ReadJSONFile(file_name);

    var log_data = GenerateTimestamp() + " access detail " + GetSchoolNum(device) + " id:" + id + "\n";
    WriteAddFile("./log/log.txt",log_data);
    WriteAddFile("./log/" + GetSchoolNum(device) + ".txt",log_data);
    console.log("detail complete");
    res.json(detail_data);
});


function QuestData(body){
    return [body.device,body.id];
}

function GetFileNameFromId(id){
    console.log(id);
    var course,times;
    console.log(parseInt(id / 1000));
    switch(parseInt(id / 1000)){
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
    times = parseInt(id / 100) % 10;
    console.log("./data/" + course + '/' + times + '/' + id + ".json");
    return "./data/" + course + '/' + times + '/' + id + ".json";
}

module.exports = router;