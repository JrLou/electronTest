console.log("aa")
console.log(JSON.stringify(java_scriptVariable))
java_scriptVariable.id = 999;
console.log(java_scriptVariable.id)

var test = 1;
java_moduleResult.code = Math.random()>0.5?200:201;
java_moduleResult.error = java_moduleResult.code==200?"我没错":"我错了";
java_moduleResult.nextData = {
    username:"dfsafd@123.com",
    password:"!@#!@FDsagf"
};


{

}
function a(java_moduleParame) {
    var java_moduleResult = {
        id:123
    };
    console.log("我当前所在脚本的作用域变量是"+JSON.stringify(java_scriptVariable))
    return java_moduleResult;
}

a(123);


        function b(java_moduleParame){
            console.log(JSON.stringify(java_moduleParame))
        }
        b();

console.log("我是登录的模块")
console.log("我当前模块接收的参数是"+JSON.stringify(java_moduleParame))
console.log("我当前所在脚本的参数是"+JSON.stringify(java_scriptParame))
console.log("我当前所在脚本的作用域变量是"+JSON.stringify(java_scriptVariable))


