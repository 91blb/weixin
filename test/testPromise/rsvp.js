var RSVP=require("rsvp");

var a_p=function(value){
	var promise = new RSVP.Promise(function(resolve, reject) {
	  // succeed 
	  console.log("excute");
	  setTimeout(function(){
	  	 //console.log("resolve");
	  	 reject(value);
	  },1000)
	  
	  // or reject 
	  //reject(error);
	});

	return promise;
}


a_p(100).then(function(result){
	console.log("result",result);
}).catch(function(err){
	console.log("err2",err);
});