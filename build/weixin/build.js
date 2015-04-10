console.log("build weixin start");

var fs=require("fs-extra");

var shelljs=require("shelljs/global");
var path=require("path");

var projectDir=path.resolve(__dirname,"../../");
console.log("projectDir",projectDir);
cd(projectDir);//上移两级目录，到达项目根目录

var srcFolder="src/weixin/"
var destFolder="WebHtml/weixin";
function clean(){
	fs.removeSync(destFolder);
	console.log("clean succ");
}

function copy(){
	fs.copySync(srcFolder,destFolder);
	console.log("copy succ");
}


function build(){
	clean();
	copy();
	
	//replaceFile();
	//svnCommit();
}

function replaceFile(){
	var file1Path="WebHtml/weixin/tpl/wx_account.tpl";
	var encoding={encoding:"utf8"};
	var file1=fs.readFileSync(file1Path,encoding);
	var toReplaceStr,replaceStr,newContent;
	
	//toReplaceStr='<li><a href="account_bank.html">我的银行卡</a></li>';
	//replaceStr="<!--"+toReplaceStr+"-->"
	newContent=file1.replace(toReplaceStr,replaceStr);//注释掉我的银行卡 屏蔽入口  联调成功后关闭
	/*
	toReplaceStr='<p><a href="account_recharge.html" class="wx_btn_org" id="wxRecharge">充值</a></p>';
	replaceStr='<p><a href="#" class="wx_btn_org" id="wxRecharge">充值</a></p>';
	newContent=newContent.replace(toReplaceStr,replaceStr);//注释掉充值 屏蔽入口  联调成功后关闭
	*/
	toReplaceStr='<p><a href="account_draw.html" class="wx_btn_grey" id="wxDraw">提现</a></p>';
	replaceStr='<p><a href="#" class="wx_btn_grey" id="wxDraw">提现</a></p>';
	newContent=newContent.replace(toReplaceStr,replaceStr);//注释掉提现 屏蔽入口  联调成功后关闭
	
	fs.writeFileSync(file1Path,newContent,encoding);
	console.log("replace Succ");
	
}

function svnCommint(){
	exec("svn commit");

	
}

build();	

