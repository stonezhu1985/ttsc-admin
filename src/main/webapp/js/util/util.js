if(!Util){
	var Util = {};
}

Util.removeAll = function(node){
	if(!node){
		return ;
	}
	node = $(node);
	while(node.firstChild){
		node.removeChild(node.firstChild);
	}
};

Util.nodeIteratorByTagName = function(destNode,tagName,func){
	var allNode = $(destNode).getElementsByTagName(tagName);
	var num = allNode.length;
	for(var i=0;i<num;i++){
		func.call(null,allNode[i]);
	}
};

Util.nodeIteratorByClassName = function(destNode,className,func){
	var allNode = $(destNode).getElementsByClassName(className);
	var num = allNode.length;
	for(var i=0;i<num;i++){
		func.call(null,allNode[i]);
	}
};

Util.curDateStr = function(){
	var arr = [];
	var temp;
	var cur = new Date();
	arr[arr.length] = cur.getFullYear();
	arr[arr.length] = "-";
	
	temp = cur.getMonth()+1;
	if(temp < 10){
		arr[arr.length] = "0";
	}
	arr[arr.length] = temp;
	arr[arr.length] = "-";
	
	temp = cur.getDate();
	if(temp < 10){
		arr[arr.length] = "0";
	}
	arr[arr.length] = temp;
	arr[arr.length] = " ";
	
	temp = cur.getHours();
	if(temp < 10){
		arr[arr.length] = "0";
	}
	arr[arr.length] = temp;
	arr[arr.length] = ":";
	
	temp = cur.getMinutes();
	if(temp < 10){
		arr[arr.length] = "0";
	}
	arr[arr.length] = temp;
	arr[arr.length] = ":";
	
	temp = cur.getSeconds();
	if(temp < 10){
		arr[arr.length] = "0";
	}
	arr[arr.length] = temp;
	
	return arr.join("");
};

Util.countNewTime = function(t,diff){
	var date = new Date();
	
	var year = parseInt(t.substr(0,4),10);
	var month = parseInt(t.substr(5,7),10)-1;
	var day = parseInt(t.substr(8,10),10);
	var hour = parseInt(t.substr(11,13),10);
	var minute = parseInt(t.substr(14,16),10);
	var seconds = parseInt(t.substr(17,19),10);
	date.setFullYear(year);
	date.setMonth(month);
	date.setDate(day);
	date.setHours(hour);
	date.setMinutes(minute);
	date.setSeconds(seconds);
	
	date.setTime(date.getTime()+diff);
	
	var info = date.getFullYear(),temp;
	temp = date.getMonth()+1;
	info += "-"+(temp < 10?"0":"")+temp;
	temp = date.getDate();
	info += "-"+(temp < 10?"0":"")+temp;
	
	temp = date.getHours();
	info += " "+(temp < 10?"0":"")+temp;
	temp = date.getMinutes();
	info += ":"+(temp < 10?"0":"")+temp;
	temp = date.getSeconds();
	info += ":"+(temp < 10?"0":"")+temp;
	
	return info;
};

Util.timeDiff = function(t1,t2){
	var date = new Date();
	
	var year = parseInt(t1.substr(0,4),10);
	var month = parseInt(t1.substr(5,7),10)-1;
	var day = parseInt(t1.substr(8,10),10);
	var hour = parseInt(t1.substr(11,13),10);
	var minute = parseInt(t1.substr(14,16),10);
	var seconds = parseInt(t1.substr(17,19),10);
	date.setFullYear(year);
	date.setMonth(month);
	date.setDate(day);
	date.setHours(hour);
	date.setMinutes(minute);
	date.setSeconds(seconds);
	var t = date.getTime();
	
	year = parseInt(t2.substr(0,4),10);
	month = parseInt(t2.substr(5,7),10)-1;
	day = parseInt(t2.substr(8,10),10);
	hour = parseInt(t2.substr(11,13),10);
	minute = parseInt(t2.substr(14,16),10);
	seconds = parseInt(t2.substr(17,19),10);
	date.setFullYear(year);
	date.setMonth(month);
	date.setDate(day);
	date.setHours(hour);
	date.setMinutes(minute);
	date.setSeconds(seconds);
	
	return (date.getTime()-t)/1000;
};

