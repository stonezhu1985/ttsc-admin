/**
  * 使用xmlHttp,其post上传的数据只能进行utf-8编码,外部不可设置编码,
  * 所以服务器端进行接收时需要转换编码到utf-8,否则将出现乱码.
  * 所以在本系统中,所有的页面都将使用utf-8编码.
  * 另:在url中上传的参数,因为需要被web服务器所解析,所以需要设定web服务器的编码,
  * tomcat是在connector中设定属性URLEncoding="GBK".
  */

function AjaxXmlHttp(async,meth,callbackFun){
	this.async = async;
	this.meth= meth;
	this.callbackFun = callbackFun;
	
	
	this.xmlHttp = this.getXmlHttp();
	
	this.progressBar = null;
	this.updateProgress = function(text,progress){
		if(this.progressBar==null){
			return ;
		}
		if(this.progressBar.setProgress!=null){
			this.progressBar.setProgress(text,progress);
		}
	};
}

AjaxXmlHttp.prototype.getXmlHttp = _getXmlHttp;
AjaxXmlHttp.prototype.sendXmlHttpRequest = _sendXmlHttpRequest;
AjaxXmlHttp.prototype.responseFun = _responseFun;
AjaxXmlHttp.prototype.abort = _abort;


function _getXmlHttp(){
	var xmlHttp = null;
	
	if(window.XMLHttpRequest){
		xmlHttp=new XMLHttpRequest();
	}else if(window.ActiveXObject){
		try{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}

/**
  * targetUrl 目标地址
  * 是否异步,true false.如果为false的话,则传递期间界面不响应
  * 上传方式,分为post,get
  * content 上传内容
  * callbackFun 回调函数
  * 后三个参数如果非null，则使用之，反之则使用构造AjaxXmlHttp对象时传递进来的参数
  */
function _sendXmlHttpRequest(targetUrl,content,callbackFun,async,meth){
	this.updateProgress("初始化...",0);
	
	if(callbackFun==null){
		callbackFun = this.callbackFun;
	}
	if(async==null){
		async = this.async;
	}
	if(meth==null){
		meth = this.meth;
	}
	
	if(this.xmlHttp==null){
		this. xmlHttp = this.getXmlHttp();	
	}
	
	this.xmlHttp.onreadystatechange = this.responseFun(callbackFun);
	try{
		this.updateProgress("连接中...",10);
		this.xmlHttp.open(meth,targetUrl,async);
		//特别标示是ajax请求，以便滤镜可以预先处理
		this.xmlHttp.setRequestHeader("Request_Method","ajax-xml-http");
		if(content!=null){
			//注:如果上传文本信息,需要设定下述信息,application/x-www-form-urlencoded,指明需要编码content数据
			//charset=utf-8,这个很重要,指明了编码的字符集,如果不指明,服务器将默认设定为web中配置,
			//而xmlHttp只支持utf-8的字符集,如此将导致错误的发生,乱码.
			//如果需要在content中传递多个值,特别是如何值中含&等特殊字符,请使用encodeURIComponent编码,使用&amp;代替&无效.
			//如果key中含特殊字符如&,也请使用同样的方法编码,但是请注意,不要编码key与value之间的=号,它会被编码成%3D。
			this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
		}
		this.xmlHttp.send(content);
		
		//针对firefox3,在同步调用ajax的时候。并且是FF3的话，直接调用。
		var userAgent=navigator.userAgent;
		var newVersion=userAgent.indexOf("Firefox/3.0")!=-1?true:false;
		if(!this.async && newVersion){
			this.responseFun(callbackFun)();
		}
	}catch(e){
		return false;
	}
	return true;
}

/**
 * 响应函数，负责调用外部的回调函数，只当服务器处理成功时进行回调
 */
function _responseFun(callback){
	var ajax = this;
	
	return function anonymous(){
		switch(ajax.xmlHttp.readyState){
			case 1:
				ajax.updateProgress("数据发送中...",30);
				break;
			case 2:
				ajax.updateProgress("数据发送完毕，等待接收中...",50);
				break;
			case 3:
				ajax.updateProgress("数据接收中...",70);
				break;
		}
		if(ajax.xmlHttp.readyState!=4){
			return ;
		}
		ajax.updateProgress("数据接收完毕，处理中...",90);
		if(ajax.xmlHttp.status!=200){
			ajax.updateProgress("获取信息出错,未获得正确地址!",100);
			if(callback!=null){
				callback.call(ajax,null);
			}
			return ;
		}
		var xmlResult = ajax.xmlHttp.responseXML;
		
		if(xmlResult == null || xmlResult.documentElement == null){
			if(callback!=null){
				callback.call(ajax,null);
			}
			return ;
		}
		
		if(callback!=null){
			callback.call(ajax,xmlResult);
		}
	
		ajax.updateProgress("操作完毕。",100);
	};
}

function _abort(){
	this.xmlHttp.abort();
}
