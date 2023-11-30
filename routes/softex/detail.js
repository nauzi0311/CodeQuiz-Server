var express = require('express');
var router = express.Router();
require('date-utils');

const { WriteAddFile, GenerateTimestamp, GetSchoolNum,ReadJSONFile, GetCourseDir} = require('../library');
const { GetCourseText } = require('./constValue');
const course = 'softex';

router.post('/', function(req, res, next) {
    console.log(req.body);
    const [device,id] = QuestData(req.body);
    const file_name = GetFileNameFromId(id);
    const detail_data = ReadJSONFile(file_name);

    var log_data = GenerateTimestamp() + " access detail " + GetSchoolNum(device,course) + " id:" + id + "\n";
    WriteAddFile("./log/"+ GetCourseText() + "/log.txt",log_data);
    WriteAddFile("./log/"+ GetCourseText() + "/" + GetSchoolNum(device,course) + ".txt",log_data);
    console.log("detail complete");
    res.json(detail_data);
});


function QuestData(body){
    return [body.device,body.id];
}

function GetFileNameFromId(id){
    //soft1 1~15
    // ex_id)1105 1910 11305
    //soft2 16~30
    // ex_id)2103 2804 21406
    const course = GetCourseText()
    let times = String(parseInt(id)).slice(0,-2)
    if(parseInt(times[0]) === '1'){
        times = parseInt(times.substring(1))
    }else{
        times = parseInt(times.substring(1)) + 15
    }
    times = parseInt(id / 100) % 10;
    console.log(GetCourseDir(course) + times + '/' + id + ".json");
    return GetCourseDir(course) + times + '/' + id + ".json";
}

module.exports = router;