Util.LeftMode = 1;
Util.TopMode = 2;
Util.RightMode = 3;
Util.BottomMode = 4;
//浮动组件在滚动组件视图范围内。分为 左 顶 右 底 四个位置。
Util.floatCom = function(com,scrollCom,floatLoc){
	com.style.position = "relative";
	com.style.left = "0px";
	com.style.top = "0px";
	com._floatMode = floatLoc;
				
	var arr = scrollCom._floatComArr;
	if(!arr){
		arr = scrollCom._floatComArr = [];
					
		Event.observe(scrollCom,"scroll",scrollCom.resetPosition = function(scrollCom){
				var arr = scrollCom._floatComArr;
				var com;
				for(var i=0;i<arr.length;i++){
					com = arr[i];
					switch(com._floatMode){
						case Util.RightMode://right
							com.style.left = (scrollCom.scrollLeft - scrollCom.scrollWidth + scrollCom.clientWidth)+"px";
							break;
						case Util.BottomMode://bottom
							com.style.top = (scrollCom.scrollTop - scrollCom.scrollHeight + scrollCom.clientHeight)+"px";
							break;
						case Util.LeftMode://left
							com.style.left = scrollCom.scrollLeft+"px";
							break;
						default:
							com.style.top = scrollCom.scrollTop+"px";
					}	
				}
			}.bind(null,scrollCom));
	}
	arr[arr.length] = com;
};


Util.updateImgFromImg = function(srcImg,destImg,isImg){
	var flag,src;
	var deep = 1;
	while(true){
		flag = "path_"+deep++;
		src = srcImg.getAttribute(flag);
		if(src){
			destImg.setAttribute(flag,src);
		}else{
			break;
		}
	}
	Util.imageError(destImg,isImg);
	if(isImg){
		destImg.src = srcImg.src;
	}else{
		destImg.style.backgroundImage = srcImg.src;
	}
};
Util.setImagePath = function(node,isImg,path1,path2,path3){
	var num = arguments.length;
	if(num < 3){
		return ;
	}
	$(node).hide();
	Util.imageError(node,isImg);
	for(var i=num-1;i>2;i--){
		node.setAttribute("path_"+(i-2),arguments[i]);
	}
	if(isImg){
		node.src = path1;
	}else{
		node.style.backgroundImage = "url("+path1+")";
	}
};
Util.imageError = function(node,isImg){
	node._errDeep = 0;
	node.onerror = function(){
		var src = node.getAttribute("path_"+ (++node._errDeep));
		if(src){
			if(isImg){
				node.src = src;
			}else{
				node.style.backgroundImage = "url("+src+")";
			}
		}
	};
	node.onload = function(){
		$(node).show();
	}
};
Util.imageErrorEvent = function(e){
	if(e == null)e=window.event;
	
	var node = Event.element(e);
	var isImg = (node.tagName == "IMG");
	if(!node._errDeep){
		node._errDeep = 0;
	}
	var src = node.getAttribute("path_"+ (++node._errDeep));
	if(src){
		if(isImg){
			node.src = src;
		}else{
			node.style.backgroundImage = "url("+src+")";
		}
	}
};

Util.getYYYYMMDDHHMM = function (now)
{
	var yyyy = now.getYear();
	if (yyyy < 10) {
		yyyy = "0" + yyyy;
	}
	var mm = now.getMonth()+1;
	if (mm < 10) {
		mm = "0" + mm;
	}
	var dd = now.getDate();
	if (dd < 10) {
		dd = "0" + dd;
	}
	var hh = now.getHours();
	if (hh < 10) {
		hh = "0" + hh;
	}
	var mi = now.getMinutes();
	if (mi < 10) {
		mi = "0" + mi;
	}
	var ss = now.getSeconds();
	if (ss < 10) {
		ss = "0" + ss;
	}
	var time =  yyyy + "-" + mm + "-" + dd+" "+hh + ":" + mi;
	return time;
};


