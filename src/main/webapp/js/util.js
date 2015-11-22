//????????????????
document.oncontextmenu = function(){
	return true;
};

var WindUtil={};
var Util = {};
if(!Element){
	var Element = {};
}
if(!Form){
	var Form = {};
}
var Node = {};
var Table = {};


/*??????windutil??????????**************************************************************************************************/
//??????????????????????????
WindUtil.getAbsolutePosition = function(obj){
  	try{
    		var offsetTop = obj.offsetTop;
    		var offsetLeft = obj.offsetLeft;
    		var tagName = obj.tagName;
    		if(obj.tagName == "FIELDSET"){
    			offsetLeft += 2;
    		}
    		while( obj = obj.offsetParent )
    		{
	        	offsetTop += obj.offsetTop;
	        	offsetLeft += obj.offsetLeft;
	        	
    			tagName = obj.tagName;
	        	if(tagName != "BODY"){
    				offsetTop -= obj.scrollTop;
    				offsetLeft -= obj.scrollLeft;
    			}
    			if(obj.tagName == "FIELDSET"){
	    			offsetLeft += 2;
	    		}
    		}
  	}catch(ex){}
  	
  	return {top:offsetTop,left:offsetLeft};
}
WindUtil.getAbsolutePositionInContainer = function(obj,container){
	window.status = "";
  	try{
    		var offsetTop = obj.offsetTop;
    		var offsetLeft = obj.offsetLeft;
    		var tagName = obj.tagName;
    		if(obj.tagName == "FIELDSET"){
    			offsetLeft += 2;
    		}

    		while( obj = obj.offsetParent )
    		{
    			if(obj == container){
    				break;
    			}
	        	offsetTop += obj.offsetTop;
	        	offsetLeft += obj.offsetLeft;
    			tagName = obj.tagName;
	        	if(tagName != "BODY"){
    				offsetTop -= obj.scrollTop;
    				offsetLeft -= obj.scrollLeft;
    			}
    			if(obj.tagName == "FIELDSET"){
	    			offsetLeft += 2;
	    		}
    		}
  	}catch(ex){
  		alert(ex);
  	}
  	
  	return {top:offsetTop,left:offsetLeft};
}
//??????????????????????
WindUtil.getWindowViewRect = function(){
	return {left:document.body.scrollLeft,top:document.body.scrollTop,width:document.body.clientWidth,height:document.body.clientHeight};
}


/*????????????????????????**************************************************************************************/
/**
  *  ????????trim????
  */
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.lTrim = function()
{
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rTrim = function()
{
    return this.replace(/(\s*$)/g, "");
}

/**
  * ????setTimeout??????????????????????????
  * ??????????????????????????????????????????????
  * ??????????????????????????
  */
var _wst = window.setTimeout;
window.setTimeout = function(func,delay){
	if(typeof func != "function"){
		return ;
	}

	if(arguments.length<=2){
		_wst(func,delay);
		return;
	}
	
	var argu = Array.prototype.slice.call(arguments,2); 
	_wst(function(){
		func.apply(null,argu);
		},delay); 
}

/*??????????Element??????*************************************************************************************/

/**
  * ????????????????input[type="text"]||textarea????????????????????????????????????????
  * ????????????????????????????????
  */
Element.makeInputFocusBackground = function(container,focusBackground){
	//??????????????????
	this._appendEvent = function(ele){
		ele.attachEvent("onfocus",function(){
			var _ele = window.event.srcElement;
			_ele._normalBackground = _ele.style.getAttribute("backgroundColor");
			_ele.style.setAttribute("backgroundColor",focusBackground);
			});
		ele.attachEvent("onblur",function(){
			var _ele = window.event.srcElement;
			_ele.style.setAttribute("backgroundColor",_ele._normalBackground);
			});
	}
	//??????????input[type="text"]????????????????????
	var eles = container.getElementsByTagName("input");
	var len = eles.length;
	for(var i = 0 ;i < len;i++){
		if(eles[i].type != "text"){
			continue;
		}
		this._appendEvent(eles[i]);
	}
	//??????????textarea????????????????????
	eles = container.getElementsByTagName("textarea");
	len = eles.length;
	for(i = 0 ;i < len;i++){
		this._appendEvent(eles[i]);
	}
}

/**
  * ??????????????????????????????????????????????
  */
Element.makeCheckboxCheckedStatus = function(container,checked){
	var all = container.getElementsByTagName("input");
	var len = all.length;
	var element ;
  	for (var i = 0;i < len;i++){
  		element = all[i];
	    	if (element.type == "checkbox"){
	    		element.checked = checked;
	    	}
  	}
}


Element.Minute=/[0-5][0-9]/;   
Element.Require= /.+/;
Element.Email=/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
Element.Phone=/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
Element.Mobile=/^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/; //|^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
Element.Telephone=/(^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,4}\)|0\d{2,4}-)?[1-9]\d{6,7}(-\d+)?$)|(^((\(\d{3}\))|(\d{3}\-))?13\d{9}$)/;
Element.Url=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
Element.Website=/^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
Element.IdCard=/^\d{15}(\d{2}[A-Za-z0-9])?$/;
Element.Currency=/^\d+(\.\d+)?$/;
Element.Zip=/^[1-9]\d{5}$/;
Element.QQ=/^[1-9]\d{4,8}$/;
Element.Integer=/^(([-\+]?\d+)|(\w{0}))$/;
Element.Positive=/^(([+]?[1-9]+\d*)|(\w{0}))$/;
Element.Double=/^(([-\+]?\d+(\.\d+)?)|(\w{0}))$/;
Element.English=/^[A-Za-z]+$/;
Element.Chinese=/^[\u0391-\uFFE5]+$/;
Element.UnSafe=/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/;
Element.Sequence=/^(\<[Y]{2,4}\>){0,1}(\<[M]{2}\>){0,1}(\<[D]{2}\>){0,1}[X]{1,6}$/;
Element.Date = /^((\d{4}\-((0[1-9])|(1[0-2]))\-(([0-2][1-9])|(3[0-1])))|(\w{0}))$/;
Element.TIME_REG = /^((([0-1]?[0-9])|(2[0-3])):[0-5]?[0-9])$/;

