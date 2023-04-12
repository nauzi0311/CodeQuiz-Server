var express = require('express');
var router = express.Router();
require('date-utils');

const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetCourseDir} = require('../library');
const course = 'soft1'

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  console.log(req.body);
  //const [device, area] = RankingData(req.body);
  const device = req.body.device;
  const ranking_file = GetCourseDir(course) + 'ranking.json';
  const log_file = './log/soft1/log.txt';
  var rank = 0;
  var ranking_data = ReadJSONFile(ranking_file);
  for(i = 0; i < ranking_data.length; i++) {
    if(ranking_data[i].device == device){
      rank = i + 1;
    }
  }
  var response = {"ranking" : ranking_data,"count":rank};
  var log_data = GenerateTimestamp() + " access ranking " + GetSchoolNum(device,course) + "\n";
  console.log(log_data);
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/soft1/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("ranking complete");
  res.json(response);
});

module.exports = router;