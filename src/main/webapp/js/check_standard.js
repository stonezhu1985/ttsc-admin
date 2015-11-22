if(!checkObj)
	{
	  var checkObj={};
	}
	var catpionStr=new Array();
	catpionStr["Int_u"]='数字';
	catpionStr["Int"]='数字';
	catpionStr["Float_u"]='数字';
	catpionStr["Float"]='数字';
	catpionStr["English"]='字符';
	catpionStr["Chinese"]='字符';
	catpionStr["OracleChar"]='字符';

	var	Int_u=/^\d+$/;//无符号整数
	var	Int=/^[-\+]?\d+$/;//有符号整数
	var	Float_u=/^\d+(\.\d+)?$/;//无符号小数
	var	Float=/^[-\+]?\d+(\.\d+)?$/; //有符号小数
	var	English=/^([^\u4e00-\u9fa5])*$/; //英文字母
	var	Chinese=/^[\u0391-\uFFE5.,\- ]*$/; //中文  中间允许有空格和.,- 
	var	OracleChar=/^([^(%'_)])*$/;//除%'_之外的字符串
	var	Plate=/^[京沪津渝冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云藏陕甘青宁新][a-zA-Z]\w{4,6}[\u0391-\uFFE5]?$/; //车牌号
	var	Zip=/^[1-9]\d{5}$/;//邮编
	var	Identity=/^(:\d{15}|\d{18}|\d{17}x)$/;//身份证号
	var	Tel=/(^(\+?\d{2,4}[-_－?]?)?\d{3,8}([-_－?]?\d{3,8})?([-_－?]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;//电话号码
	var	Mobile=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/; //手机号码
	var	Ip=/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/; //IP地址
	var	Http=/^http(s)?:\/\/([\w\u4e00-\u9fa5-]+\.)+[\w\u4e00-\u9fa5-]+((:\d+)?)+(\/[\w\u4e00-\u9fa5- .\?%&=]+)*$/;
	var	Website=/^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	tEmail=/^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$/;//email地址
	var YYYYMMDD=/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[1-9])|(1[0-2]))\:([0-5][0-9])((\s)|(\:([0-5][0-9])\s))([AM|PM|am|pm]{2,2})))?$/
	//var Ftp=/^ftp:////([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?$/;
	
String.prototype.Trim = function() { 
  	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
String.prototype.Ltrim = function() { 
 	return this.replace(/(^\s*)/g, ""); 
};
String.prototype.Rtrim = function() { 
	return this.replace(/(\s*$)/g, ""); 
};  
     
checkObj.check=function()
{
	var i;
	var sCaption;
	var obj;
	var objValue;
	var sErr;

	for(i=0;i<document.all.length;i++)
	{
		obj=document.all(i);
		if((obj.tagName=="INPUT" || obj.tagName=="SELECT" || obj.tagName=="TEXTAREA")&& obj.disabled!=true)
		{
			sCaption=obj.caption;
			if(sCaption==null)
			{
			 //  sCaption=getCaption(obj);
			 if(sCaption==null)
			   sCaption='';
			}
			
			objValue=obj.value.Trim();
			
			var checkSt=obj.checkStr;
			if(checkSt==null||checkSt.Trim().length==0)
			{
			  continue;
			}
			var checkS=checkSt.split(';');
			
			for(var j=0;j<checkS.length;j++)
			{
				if(checkS[j]==null||checkS[j].Trim().length==0)
				{
				  continue;
				}
			  var checkS2=checkS[j].split(':');
			  var checkName=checkS2[0].Trim();
			  
			  if(checkName!='notNull'&& objValue.length==0)
			  {
			     continue;
			  }
			  else if(checkName=='notNull'&& objValue.length==0)
			  {
					 sErr="【"+sCaption+"】" + _is_not_null;
					 obj.focus();
			     alert(sErr);
			     return false;
			  }
			  else if(checkName=='notNull')
			  {
			     continue;
			  }
			  try
			  { 
			 		 eval(checkName);
			  }
				catch(exception) {
				  continue;
   		      }
				if(eval(checkName)!=null)
				{
					if(!eval(checkName).exec(objValue))
					{
					  if(catpionStr[checkName]==null)
						 sErr="【"+sCaption+"】格式不对";
					  else
 						 sErr="【"+sCaption+"】只能输入"+catpionStr[checkName];
						 obj.focus();
				     alert(sErr);
						 return false;
					}
					//如果是身份证号
					else if(checkName=='Identity')
					{
					   var YYYYMMDDStr=getYYYYMMDDbyIdentity(objValue);
					   
							if(!eval('YYYYMMDD').exec(YYYYMMDDStr))
							{
								 sErr="【"+sCaption+"】格式不对";
								 obj.focus();
					    	 alert(sErr);
								 return false;
							}
					}
				}
					
			  if(checkS2.length>1)
			  {
			      var addAttr=checkS2[1].split(',');
			      for(var k=0;k<addAttr.length;k++)
			      {
			        //进行最大最小值的判断
						  if(checkName=='isNumber'||checkName=='isInteger'||checkName=='isCurrency'||checkName=='isDouble')
						  {
								if(addAttr[k]==null||addAttr[k].Trim().length==0)
								{
								  continue;
								}
								var addAttrStr=addAttr[k].Trim();
								if(!checkObj.isDouble(addAttrStr))
								{
								  continue;
								}
				        if(k==0)
				        {
				          if(parseFloat(objValue)<parseFloat(addAttrStr))
				          {
				             sErr="【"+sCaption+"】您输入的值小于"+addAttrStr;
										 obj.focus();
								     alert(sErr);
										 return false;
				          }
				        }
				        else if(k==1)
				        { 
				          if(parseFloat(objValue)>parseFloat(addAttrStr))
				          {
				             sErr="【"+sCaption+"】您输入的值大于"+addAttrStr;
										 obj.focus();
								     alert(sErr);
										 return false;
				          }
				        }
					      //进行小数位数的判断
				        else if(k==2&&(checkName=='isCurrency'||checkName=='isDouble'))
				        {
				            objValue=''+objValue;
				            var len1=objValue.length;
				            var pos1=objValue.indexOf('.');
				            if(pos1==-1)
				            {
								 			 continue;
				            }
				            else
				            {
				               if(len1-pos1-1>parseInt(addAttrStr))
				               {
						             sErr="【"+sCaption+"】您输入的小数位数值大于"+addAttrStr;
												 obj.focus();
										     alert(sErr);
												 return false;
				               }
				            }
				            
				        }
				       }
			      }
				 }
				  
			  }
		}
	}
	return true;
} 

function isEmpty(value)
{
	if(trim(value) == "")
	{
		return true;
	}
	return false;
}

function isNumber(value,iLength,iScale)
{
	var sTemp;
	var sRef;
	var sErr;
	var i;
	var iPos;
	sRef = "1234567890";
	sTemp=trim(value);
	if(sTemp!="")
	{
		if(sTemp.charAt(0)=="-")
		{
			sTemp=sTemp.slice(1);
		}
	}
	iPos=sTemp.indexOf(".");
	if(iPos==-1)
	{
		iPos=sTemp.length;
	}
	if(iPos>0)
	{
		if((sTemp.length-iPos-1)>iScale)
		{
			return false;
		}
		if(iPos>(iLength-iScale))
		{
			return false;
		}
		sTemp=sTemp.substring(0,iPos)+sTemp.substring(iPos+1,sTemp.length);
	}
	if(sTemp.length>iLength)
	{
		return false;
	}
	
	if(sTemp!="")
	{
		for(i=0;i<sTemp.length;i++)
		{
			tempChar= sTemp.substring(i,i+1);
			if(sRef.indexOf(tempChar)==-1) 
			{
				return false; 
			}
		}
		if(value.length>1 && value.substring(0,1)=="0")
		{
			if(iPos==-1 || iPos>1)
			{
				return false;
			}
		}
	}
	return true;
}

function isDate(value,strFormat)
{
	var time=trim(value);
	if(time=="") return false;
	var reg=strFormat;
	var reg=reg.replace(/yyyy/,"[0-9]{4}");
	var reg=reg.replace(/yy/,"[0-9]{2}");
	var reg=reg.replace(/MM/,"((0[1-9])|1[0-2])");
	var reg=reg.replace(/M/,"(([1-9])|1[0-2])");
	var reg=reg.replace(/dd/,"((0[1-9])|([1-2][0-9])|30|31)");
	var reg=reg.replace(/d/,"([1-9]|[1-2][0-9]|30|31))");
	var reg=reg.replace(/HH/,"(([0-1][0-9])|20|21|22|23)");
	var reg=reg.replace(/H/,"([0-9]|1[0-9]|20|21|22|23)");
	var reg=reg.replace(/mm/,"([0-5][0-9])");
	var reg=reg.replace(/m/,"([0-9]|([1-5][0-9]))");
	var reg=reg.replace(/ss/,"([0-5][0-9])");
	var reg=reg.replace(/s/,"([0-9]|([1-5][0-9]))");
	reg=new RegExp("^"+reg+"$");
	if(reg.test(value))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkNumber(obj,caption,iLength,iDecimal)
{
	if(iDecimal==null)
	{
		iDecimal=0;
	}
	if(iLength==null)
	{
		sErr="【"+caption+"】格式有误.\n只能输入数字";
	}
	else
	{
		sErr="【"+caption+"】格式有误.\n只能输入数字,格式("+iLength+","+iDecimal+")";
	}
	
	if(!isNumber(obj.value,iLength,iDecimal))
	{
		alert(sErr);
		return false;
	}
	return true;
}

function checkDate(obj,caption)
{
	var strFormat="";
	if(obj.format!=null)
	{
		strFormat=obj.format;
	}
	if(strFormat=="")
	{
		strFormat="yyyy-MM-dd HH:mm:ss";
	}
	sErr="【"+caption+"】只能输入日期!\n格式为"+strFormat;
	if(!isDate(obj.value,strFormat))
	{
		alert(sErr);
		return false;
	}
	return true;
}
function getYYYYMMDDbyIdentity(identity)
{
  var str='';
  identity=''+identity;
  if(!Identity.exec(identity))
    return str;
  if(identity.length==18)
    str=identity.substring(6,14);
  else  if(identity.length==15)
    str='19'+identity.substring(6,12);
    
  if(!YYYYMMDD.exec(str))
    return '';
  return str;
}
function getSexbyIdentity(identity)
{
  var str='';
  identity=''+identity;
  if(getYYYYMMDDbyIdentity(identity)=='')
    return str;
  if(identity.length==18)
    str=identity.substring(16,17);
  else  if(identity.length==15)
    str=identity.substring(14,15);
    str=parseInt(str)%2;
  return str;
}
function getCaption(obj)
{
	while(obj.tagName.toLowerCase()!='td'&&obj.tagName.toLowerCase()!='th')
	{
	  obj=obj.parentNode;
	}
	obj=obj.previousSibling;
  return obj.innerText;
}
function onmyinput(o)
{
 if(o.value.length>=o.getAttribute("maxlength"))
 {
  if(o.value.length>o.getAttribute("maxlength"))
   o.value = o.value.substring(0,o.getAttribute("maxlength"));
  return false;
 }
 return true;
}
function mygetclipdata()
{
 if(!document.all)
 {
  netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
  trans.addDataFlavor('text/unicode');
  var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
  clip.getData(trans,clip.kGlobalClipboard);
  var str=new Object();
  var strLength=new Object();
  trans.getTransferData("text/unicode",str,strLength);  
  if (str)
  str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
  var pastetext;
  if (str)
  pastetext=str.data.substring(0,strLength.value / 2); 
  return pastetext;
 }
 else
 {
  return window.clipboardData.getData("Text");
 }
}
function mysetclipdata(o)
{
 if(!document.all)
 {
  netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
  trans.addDataFlavor("text/unicode");
  var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
  str.data=o;
  trans.setTransferData("text/unicode",str,o.length*2);
  var clipid=Components.interfaces.nsIClipboard;
  clip.setData(trans,null,clipid.kGlobalClipboard);
 }
 else
 {
  window.clipboardData.setData("Text",o);
 }
}
function onmypaste(o)
{
 var nMaxLen=o.getAttribute? parseInt(o.getAttribute("maxlength")):"";
 if(!document.all)
 {
  alert("不可能执行的代码");
 }
 else
 {

  if(document.selection.createRange().text.length>0)
  { 
   var ovalueandclipboarddata = o.value +window.clipboardData.getData("Text");
   if(o.getAttribute && ovalueandclipboarddata.length-document.selection.createRange().text.length>nMaxLen)
   {
    if(window.clipboardData.getData("Text").substring(0,document.selection.createRange().text.length+nMaxLen-o.value.length)!="")
     window.clipboardData.setData("Text",window.clipboardData.getData("Text").substring(0,document.selection.createRange().text.length+nMaxLen-o.value.length));
    else
     return false;
   }
  }
  else
  {
   var ovalueandclipboarddata = o.value +window.clipboardData.getData("Text");
   if(o.getAttribute && ovalueandclipboarddata.length>nMaxLen)
   {
    if(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length)!="")
     window.clipboardData.setData("Text",ovalueandclipboarddata.substring(0,nMaxLen-o.value.length));
    else
     return false;
   }
  }
  return true;
 }
}
function onmykeypress(o)
{
 if(!document.all)
 {
  var nMaxLen=o.getAttribute? parseInt(o.getAttribute("maxlength")):"";

  if(onmykeypress.caller.arguments[0].ctrlKey == true)
  {
   if(onmykeypress.caller.arguments[0].which==118)
   {

    if(o.selectionStart<o.selectionEnd)
    {
     var ovalueandclipboarddata = o.value + mygetclipdata();
     if(o.getAttribute && (ovalueandclipboarddata.length-o.selectionEnd + o.selectionStart>nMaxLen))
     {
      if(mygetclipdata().substring(0,o.selectionEnd - o.selectionStart+nMaxLen-o.value.length)!="")
       mysetclipdata(mygetclipdata().substring(0,o.selectionEnd - o.selectionStart+nMaxLen-o.value.length));
      else
       return false;
     }
    }
    else
    {
     var ovalueandclipboarddata = o.value +mygetclipdata();
     if(o.getAttribute && ovalueandclipboarddata.length>nMaxLen)
     {
      if(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length)!="")
       mysetclipdata(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length));
      else
       return false;
     }
    }
    return true;

   } 
  }


  if(onmykeypress.caller.arguments[0].which==0 || onmykeypress.caller.arguments[0].which==8)
   return true;
  if(o.value.length>=o.getAttribute("maxlength"))
  {
   if(o.selectionStart<o.selectionEnd)
    return true;
   if(o.value.length>o.getAttribute("maxlength"))
    o.value = o.value.substring(0,o.getAttribute("maxlength"));
   return false;
  }
  else
   return true;
  
 }
 else
 {
  if(document.selection.createRange().text.length>0)
   return true;
  if(o.value.length>=o.getAttribute("maxlength"))
   return false;
  else
   return true;
 }
}


