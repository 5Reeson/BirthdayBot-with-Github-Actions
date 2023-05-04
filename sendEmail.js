const { error, info } = require('console');
const nodemailer = require('nodemailer');

const htmlStr = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>大标题test</h1>
    <p>p标签test</p>
  </body>
</html>
`

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

const mailOptions = {
    from: get_env("SENDER"),
    // to: 'RuizhengWu@outlook.com', 
    to: receiver_arr(get_env("RECEIVER")), // 这里的to 既可以是string，也可以是string 数组
    subject: '一封测试邮件',
    html: htmlStr
};

transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
    } else {
        console.log('发送成功: ' + info.response);
    }
})