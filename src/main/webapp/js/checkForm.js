var	NUM_HAN = '0123456789';

	var	Minute=/[0-5][0-9]/;   
	var	Require= /.+/;
	var	Email=/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	var	Phone=/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
	var	Mobile=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/; //|^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
	//var	Telephone=/(^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$)|(^((\(\d{3}\))|(\d{3}\-))?13\d{9}$)/;
	var	Telephone=/(^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,4}\)|0\d{2,4}-)?[1-9]\d{6,7}(-\d+)?$)|(^((\(\d{3}\))|(\d{3}\-))?13\d{9}$)/;
	var	Url=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	Website=/^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	var	IdCard=/^\d{15}(\d{2}[A-Za-z0-9])?$/;
	var	Currency=/^\d+(\.\d+)?$/;
	
	var	Zip=/^[1-9]\d{5}$/;
	var	QQ=/^[1-9]\d{4,8}$/;
	var	Integer=/^[-\+]?\d+$/;
	var	Double=/^[-\+]?\d+(\.\d+)?$/;
	var	English=/^[A-Za-z]+$/;
	var	Chinese=/^[\u0391-\uFFE5]+$/;
	var	UnSafe=/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
	var	Sequence=/^(\<[Y]{2,4}\>){0,1}(\<[M]{2}\>){0,1}(\<[D]{2}\>){0,1}[X]{1,6}$/;
	var	Pwd = /^(\w){6,10}$/;
	var strr="test";