Element.INT = "isInt";
Element.POSITIVE = "isPositive";
Element.DATE = "isDate";
Element.FLOAT = "isFloat";
Element.EMPTY = "isEmpty";
Element.MAXLENGTH = "maxLength";
Element.MINLENGTH = "minLength";
Element.EQUAL = "equal";
Element.MSG = "msg";

Element.isOk = function(element){
	var isOk = true;
	var attrValue;
	
	attrValue = element.getAttribute(Element.EMPTY);
	if(attrValue=="false"){
		isOk &= !Element.isEmpty(element.value);
	}
	attrValue = element.getAttribute(Element.POSITIVE);
	if(attrValue!="false"&&attrValue!=null){
		isOk &= Element.isPositive(element.value);
	}
	attrValue = element.getAttribute(Element.INT);
	if(attrValue!="false"&&attrValue!=null){
		isOk &= Element.isInt(element.value);
	}
	attrValue = element.getAttribute(Element.FLOAT);
	if(attrValue!="false"&&attrValue!=null){
		isOk &= Element.isFloat(element.value);
	}
	attrValue = element.getAttribute(Element.DATE);
	if(attrValue!="false"&&attrValue!=null){
		isOk &= Element.isDate(element.value);
	}
	attrValue = element.getAttribute(Element.MAXLENGTH);
	if(attrValue!=""&&attrValue!=null){
		try{
			isOk &= Element.maxLength(element.value,parseInt(attrValue));
		}catch(e){}
	}
	attrValue = element.getAttribute(Element.MINLENGTH);
	if(attrValue!=""&&attrValue!=null){
		try{
			isOk &= Element.minLength(element.value,parseInt(attrValue));
		}catch(e){}
	}
	attrValue = element.getAttribute(Element.EQUAL);
	if(attrValue!=""&&attrValue!=null){
		isOk &= Element.isEqual(element.value,element.form.elements[attrValue].value);
	}
	
	return isOk;
}
Element.isInt = function(value){
	return Element.Integer.test(value);
}
Element.isPositive = function(value){
	return Element.Positive.test(value);
}

Element.isFloat = function(value){
	return Element.Double.test(value);
}

Element.isDate = function(value){
	return Element.Date.test(value);
}

Element.isEmpty = function(value){
	if(value == null){
		return true;
	}
	return value.trim() == "";
}

Element.maxLength = function(value,maxLength){
	if(value == null){
		return true;
	}
	
	return value.length <= maxLength;
}

Element.minLength = function(value,minLength){
	if(value == null){
		return true;
	}
	
	return value.length >= minLength;
}

Element.isEqual = function(value,newValue){
	return value == newValue;
}

