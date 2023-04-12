var express = require('express');
var router = express.Router();
require('date-utils');

const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum,ReadJSONFile, GetCourseDir} = require('../library');
const course = 'soft2';

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,id] = QuestData(req.body);
    const file_name = GetFileNameFromId(id);
    const detail_data = ReadJSONFile(file_name);

    var log_data = GenerateTimestamp() + " access detail " + GetSchoolNum(device,course) + " id:" + id + "\n";
    WriteAddFile("./log/soft2/log.txt",log_data);
    WriteAddFile("./log/soft2/" + GetSchoolNum(device,course) + ".txt",log_data);
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
    console.log(GetCourseDir(course) + times + '/' + id + ".json");
    return GetCourseDir(course) + times + '/' + id + ".json";
}

module.exports = router;