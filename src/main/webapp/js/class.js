//�q�����Ҽ�˵�
document.oncontextmenu = function(){
	//return false;
};

document.onkeydown = function(e){
	if(e==null)e=window.event;
	var source = e.srcElement;
	if(e.keyCode == 13 && source.tagName != "TEXTAREA"){
		e.keyCode = 9;
	}
};

/**
 * ������ĺ���
 */
if( ! Class){
      var Class = {};
}
Class.create = function(className,baseClass) {
      var newClass = function() {
            if(typeof(this.initialize) == "function"){
                  this.initialize.apply(this, arguments);
            }
			Object.register(this);
      };

		if(baseClass != null){
			Object.extend(newClass.prototype,baseClass.prototype);
			newClass.prototype.parentInitialize = baseClass.prototype.initialize;
		}
		
      newClass.prototype.className = (className != null) ? className : "anonymous";

      return newClass;
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


/*������windutil����ķ���**************************************************************************************************/
//�õ������ڴ����еľ��λ��
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
//�õ���ͼ���ĵ��е�λ��
WindUtil.getWindowViewRect = function(){
	return {left:document.body.scrollLeft,top:document.body.scrollTop,width:document.body.clientWidth,height:document.body.clientHeight};
}


/*������һЩ���غ���ķ���**************************************************************************************/
/**
  *  �ַ��trim����
  */
String.prototype.trim = function()
{
    return this.replace(/(^\s+)|(\s+$)/g, "");
}
String.prototype.lTrim = function()
{
    return this.replace(/(^\s+)/g, "");
}
String.prototype.rTrim = function()
{
    return this.replace(/(\s+$)/g, "");
}

/**
  * ʹ��setTimeout���Ը���õĺ���ݲ���
  * ��һ������Ǻ�����ڶ���������ӳ�ִ�е�ʱ��
  * �������ȫ�����ݸ���ú���
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

/*�����ǹ���Element�ķ���*************************************************************************************/

/**
  * ʹ��ָ�������е�input[type="text"]||textareaԪ���ڻ�ȡ����ʱ����������Ϊָ������ɫ��
  * ����ʧȥʱ���ָ�Ϊԭ4����ɫ
  */
Element.makeInputFocusBackground = function(container,focusBackground){
	//���ӵ��¼���Ӻ���
	this._appendEvent = function(ele){
		Event.observe(ele,"focus",function(){
			var _ele = window.event.srcElement;
			_ele._normalBackground = _ele.style.getAttribute("backgroundColor");
			_ele.style.setAttribute("backgroundColor",focusBackground);
			});
		Event.observe(ele,"blur",function(){
			var _ele = window.event.srcElement;
			_ele.style.setAttribute("backgroundColor",_ele._normalBackground);
			});
	}
	//�õ����е�input[type="text"]Ԫ�أ���Ϊ֮����¼�
	var eles = container.getElementsByTagName("input");
	var len = eles.length;
	for(var i = 0 ;i < len;i++){
		if(eles[i].type != "text"){
			continue;
		}
		this._appendEvent(eles[i]);
	}
	//�õ����е�textareaԪ�أ���Ϊ֮����¼�
	eles = container.getElementsByTagName("textarea");
	len = eles.length;
	for(i = 0 ;i < len;i++){
		this._appendEvent(eles[i]);
	}
}

/**
  * �趨ָ�����������и�ѡ���ѡ��״̬Ϊָ����״̬
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
Element.IDENTIFIER = /^(\d{15}|\d{18})$/;

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
};
Element.isInt = function(value){
	return Element.Integer.test(value);
};
Element.isPositive = function(value){
	return Element.Positive.test(value);
};

Element.isFloat = function(value){
	return Element.Double.test(value);
};

Element.isDate = function(value){
	return Element.Date.test(value);
};

Element.isEmpty = function(value){
	if(value == null){
		return true;
	}
	return value.trim() == "";
};

Element.maxLength = function(value,maxLength){
	if(value == null){
		return true;
	}
	
	return value.length <= maxLength;
};

Element.minLength = function(value,minLength){
	if(value == null){
		return true;
	}
	
	return value.length >= minLength;
};

Element.isEqual = function(value,newValue){
	return value == newValue;
};

Element.NUMBER_TYPE = 1;
Element.INTEGER_TYPE = 2;
Element.comKeyDown = function(type,e){
	if(e==null)e = window.event;
	
	if((type & Element.NUMBER_TYPE) > 0){
		return Element.isNumberOk(e);
	}else if((type & Element.INTEGER_TYPE) > 0){
		return Element.isIntegerOk(e);
	}
	return true;
};

Element.isNumberOk = function(e){
	var keyCode = e.keyCode;
	if(Element.isCommonKey(keyCode)){
		return true;
	}
	var source = e.srcElement;
	var value = source.value;
	var hasDot = (value.indexOf(".") >= 0);
	if(!hasDot && (keyCode == Util.KEYCODE.DOT || keyCode == Util.KEYCODE.NUM_DOT)){
		return true;
	}
	//�����
	var hasMinus = (value.indexOf("-") >= 0);
	if (!hasMinus && (keyCode == Util.KEYCODE.MINUS || keyCode == Util.KEYCODE.NUM_MINUS)) {
		return true;
	}
	
	if((keyCode >= Util.KEYCODE.NUM_DIGIT0 && keyCode <= Util.KEYCODE.NUM_DIGIT9) || (keyCode >= Util.KEYCODE.DIGIT0 && keyCode <= Util.KEYCODE.DIGIT9)){
			
	}else{
		return false;
	}
	
	return true;
};
Element.isIntegerOk = function(e){
	var keyCode = e.keyCode;
	if(Element.isCommonKey(keyCode)){
		return true;
	}
	if((keyCode >= Util.KEYCODE.NUM_DIGIT0 && keyCode <= Util.KEYCODE.NUM_DIGIT9) || (keyCode >= Util.KEYCODE.DIGIT0 && keyCode <= Util.KEYCODE.DIGIT9)){
			
	}else{
		return false;
	}
	return true;
};
Element.isCommonKey = function(keyCode){
	return keyCode == Util.KEYCODE.ENTER 
	||keyCode == Util.KEYCODE.ESCAPE
	||keyCode == Util.KEYCODE.DELETE
	||keyCode == Util.KEYCODE.BACKSPACE
	||keyCode == Util.KEYCODE.LEFT
	||keyCode == Util.KEYCODE.RIGHT
	||keyCode == Util.KEYCODE.UP
	||keyCode == Util.KEYCODE.DOWN;
};

/*�����ǹ���form�ķ���*************************************************************************************/
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
};



