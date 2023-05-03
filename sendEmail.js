const { error, info } = require('console');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: '465',
    secureConnection: true,
    auth: {
      user:'764432291@qq.com',
      pass:"ekrqgwdaxejhbeeb"
    },
});

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

const mailOptions = {
    from: '764432291@qq.com',
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