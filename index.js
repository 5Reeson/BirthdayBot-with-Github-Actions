// index.js
// 读取、处理各种配置文件

const dayjs = require('dayjs');     // 引入 dayjs 时间处理库
const fs = require('fs');           // node 的文件处理库
const yaml = require('js-yaml');    // yaml 处理库

// import dayjs from 'dayjs';  // 引入 dayjs 时间处理库
// import fs from 'fs';        // node 的文件处理库
// import yaml from 'js-yaml'; // yaml 处理库

const advancedDays = [7,3,1]; // 默认在生日前 7 天、3 天、1 天进行提醒
const birthdayPath = "./config/birthdayInfo.yaml";
const holidayPath = "./config/birthdayInfo.yaml";

// 1. 读取 birthdayInfo.yaml, 存储下来
const birthdayInfo = [];
try{
    const fileContents = fs.readFileSync(birthdayPath, 'utf8');
    const data = yaml.load(fileContents);
    birthdayInfo = [...data.People];
    console.log("看看 birthday");
    console.log(birthdayInfo);
} catch (e) {
    console.log(e);
    console.log("YAML 文件格式错误")
}
// 2. 遍历数组，利用 dayjs 计算时间差，如果符合预配置好的
var now = dayjs();
