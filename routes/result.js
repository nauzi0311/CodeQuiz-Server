var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetUserData, WriteNewJSONFile } = require('./library');
const { log } = require('console');

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  const [device, level, point, id_list, correct_list, second_list, user_answer, badge] = ResultData(req.body);
  var user_data = GetUserData(device);
  //change level
  user_data.level = level;

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
  //need
  {
    switch (badge) {
      case 0:
        break;
      case 1://最初の７問ききる
      case 2://レベル３になる
      case 3://レベル５になる
      case 4://レベル７になる
      case 5://レベル９になる
      case 6://レベル10になる
      case 7://レベル13になる
      case 8://レベル15になる
      case 9://3日ログイン
      case 10://5日ログイン
      case 11://7日ログイン
      case 12://10日ログイン
      case 13://3日連続ログイン
      case 14://5日連続ログイン
      case 15://7日連続ログイン
      case 16://10日連続ログイン
      case 17://14日連続ログイン
      case 18://17日連続ログイン
      case 19://21日連続ログイン
      case 20://正解数10
      case 21://正解数20
      case 22://正解数30
      case 23://正解数50
      case 24://正解数70
      case 25://正解数100
      case 26://1~25のバッジを全て取得する
        user_data.badge[badge] = true;
        break;
      //Extra Stage↓
      case 27://レベル20
      case 28://レベル25
      case 28://レベル30


    }
  }

  //write ranking file
  {
    const user_file = ReadJSONFile('./data/user.json');
    var username;
    for (i = 0; i < user_file.length; i++) {
      if (user_file[i].device == device) {
        username = user_file[i].username;
      }
    }

    var ranking_file = ReadJSONFile('./data/ranking.json');
    for (i = 0; i < ranking_file.length; i++) {
      if (ranking_file[i].username == username) {
        ranking_file[i].level = level;
        ranking_file[i].point = point;
      }
    }

    //sort
    //need fix
    if (ranking_file.length >= 2) {
      ranking_file.sort(function (first, second) {
        if (first.level < second.level) {
          return -1;
        } else if (first.level > second.level) {
          return 1;
        } else {
          return 0;
        }
      })
    }
    WriteNewJSONFile('./data/ranking.json', ranking_file);
  }

  WriteNewJSONFile('./data/user/' + device + '.json', user_data);

  var log_data = GenerateTimestamp() + " update result " + GetSchoolNum(device) + " level:" + level + " point:" + point + "\n";
  WriteAddFile("./log/log.txt", log_data);
  console.log(GetCourseNameFromId(id) + "id_list:" + id_list);
  log_data = GenerateTimestamp() + " update result \n" +
    GetCourseNameFromId(id) + "\n" +
    "id: " + id_list + "\n" +
    "second_list: " + second_list + "\n" +
    "user_answer: " + user_answer + "\n" +
    "correct: " + correct_list + "\n" +
    "level: " + user_data.level + "\n" +
    "point: " + user_data.point + "\n" +
    "correct_id: " + user_data.correct_id + "\n" +
    "correct_count: " + user_data.correct_count + "\n" +
    "badge: " + user_data.badge + "\n" +
    "date: " + user_data.date[user_data.date.length - 1] + "\n";
  WriteAddFile("./log/" + GetSchoolNum(device) + ".txt", log_data);
  console.log("result complete");
  res.send("result complete");
});


function ResultData(body) {
  return [body.device, body.level, body.point, body.id_list, body.correct_list, body.second_list, body.user_answer, body.badge];
}

function GetCourseNameFromId(ids) {
  var course, times;
  switch (parseInt(ids[0] / 1000)) {
    case 1:
      course = "ソフトウェア演習Ⅰ";
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