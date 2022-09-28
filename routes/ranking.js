var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetUserData, WriteNewJSONFile } = require('./library');

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  console.log(req.body);
  //const [device, area] = RankingData(req.body);
  const device = req.body.device;

  var ranking_data = ReadJSONFile('./data/ranking.json');
  var log_data = GenerateTimestamp() + " access ranking " + GetSchoolNum(device) + " level:" + level + " point:" + point + "\n";
  WriteAddFile("./log/log.txt", log_data);
  WriteAddFile("./log/" + GetSchoolNum(device) + ".txt", log_data);
  console.log("ranking complete");
  res.json(ranking_data);
});


function RankingData(body) {
  return [body.device, body.area];
}

module.exports = router;