<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!--start 头部-->
<div class="ie-tips" id="ieTips"><span>小牛在线提醒您：</span>为了更流畅的访问本网站，建议您使用IE9.0及以上版本浏览器或360浏览器。<a class="link" href="http://se.360.cn" target="_blank">点击进入360官网下载&gt;&gt;</a><a class="ie-close" id="ieClose" href="javascript:;"></a></div></div>
<div class="header">
	<div class="hd-content">
		<span class="tel">全国理财热线：<strong>400-777-1268</strong>关注我们：</span>
		<a class="weibo" href="http://www.weibo.com/af88" title=""></a>
		<span class="weixin"><i></i></span>
		<!--start 已登录状态-->
		<c:choose>
			<c:when test="${not empty sessionScope.user}">
				<div class="name-news">
					<div class="ldto">
						<div class="bor-n">
							<a class="name" href="/MyAccount/index">
								<c:choose>
									<c:when test="${not empty sessionScope.qq_nickname}">${sessionScope.qq_nickname}</c:when>
									<c:otherwise>${sessionScope.user.userName}</c:otherwise>
								</c:choose>
							</a>
							<span class="bar"> <i></i>
								<a href="/payment/recharge/index">充值</a>
								<a href="/maketing/planner/earningDetail">理财师</a>
								<a href="/MyAccount/invest/index/holding">我的投资</a>
								<a href="/payment/bankcard/index">我的银行卡</a>
								<a href="/MyAccount/fundRecord">资金记录</a>
							</span>
						</div>
						<c:if test="${msgNumber > 0 || bonusUnusedNumber > 0}">
						<span class="l"> (
							<c:if test="${msgNumber > 0 }">
								<a class="msg" href="/MyAccount/message">${msgNumber }</a>
							</c:if>
							<c:if test="${bonusUnusedNumber > 0 }">
								<a class="bouns" href="../../lib/complie/${siteroot}/myBonusInit.do">${bonusUnusedNumber }</a>
							</c:if> )
						</span>
						</c:if>
						<a class="ext" href="../../lib/complie/${siteroot}/logout.do">[ 安全退出 ]</a>
						<span class="help"><a target="_blank" href="../../lib/complie/${siteroot}/portal/help/index">帮助中心</a></span>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<span class="help hp-mg">|<a target="_blank" href="../../lib/complie/${siteroot}/portal/help/index">帮助中心</a></span>
				<div class="login-grey">
					<a class="login" href="javascript:gotoLogin('${siteroot}/user/login')">登录</a>
					<a class="grey" href="../../lib/complie/${siteroot}/reg.do">注册</a>
				</div>
			</c:otherwise>
		</c:choose>
		<!--end 未登录状态-->
	</div>
</div>
<!--end 头部-->