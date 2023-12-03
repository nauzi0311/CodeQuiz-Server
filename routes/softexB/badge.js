'use strict'
var express = require('express');
require('date-utils');
var router = express.Router();
const { ReadJSONFile, GenerateTimestamp, WriteAddFile, GetCourseDir} = require('../library');
const { GetCourseText } = require('./constValue');

router.post('/', function (req, res,next) {
    console.log(req.body);
    const device = req.body.device;
    const user_data = ReadJSONFile(GetCourseDir(GetCourseText()) + 'user/' + device + '.json');
    
    const log_data = GenerateTimestamp() + " access badge " + "{" + user_data.school_num + "}" + date + "\n";
    var log_file = "./log/" +  GetCourseText() + "/log.txt"
    WriteAddFile(log_file, log_data);
    log_file = "./log/" +  GetCourseText()+ "/" + user_data.school_num + ".txt";
    WriteAddFile(log_file, log_data);

    res.send("OK");
    console.log("badge complete");
})

module.exports = router;