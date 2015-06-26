function Promise(context,fn){
	ctx:context||[].push(fn),
	then:function(fn){
		return new promise(this.ctx,fn);
	},
	excute:function(){
		//最复杂 把当前ctx里的函数挨个执行 有点像带入计算公式  高阶函数
		for(var i=0;i<this.ctx.length;i++){
			var fns=this.ctx[i];
			if(typeof(fns)=="Object"&&fns instanceof Array){

			}
			else{

			}
		}
	}
}

function makePromise(fn){
	var promise=new Promise(fn);
	var newFn=function(fn){
		
	}
}


function test(){
	var fn1=function(data,cb){
		setTimeout(function(){
			cb(data.a+data.b);
		},1000);/*延迟1s去执行回调*/  
	}
	var fn2=function(c,cb){
		setTimeout(function(){
			cb(c+10);
		},1000);/*延迟1s去执行回调*/
	}

	var fn3=function(d,cb){
		setTimeout(function(){
			cb(d*2);
		},1000);/*延迟1s去执行回调*/
	}

	var fn_p1=makePromise(fn1);
	var fn_p2=makePromise(fn2);
	var fn_p3=makePromise(fn3);
	var fn_p4=fn_p3(fn_p2(fn_p1));

	fn_p4({a:1,b:2});


	var data={a:10,b:20}
	chain(data).done();
	

	console.log("step1",step1);
}


test();