//隐藏，显示
function setHidShow(ids,type){
	var key = ids.indexOf(',');
	if(type == 'hide'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				document.getElementById(arr[i]).style.display = 'none';
			}
		}else{
			document.getElementById(ids).style.display = 'none';
		}
	}else if(type == 'show'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				document.getElementById(arr[i]).style.display = '';
			}
		}else{
			document.getElementById(ids).style.display = '';
		}
	}
}
//隐藏，显示
function setReadOnly(ids,type){
	var key = ids.indexOf(',');
	if(type == 'readOnly'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				document.getElementById(arr[i]).readOnly = true;
			}
		}else{
			document.getElementById(ids).readOnly = true;
		}
	}else if(type == 'read'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				document.getElementById(arr[i]).readOnly = false;
			}
		}else{
			document.getElementById(ids).readOnly = false;
		}
	}
}
//可用不可用
function setAbleDis(ids,type){
	var key = ids.indexOf(',');
	if(type == 'disabled'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				if(document.getElementById(arr[i])!=null){
					document.getElementById(arr[i]).disabled = true;
				}
			}
		}else{
			document.getElementById(ids).disabled = true;
		}
	}else if(type == 'able'){
		if(key > -1){
			var arr = ids.split(',');
			for(i=0;i<arr.length;i++){
				document.getElementById(arr[i]).disabled = false;
			}
		}else{
			document.getElementById(ids).disabled = false;
		}
	}
}
//根据传参批量设置
/*	type:
	hide - 隐藏 
    show - 显示 
	readOnly - 只读
	read - 可读
	disabled - 不可用
	able - 可用
*/
function setProperties(ids,type){
	if(type == 'hide'){
		setHidShow(ids,'hide');
	}else if(type == 'show'){
		setHidShow(ids,'show');
	}else if(type == 'readOnly'){
		setReadOnly(ids,'readOnly');
	}else if(type == 'read'){
		setReadOnly(ids,'read')
	}else if(type == 'disabled'){
		setAbleDis(ids,'disabled');
	}else if(type == 'able'){
		setAbleDis(ids,'able');
	}else{
		alert('批量设置，请输入正确的类型');
	}
}


//得到表格的行数
function getTabNum(id){
	var	tab = document.getElementById(id); 
	return tab.rows.length;
}
//得到对象
if(!window.$){
	window.$ = function(id){
		return document.getElementById(id);
	}
}

//根据id取值去空格
var $v = function(id){
	var val = Trim(document.getElementById(id).value);
	return val;
}
//去空格id2值赋给id1
var $s = function(id1,id2){
	document.getElementById(id1).value = Trim(document.getElementById(id2).value);
}

//取长度
var $l = function(id){
	var val = document.getElementById(id).value.Trim();
	return val.length;
}

//去空格 value 赋给 id
var $sv = function(id,val){
	document.getElementById(id).value = Trim(val+'');
}

//去空格id值去空格
var $tv = function(id){
	var val = Trim(document.getElementById(id).value);
	document.getElementById(id).value = val;
	return val;
}

//批量赋值
var $svs = function(Json){
	try{
		for(var id in Json){
		document.getElementById(id).value = Json[id]
	}
	}catch(e){
		alert('$svs方法异常：' + id);
	}
}

//增加内容
var $addv = function(id,val){
	var value = Trim(document.getElementById(id).value);
	document.getElementById(id).value = value + val;
}

//在id元素内插入innerHTML
var $h = function(id,html){
	document.getElementById(id).innerHTML = html;
}

//批量插入html
var $hs = function(Json,type){
	if(type == 'id'){
		for(var id in Json){
			try{
				document.getElementById(id).innerHTML = document.getElementById(Json[id]).value;
			}catch(e){
				alert('$hs异常：' + id);
			}
		}
	}else if(type == 'html'){
		for(var id in Json){
			try{
				document.getElementById(id).innerHTML = Json[id];
			}catch(e){
				alert('$hs异常：' + id);
			}
		}
	}
}