/*�����ǹ���node�ķ���*************************************************************************************/
Node.removeAllChilds = function(node){
	if(node==null){
		return true;
	}
	
	var child ;
	while(node.firstChild!=null){
		child = node.firstChild
		node.removeChild(child);
		delete(child);
	}
	//���ýڵ㺬ѡ����Ϣ��Ҳ�������
	Table.clearSelectedRow.call(node);
	
	/*���ǵ�������Ⱦ�����⣬�����ø÷�����ֱ�����ýڵ���󣬽����ܳ�?
		var parentNode = node.parentNode;
		if(parentNode == null){
			return false;
		}
		var newNode = Element.cloneNode(node,false);
		parentNode.replaceChild(newNode,node);
	*/
};

/*�����ǹ���util�ķ���******************************************************************************************************/
	
Util.KEYCODE = {};
Util.KEYCODE.ENTER = 13;
Util.KEYCODE.ESCAPE = 27;
Util.KEYCODE.DELETE = 46;
Util.KEYCODE.BACKSPACE = 8;
Util.KEYCODE.COMMA = 188;
Util.KEYCODE.DOT = 190;
//jimy 2007.10.10 ���С���̵�С���
Util.KEYCODE.NUM_DOT = 110;
//jimy 2007.10.10 ��Ӽ��
Util.KEYCODE.MINUS = 89;
//jimy 2007.10.10 ���С���̼��
Util.KEYCODE.NUM_MINUS = 109;
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
  * ����ʱ�������¼�,�����ַ������λ�ã�����������һ���ͬʱ���µ��Ƿ����Ҽ������򽹵��л�����һ�����
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
};
/**
  * ������ʱ������û��������Ϣ�ﵽ������ʱ���Զ��л�����
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
};
/**
  * �����л�����һ�����
  * ��Ҫ�ⲿ����
  */
