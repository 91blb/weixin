<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<c:if test="${not empty vipProduct && fn:length(vipProduct)>0}">
<div class="a2 aa">
  <div class="b21 ba1">
    <div class="c211">VIP专享</div>
    <div class="c212">超额获利<i>•</i>尊贵体验</div>
    <div class="c213">
      <a target="_blank" href="../../lib/complie/${siteroot}/callcenterAnswer.do?id=99&cid=7"></a>
    </div>
  </div>
  <div class="ba2">
  <c:forEach items="${vipProduct}" var="vipProduct" varStatus="stat">
  	 <c:if test="${ vipProduct.borrowStatus == 1}">
	    <c:if test="${ stat.last}">
	  		<table class="c32 ca2 no_border wait" cellpadding="0" cellspacing="0" border="0" data-countdown=${vipProduct.remainTime} >
	  	</c:if>
	  	<c:if test="${!stat.last}">
	  		<table class="c32 ca2 border wait" cellpadding="0" cellspacing="0" border="0" data-countdown=${vipProduct.remainTime} >
	  	</c:if>
    </c:if>
    <c:if test="${ vipProduct.borrowStatus == 2 || vipProduct.borrowStatus == 3}">
    	<c:if test="${ stat.last}">
	  		<table class="c32 ca2 no_border active" cellpadding="0" cellspacing="0" border="0">
	  	</c:if>
	  	<c:if test="${!stat.last}">
	  		<table class="c32 ca2 border active" cellpadding="0" cellspacing="0" border="0">
	  	</c:if>
    </c:if>
    <c:if test="${ vipProduct.borrowStatus == 4 || vipProduct.borrowStatus == 5}">
    	<c:if test="${ stat.last}">
	  		<table class="c32 ca2 no_border late" cellpadding="0" cellspacing="0" border="0" >
	  	</c:if>
	  	<c:if test="${!stat.last}">
	  		<table class="c32 ca2 late" cellpadding="0" cellspacing="0" border="0" >
	  	</c:if>
    </c:if>

	      <tr>
	        <td>
	        	<div class="ca21">
	        		<c:if test="${3 == vipProduct.borrowType}">
	            		<a target="_blank" href="/product/planning/detail/${vipProduct.id}">${ vipProduct.borrowTitle}</a>
	            	</c:if>
	            	<c:if test="${3 != vipProduct.borrowType}">
	            		<a target="_blank" href="/product/listing/detail/${vipProduct.id}">${ vipProduct.borrowTitle}</a>
	            	</c:if>
					<div class="icons">
                        <c:if test="${vipProduct.assClaim==1}">
                            <div title="<div class='forTransfer' >持有${vipProduct.holdMonth}个月后可转让<a href='/callcenterAnswer.do?id=56&cid=7' target='_blank'>了解详情</a>" class="sytip zr"></div>
                        </c:if>
                      </div>
	        	</div>
	        </td>
             <td>
	        	<div class="ca25">
	        		借款金额 : <i><fmt:formatNumber value="${vipProduct.borrowAmount}" pattern="#,###" /></i>元
				</div>
			</td>
            <td>
		        <div class="ca23">
					<i>${vipProduct.deadline}</i>
					<c:if test="${0 == vipProduct.isDayThe}">
						天
					</c:if>
					<c:if test="${0 != vipProduct.isDayThe}">
						个月
					</c:if>
				</div>
			</td>
	        <td>
		        <div class="ca22">
		        	<c:if test="${3 == vipProduct.borrowType}">
						年化<i><fmt:formatNumber value="${vipProduct.minAnnualRate}" pattern="#,##0.0" />-<fmt:formatNumber value="${vipProduct.maxAnnualRate}" pattern="#,##0.0" /></i>%
					</c:if>
					<c:if test="${3 != vipProduct.borrowType}">
						年化<i>${vipProduct.annualRate}</i>%
					</c:if>
		        </div>
	        </td>
	        <td>
	        	<div class="ca26">
					<c:if test="${4 == vipProduct.paymentMode}">
						等额本息
					</c:if>
					<c:if test="${4 != vipProduct.paymentMode}">
						一次性还款
					</c:if>
				</div>
			</td>
	        <td>
	        	<div class="ca27">
	        		<i><fmt:formatNumber value="${vipProduct.minTenderedSum}" pattern="#,###" /></i>元起
	        	</div>
	        </td>
	        <td class="c322 ca28">
	            <p class="c322_1"><span><i style="width:${vipProduct.schedule}%"></i></span>
	              <label>${vipProduct.schedule}%</label>
	            </p>
	            <p class="c322_2">
	            	<c:if test="${3 == vipProduct.borrowType}">
	            		<a target="_blank" href="/product/planning/detail/${vipProduct.id}">加入</a>
	            	</c:if>
	            	<c:if test="${3 != vipProduct.borrowType}">
	            		<a target="_blank" href="/product/listing/detail/${vipProduct.id}">购买</a>
	            	</c:if>
	            </p>
				<p class="c322_3">
					<c:if test="${ vipProduct.borrowStatus == 4 || vipProduct.borrowStatus == 5}"><!--如果如果满标  显示成功交易时间 其他不显示任何内容-->
	                	成功交易时间
	                </c:if>
					</p><!--如果是倒计时 显示倒计时-->
				<p class="c322_4">
				 <c:if test="${vipProduct.borrowStatus == 1}">
	              		开始抢购
	              </c:if>
	              <c:if test="${vipProduct.borrowStatus == 4 || vipProduct.borrowStatus == 5}">
	              		<fmt:formatDate value="${vipProduct.fullTenderTime}" type="both" dateStyle="default" />
	              </c:if>
				</p>
	          </td>
	      </tr>
    </table>
    </c:forEach>
  </div>
</div>
</c:if>