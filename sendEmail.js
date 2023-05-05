const { error, info } = require('console');
const nodemailer = require('nodemailer');

const get_env = (key) => {
    let env_val = process.env[key]; // 获取对应参数的环境变量
    if(env_val == undefined){
        return error("对于输入的key:",key,",没有设置环境变量");
    } else {
        return env_val;
    }
}

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: '465',
    secureConnection: true,
    auth: {
      user: get_env("SENDER"),
      pass: get_env("MAIL_PASS"),
    },
});

const receiver_arr = (str) => {
    let arr = str.split(";");
    if(arr.length > 1) // 正确配置了多个邮箱，直接返回
        return arr;
    else{ // 只配置了一个邮箱，或者分隔符有问题
        if(arr[0].length == 0)
            return error("出错，空字符串")
        if(arr[0].indexOf("@") !== arr[0].lastIndexOf("@"))
            return error("非法的邮件接收者，请检查分隔符是否是英文分号")
        return arr;
    }
}

const sendEmail = (reminds) => {
    // 生日提醒 和 节日提醒 要做下判断，三元表达式之类的
    var htmlStr = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
            <h1>生日提醒</h1>
            <ul>
                ${reminds.map(
                    remind =>
                    `<li>姓名：${remind.name}，还有 ${remind.diff} 天就要过生日了！
                        公历生日：${remind.solar_birthday}，
                        阳历生日：${remind.lunar_birthday == null ? "未记录" : remind.lunar_birthday},
                        过生日时的年龄是：${remind.age == null ? "未记录" : remind.age}
                    </li>`
                ).join('')}
            </ul>
            <h1>节日提醒</h1>
        </body>
        </html>
    `
    const mailOptions = {
        from: get_env("SENDER"),
        // to: 'RuizhengWu@outlook.com', 
        to: receiver_arr(get_env("RECEIVERS")), // 这里的to 既可以是string，也可以是string 数组
        subject: '生日提醒Bot',
        html: htmlStr
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
        } else {
            console.log('发送成功: ' + info.response);
        }
    })
}

module.exports = sendEmail;