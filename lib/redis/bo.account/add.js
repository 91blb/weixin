var redis = require("../api/client_p");
var seq = require("../api/seq");
//console.log(redis);

// redis.keys("*").then(function(result){
// 	console.log("result",result);
// }).catch(function(err){

// })

// redis.flushdb().then(function(result){
// 	console.log("result",result);
// }).catch(function(err){

// })
//function uuid
function addAccount(account) {
    var key_name = "account:" + account.name;
    var key_mobile = "account:" + account.mobile;
    console.log("key_name", key_name);
    console.log("key_mobile", key_name);
    return redis.exists(key_name).then(function(result) { //查询用户名是否重复
        console.log("key_name exists:", result);
        if (!result) {
            return redis.exists(key_mobile); //查询手机号是否重复
        }
    }).then(function(result) {
        console.log("key_mobile exists:", result); //获取uuid
        //console.log()
        if (!result) {
            return seq.next("account");
        }
    }).then(function(result) {
    	console.log("get uuid",result);
    	account.uuid=result;
        /*应该先把索引建好*/
        
    	return redis.saveObj("account",account);//执行插入操作
    }).catch(function(err) {
        console.log("err found", err);
        throw err;
    })
}

function testAdd() {
    var account = {
        name: "liudongjie",
        pw: "123456",
        mobile: "13928420116",
    }

    //所有数据必须要有的字段  insert_date  插入时间 insert_person  update_date   update_person

    addAccount(account).then(function(result){
    	console.log("addAccount succ",result);
    }).catch(function(err){
    	console.log("addAccount fail",err);
    });
}

function testQuery(){
    redis.keys("*").then(function(result){
     console.log("result",result);
    }).catch(function(err){

    })
}

function test(){
    testQuery();
}
test();