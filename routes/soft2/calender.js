'use strict'
var express = require('express');
require('date-utils');
var router = express.Router();
const { ReadJSONFile, GenerateTimestamp, WriteAddFile, GetCourseDir} = require('../library');

router.post('/', function (req, res,next) {
    console.log(req.body);
    const device = req.body.device;
    const date = req.body.date;
    const user_data = ReadJSONFile(GetCourseDir('soft2') + 'user/' + device + '.json');
    
    const log_data = GenerateTimestamp() + " access calender " + "{" + user_data.school_num + "}" + date + "\n";
    var log_file = "./log/soft2/log.txt"
    WriteAddFile(log_file, log_data);
    log_file = "./log/soft2/" + user_data.school_num + ".txt";
    WriteAddFile(log_file, log_data);

    res.send("OK");
    console.log("calender complete");
})

module.exports = router;