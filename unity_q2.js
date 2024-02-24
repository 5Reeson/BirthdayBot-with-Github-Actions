// 在一条环形的路线上有n个加油站，每个加油站可以加油的量为gas[i]。
// 现在你有一辆油箱容量无限的车，从每一站到下一站的油耗为cost[i]。
// 现在你从任一一站开始旅行，是否能走完这条环形路线？初始油箱为空，
// 如果有解返回出发的站点（保证解唯一），如果没有返回-1

// gas = [1,2,3,4,5], cost = [3,4,5,1,2].    return 3

// gas = [2,3,4], cost = [3,4,3]. return -1

// 考虑一下环形 怎么处理吧
let gas = [1,2,3,4,5];
let cost = [3,4,5,1,2];

let gas2 = [2,3,4];
let cost2 = [3,4,3];

function checkIfFinish(gas,cost){
    const n = gas.length;
    let totalTank = 0; 
    let currentTank = 0;
    let starttingStation = 0;

    // 1,2,3,4,5
    // 3,4,5,1,2
    //       3(totalTank = -6 + 3;)
    //         6(totalTank = -3 + 3 = 0; 可以走完)
    for(let i = 0; i < n; i++){
        totalTank += gas[i] - cost[i];
        currentTank += gas[i] - cost[i];
        
        // 顺延起点站
        if(currentTank < 0) {
            starttingStation = i + 1;
            currentTank = 0;
        }
    }
    return totalTank >= 0 ? starttingStation : -1;
}

let res = checkIfFinish(gas,cost);
let res2 = checkIfFinish(gas2,cost2);

console.log(res);
console.log(res2);