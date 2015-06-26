var Q=require("q");
var fn_P= Q.fcall(function (a,b) {
	console.log("return result");
    setTimeout(function(){
    	console.log("return a+b",a+b);
    	return a+b;
    },1000);
},2,3);

//console.log(fn_P);

fn_P.then(function(){
	console.log(arguments);
});
