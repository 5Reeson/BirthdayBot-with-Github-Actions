const test = {
    a: {
        poi_id: 1, 
        b: {
            poi_id: 2, 
            poi_id_str: '1111',
            c: {
                poi_id: '2222'
            },
            d: {
                a: 1
            }
        }
    }
}

function check(obj){
    const route = [];

    function dfs(obj, curRoute){
        // 判断是否有 key
        if(obj.hasOwnProperty('poi_id')){
            console.log("进来一层！")
            if(!obj.hasOwnProperty('poi_id_str')){
                console.log('=======');
                console.log("进来二层！");
                console.log(obj);
                console.log(curRoute);
                console.log('=======')
                curRoute = curRoute + '.' + 'poi_id';
                // 添加结果
                route.push(curRoute);
            }
        }
        
        // 遍历所有 keys
        for(let key in obj){
            if(typeof obj[key] === 'object'){
                let newRoute;
                curRoute === '' ? newRoute = key : newRoute = curRoute + '.' + key;
                dfs(obj[key], newRoute);
            }
        }
    }
    dfs(obj,"");
    
    return route;
}

console.log(check(test));