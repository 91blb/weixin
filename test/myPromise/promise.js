function Promise(ctx,fn,params){
	this.ctx=ctx;
	this.f=fn;
	this.then=function(thenFn){
		fn.call(this,params,thenFn);
		return this;
	}
}

function makePromise(fn,params){
	return new Promise(null,fn,params);
}


function a(data,cb){
	setTimeout(function(){
		cb(data.a+data.b);
	})
}

var a_p=makePromise(a,{a:1,b:2});//建立在一定的依赖上 输入只能有2个参数  数据和回调
var a_p1=makePromise(a,{a:10,b:20});
console.log(a_p1);
var x=a_p.then(function(result){
	console.log("result",result);
	return a_p1;
});
