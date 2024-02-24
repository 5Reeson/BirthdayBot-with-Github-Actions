// let promise = new Promise(() => {
//     throw new Error('error')
// })
// .catch(function(err){
//     console.log("自己的错误处理");
//     console.log(err)
// });
// console.log(2333333);

const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
})

p2
.then(result => console.log(result))
.catch(error => console.log(error))
// Error: fail