Util.Time.nextCom = function(obj,flag){
	if(flag == Util.Time.HOUR){
		obj.nextSibling.nextSibling.focus();
	}
};
/**
  * �����Զ��л���ǰһ�����
  */
Util.Time.preCom = function(obj,flag){
	if(flag == Util.Time.MINUTE){
		obj.previousSibling.previousSibling.focus();
	}
};
/**
  * ���Ըı䴥���¼����������ֵ�������ֵ����ȡ���ֵ���������ֵС����Сֵ����ȡ��Сֵ
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
};

Util.Time.createTemplate = function(){
	var arr = [];
	arr[arr.length] = "<input type='text' maxlength='2' size='2' "+Util.Time.FLAG+"='"+Util.Time.HOUR+"' style='height:25;font-size:20' onfocus='this.select();' onpropertychange='Util.Time.propertyChanged();' onkeydown='return Util.Time.keyDown();' onkeyup='return Util.Time.keyUp();'>";
	arr[arr.length] = ":";
	arr[arr.length] = "<input type='text' maxlength='2' size='2' "+Util.Time.FLAG+"='"+Util.Time.MINUTE+"' style='height:25;font-size:20' onfocus='this.select();' onpropertychange='Util.Time.propertyChanged();' onkeydown='return Util.Time.keyDown();' onkeyup='return Util.Time.keyUp();'>";
	
	var template = document.createElement("div");
	template.innerHTML = arr.join("");
	
	return template;
};

Util.Time.initCom = function(){
	var coms = document.getElementsByTagName(Util.Time.tagName);
	var len = coms.length;
	var com;
	var template = Util.Time.createTemplate(),newCom;
	for(var i= len-1;i>=0;i--){
		com = coms[i];
		newCom = Element.cloneNode(template,true);
		Util.extendAttr(newCom,com);
		
		com.replaceNode(newCom);
	}
};

Util.extendAttr = function(destNode,sourceNode){
	if(sourceNode.getAttribute("id")!=null){
			destNode.setAttribute("id",sourceNode.getAttribute("id"));
		}
};

//ֻ���������ַ��Լ�����ť
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
  * �õ���������й�����ڵ�λ��
  */
Util.getCursorLocation = function(obj){
	obj.focus();
		
	var s=document.selection.createRange();
	s.setEndPoint("StartToStart",obj.createTextRange());
	
	return s.text.length;
};

/**
 * �õ�����������ַ����ո�ʽyyyy-mm-dd���
 */
Util.getTodayDateStr = function(){
	var today = new Date();
	
	var year = today.getYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	
	if(month < 10){
		month = "0"+month;
	}
	if(day < 10){
		day = "0"+day;
	}
	
	var dateStr = year+"-"+month+"-"+day;
	
	return dateStr;
};

/**
 * 18λ��ʽ 6λ������+8λ����(yyyymmdd)+3λ��ˮ��(������\ż��Ů)+1λ������
 * 15λ��ʽ 6λ������+6λ����(yymmdd)+3λ��ˮ��(������\ż��Ů)
 */
Util.getGenderFromIden = function(iden){
	if(iden==null){
		return null;
	}
	var len = iden.length;
	if(len != 18 && len !=15){
		return null;
	}
	
	if(len == 15){
		return ((parseInt(iden.substr(14))%2) == 1)?"M":"F";
	}
	if(len == 18){
		return ((parseInt(iden.substr(16,1))%2) == 1)?"M":"F";
	}
};

Util.getBirthFromIden = function(iden){
	if(iden==null){
		return null;
	}
	var len = iden.length;
	if(len != 18 && len !=15){
		return null;
	}
	
	var date;
	if(len == 15){
		date = "19"+iden.substr(6,6);
	}
	if(len == 18){
		date = iden.substr(6,8);
	}
	
	date = date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
	
	return date;
};

