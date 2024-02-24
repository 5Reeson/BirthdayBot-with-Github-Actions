// 1 第一个丑数（abc 235 1就不是了）
// input: a,b,c 三个正整数 + n
// 条件: 能被 a or b or c 整除，就是丑数；
// 14 = 2 * 7

// 1,2,3,4,5,6,8,9,10... // list
// 1 2 3 4 5 6 7 8 9
// 可以 x2, x3, x5 => 推导出下一个 uglyNum

function uglyNum(n){
    // 容错
    if(n <= 0){
        return 0;
    }
    // 试试dp
    const dp = new Array(n).fill(0);
    dp[0] = 1; // 第一个丑数 = 1

    // 2 3 5 的标记位 (指针位置)
    let p2 = 0;
    let p3 = 0;
    let p5 = 0;

    for(let i = 1; i < n; i++){
        dp[i] = Math.min(dp[p2] * 2, dp[p3] * 3, dp[p5] * 5); // 递增，取min
        // 更新指针
        // 不能重复
        if(dp[i] === dp[p2] * 2)
            p2++;
        if(dp[i] === dp[p3] * 3)
            p3++;
        if(dp[i] === dp[p5] * 5)
            p5++;
    }
    
    return dp[n-1];
}

function uglyNum2(a,b,c,n){
    // 2, 3, 5 // 是【任意】一个数的 倍数 即可
    // 14

    // 任意数 k，小于等于k 有多少个这样的丑数（已知）；f(k) O(1);


    // 求的：第 n 个
    
    let lcmAB = xxx(a,b);
    let lcmABC = xxx(lcmAB, c);
    let count = Math.floor(k / lcmABC);

    numa + numb + numc - lcmAB - lcmAC - lcmBC + 3count;
    return count;
    
    function getLCM(a,b){
        return (a * b) / getGCD(a,b);
    }
    function getGCD(a,b){
        if(b === 0)
            return a;
        return getGCD(b, a%b);
    }


    // 序列；

}
