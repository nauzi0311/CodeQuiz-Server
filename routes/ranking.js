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
  var rank = 0;
  var ranking_data = ReadJSONFile('./data/ranking.json');
  for(i = 0; i < ranking_data.length; i++) {
    if(ranking_data[i].device == device){
      rank = i + 1;
    }
  }
  var response = {"ranking" : ranking_data,"count":rank};
  var log_data = GenerateTimestamp() + " access ranking " + GetSchoolNum(device) + "\n";
  console.log(log_data);
  WriteAddFile("./log/log.txt", log_data);
  WriteAddFile("./log/" + GetSchoolNum(device) + ".txt", log_data);
  console.log("ranking complete");
  res.json(response);
});


function RankingData(body) {
  return [body.device, body.area];
}

module.exports = router;