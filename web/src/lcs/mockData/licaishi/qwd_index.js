define("dm.qwd.index", function(require, exports, module) {
    var $ = require("dmc.mobile.zepto"), share = require("dm.qwd.share"), dialog = require("dmc.dialogTip"), params = {"recmStatus": "http://qwd.jd.com/fcgi-bin/qwd_getrel","recmCgi": "http://qwd.jd.com/fcgi-bin/qwd_recmitem","proxyStatus": "0","oneShow": 10}, ajaxReqTime, ajaxTimeout = 5000, isScroll = false, oneShowData = [], cmdDatas = [], eventType = isPC() ? "click" : "tap";
    require("dm.qwd.appear");
    var index = {init: function() {
            window.sessionStorage.removeItem("findCmdty_item_history");
            window.sessionStorage.removeItem("findCmdty_sort_history");
            var me = this;
            me.setIndexShare();
            me.getCmdList();
            me.bindEvent();
        },setIndexShare: function() {
            share.shareInit({img_url: "http://x.paipaiimg.com/images/qwshop/shoplogo_fang.png",link: "http://qwd.jd.com/",desc: "不仅仅是多、正、好，快来与你的小伙伴分享各种美物吧！",title: "京东京享街：随时随地都想享",isshop: true});
        },setCmdXY: function() {
            var width = $(window).width(), picWidth, titleWidth;
            if (width >= 910) {
                picWidth = (width - 50) / 4;
            } else if (width >= 610) {
                picWidth = (width - 40) / 3;
            } else {
                picWidth = (width - 30) / 2;
            }
            titleWidth = picWidth - 20;
            $(".swiper-container img").css({"height": width * 280 / 640,"width": width});
            $(".lst li .pic img").css({"height": picWidth,"width": picWidth});
            $(".lst li .con-panel h6").css({"height": 36,"width": titleWidth});
            $(".lst li .con-panel .flex-box").css({"height": 18,"width": titleWidth});
            $(".lst li .con-panel .price").css({"height": 34,"width": titleWidth,"text-align": "left"});
            $(".lst li .con-panel .btn-box").css({"height": 35,"width": titleWidth});
        },getCmdList: function() {
            var me = this;
            if ($("#loading").length === 0) {
                $("#cmdList").closest(".wrap").append('<div class="mod_loading global-loading" id="loading">正在加载，请稍候...</div>');
            }
            var timeout = setTimeout(function() {
                removeNode("loading");
            }, ajaxTimeout);
            ajaxReqTime = new Date().getTime();
            $.ajax({type: "GET",url: params.recmCgi,timeout: ajaxTimeout,data: {"pageindex": 1,"pagesize": 50},dataType: "jsonp",success: function(data) {
                    clearTimeout(timeout);
                    removeNode("loading");
                    if (data.errCode == 0) {
                        oneShowData = data.sku.slice(0, params.oneShow);
                        cmdDatas = data.sku.slice(params.oneShow);
                        me.getProxyStatusList(oneShowData);
                    }
                },error: function(data) {
                    clearTimeout(timeout);
                    removeNode("loading");
                }});
        },getProxyStatusList: function(cmdInfos) {
            var me = this, arr = [];
            for (var i = 0, len = cmdInfos.length; i < len; i++) {
                arr.push(cmdInfos[i].spuid);
            }
            $.ajax({type: "GET",url: params.recmStatus + "?ie=utf-8&spu=" + arr.join(","),dataType: "jsonp",success: function(data) {
                    me.setCmdList(cmdInfos, data.map);
                },error: function() {
                    me.setCmdList(cmdInfos);
                }});
        },setCmdList: function(cmdInfos, proxyList) {
            var html = $("#cmdTmpl").html(), me = this, str = [], item, flag;
            for (var i = 0, len = cmdInfos.length; i < len; i++) {
                item = cmdInfos[i];
                flag = $.inArray(item.spuid, proxyList) === -1;
                str.push($strReplace(html, {"{#skuurl#}": item.skuurl,"{#skuimgurl#}": item.skuimgurl,"{#title#}": item.title,"{#price#}": formatPrice(item.price),"{#salecount#}": item.salecount,"{#commissionprice#}": formatCommPrice(item.commissionprice),"{#skuid#}": item.skuid,"{#spuid#}": item.spuid,"{#proxyStatus#}": flag ? "0" : "1","{#proxyStyle#}": flag ? "" : 'style="border:1px solid #eee;background-color:#eee;color:#999;"',"{#proxyDesc#}": flag ? "我要代理" : "取消代理"}));
            }
            $('#cmdList').append(str.join(""));
            me.setCmdXY();
        },bindEvent: function() {
            var me = this;
            $(".swiper-slide").on(eventType, function() {
                window.location.href = "http://qwd.jd.com/help.shtml";
            });
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                setTimeout(function() {
                    me.setCmdXY();
                }, 400);
            }, false);
            $(document).on(eventType, "[attr-tag='sx']", function() {
                var spuid = $(this).attr("attr-spuid"), proxy = $(this).attr("attr-dl");
                if (proxy == 1) {
                    window.location.href = $(this).attr("attr-skuurl") + "&isAgt=" + spuid;
                } else {
                    window.location.href = $(this).attr("attr-skuurl");
                }
            });
            $(document).on("scroll", function() {
                if (!isScroll && bottomDistance(100)) {
                    isScroll = true;
                    if (cmdDatas.length > 0) {
                        if ($("#loading").length === 0) {
                            $(".wrap").append('<div class="mod_loading global-loading" id="loading">正在加载，请稍候...</div>');
                        }
                        oneShowData = cmdDatas.slice(0, params.oneShow);
                        cmdDatas = cmdDatas.slice(params.oneShow);
                        me.getProxyStatusList(oneShowData);
                        removeNode("loading");
                    } else if (new Date().getTime() - ajaxReqTime > ajaxTimeout) {
                        if ($("#completed").length === 0) {
                            $(".g-box").append("<div style='text-align:center;color: #666;line-height: 35px;' id='completed'>没有更多数据</div>");
                            setTimeout(function() {
                                removeNode("completed");
                            }, 3000);
                        }
                    }
                    isScroll = false;
                }
            });
            $(document).on(eventType, "[attr-tag='share']", function() {
                var me = this, skuid = $(this).attr("attr-skuid"), spuid = $(this).attr("attr-spuid"), img_url = $(this).attr("attr-img"), title = $(this).attr("attr-title");
                share.itemShare({"skuid": skuid,"spuid": spuid,"type": 1,"pic": img_url,"title": title}, function(shareUrl) {
                    $(me).closest(".btn-box").children("[attr-tag='proxy']").attr("attr-proxy", "1").children("span").css({"border": "1px solid #eee","background-color": "#eee","color": "#999"}).html("取消代理");
                    share.doShareInWx({img_url: img_url,link: shareUrl,desc: "京享街：" + title,title: "来自我的分享，随时随地为你享",msg: "点击右上角，转发分享该商品给小伙伴！",isshop: false});
                });
            });
            $(document).on(eventType, "div[attr-tag='proxy']", function() {
                var me = this, proxyStatus = $(me).attr("attr-proxy"), skuid = $(me).attr("attr-skuid"), spuid = $(me).attr("attr-spuid"), img_url = $(me).attr("attr-img"), title = $(me).attr("attr-title");
                if (proxyStatus == params.proxyStatus) {
                    share.itemShare({"skuid": skuid,"spuid": spuid,"type": 2,"pic": img_url,"title": title}, function() {
                        $(me).attr("attr-proxy", "1").children("span").css({"border": "1px solid #eee","background-color": "#eee","color": "#999"}).html("取消代理");
                        dialog.alertTip("代理成功<br/>商品已复制到您的京享街!");
                    });
                } else {
                    dialog.confirmTip("确认不再代理该商品?", function() {
                        share.itemShare({"skuid": skuid,"spuid": spuid,"type": 3}, function() {
                            $(me).attr("attr-proxy", params.proxyStatus).children("span").css({"border": "1px solid #e4393c","background-color": "#e4393c","color": "#fff"}).html("我要代理");
                            dialog.alertTip("取消代理成功<br/>商品已从您的京享街删除!");
                        });
                    });
                }
            });
        }};
    function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0, len = Agents.length; v < len; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > -1) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    function formatPrice(price) {
        price = parseInt(price) || 0;
        if (price <= 0) {
            return "暂无报价";
        }
        return "¥" + (price / 100).toFixed(2);
    }
    function formatCommPrice(price) {
        price = parseInt(price) || 0;
        if (price <= 0) {
            return "0";
        }
        return (price / 100).toFixed(2);
    }
    function changeImgUrl(url) {
        var width = 220;
        return url.replace(/\/s220x220_/i, "/s" + width + "x" + width + "_");
    }
    function $getQuery(name, url) {
        var u = arguments[1] || window.location.search, reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"), r = u.substr(u.indexOf("\?") + 1).match(reg);
        return r != null ? r[2] : "";
    }
    function $strReplace(str, re, rt) {
        if (rt != undefined) {
            replace(re, rt);
        } else {
            for (var key in re) {
                replace(key, re[key]);
            }
        }
        function replace(a, b) {
            str = str.split(a).join(b ? b : "");
        }
        return str;
    }
    function bottomDistance(len) {
        var docHeight = $(document).height(), viewHeight = $(window).height(), scrollTop = $(window).scrollTop();
        return docHeight - viewHeight - scrollTop <= len;
    }
    function removeNode(id) {
        var node = document.getElementById(id) || false;
        if (node) {
            node.parentNode.removeChild(node);
        }
    }
    exports.init = function() {
        index.init();
    };
});