/*??????????form??????*************************************************************************************/
Form.checkFormData = function(form){
	var elements = form.elements,element;
	var len = elements.length;
	var msg;
	for(var i= 0;i<len;i++){
		element = elements[i];
		if(element.type=="button"){
			continue;
		}
		if(!Element.isOk(element)){
			msg = element.getAttribute(Element.MSG);
			return msg==null?"":msg;
		}
	}
	
	return null;
}



/*??????????node??????*************************************************************************************/
Node.removeAllChilds = function(node){
	if(node==null){
		return true;
	}
	
	while(node.firstChild!=null){
		node.removeChild(node.firstChild);
	}
	/*????????????????????????????????????????????????????????????????????
		var parentNode = node.parentNode;
		if(parentNode == null){
			return false;
		}
		var newNode = node.cloneNode(false);
		parentNode.replaceChild(newNode,node);
	*/
}

/*??????????util??????******************************************************************************************************/
	
Util.KEYCODE = {};
Util.KEYCODE.ENTER = 13;
Util.KEYCODE.DELETE = 46;
Util.KEYCODE.BACKSPACE = 8;
Util.KEYCODE.COMMA = 188;
Util.KEYCODE.UP = 38;
Util.KEYCODE.DOWN = 40;
Util.KEYCODE.LEFT = 37;
Util.KEYCODE.RIGHT = 39;
Util.KEYCODE.DIGIT9 = 57;
Util.KEYCODE.DIGIT0 = 48;
Util.KEYCODE.NUM_DIGIT0=96;
Util.KEYCODE.NUM_DIGIT9=105;

Util.Time = {};
Util.Time.tagName = "timeCom";
Util.Time.HOUR = "hour";
Util.Time.MINUTE = "minute";
Util.Time.FLAG = "flag";

/**
  * ??????????????????,??????????????????????????????????????????????????????????????????????????????????????????????
  */
Util.Time.keyDown = function(){
	var e = window.event;
	var obj = e.srcElement;
	var flag =obj.getAttribute(Util.Time.FLAG);
		
	var keyCode = e.keyCode;
	if(keyCode != Util.KEYCODE.BACKSPACE && keyCode != Util.KEYCODE.DELETE && (keyCode < Util.KEYCODE.LEFT || keyCode > Util.KEYCODE.DOWN)){
		if(!((keyCode >= Util.KEYCODE.DIGIT0&&keyCode <= Util.KEYCODE.DIGIT9)||(keyCode >= Util.KEYCODE.NUM_DIGIT0&&keyCode <= Util.KEYCODE.NUM_DIGIT9))){
			return false;
		}
	}
		
	var location = Util.getCursorLocation(obj);
	if((keyCode==Util.KEYCODE.LEFT||keyCode == Util.KEYCODE.BACKSPACE) && location == 0){
		Util.Time.preCom(obj,flag);
	}else if(keyCode==Util.KEYCODE.RIGHT && location == obj.value.length){
		Util.Time.nextCom(obj,flag);
	}
		
	if(keyCode!=Util.KEYCODE.UP&&keyCode!=Util.KEYCODE.DOWN){
		return true;
	}
		
	var value = obj.value;
	if(value == ""){
		value = "0";
	}
	var digitValue = parseInt(value,10);
	if(keyCode == Util.KEYCODE.UP){
		digitValue -= 1;
	}else if(keyCode == Util.KEYCODE.DOWN){
		digitValue += 1;
	}
		
	if(Util.Time.HOUR == flag){
		if(digitValue < 0){
			digitValue = 23;
		}else if(digitValue>23){
			digitValue = 0;
		}
	}else if(Util.Time.MINUTE == flag){
		if(digitValue < 0){
			digitValue = 59;
		}else if(digitValue > 59){
			digitValue = 0;
		}
	}
		
	if(digitValue < 10){
		digitValue = "0"+digitValue;
	}
	obj.value = digitValue;
	
	return true;
}
/**
  * ??????????????????????????????????????????????????????????
  */
Util.Time.keyUp = function(obj){
	var e = window.event;
	var obj = e.srcElement;
	var flag =obj.getAttribute(Util.Time.FLAG);
		
	var keyCode = e.keyCode;
	if(!((keyCode >= Util.KEYCODE.DIGIT0&&keyCode <= Util.KEYCODE.DIGIT9)||((keyCode >= Util.KEYCODE.NUM_DIGIT0&&keyCode <= Util.KEYCODE.NUM_DIGIT9)))){
		return true;
	}
		
	var len = obj.value.length;
	if(len == 2){
		Util.Time.nextCom(obj,flag);
	}
}
/**
  * ????????????????????
  * ????????????
  */