//批量插入html
var $hv = function(Json){
	try {
		for(var id in Json){
			document.getElementById(id).innerHTML = Json[id];
		}
		} catch(e) {
		throw e;alert('方法$hv异常！');
	}
}
var $vs = function(ids,val){
	try {
		if(ids.indexOf(',') > -1){
			var arr = ids.split(',');
			for(var i=0;i<arr.length;i++){
				document.getElementById(arr[i]).value=val;
			}
		}else{
			document.getElementById(ids).value=val;
		}
	} catch(e) {
		throw e;alert('方法$null异常！');
	}
}
//批量设置CSS样式
var $css = function(ids,className){
	try {
		if(ids.indexOf(',') > -1){
			var arr = ids.split(',');
			for(var i=0;i<arr.length;i++){
				document.getElementById(arr[i]).className = className;
			}
		}else{
			document.getElementById(ids).className = className;
		}
	} catch(e) {//alert(ids);
		throw e;
	}
}
//从第num行开始清空表格
function clearTab(tabId,num){
	var	tab = document.getElementById(tabId); 
	var len = tab.rows.length;    
	for(var i = 0; i < len - num; i++){
	  tab.deleteRow(num);//没次删除第num行
	}
}
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
//功能:判断元素的值是否为空
String.prototype.isNull = function() {
	 return (this==null || this.Trim()=="" || typeof(this)=="undefined");
}
//str2替换全部str1
String.prototype.replaceAll = function(str1, str2){
	if (this.isNull()) {
		return this;
	}
	return this.split(str1).join(str2);
}
/********************** 添加监听 ***************************/
function addEvents(ids,events,fun){
	try {
		if(ids.indexOf(',') > -1){
			var arr = ids.split(',');
			for(var i=0;i<arr.length;i++){
				addEvent(arr[i],events,fun);
			}
		}else{
			addEvent(ids,events,fun);
		}
	} catch(e) {
		throw e;
	}
}
//给对象添加监听事件
function addEvent(id,events,fun){
	var obj = document.getElementById(id);
	//绑定函数
	if(events.indexOf(',') > -1){
		var evs = events.split(',');
		for(var j=0;j<evs.length;j++){
			var eve = evs[j];
			if(typeof obj.attachEvent != 'undefined'){
				// 为 IE 浏览器添加事件绑定
				obj.attachEvent('on'+eve, function(){fun(id)});
			}else if( typeof obj.addEventListener != 'undefined'){
				// 兼容 W3C 的事件绑定
				obj.addEventListener(eve, function(){fun(id)}, true);
			}else{
				//你用的浏览器都老掉牙了，换一个吧！
			}
		}
	}else{
		if(typeof obj.attachEvent != 'undefined'){
			obj.attachEvent('on'+events, function(){fun(id)});
		}else if( typeof obj.addEventListener != 'undefined'){
			obj.addEventListener(events, function(){fun(id)}, true);
		}
	}
}
/************************ select *************************/
//设置 select 和 radio值
function setStaticSelRadVal(obj,id){
	document.getElementById(id).value = obj.value;
}
//获取所有id中包含某关键字的控件
function getConListBySubKey(doc, tagName, subIdKey) {
    var reConArry = [];
	var elem = doc.getElementsByTagName(tagName);
	for(var i = 0; i < elem.length; i++) {
		if(elem[i].type == 'text') {
			var id = elem[i].getAttribute('id');
			if(id.indexOf(subIdKey)>-1){
				reConArry.push(id);
			}
		}else if(elem[i].tagName == 'DIV'){
			var id =  elem[i].attributes.getNamedItem("id").nodeValue;
			if(id.indexOf(subIdKey)>-1){
				reConArry.push(id);
			}
		}
	}
    return reConArry;
}

