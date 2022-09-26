'use strict'
var express = require('express');
const { json, type } = require('express/lib/response');
require('date-utils');
var router = express.Router();
const fs = require('fs');
const { ReadJSONFile, GenerateTimestamp, WriteAddFile, WriteNewFile } = require('./library');

router.post('/', function (req, res,next) {
    console.log(req.body);
    const device = req.body.device;
    const date = req.body.date;
    const user_data = ReadJSONFile('./data/user/' + device + '.json');
    
    const log_data = GenerateTimestamp() + " access calender " + "{" + user_data.school_num + "}" + date + "\n";
    var log_file = "./log/log.txt"
    WriteAddFile(log_file, log_data);
    log_file = "./log/" + user_data.school_num + ".txt";
    WriteAddFile(log_file, log_data);

    res.send("OK");
    console.log("calender complete");
})

module.exports = router;