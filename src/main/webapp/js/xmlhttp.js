/**
  * ʹ��xmlHttp,��post�ϴ�������ֻ�ܽ���utf-8����,�ⲿ�������ñ���,
  * ���Է������˽��н���ʱ��Ҫת�����뵽utf-8,���򽫳�������.
  * �����ڱ�ϵͳ��,���е�ҳ�涼��ʹ��utf-8����.
  * ��:��url���ϴ��Ĳ���,��Ϊ��Ҫ��web������������,������Ҫ�趨web�������ı���,
  * tomcat����connector���趨����URLEncoding="GBK".
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
  * targetUrl Ŀ���ַ
  * �Ƿ��첽,true false.���Ϊfalse�Ļ�,�򴫵��ڼ���治��Ӧ
  * �ϴ���ʽ,��Ϊpost,get
  * content �ϴ�����
  * callbackFun �ص�����
  * ���������������null����ʹ��֮����֮��ʹ�ù���AjaxXmlHttp����ʱ���ݽ����Ĳ���
  */
function _sendXmlHttpRequest(targetUrl,content,callbackFun,async,meth){
	this.updateProgress("��ʼ��...",0);
	
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
		this.updateProgress("������...",10);
		this.xmlHttp.open(meth,targetUrl,async);
		//�ر��ʾ��ajax�����Ա��˾�����Ԥ�ȴ���
		this.xmlHttp.setRequestHeader("Request_Method","ajax-xml-http");
		if(content!=null){
			//ע:����ϴ��ı���Ϣ,��Ҫ�趨������Ϣ,application/x-www-form-urlencoded,ָ����Ҫ����content����
			//charset=utf-8,�������Ҫ,ָ���˱�����ַ���,�����ָ��,��������Ĭ���趨Ϊweb������,
			//��xmlHttpֻ֧��utf-8���ַ���,��˽����´���ķ���,����.
			//�����Ҫ��content�д��ݶ��ֵ,�ر������ֵ�к�&�������ַ�,��ʹ��encodeURIComponent����,ʹ��&amp;����&��Ч.
			//���key�к������ַ���&,Ҳ��ʹ��ͬ���ķ�������,������ע��,��Ҫ����key��value֮���=��,���ᱻ�����%3D��
			this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
		}
		this.xmlHttp.send(content);
		
		//���firefox3,��ͬ������ajax��ʱ�򡣲�����FF3�Ļ���ֱ�ӵ��á�
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
 * ��Ӧ��������������ⲿ�Ļص�������ֻ������������ɹ�ʱ���лص�
 */
function _responseFun(callback){
	var ajax = this;
	
	return function anonymous(){
		switch(ajax.xmlHttp.readyState){
			case 1:
				ajax.updateProgress("���ݷ�����...",30);
				break;
			case 2:
				ajax.updateProgress("���ݷ�����ϣ��ȴ�������...",50);
				break;
			case 3:
				ajax.updateProgress("���ݽ�����...",70);
				break;
		}
		if(ajax.xmlHttp.readyState!=4){
			return ;
		}
		ajax.updateProgress("���ݽ�����ϣ�������...",90);
		if(ajax.xmlHttp.status!=200){
			ajax.updateProgress("��ȡ��Ϣ����,δ�����ȷ��ַ!",100);
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
	
		ajax.updateProgress("������ϡ�",100);
	};
}

function _abort(){
	this.xmlHttp.abort();
}