Util.Time.nextCom = function(obj,flag){
	if(flag == Util.Time.HOUR){
		obj.nextSibling.nextSibling.focus();
	}
}
/**
  * ????????????????????????
  */
Util.Time.preCom = function(obj,flag){
	if(flag == Util.Time.MINUTE){
		obj.previousSibling.previousSibling.focus();
	}
}
/**
  * ????????????????????????????????????????????????????????????????????????????????????
  */
Util.Time.propertyChanged = function(){
	var e = window.event;
	var obj = e.srcElement;
	var propertyName = e.propertyName;
	if(propertyName != "value"){
		return ;
	}
		
	var value = obj.value;
	if(value == ""){
		value = "0";
	}
	value =parseInt(value);
	var flag =obj.getAttribute(Util.Time.FLAG);		
	if(Util.Time.HOUR == flag){
		if(value > 23){
			obj.value = 23;
		}
	}else if(Util.Time.MINUTE == flag){
		if(value > 59){
			obj.value = 59;
		}
	}
}

Util.Time.createTemplate = function(){
	var arr = [];
	arr[arr.length] = "<input type='text' maxlength='2' size='2' "+Util.Time.FLAG+"='"+Util.Time.HOUR+"' style='height:25;font-size:20' onfocus='this.select();' onpropertychange='Util.Time.propertyChanged();' onkeydown='return Util.Time.keyDown();' onkeyup='return Util.Time.keyUp();'>";
	arr[arr.length] = ":";
	arr[arr.length] = "<input type='text' maxlength='2' size='2' "+Util.Time.FLAG+"='"+Util.Time.MINUTE+"' style='height:25;font-size:20' onfocus='this.select();' onpropertychange='Util.Time.propertyChanged();' onkeydown='return Util.Time.keyDown();' onkeyup='return Util.Time.keyUp();'>";
	
	var template = document.createElement("div");
	template.innerHTML = arr.join("");
	
	return template;
}

Util.Time.initCom = function(){
	var coms = document.getElementsByTagName(Util.Time.tagName);
	var len = coms.length;
	var com;
	var template = Util.Time.createTemplate(),newCom;
	for(var i= len-1;i>=0;i--){
		com = coms[i];
		newCom = template.cloneNode(true);
		Util.extendAttr(newCom,com);
		
		com.replaceNode(newCom);
	}
};

Util.extendAttr = function(destNode,sourceNode){
	if(sourceNode.getAttribute("id")!=null){
			destNode.setAttribute("id",sourceNode.getAttribute("id"));
		}
};

//??????????????????????????
Util.numberChar = function(){
	var e = window.event;
		
	var keyCode = e.keyCode;
	if(keyCode != Util.KEYCODE.BACKSPACE && keyCode != Util.KEYCODE.DELETE && (keyCode < Util.KEYCODE.LEFT || keyCode > Util.KEYCODE.DOWN)){
		if(keyCode < Util.KEYCODE.DIGIT0||keyCode > Util.KEYCODE.DIGIT9){
			return false;
		}
	}
	return true;
}
/**
  * ????????????????????????????
  */
Util.getCursorLocation = function(obj){
	obj.focus();
		
	var s=document.selection.createRange();
	s.setEndPoint("StartToStart",obj.createTextRange());
	
	return s.text.length;
};