//设置tab内所有元素熟悉为不可使用或只读
function setTabElmUnable(id){
	var tab = document.getElementById(id);
	var inputs = tab.all.tags('INPUT');
	var teras = tab.all.tags('textarea');
	var as = tab.all.tags('a');
	var selects = tab.all.tags('select');
	for(var i=0;i<teras.length;i++) {
		var e = teras[i];
		e.readOnly = true;
		e.className='disabled';
		e.onfocus='';
		e.onblur='';
	}
	for(var i=0;i<as.length;i++) {
		var e = as[i];
		e.onclick='';
		e.className='disabled';
	}
	for(var i=0;i<inputs.length;i++) {
		var e = inputs[i];
		if (e.type == 'text' || e.type == 'password') {
			e.readOnly = true;
			e.className='disabled';
			e.onfocus='';
			e.onblur='';
			e.onclick='';
			e.onkeydown='';
			e.onkeyup='';
		}else if (e.type != 'hidden'){
			e.disabled = true;
		}   
	}
	for(var i=0;i<selects.length;i++) {
		var e = selects[i];
		e.onclick='';
		e.onchange='';
		e.disabled=true;
	}
}

//批量设置多个表格属性
function setTabElmUnables(ids){
	try {
		if(ids.indexOf(',') > -1){
			var arr = ids.split(',');
			for(var i=0;i<arr.length;i++){
				setTabElmUnable(arr[i]);
			}
		}else{
			setTabElmUnable(ids);
		}
	} catch(e) {
		alert('setTabElmUnables方法异常');
		throw e;
	}
}
//去除数组重复项
Array.prototype.distinct = function(){
	var temp = {}, len = this.length;

	 for(var i=0; i < len; i++)  {  
		 if(typeof temp[this[i]] == "undefined") {
			 temp[this[i]] = 1;
		 }  
	 }  
	 this.length = 0;
	 len = 0;
	 for(var i in temp) {  
		 this[len++] = i;
	 }  
	 return this;  
 }
 
 //根据id给指定radio 设置勾选
function setRadioCheckedByIds(ids){
	var key = ids.indexOf(',');
	if(key > -1){
		var arr = ids.split(',');
		for(var i = 0 ; i < arr.length ; i++){
			try{
				document.getElementById(arr[i]).checked = true;	
			}catch(e){
				alert('方法 setRadioCheckedByIds出错 id:' + arr[i]);
			}
		}
	}else{
		try{
			document.getElementById(ids).checked = true;	
		}catch(e){
			alert('方法 nullToZero出错 id:' + ids);
		}
	}
}

//单独一个Radio初始化
function setStaticRadio(IptId,RadioName){
	var sel = Trim(document.getElementById(IptId).value);
	var Radios = document.getElementsByName(RadioName);
	for(var i = 0 ; i < Radios.length ; i++){
		if(sel == Radios[i].value){
			Radios[i].checked = true;
		}
	}	
}
//设置tab内所有元素熟悉为不可使用或只读
function setTabElmUnable(id){
	var tab = document.getElementById(id);
	var inputs = tab.all.tags('INPUT');
	var teras = tab.all.tags('textarea');
	var as = tab.all.tags('a');
	var selects = tab.all.tags('select');
	for(var i=0;i<teras.length;i++) {
		var e = teras[i];
		e.readOnly = true;
		e.className='disabled';
		e.onfocus='';
		e.onblur='';
	}
	for(var i=0;i<as.length;i++) {
		var e = as[i];
		e.onclick='';
		e.className='disabled';
	}
	for(var i=0;i<inputs.length;i++) {
		var e = inputs[i];
		if (e.type == 'text' || e.type == 'password') {
			e.readOnly = true;
			e.className='disabled';
			e.onfocus='';
			e.onblur='';
			e.onclick='';
			e.onkeydown='';
			e.onkeyup='';
		}else if (e.type != 'hidden'){
			e.disabled = true;
		}   
	}
	for(var i=0;i<selects.length;i++) {
		var e = selects[i];
		e.onclick='';
		e.onchange='';
		e.disabled=true;
	}
}

//批量设置多个表格属性
function setTabElmUnables(ids){
	try {
		if(ids.indexOf(',') > -1){
			var arr = ids.split(',');
			for(var i=0;i<arr.length;i++){
				setTabElmUnable(arr[i]);
			}
		}else{
			setTabElmUnable(ids);
		}
	} catch(e) {
		alert('checkDateByIds方法异常');
		throw e;
	}
}