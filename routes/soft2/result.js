var express = require('express');
var router = express.Router();
require('date-utils');

const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetUserData, WriteNewJSONFile, GetCourseDir } = require('../library');
const log_file = './log/soft2/log.txt';
const course = 'soft2';
const user_file = GetCourseDir(course) + 'user.json';
const ranking_file = GetCourseDir(course) + 'ranking.json';


/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  console.log(req.body);
  const [device, level, exp,point, id_list, correct_list, second_list, user_answer, badge] = ResultData(req.body);
  var user_data = GetUserData(device,course);
  console.log(user_data);
  //change level
  user_data.level = level;

  //change exp
  user_data.exp = exp;

  //change point
  user_data.point = point;

  //add Date
  var tmp = user_data.date;
  tmp.push(new Date().toFormat('YYYY-MM-DD'));
  user_data.date = Array.from(new Set(tmp))

  //process correct questions
  {
    for (i = 0; i < correct_list.length; i++) {
      if (correct_list[i]) {
        user_data.correct_id.push(id_list[i]);
        user_data.correct_count++;
      }
    }
    user_data.correct_id = Array.from(new Set(user_data.correct_id));
    //降順にソート
    user_data.correct_id.sort(function (first, second) {
      if (first > second) {
        return 1;
      } else if (first < second) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  //badge process
  user_data.badge = badge;

  //write ranking file
  {
    const user_data = ReadJSONFile(user_file);
    var username;
    for (i = 0; i < user_data.length; i++) {
      if (user_data[i].device == device) {
        username = user_data[i].username;
      }
    }

    var ranking_data = ReadJSONFile(ranking_file);
    for (i = 0; i < ranking_data.length; i++) {
      if (ranking_data[i].username == username) {
        ranking_data[i].level = level;
        ranking_data[i].exp = exp;
      }
    }
    
    //sort
    if (ranking_data.length >= 2) {
      ranking_data.sort(function (first, second) {
        if (first.level < second.level) {
          return 1;
        } else if (first.level > second.level) {
          return -1;
        } else {
          if(first.level == second.level) {
            if(first.exp < second.exp){
              return 1;
            }else if(first.exp > second.exp){
              return -1;
            }else{
              return 0;
            }
          }
          return 0;
        }
      })
    }
    WriteNewJSONFile(ranking_file, ranking_data);
  }

  WriteNewJSONFile('./data/soft2/user/' + device + '.json', user_data);
  var log_data = GenerateTimestamp() + " update result " + GetSchoolNum(device,course) + " level:" + level + " point:" + point + "\n";
  WriteAddFile(log_file, log_data);
  console.log(GetCourseNameFromId(id_list) + "\nid_list:" + id_list);
  log_data = GenerateTimestamp() + " update result \n" +
    GetCourseNameFromId(id_list) + "\n" +
    "id: " + id_list + "\n" +
    "second_list: " + second_list + "\n" +
    "user_answer: " + user_answer + "\n" +
    "correct: " + correct_list + "\n" +
    "level: " + user_data.level + "\n" +
    "exp: " + user_data.exp + "\n" +
    "point: " + user_data.point + "\n" +
    "correct_id: " + user_data.correct_id + "\n" +
    "correct_count: " + user_data.correct_count + "\n" +
    "badge: " + user_data.badge + "\n" +
    "date: " + user_data.date[user_data.date.length - 1] + "\n";
  WriteAddFile("./log/soft2/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("result complete");
  res.send("result complete");
});


function ResultData(body) {
  return [body.device, body.level, body.exp,body.point, body.id_list, body.correct_list, body.second_list, body.user_answer, body.badge];
}

function GetCourseNameFromId(ids) {
  var course, times;
  switch (parseInt(ids[0] / 1000)) {
    case 1:
      course = "ソフトウェア演習Ⅰ";
      break;
    case 2:
      course = "ソフトウェア演習Ⅱ";
      break;
    default:
      course = "Undefined Course";
      try {
        throw new Error("Error:" + course + times);
      } catch (e) {
        console.log(e.message);
      }
      break;
  }
  times = parseInt(ids[0] / 100) % 10;
  return course + " " + "第" + times + "回";
}

module.exports = router;