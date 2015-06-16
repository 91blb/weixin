var request=require("request");
//console.log(request);
var url="https://app.yinxiang.com/shard/s14/enweb/notestore/ext";
var opt={
	headers:{
		cookie:'cookieTestValue=1433821806871; auth="S=s14:U=2c9df2:E=14dd6a76f98:C=14dd6708204:P=5fd:A=en-web:V=2:H=e6d710fe5afd5c563b4328cc0eacc56f"; lastAuthentication=1433821807112/036492f602487f77864e3a1b36cd7206; JSESSIONID=ED14A8E0375561C4DFD7959193171A64; req_sec="U=2c9df2:P=/:E=14dd685f65f:S=c281cff728cfd0ca1f6f73c803c15085"; _ga=GA1.2.628699418.1428322479; _gat=1'
	},
	body:"7|0|11|https://app.yinxiang.com/focusclient/|2EC9D9F368EED71D07EC3634FE70B710|com.evernote.web.shared.GWTNoteStoreExtensions|getHtmlNoteContent|java.lang.String/2004016611|java.util.List|S|Z|f26c204b-e79b-40bb-8ccc-b5ea6d50ac98|java.util.ArrayList/4159755760|/shard/s14/res/|1|2|3|4|5|5|6|5|7|8|9|10|0|11|-1|0|"
}
request.post(url,opt,function(err,res,body){
	console.log("body",body);
})