function isPasswd(obj)   
{   
	return Pwd.test(obj);
}	
function isMinute(obj){
	return Minute.exec(obj);
}
function isSequence(obj)
{
	return Sequence.test(obj);
}
function isRequire(obj){
	return Require.exec(obj);
}
function isEmail(obj){
	return Email.exec(obj);
}
function isPhone(obj){
	return Phone.exec(obj);
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

function isZip(obj){
	return Zip.exec(obj);
}
function isQQ(obj){
	return v.exec(obj);
}
function isInteger(obj){
	return Integer.exec(obj);
}
function isDouble(obj){
	return Double.test(obj);
}
function isEnglish(obj){
	return English.test(obj);
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
function checkForm()
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
		bEnglish = false;
		bSequence = false;
		bDouble = false;
		bLength = false;
		obj=document.all(i);
		if(obj.tagName=="INPUT" || obj.tagName=="SELECT" || obj.tagName=="TEXTAREA")
		{
			sCaption=(obj.caption!=null)?obj.caption:"";
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
			if(obj.isNull!=null)
			{
				if(obj.isNull==0)
				{
					if(checkEmpty(obj,sCaption))
					{
						return false;
					}
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
function checkDouble(obj,caption)
{
	if(obj==null)
	{
	 		return false;
	}
	if(obj.value.length==0)
	{
	 		return false;
	}
	else
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
function pop_form(page_name,width,height,form_name,item_name) {
		var pop_form_Value;
		//alert(page_name);
		pop_form_value=window.showModalDialog(page_name,0,'center:yes;resizable:no;status:no;help:no;scroll:no;dialogWidth:'+ width + 'px;dialogHeight:'+ height + 'px');
		eval('window.document.'+form_name+'.'+item_name+'.value=pop_form_value');
}
function selectDate() {
  var pop_form_value;
  pop_form_value=window.showModalDialog("/composite/include/calendar.jsp",0,"center:yes;resizable:no;status:no;help:no;scroll:no;dialogWidth:200px;dialogHeight:227px");
if(pop_form_value!=null){
  event.srcElement.value=pop_form_value;
}
 }
//去空格id值去空格
var $tv = function(id){
	document.getElementById(id).value = Trim(document.getElementById(id).value);
}
//去右空格
String.prototype.trim = function(){ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
}
//功能:判断元素的值是否为空
String.prototype.isNull = function() {
	 return (this==null || this.trim()=="" || typeof(this)=="undefined");
}
//取左右空格
function Trim(str){
	return str.trim();
}
//检查是否由数字组成
String.prototype.isDigit = function() {
	var s = this.Trim();
	return (s.replace(/\d/g, "").length == 0);
}
// 检查是否为数字
String.prototype.isNumber = function() {
  var s = this.Trim();
  return (s.search(/^[+-]?[0-9.]*$/) >= 0);
}
//判断是否整数
function checknumber(String){
	var Letters = "1234567890";
	var i;
	var c;
	for( i = 0; i < String.length; i ++ ){
		c = String.charAt( i );
		if (Letters.indexOf( c ) == -1){
			return true;
		}
	}
	return false;
}
// 检查是否为货币格式
String.prototype.isCurrency = function() {
  var s = this.Trim();
  return (s.search(/^[0-9]+([.]\d{1,2})?$/) >= 0);
}

function isFloat(id){
	var zkl = Trim(document.getElementById(id).value);
	if(checkfloat(zkl) && zkl != ""){
		return false;
	}
	return true;
}
//判断是否是0.00格式
function checkfloat(str){
	var pattern =/^[0-9]+([.]\d{1,2})?$/;	
	if(!pattern.test(str)){
		//alert("请输入数字(例:0.00),最高保留两位小数");
	   return true;
	}
	return false;
}
//判断是否是货币格式0.00
function checkMoney(str){
	var yf = Trim(document.getElementById(str).value);
	document.getElementById(str).value = yf;
	//去空格
	if(yf == ''){
		document.getElementById(str).value = '' ;
	}
	//第一个不能为点
	if(yf.length >= 1){
		var fastStr = yf.substring(0,1);
		if(fastStr == "."){
			document.getElementById(str).value = yf.substring(0,yf.length-1);
		}
	}
	//如果第一个为0
	if(yf.substring(0,1)=='0' && Math.floor(yf) != '0'){
		document.getElementById(str).value = Math.floor(yf);
	}
	//如果不是货币格式
	if(!isFloat(str)){
		if(yf.split(".").length-1 < 1){ //没有点
			document.getElementById(str).value = yf.substring(0,yf.length-1);
		}else if(yf.split(".").length-1 > 1 && yf.indexOf(".") > -1){//点数大于一
			document.getElementById(str).value = yf.substring(0,yf.length-1);
		}else if(yf.split(".").length-1 ==1 && yf.length > 2){//一个点
			var firstChar = yf.substring(0,1);
			var char = yf.substring(yf.length-1,yf.length);
			if(firstChar == '0'){
				document.getElementById(str).value = Math.floor(Trim(document.getElementById(str).value));
				document.getElementById(str).value = '0.' + yf.substring(yf.indexOf(".")+1,yf.length);
			}
			yf = Trim(document.getElementById(str).value);
			//继续输入必须是数字
			if(checknumber(char) && char != "."){
				document.getElementById(str).value = yf.substring(0,yf.length-1);
			}
			yf = Trim(document.getElementById(str).value);
			//点后面只能有两位小数
			var mun = yf.indexOf(".");
			var lastStr = yf.substring(mun+1,yf.length);
			if(lastStr.length > 2){
				document.getElementById(str).value = yf.substring(0,(yf.length - lastStr.length + 2));
			}
		}
	}
}
//提交时验证数据
function checkElements(obj){
	for(var key in obj){
		//验证非空
		if(key.indexOf('null') > -1){
			var obj1 = obj[key];
			for(var key1 in obj1){
				if(typeof(obj1[key1].name)=='undefined' && typeof(obj1[key1].id)!='undefined'){
					var str = Trim(document.getElementById(obj1[key1].id).value);
					document.getElementById(obj1[key1].id).value = str;
					if(str.isNull()){
						alert(obj1[key1].msg);
						return true;
					}
				}else if(typeof(obj1[key1].name)!='undefined' && typeof(obj1[key1].id)=='undefined'){
					var objs = document.getElementsByName(obj1[key1].name);
					for(var i=0;i<objs.length;i++){
						var str = Trim(objs[i].value)
						objs[i].value = str;
						if(str.isNull()){
							alert(obj1[key1].msg);
							return true;
						}
					}
				}
			}
		}
		//验证数字
		if(key.indexOf('num') > -1){
			var obj1 = obj[key];
			for(var key1 in obj1){
				var str = Trim(document.getElementById(obj1[key1].id).value);
				document.getElementById(obj1[key1].id).value = str;
				if(!str.isDigit() || str.length == 0){
					alert(obj1[key1].msg);
					return true;
				}
			}
		}
		//货币验证
		if(key.indexOf('cur') > -1){
			var obj1 = obj[key];
			for(var key1 in obj1){
				var str = Trim(document.getElementById(obj1[key1].id).value);
				document.getElementById(obj1[key1].id).value = str;
				if(!str.isCurrency() || str.length == 0){
					alert(obj1[key1].msg);
					return true;
				}
			}
		}
		//小数验证
		if(key.indexOf('flt') > -1){
			var obj1 = obj[key];
			for(var key1 in obj1){
				var str = Trim(document.getElementById(obj1[key1].id).value);
				document.getElementById(obj1[key1].id).value = str;
				if(!str.isNumber() || str.length == 0){
					alert(obj1[key1].msg);
					return true;
				}
			}
		}
	}
	return false;
}
//检验数字，去数字前面的0，调用checknumber()
function RemoveZero(id){
	var str = document.getElementById(id).value;
	if(checknumber(str)){
		document.getElementById(id).value = str.substring(0,str.length-1);
		return false;
	}else{
		if(Math.floor(Trim(document.getElementById(id).value)) != '0'){
			document.getElementById(id).value = Math.floor(Trim(document.getElementById(id).value));
		}
	}
	return true;
}
//四舍五入保留2位小数
function toFixed(num){
	return Math.round(num*100)/100;
}

// 检验不用能有负数
// add by zhengyong on 2013-03-21
function checkMoneyWithoutNegative(money) {
	if (money != 0) {
		//判断金额只能是数字类型
		if (isNaN(money)) {
			return false;
		}
		//获取"."的位置
		var len = money.indexOf(".");
		//获取"0"的位置
		var zero = money.indexOf("0");

		//如果第一位是0
		if (zero == 0) {
			//如果第一位是0，第二位要是不是"."的话,则为非法金额
			if (len != 1) {
				return false;
			}
			//如果第一位是0,则"."后面的两位小数不能同时为0
			if (parseInt(money.substr(len + 1, money.length)) == 0) {
				return false;
			}
		}
		//如果没找到"."，则说明这个数为整数
		if (len == -1) {
			//int类型的有效值不能超过8位
			if (money.length > 8) {
				return false;
			}
		}
		//如果找到"."的位置大于第一位
		if (len > 0) {
			//如果"."的位置大于第一位，则"."前面的有效值长度不能超过8位
			if (money.substr(0, len).length > 8) {
				return false;
			}
			//如果"."的位置大于第一位，则"."后面的有效值长度不能超过2位
			if ((money.substr(len + 1, money.length)).length > 2) {
				return false;
			}
		}
		//如果找到"."在第一位，则说明是非法金额
		if (len == 0) {
			return false;
		}
		//如果"."的位置等于当前money的长度-1说明"."是最后一位，则为非法金额
		if (money.indexOf(".") == money.length - 1) {
			return false;
		}
	}
	return true;
}
	