Table.clearSelectedRow = function(){
	if(this == null){
		return ;
	}
	
	if(this.selectedRow != null){
		this.selectedRow.style.backgroundColor = this.selectedRowOriginalBgColor;
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
 * ����ĳ��ڵ�������к��Ӷ�������.�ر�ĳ���ӱ�ɾ��ʱ����Ҫ�������к��ӵ���š�
 * parentCom,������methodName,���Ӹ��±�����ŵķ�����
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
 * Ϊĳ���������Դ���������
 * obj,����
 * attrNames,����������Լ����������������
 * method,�����ķ�����1Ϊget,2Ϊset������ϡ�
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

if(!Dialog){
	var Dialog = {};
}

Dialog.dialogKeyDown = function(enterFun,escapeFun,e){
	if(e==null)e=window.event;
	var keyCode = e.keyCode;

	if(keyCode == Util.KEYCODE.ENTER){
		if(enterFun != null){
			enterFun.call(null,e);
			e.cancelBubble = true;
			e.returnValue = false;
		}
	}else if(keyCode == Util.KEYCODE.ESCAPE){
		if(escapeFun != null){
			escapeFun.call(null,e);
			e.cancelBubble = true;
			e.returnValue = false;
		}
	}
};

Number.prototype.toNumber = function(reserveNum){
	var pow = Math.pow(10,reserveNum);
	var result = Math.round(this*pow);
	return result / pow;
};

Number.prototype.multiple = function(anotherNumber,reserveNum){
	var strA = this.toString();
	var strB = anotherNumber.toString();
	var indexA = strA.indexOf(".");
	var indexB = strB.indexOf(".");
	
	var digitA = this,digitB = anotherNumber;
	var offsetA = 0;
	var offsetB = 0;
	if(indexA>=0){
		offsetA = strA.length - indexA - 1;
		strA = strA.replace(".","");
		digitA = parseInt(strA,10);
	}
	if(indexB>=0){
		offsetB = strB.length - indexB - 1;
		strB = strB.replace(".","");
		digitB = parseInt(strB,10);
	}
	var result = (digitA * digitB) / Math.pow(10,offsetA+offsetB);
	if(reserveNum != null){
		var pow = Math.pow(10,reserveNum);
		result = Math.round(result*pow);
		result = result / pow;
	}
	
	return result;
};

Number.prototype.multiple2 = function(anotherNumber,reserveNum){
	var strA = this.toString();
	var strB = anotherNumber.toString();
	var indexA = strA.indexOf(".");
	var indexB = strB.indexOf(".");
	
	var digitA = this,digitB = anotherNumber;
	var offsetA = 0;
	var offsetB = 0;
	if(indexA>=0){
		offsetA = strA.length - indexA - 1;
		strA = strA.replace(".","");
		digitA = parseInt(strA,10);
	}
	if(indexB>=0){
		offsetB = strB.length - indexB - 1;
		strB = strB.replace(".","");
		digitB = parseInt(strB,10);
	}
	var result = (digitA * digitB) / Math.pow(10,offsetA+offsetB);
	if(reserveNum != null){
		var pow = Math.pow(10,reserveNum);
		result = Math.round(result*pow);
		result = result / pow;
	}
	result=''+result;
	if(result.indexOf('.')==-1)
	{
	result=result+'.00';
	}
	else if(result.indexOf('.')==result.length-2)
	{
	result=result+'0';
	}
	
	
	return result;
};

Number.prototype.div = function(anotherNumber,reserveNum){
	var result = this/anotherNumber;
	if(reserveNum == null){
		reserveNum = 10;
	}
	
	if(reserveNum != null){
		var rate = Math.pow(10,reserveNum);
		result = result * rate;
		result = Math.round(result);
		result = result/rate;
	}
	return result;
};

Number.prototype.plus = function(anotherNumber){
	var strA = this.toString();
	var strB = anotherNumber.toString();
	var indexA = strA.indexOf(".");
	var indexB = strB.indexOf(".");
	
	var digitA = this,digitB = anotherNumber;
	var offsetA = 0;
	var offsetB = 0;
	if(indexA>=0){
		offsetA = strA.length - indexA - 1;
		strA = strA.replace(".","");
		digitA = parseInt(strA,10);
	}
	if(indexB>=0){
		offsetB = strB.length - indexB - 1;
		strB = strB.replace(".","");
		digitB = parseInt(strB,10);
	}
	var offsetDiff = offsetA - offsetB;
	if(offsetDiff > 0 ){
		digitB = digitB * Math.pow(10,offsetDiff);
	}else if(offsetDiff < 0){
		digitA = digitA * Math.pow(10,-offsetDiff);
	}
	var result = (digitA + digitB) / Math.pow(10,Math.max(offsetA,offsetB));
	
	return result;
};

if(!Filter){
	var Filter = {};
}

Filter.filterNullStr = function(str){
	if(str == null){
		return "";
	}
	return str;
};

var oldParseFloat = parseFloat;
parseFloat = function(str,defaultValue){
	if(str == null || str == ""){
		return defaultValue==null?0:defaultValue;
	}
	return oldParseFloat(str);
};

/**
 * ���¹����ڴ����
 * ���document.createElement���Ա������д�����Ԫ��
 * �ṩ�µĿ�¡����Element.cloneNode���Ա������еĿ�¡Ԫ��
 * Object.register���ṩ����ע�᷽�����Ա�������new�Ķ���
 */
Element.createdEleContainer = [];
var oldCreateElement = document.createElement;
document.createElement = function(str){
	var ele = oldCreateElement(str);
	Element.createdEleContainer[Element.createdEleContainer.length] = ele;
	return ele;
};
Element.cloneNode = function(node,isCloneChild){
	var ele = node.cloneNode(isCloneChild);
	Element.createdEleContainer[Element.createdEleContainer.length] = ele;
	return ele;
};

Object.createObject = function(className){
	if(className == null){
		return null;
	}
	var obj = null;
	try{
		var arr = [];
		arr[arr.length] = "new ";
		arr[arr.length] = className;
		arr[arr.length] = "(";
		var num = arguments.length;
		for(var i = 1;i < num;i++){
			if(i > 1){
				arr[arr.length] = ",";
			}
			arr[arr.length] = "\"";
			arr[arr.length] = arguments[i];
			arr[arr.length] = "\"";
		}
		arr[arr.length] = ")";
		obj = eval(arr.join(""));
		
		Object.register(obj);
	}catch(e){
		alert("eval��������ʧ��!");
	}
	
	return obj;
};
Object.register = function(obj){
	Element.createdEleContainer[Element.createdEleContainer.length] = obj;
};
//��ҳ��ж��ʱ�ͷ����б��ܵĶ���
Event.observe(window,"beforeunload",function(){
		var num = Element.createdEleContainer.length;
		for(var i =0;i<num;i++){
			delete(Element.createdEleContainer[i]);
			Element.createdEleContainer[i] = null;
		}
		delete(Element.createdEleContainer);
		Element.createdEleContainer = null;
	});
//ҳ���ͷź��,����շ���
Event.observe(window,"unload",function(){
		CollectGarbage();
		window.setTimeout(CollectGarbage,1);
	});
	
	var 	mons=[];
	 mons[1]= 'Jan';
      mons[2]= 'Feb';
      mons[3]= 'Mar';
      mons[4]= 'Apr';
      mons[5]= 'May';
      mons[6]= 'Jun';
      mons[7]= 'Jul';
      mons[8]= 'Aug';
      mons[9]= 'Sep';
      mons[10]= 'Oct';
      mons[11]= 'Nov';
      mons[12]= 'Dec';
	function toEnglishDate(str)
	{
	if(str=='')
	return '';
		var year=str.substring(0,4);
		var month=str.substring(5,7);
    	if(month.substring(0,1)=='0')
	   	   month=month.substring(1,2);
		var day=str.substring(8,10);
	  return mons[parseInt(month)]+'.'+day+'.'+year;
  }
  
function   ForDight(Dight,How)   
{   
            Dight   =   Math.round(Dight*Math.pow(10,How))/Math.pow(10,How);   
            return   Dight;   
}






		
		
				
		
		
		
	