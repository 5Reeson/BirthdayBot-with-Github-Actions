// index.js
// 读取、处理各种配置文件

// 自己的函数
// 引入 sendEmail 函数
const sendEmail = require('./path/to/your/file');

// 外部库
const fs = require('fs');           // node 的文件处理库
const yaml = require('js-yaml');    // yaml 处理库
const dayjs = require('dayjs');     // 引入 dayjs 时间处理库
const lunar_trans = require('js-calendar-converter');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

// import dayjs from 'dayjs';  // 引入 dayjs 时间处理库
// import fs from 'fs';        // node 的文件处理库
// import yaml from 'js-yaml'; // yaml 处理库

const defaultAdvance = [7,3,1]; // 默认在生日前 7 天、3 天、1 天进行提醒
const birthdayPath = "./config/birthdayInfo.yaml";
const holidayPath = "./config/birthdayInfo.yaml";

// 1. 读取 birthdayInfo.yaml, 存储下来
var birthdayInfo = [];
try{
    const fileContents = fs.readFileSync(birthdayPath, 'utf8');
    const data = yaml.load(fileContents);
    birthdayInfo = [...data.People];
} catch (e) {
    console.log(e);
    console.log("YAML 文件格式错误")
}
// 2. 遍历数组，利用 dayjs 计算时间差
var now = dayjs();
var reminds = []; // 对应发送邮件那块的提醒0，存储所有需要提醒的信息，把这个作为参数传出去
for(let people of birthdayInfo){
    // 属性
    const birthdate = people.Birthdate;
    const calendar = people.Calendar;
    const name = people.Name;
    const email = people.Email;                 // 选配
    const advancedDay = people.AdvancedDay ?    // 选配
                        people.AdvancedDay : [...defaultAdvance]; 
    // console.log(name, birthdate, calendar, email, advancedDay);
    
    // 这里这个逻辑还真得捋一捋哎
    // 0. 时区问题，要 push 之后测试一下
    // 1. 用户可以输入年份或者不输入年份；（“2000-07-12”）或者("07-12") 做容错
    // 2. 对于这个天数差的判断，要分 “同年” 和 “不同年”，做个逻辑处理哈
    // 3. 农历处理，这里又要结合年份了（其实无所谓？）
    //      比如现在是 2023.12.28， 
    //      对于 12.25 应该用 2024.12.25 来计算，
    //      对于 01.01 也应该用 2024.01.01 来计算
    //      对于 12.30 则应该用 2023.12.30 来计算
        
    // 将日期字符串转化为 dayjs 对象，允许多种格式的输入 进行容错
    var recordedBirthday = dayjs(birthdate,
                                    ["YYYY-MM-DD",
                                     "YYYY-M-DD",
                                     "YYYY-MM-D",
                                     "YYYY-M-D",
                                     "MM-DD","M-DD","MM-D","M-D"]);
    let diffInDays; // 距离朋友生日的天数
    let solar_date;
    // 1. 农历的情况, calendar == "lunar"
    if(calendar == "lunar"){
        // 先算出此时此刻，在农历算哪一年
        let cur_lunar_year = lunar_trans.solar2lunar(now.year(),now.month()+1,now.date()).lYear;
        // console.log("此时此刻的农历年:", cur_lunar_year);
        // 用当前的农历年 + 记录的农历月/日 计算出公历日期
        let {cDay, cMonth, cYear} = lunar_trans.lunar2solar(cur_lunar_year, recordedBirthday.month()+1, recordedBirthday.date());
        // console.log("农历日期:", now.year(), recordedBirthday.month()+1, recordedBirthday.date());
        // console.log("转换后日期:", cYear, cMonth, cDay); // 这里如果出现 比如说农历是12月29号啥的 会跨年，怎么处理呢
        var solar_str = ""+cYear+"-"+cMonth+"-"+cDay;
        solar_date = dayjs(solar_str,"YYYY-M-D")
        // console.log("看看")
        // console.log(solar_date)

        if(solar_date.isBefore(now, 'day')){
            // 如果生日在今天之前，那么还有一年；
            const nextyear_str = lunar_trans.lunar2solar(cur_lunar_year+1,recordedBirthday.month()+1, recordedBirthday.date()).date;
            const nextBirthday = dayjs(nextyear_str,"YYYY-M-D");
            diffInDays = nextBirthday.startOf('day').diff(now.startOf('day'), 'day');
            // todo
        } else {
            // 如果生日在今天之后，那么离生日还有几天
            diffInDays = solar_date.startOf('day').diff(now.startOf('day'), 'day');
        }
    } 
    // 公历的情况 calendar == "solar"
    else {
        var birthday_calculate = recordedBirthday.clone(); // 复制一份，用于计算天数差
        
        // 如果用户输入的日期是 "YYYY-MM-DD" 格式，比如 "2000-07-12"
        // 需要把这里的 "YYYY" 统一转换到当前的年份进行计算
        if(birthday_calculate.year() != now.year())
        birthday_calculate = birthday_calculate.year(now.year());
            
        if(birthday_calculate.isBefore(now, 'day')){
            // 如果生日在今天之前，那么离生日还有一年
            const nextBirthday = birthday_calculate.add(1, 'year');
            diffInDays = nextBirthday.startOf('day').diff(now.startOf('day'), 'day');
        } else {
            // 如果生日在今天之后，那么离生日还有几天
            diffInDays = birthday_calculate.startOf('day').diff(now.startOf('day'), 'day');
        }
    }

    // 公共逻辑提出来
    
    for(let advanced of advancedDay){
        if(advanced == diffInDays){
            console.log("存入 reminds 数组")
            // 传入参数，发送邮件
            // 0. 这里不太对，应该不是直接发送邮件，而是把这些对象封装到一个数组里，统一发邮件
            // 1. 用户信息，封装成对象传过去吧（名字、公历生日、农历生日(如果有)、
            //                              几岁了(如果有)、朋友的邮箱(考虑删掉)、还差几天生日）
            let frind_info = {
                name: name,
                solar_birthday: recordedBirthday.format("MM-DD"), // 转化成 MM-DD 格式的字符串哈
                lunar_birthday: solar_date == undefined ? null : solar_date.format("MM-DD"),
                age: recordedBirthday.year() >= now.year() ? null : now.year() - recordedBirthday.year(),
                email: email == "" ? null : email,
                diff: diffInDays
            }
            reminds.push(frind_info);
            console.log("reminds");
            console.log(reminds);
            break;
        }
    }
}

// 发送邮件, reminds 作为参数～（应该还要拼接上 holidayInfo）
console.log("这里发送邮件")
sendEmail(reminds);

// console.log("现在:","2023-01-10");
// console.log("测试农历年:",lunar_trans.solar2lunar("2023","01","10").lunarDate);
// console.log(typeof(lunar_trans.solar2lunar("2023","01","10").lunarDate))
// console.log("朋友1生日 农历12月25")
// let test = lunar_trans.lunar2solar("2022","12","25")
// console.log("朋友1生日 公历:",test.date);
// console.log("朋友2生日 农历1月8")
// let test2 = lunar_trans.lunar2solar("2023","01","08")
// console.log("朋友2生日 公历:",test2.date);


// 现在：2023-01-10
// 朋友生日: 农历12月20
// 