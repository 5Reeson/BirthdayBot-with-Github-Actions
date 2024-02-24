// 25525522135 => ["255.255.22.135","255.255.221.35"]
// "102011" => ["1.0.20.11", "1.0.201.1", "10.2.0.11", "10.20.1.1", "102.0.1.1"]

// 字符串 to 数组
function swiftIP(str){
    const results = []; // 返回值
    // 容错1: str 长度
    if(str.length < 4 || str.length > 12){
        return results; // 返回空arr
    }
    
    // 递归, 穷举所有的可能性
    // parts: int, 标记遍历了“多少位”
    // currIndex: int, 当前分割起始点
    // currIP: arr, 类似缓存路径
    const generateIP = (parts, currIndex, currIP) => {
        // base case
        // 如果达到了 4个 parts，且 使用了所有给到的数字
        if(parts === 4 && currIndex === str.length){
            results.push(currIP.join('.'));
            return;
        }
        // 如果达到 4个 parts，但 没有使用完所有数字，剪枝
        if(parts === 4 || currIndex === str.length){
            return;
        }
        // 穷举切割点
        for(let len = 1; len <= 3; len++){
            // 当前的起始点 判断
            if(currIndex + len > str.length)
                break;
            
            const segment = str.substr(currIndex,len); // 分割
            const num = parseInt(segment); // 转化为数字

            // 对合法性 再做判断; > 255 不行；如果是0开头好像也不行？ e.g. 012
            if(num > 255 || (segment.length > 1 && segment[0] === '0'))
                break; // 不合法
            
            // 类似回溯
            currIP.push(segment);
            generateIP(parts + 1, currIndex + len, currIP);
            currIP.pop();
        }
    }
    generateIP(0, 0, []);
    return results;
}
const ip1 = "25525522135";
const ip2 = "102011";
const result1 = swiftIP(ip1);
const result2 = swiftIP(ip2);

console.log(result1);
console.log(result2);