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
console.log("test here:")
console.log("env:",process.env.SENDER)

const get_env = (key) => {
    let env_val = process.env.key;
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
    //   user: get_env("SENDER"),
    //   pass: get_env("MAIL_PASS"),
        user: process.env.SENDER,
        pass: process.env.MAIL_PASS
    },
});

const mailOptions = {
    // from: get_env("SENDER"),
    from: process.env.SENDER,
    to: 'RuizhengWu@outlook.com',
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