// 不存在闭包的情况
var data = [];

for (let i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}
// 输出的都是3
data[0]();
data[1]();
data[2]();