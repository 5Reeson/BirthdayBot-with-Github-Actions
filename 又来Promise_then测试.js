Promise.resolve()
.then(()=>{
        setTimeout(()=>{
            console.log("第一个then, 计时器里面");
            // resolve();
        }, 1000)
})
.then(()=>{console.log("第二个then")})
.then(()=>{console.log("第三个then")})