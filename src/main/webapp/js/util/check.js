
	var	Email=/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;//email地址
	var	Mobile=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/; //手机号码
	var	Telephone=/(^(\d{2,4}[-_－?]?)?\d{3,8}([-_－?]?\d{3,8})?([-_－?]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;//电话号码
	var	Url=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	Website=/^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	IdCard=/^\d{15}(\d{2}[A-Za-z0-9])?$/;
	var	Currency=/^\d+(\.\d+)?$/;
	var	number=/^\d+$/;//无符号数字
	var	Zip=/^[1-9]\d{5}$/;//右边
	var	Integer=/^[+]?\d+$/;//整数
	var	Double=/^[+]?\d+(\.\d+)?$/; //小数
	var	English=/^[A-Za-z]+$/; //英文
	var	Chinese=/^[\u0391-\uFFE5]*$/; //中文
	var	Char=/^([\u0391-\uFFE5\w]*[().,-]*)+$/;//字符
	var	UnSafe=/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
	var	car=/^[京沪津渝冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云藏陕甘青宁新][a-zA-Z]\w{4,6}[\u0391-\uFFE5]?$/; //车牌号
	var UserName = /^\w+$/;	//账号
	var	ip=/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/; //ip地址
	var	identity=/^(:\d{15}|\d{18}|\d{17}x)$/;//身份证号
	
function isChar(obj)
{
	return Char.test(obj);	
}
function isEmail(obj){
	return Email.exec(obj);
}
function isMobile(obj){
	return Mobile.exec(obj);
}
function isTelephone(obj){
	return Telephone.exec(obj);
}
function isUrl(obj){
	return Url.exec(obj);
}
function isIdCard(obj){
	return IdCard.exec(obj);
}
function isCurrency(obj){
	return Currency.exec(obj);
}
function isNumber(obj){
	return number.exec(obj);
}
function isZip(obj){
	return Zip.exec(obj);
}
function isInteger(obj){
	return Integer.exec(obj);
}
function isDouble(obj){
	return Double.exec(obj);
}
function isEnglish(obj){
	return English.exec(obj);
}
function isChinese(obj){
	return Chinese.exec(obj);
}
function isUnSafe(obj){
	return UnSafe.exec(obj);
}
function isWebsite(obj){
	return Website.exec(obj);
}

function isAccount(obj)
{
	return UserName.test(obj);	
}

function isCar(obj)
{
	return car.test(obj);	
}
function isIp(obj)
{
	return ip.test(obj);	
}
function isIdentity(obj)
{
	return identity.test(obj);	
}
function enableElement(sType)
{
	var obj;
	for (i = 0; i < document.all.tags(sType).length; i++)
	{
	    obj = document.all.tags(sType)[i];
	    if(obj.disabled)
	    {
	    	obj.disabled=false;
	    }
	}
}
function selectAll(eName)
{
	var objName;
	objName=(eName==null)?window.event.srcElement.name:eName;
	var i;
	var obj;
	if(document.all(objName)!=null)
	{
		if(document.all(objName).length==null)
		{
			obj=document.all(objName);
			//alert(document.all(objName));
			obj.checked=window.event.srcElement.checked;
		}
		else
		{
			for(i=0;i<document.all(objName).length;i++)
			{
				obj=document.all(objName)[i];
				if(obj.value!="" && obj.value!="0")
				{
					obj.checked=window.event.srcElement.checked;
				}
			}
		}
	}
}
function checkSelect(objName)
{
	var i;
	var obj;
	var sReturn;
	sReturn="";
	if(document.all(objName)!=null)
	{
		if(document.all(objName).length!=null)
		{
			for(i=0;i<document.all(objName).length;i++)
			{
				obj=document.all(objName)[i];
				if(obj.checked && obj.value!="")
				{
					sReturn=obj.value;
					break;
				}
			}
		}
		else
		{
			obj=document.all(objName);
			if(obj.checked && obj.value!="")
			{
				sReturn=obj.value;
			}
		}
	}
	if(sReturn=="")
	{
		alert("请先选择");
	}
	return(sReturn);
}
function check()
{
	var i;
	var sCaption;
	var obj;
	var iLength;
	var iDecimal;
	var bDate;
	var bNumber;
	
	for(i=0;i<document.all.length;i++)
	{
		bDate=false;
		bNumber=false;
		bPWD = false;
		bCar =false;
		bEnglish = false;
		bSequence = false;
		bDouble = false;
		bLength = false;
		bChar = false;
		bTelephone = false;
		bAccount= false;
		bIp= false;
		obj=document.all(i);
		if((obj.tagName=="INPUT" || obj.tagName=="SELECT" || obj.tagName=="TEXTAREA")&& obj.disabled!=true&& obj.readOnly!=true)
		{
			sCaption=(obj.caption!=null)?obj.caption:"";
			if(obj.isNull!=null)
			{
				if(obj.isNull==0)
				{
					if(checkEmpty(obj,sCaption))
					{
						return false;
					}
				}
				else if(obj.value.length==0)
				{
				   continue;
				}
			}
			else if(obj.value.length==0)
			{
			   continue;
			}
			if(obj.isLength!=null)
			{
				bLength = true;
			}
			if(obj.isNumber!=null)
			{
				bNumber=true;
			}
			if(obj.isDouble!=null)
			{
				bDouble = true;
				}
			if(obj.isDate!=null)
			{
				bDate=true;
			}
			if(obj.beEnglish!=null)
			{
				bEnglish=true;				
			}
			if(obj.isSequence!=null)
			{
				bSequence = true;
			}
			if(obj.isPassword!=null)
			{
				bPWD = true;	
			}
			if(obj.isCar!=null)
			{
				bCar = true;	
			}
			if(obj.isChar!=null)
			{
				bChar=true;				
			}
			if(obj.isTelephone!=null)
			{
				bTelephone=true;				
			}
			if(obj.isAccount!=null)
			{
				bAccount=true;				
			}
			if(obj.isIp!=null)
			{
				bIp=true;				
			}
			
			
			if(bAccount)
			{
				if(checkIsAccount(obj,sCaption))	
				{
					return false;	
				}	
			}
			if(bIp)
			{
				if(checkIsIp(obj,sCaption))	
				{
					return false;	
				}	
			}
			if(bCar)
			{
				if(checkIsCar(obj,sCaption))	
				{
					return false;	
				}	
			}
			if(bTelephone)
			{
				if(checkIsTelephone(obj,sCaption))	
				{
					return false;	
				}	
			}
			if(bChar)
			{
				if(obj.isChar==1)
				if(checkIsChar(obj,sCaption))	
				{
					return false;	
				}	
			}
			if(bPWD)
			{
				if(checkPassword(obj,sCaption))	
				{
					return false;	
				}
			}
			if(bSequence)
			{
				if(checkSequence(obj,sCaption))
				{
					return false;	
				}
			}
			
			if(bEnglish)
			{
				if(obj.beEnglish==1)	
				{
					if(!checkEnglisth(obj,sCaption))
					{
						return false;
					}
					
				}
			}
			if(bDouble)
			{
				if(checkDouble(obj,sCaption))
				{
					return false;
					}
				}
			if(bNumber)
			{
				
				if(obj.isNumber==1)
				{
					if(obj.length!=null)
					{
						iLength=parseInt(obj.length);
						if(isNaN(iLength))
						{
							iLength=0;
						}
					}
					
					if(obj.decimal!=null)
					{
						iDecimal=parseInt(obj.decimal);
						if(isNaN(iDecimal))
						{
							iDecimal=0;
						}
					}	
					
					if(!checkNumber(obj,sCaption,iLength,iDecimal))
					{
						return false;
					}
					
				}
			}
			if(bDate)
			{
				if(obj.isDate==1)
				{
					if(!checkDate(obj,sCaption))
					{
						return false;
					}
				}
			}
	
		if(bLength&&(obj.tagName=="INPUT" || obj.tagName=="SELECT" || obj.tagName=="TEXTAREA")&& obj.disabled!=true&& obj.readOnly!=true)
		{
				iLength=parseInt(obj.length);
				if(isNaN(iLength))
				{
					iLength=0;
				}
				if(!checkLength(obj,sCaption,iLength))
				{
					return false;
				}
			}
		}
	}
	return true;
} 

function trim(str)
{
	if(str.charAt(0)==" ")
	{
		str=str.slice(1);
		str = trim(str);
	}
	return str;
}

function lenB(str)
{
	var i;
	var iLength=0
	for(i=0;i<str.length;i++)
	{
		iLength++;
		if(str.charCodeAt(i)>255)
		{
			iLength++;
  		}
  	}
	return iLength;
}

function isEmpty(value)
{
	if(trim(value) == "")
	{
		return true;
	}
	return false;
}

function isLength(value,iLength)
{
	if(lenB(value)>iLength)
	{
		return false;
	}
	return true;
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
function checkPassword(obj,caption)
{
	sErr="【"+caption+"】只能输入6-10个字母、数字、下划线";
	if(isPasswd(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}

function checkIsCar(obj,caption)
{
		
	sErr="【"+caption+"】格式不对";
	if(isCar(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}
function checkIsIp(obj,caption)
{
		
	sErr="【"+caption+"】格式不对";
	if(isIp(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}

function checkIsAccount(obj,caption)
{
		
	sErr="【"+caption+"】格式不对";
	if(isAccount(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}

function checkIsTelephone(obj,caption)
{
		
	sErr="【"+caption+"】格式不对";
	if(isTelephone(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}
function checkIsChar(obj,caption)
{
		
	sErr="【"+caption+"】格式不对";
	if(isChar(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}


function checkDouble(obj,caption)
{
	 sErr="【"+caption+"】只能输入数字型";
	 if(isDouble(obj.value))
	 {
	 		return false;
	 	}else{
	 			alert(sErr);
	 			return true;
	 		}
}
function checkSequence(obj,caption)
{
	sErr="【"+caption+"】格式不对";
	if(isSequence(obj.value))
	{
		return false;
	}else{
		alert(sErr);
		return true;
	}
}
function checkEmpty(obj,caption)
{
	sErr="【"+caption+"】不能为空";
	if(isEmpty(obj.value))
	{
		alert(sErr);
		return true;
	}
	return false;
}

function checkLength(obj,caption,iLength)
{
	sErr="【"+caption+"】长度("+lenB(obj.value)+")超过系统设定("+iLength+")";
	if(!isLength(obj.value,iLength))
	{
		alert(sErr);
		return false;
	}
	return true;
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
function checkEnglisth(obj,caption)
{
	sErr="【"+caption+"】只能输入字符格式";	

	
	if(!isEnglish(obj.value))
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

//判断是否为整数
function isInt(value)
{
     var re =/^[1-9]+[0-9]*]*$/;//判断正整数   

     if (!re.test(value))
	    {
	    	 return false;
	     }
     return true;
} 