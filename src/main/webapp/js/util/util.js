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
//��������ڹ��������ͼ��Χ�ڡ���Ϊ �� �� �� �� �ĸ�λ�á�
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


//���أ���ʾ
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
//���أ���ʾ
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
//���ò�����
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
//���ݴ�����������
/*	type:
	hide - ���� 
    show - ��ʾ 
	readOnly - ֻ��
	read - �ɶ�
	disabled - ������
	able - ����
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
		alert('�������ã���������ȷ������');
	}
}


//�õ���������
function getTabNum(id){
	var	tab = document.getElementById(id); 
	return tab.rows.length;
}
//�õ�����
if(!window.$){
	window.$ = function(id){
		return document.getElementById(id);
	}
}

//����idȡֵȥ�ո�
var $v = function(id){
	var val = Trim(document.getElementById(id).value);
	return val;
}
//ȥ�ո�id2ֵ����id1
var $s = function(id1,id2){
	document.getElementById(id1).value = Trim(document.getElementById(id2).value);
}

//ȡ����
var $l = function(id){
	var val = document.getElementById(id).value.Trim();
	return val.length;
}

//ȥ�ո� value ���� id
var $sv = function(id,val){
	document.getElementById(id).value = Trim(val+'');
}

//ȥ�ո�idֵȥ�ո�
var $tv = function(id){
	var val = Trim(document.getElementById(id).value);
	document.getElementById(id).value = val;
	return val;
}

//������ֵ
var $svs = function(Json){
	try{
		for(var id in Json){
		document.getElementById(id).value = Json[id]
	}
	}catch(e){
		alert('$svs�����쳣��' + id);
	}
}

//��������
var $addv = function(id,val){
	var value = Trim(document.getElementById(id).value);
	document.getElementById(id).value = value + val;
}

//��idԪ���ڲ���innerHTML
var $h = function(id,html){
	document.getElementById(id).innerHTML = html;
}

//��������html
var $hs = function(Json,type){
	if(type == 'id'){
		for(var id in Json){
			try{
				document.getElementById(id).innerHTML = document.getElementById(Json[id]).value;
			}catch(e){
				alert('$hs�쳣��' + id);
			}
		}
	}else if(type == 'html'){
		for(var id in Json){
			try{
				document.getElementById(id).innerHTML = Json[id];
			}catch(e){
				alert('$hs�쳣��' + id);
			}
		}
	}
}

//��������html
var $hv = function(Json){
	try {
		for(var id in Json){
			document.getElementById(id).innerHTML = Json[id];
		}
		} catch(e) {
		throw e;alert('����$hv�쳣��');
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
		throw e;alert('����$null�쳣��');
	}
}
//��������CSS��ʽ
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
//�ӵ�num�п�ʼ��ձ��
function clearTab(tabId,num){
	var	tab = document.getElementById(tabId); 
	var len = tab.rows.length;    
	for(var i = 0; i < len - num; i++){
	  tab.deleteRow(num);//û��ɾ����num��
	}
}
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
//����:�ж�Ԫ�ص�ֵ�Ƿ�Ϊ��
String.prototype.isNull = function() {
	 return (this==null || this.Trim()=="" || typeof(this)=="undefined");
}
//str2�滻ȫ��str1
String.prototype.replaceAll = function(str1, str2){
	if (this.isNull()) {
		return this;
	}
	return this.split(str1).join(str2);
}
/********************** ��Ӽ��� ***************************/
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
//��������Ӽ����¼�
function addEvent(id,events,fun){
	var obj = document.getElementById(id);
	//�󶨺���
	if(events.indexOf(',') > -1){
		var evs = events.split(',');
		for(var j=0;j<evs.length;j++){
			var eve = evs[j];
			if(typeof obj.attachEvent != 'undefined'){
				// Ϊ IE ���������¼���
				obj.attachEvent('on'+eve, function(){fun(id)});
			}else if( typeof obj.addEventListener != 'undefined'){
				// ���� W3C ���¼���
				obj.addEventListener(eve, function(){fun(id)}, true);
			}else{
				//���õ���������ϵ����ˣ���һ���ɣ�
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
//���� select �� radioֵ
function setStaticSelRadVal(obj,id){
	document.getElementById(id).value = obj.value;
}
//��ȡ����id�а���ĳ�ؼ��ֵĿؼ�
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

//����tab������Ԫ����ϤΪ����ʹ�û�ֻ��
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

//�������ö���������
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
		alert('setTabElmUnables�����쳣');
		throw e;
	}
}
//ȥ�������ظ���
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
 
 //����id��ָ��radio ���ù�ѡ
function setRadioCheckedByIds(ids){
	var key = ids.indexOf(',');
	if(key > -1){
		var arr = ids.split(',');
		for(var i = 0 ; i < arr.length ; i++){
			try{
				document.getElementById(arr[i]).checked = true;	
			}catch(e){
				alert('���� setRadioCheckedByIds���� id:' + arr[i]);
			}
		}
	}else{
		try{
			document.getElementById(ids).checked = true;	
		}catch(e){
			alert('���� nullToZero���� id:' + ids);
		}
	}
}

//����һ��Radio��ʼ��
function setStaticRadio(IptId,RadioName){
	var sel = Trim(document.getElementById(IptId).value);
	var Radios = document.getElementsByName(RadioName);
	for(var i = 0 ; i < Radios.length ; i++){
		if(sel == Radios[i].value){
			Radios[i].checked = true;
		}
	}	
}
//����tab������Ԫ����ϤΪ����ʹ�û�ֻ��
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

//�������ö���������
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
		alert('checkDateByIds�����쳣');
		throw e;
	}
}