Table.clearSelectedRow = function(){
	if(this == null){
		return ;
	}
	
	this.selectedRow = null;
	this.selectedRowOriginalBgColor = null;
};
Table.selectedBackgroundColor = "#f5deb3";
Table.selectRow = function(row,selectedColor){
	if(this == null){
		return ;
	}
	if(this.selectedRow == row){
		return ;
	}
	
	if(selectedColor == null){
		selectedColor = Table.selectedBackgroundColor;
	}
	
	if(this.selectedRow != null){
		this.selectedRow.style.backgroundColor = this.selectedRowOriginalBgColor;
	}
	this.selectedRow = row;
	
	if(this.selectedRow != null){
		this.selectedRowOriginalBgColor = this.selectedRow.style.backgroundColor;
		this.selectedRow.style.backgroundColor = selectedColor;
	}
};
Table.getSelectedRow = function(obj){
	return obj.selectedRow;
};
Table.clearSelectedRowGroup = function(){
	if(this == null){
		return ;
	}
	
	this.selectedRowGroup = null;
	this.selectedRowGroupOriginalBgColor = null;
	this.rowGroup = null;
};
Table.selectRowGroup = function(row,selectedColor){
	if(this == null){
		return ;
	}
	var group = row.getAttribute("group");
	if(this.rowGroup == group){
		return ;
	}
	this.rowGroup = group;
	
	if(this.selectedRowGroup != null){
		for(var i=this.selectedRowGroup.length - 1;i>=0;i--){
			this.selectedRowGroup[i].style.backgroundColor = this.selectedRowGroupOriginalBgColor[i];
		}
	}
	this.selectedRowGroup = [];
	this.selectedRowGroupOriginalBgColor = [];
	
	this.selectedRowGroup[this.selectedRowGroup.length] = row;
	this.selectedRowGroupOriginalBgColor[this.selectedRowGroupOriginalBgColor.length] = row.style.backgroundColor;
	row.style.backgroundColor = selectedColor;
	
	var temp = row.previousSibling;
	while(temp!=null && temp.getAttribute("group") == group){
		this.selectedRowGroup[this.selectedRowGroup.length] = temp;
		this.selectedRowGroupOriginalBgColor[this.selectedRowGroupOriginalBgColor.length] = temp.style.backgroundColor;
		temp.style.backgroundColor = selectedColor;
		temp = temp.previousSibling;
	}
	temp = row.nextSibling;
	while(temp!=null && temp.getAttribute("group") == group){
		this.selectedRowGroup[this.selectedRowGroup.length] = temp;
		this.selectedRowGroupOriginalBgColor[this.selectedRowGroupOriginalBgColor.length] = temp.style.backgroundColor;
		temp.style.backgroundColor = selectedColor;
		temp = temp.nextSibling;
	}
};
Table.setRowGroup = function(group){
	this.setAttribute("group",group);
};
/**
 * ??????????????????????????????????.????????????????????????????????????????????????
 * parentCom,????????methodName,????????????????????????
 */
Table.updateChildNumber = function(parentCom,fromIndex,methodName){
	if(parentCom == null){
		parentCom = this;
	}
	if(fromIndex == null){
		fromIndex = 0;
	}
	if(methodName == null){
		methodName = "setNumber";
	}
	var childs = parentCom.childNodes;
	var len = childs.length;
	var method;
	for(var i = 0;i < len;i++){
		if(i < fromIndex){
			continue;
		}
		method = eval("childs[i]."+methodName);
		if(typeof method != "function"){
			return ;
		}
		method.call(childs[i],i+1);
	}
};

if(!Bean){
	var Bean = {};
}
Bean.GET_METHOD = 1;
Bean.SET_METHOD = 2;
/**
 * ??????????????????????????
 * obj,??????
 * attrNames,????????????????????????????????????
 * method,????????????1??get,2??set??????????
 */
Bean.createMethod = function(classObj,attrNames,method,isPrototype){
	if(classObj == null){
		classObj = this;
	}
	if(attrNames == null || !(attrNames instanceof Array)){
		return false;
	}
	if(method == null){
		method = Bean.GET_METHOD | Bean.SET_METHOD;
	}
	if(isPrototype == null){
		isPrototype = true;
	}
	var destObj = classObj;
	if(isPrototype){
		destObj = destObj.prototype;
	}
	
	var num = attrNames.length;
	var srcAttrName,destAttrName;
	try{
		for(var i =0;i<num;i++){
			srcAttrName = attrNames[i];
			if(srcAttrName == null || srcAttrName.trim()==""){
				continue;
			}
			destAttrName = srcAttrName.trim();
			destAttrName = destAttrName.substr(0,1).toUpperCase()+destAttrName.substr(1);
			if(method & Bean.GET_METHOD != 0){
				destObj["get"+destAttrName]=Bean.createGetMethod(srcAttrName);
			}
			if(method & Bean.SET_METHOD != 0){
				destObj["set"+destAttrName] = Bean.createSetMethod(srcAttrName);;
			}
		}
	}catch(e){
		alert(e);
		return false;
	}
	
	return true;
};
Bean.createGetMethod = function(attrName){
	return function(){
		return this[attrName];
	}
};
Bean.createSetMethod = function(attrName){
	return function(attrValue){
		this[attrName] = attrValue;
	}
};