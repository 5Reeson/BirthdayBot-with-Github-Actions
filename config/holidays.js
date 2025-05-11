// 设想中会出现三种情况：
// 1. 就是某个日子，那我们直接拿
// 2. 农历，需要计算
// 3. 母亲节这种，那要调用两层工具函数

const dayjs = require('dayjs');

const holidayDates = {
  // # 祝爹妈、孩子
  "母亲节":["WeekRule"],
  "父亲节":["WeekRule"],
  "妇女节":["03-08"],
  "儿童节":["06-01"],

  // # 中国传统节日
  "春节":["Chinese","01-01"],
  "元宵节":["Chinese","01-15"],
  "清明节":["Chinese","04-04"],
  "端午节":["Chinese","05-05"],
  "中秋节":["Chinese","08-15"],
  "重阳节":["Chinese","09-09"],

  // # 祝对象
  "5.20":["05-20"],
  "情人节":["02-14"],
  "白色情人节":["03-14"],
  "七夕节":["Chinese","07-07"],

  // # 其他
  "教师节":["09-10"],
  "感恩节":["WeekRule"],
}

// 计算 第x个月,第y个星期z
// 例如 计算每年5月的第2个星期日
// todo：可能会有出错情况，比如不存在第4个星期X等等，
const calculate_WeekRule = function(year, month, weekNumber, dayOfWeek) {
  // 计算给定年份指定月份的第一个日期
  const date = dayjs().set('month', month - 1).startOf('month');
  // 找到给定星期几的日期
  const resultDate = date.add(weekNumber - 1, 'week').day(dayOfWeek);
  return resultDate.format('YYYY-MM-DD'); // 返回格式为 'YYYY-MM-DD' 的日期字符串
}

// 示例：计算每年 5 月的第二个星期日
const mothersDay = calculate_WeekRule(2024, 5, 2, 7);
console.log('每年 5 月的第二个星期日:', mothersDay);

module.exports = {
  holidayDates,
  calculate_WeekRule,
}