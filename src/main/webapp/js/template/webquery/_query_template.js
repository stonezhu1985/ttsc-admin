/*
<body minwidth="" minheight="">
<div>
	<div id="_conCom" _title="" action="_qt2.getQueryString" onload="_qt2.onload">
	</div>
	
	<div id="_advConCom" >
	</div>
	
	<table id="_resultTable" resultAction="" resultViewAction=""  _title="">
		<tr>
			<td attr="" func="" htmlfunc=""></td>
		</tr>
	</table>
	
	<div id="_pageCom" selectedAction="_qt2.destSelected">
	</div>
</div>
</body>
*/

if(!_qt){
	var _qt = {};
}
_qt.debug=false

//ȫ����ѯ��������
_qt._conFieldSet=null;
//��ѯ����div
_qt._conCom = null;
//�߼���ѯ����div
_qt._advConCom = null;
//��ѯ�������
_qt._resultFieldSet = null;
//��ѯ���div
_qt._resultCom=null;
//���������ͷ
_qt._resultReportTitle=defaultTitle;
//��ѯ�������
_qt._resultContainer = null;
//�Ƿ���ʾ��ѯû�н������
_qt.isShowNoResult=true;
//��ѯ��ť����
_qt.queryButtonObject=null;
//��ѯ������ͬ���첽״̬
_qt.async=false;
/**
 * �ⲿ��Ӧ�ı�־
 */
//��ѯ�����Ӧ�ֶα�־
_qt._attrFlag="attr";
_qt._xAlignFlag="bodyalign";
_qt._funcAttrFlag="func";
_qt._htmlFuncAttrFlag="htmlfunc";
//��ȾTR�ĺ��������� �ڵ�TR,��Ӧ��xml�ڵ�record
_qt._trRenderFun = null;
//��ѯ�����Ӧ��¼������Ϣ��־
_qt._extraFlag="extra";
//��ѯ�����Ӧ��¼ѡ���¼���־
_qt._rowSelectedActionFlag="selectedAction";
//���ز�ѯ������û���Ҫ���е���ʾ�趨�¼���־
_qt._resultViewActionFlag="resultViewAction";
//��ȡ��ѯ���������ִ�е��û��Խ��xml�������ݴ���ı�־
_qt._resultActionFlag="resultAction";

//��ѯ�¼���־
_qt._formQueryActionFlag="action";
//ҳ���Զ����ط���ʱ���־
_qt._onloadActionFlag="onload";

//ҳ��ؼ�title��־
_qt._comTitleFlag="_title";
//ҳ��ؼ���ѯ������־
_qt._comConditationFlag="_conCom";
//ҳ��ؼ��߼���ѯ������־
_qt._comAdvConditationFlag="_advConCom";
//ҳ��ؼ���ѯ���Table��־
_qt._comResultTableFlag="_resultTable";
//ҳ��ؼ���ҳ���Ʊ�־
_qt._comPageControlFlag="_pageCom";
//֧�ֱ�ͷ������ʶ
_qt.supportHeadFloatFlag = "isFloatHead";
//֧��������ѡ��
_qt.colHideFlag = "isColHide";

//��ǰ��ѯ�������ṩ����ҳʹ��
_qt._curQueryStr = null;

/**
 * ��Ӧrecord.jspҳ��
 */
//��ѯ���JSPҳ��ɹ���־
_qt._resultIsSuccessFlag="isSuccess";
//��ѯ���JSPҳ��ʧ��ԭ���־
_qt._resultFailureReasonFlag="reason";
//��ѯ���JSPҳ����ҳ����־
_qt._resultTotalPageFlag="totalPage";
//��ѯ���JSPҳ�浱ǰҳ����־
_qt._resultCurPageFlag="curPage";
//��ѯ���JSPҳ���ܼ�¼����־
_qt._resultTotalNumFlag="totalNum";
//��ѯ���JSPҳ�浱ǰ��¼����־
_qt._resultCurNumFlag="curNum";

/**
 * ��ҳ����
 */
//�Ƿ���ʾ��ҳ����	
_qt.isPageFunctionCanceled=false;
_qt.caneledPageFunctionCurPageValue=-1;
//�Ƿ�ȡ����ѯ
_qt._isCannelQueryAction=false;
//��ҳ����
_qt._pageCom = null;
//����
_qt._container = null;
//ajax��ѯ����
_qt.ajax =null;
	
_qt.minWidth = 600;
_qt.minHeight = 450;
//��Ϣ������Ƿ�ɹ�����������ǰ������ҳ������ǰҳ����ÿҳ��С����ѯ����
//��ѯ��ť��Ϊ��־Ϊ1
_qt.submitQueryType=1;
//��ҳ��ѯ��ť��־Ϊ2
_qt.pageQueryType=2;
//�����ѯ��ť��־Ϊ3
_qt.sortQueryType=3;
_qt.pageInfo = {isSuccess:false,totalNum:0,curNum:0,totalPage:1,curPage:1,pageSize:20,queryType:_qt.submitQueryType,qcon:null};

_qt.curPageStringName="curPage";
_qt.pageSizeStringName="pageSize";
//��ʼ������
_qt._init = function(){
	Event.observe(window,"load",_qt._onload);
};
//���ط���
_qt._onload = function(){
	_qt._onloadForOveride();
}
_qt._onloadForOveride = function(){	
	//���������,Ϊʲô��Ҫ���,���������ھͿ��ܳ���2�ݹ�����.
	//document.body.style.overflowY = "auto";

	_qt.createFrame();	
	_qt.initAjax();
	Event.observe(window,"resize",_qt._onresize);
	
	Event.observe(_qt._conCom,"keypress",function(){
		if(window.event.keyCode==13){
			_qt.queryAction();
		}	
	});
	
	//�����ֵ���Ϣ
	if(_qt._conCom&&_qt._conCom.getAttribute(_qt._onloadActionFlag)){
		eval(_qt._conCom.getAttribute(_qt._onloadActionFlag))();	
	}
	
	_qt._initHeadFloat();
	if(_qt._conCom.firstChild){
		_qt._conCom.firstChild.focus();
	}
};

//������ͷ�ĸ���
_qt._initHeadFloat = function(){
	var tbody = $(_qt._comResultTableFlag).getElementsByTagName("tbody")[0];
	if(tbody && tbody.getAttribute(_qt.supportHeadFloatFlag)=="true"){
		var nodeArr = tbody.rows,node;
		for(var i=0;i<nodeArr.length;i++){
			node = nodeArr[i];
			Util.floatCom(node,$(_qt._comResultTableFlag).parentNode,Util.TopMode);
			$(node).style.backgroundColor = $(_qt._comResultTableFlag).currentStyle["backgroundColor"];
		}
	}
};
_qt._resetFloatHead = function(){
	var scrollCom = $(_qt._comResultTableFlag).parentNode;
	if(scrollCom.resetPosition){
		$(_qt._comResultTableFlag).parentNode.resetPosition();
	}
};
//������������div
_qt._createHideDiv = function(legend){
	if(!($(_qt._comResultTableFlag).getAttribute(_qt.colHideFlag) == "true")){
		return ;
	}
	
	legend.appendChild(document.createTextNode(" "));
	var hideBtn = document.createElement("input");
	hideBtn.type="button";
	hideBtn.className = "button";
	hideBtn.value = "Col";
	legend.insertBefore(hideBtn,legend.firstChild);
	
	var colBody = document.createElement("colgroup");
	var num = $(_qt._comResultTableFlag).getElementsByTagName("tbody")[0].rows[0].getElementsByTagName("th").length;
	for(var i=0;i<num;i++){
		colBody.appendChild(document.createElement("col"));
	}
	$(_qt._comResultTableFlag).insertBefore(colBody,$(_qt._comResultTableFlag).lastChild);
	
	Event.observe(hideBtn,"click",function(e){
		if(e == null)e=window.event;
		_qt.hideCol(Event.element(e));
	});
};
_qt.hideCol = function(source){
	if(!_qt._hideColDiv){
		var div = document.createElement("div");
		div.style.width = "400px";
		div.style.height = "200px";
		div.style.position = "absolute";
		div.style.border = "1 solid black";
		div.style.zIndex = 10;
		div.style.backgroundColor = "white";
		div.style.overflow = "auto";
		$(div).hide();
		
		var tempNode =  document.createElement("div");
		tempNode.style.textAlign = "center";
		div.appendChild(tempNode);
		
		tempNode.innerHTML = "<input type='checkbox' checked='true' style='float:left' onclick='_qt.hideComSelectAll();'><input type='button' class='button' value='ȷ ��' onclick='_qt.hideColAction(1);'>";
		
		var totalNum = 0;
		var columnNodes=$(_qt._comResultTableFlag).firstChild.firstChild.childNodes;
		var id , colNode , groupName;
		var groupNameMapping = {}, groupArr , unitNameMapping = {};
		for(var i=0;i<columnNodes.length;i++){
			colNode = columnNodes[i];
			groupName = colNode.getAttribute("showGroup");
			if(groupName == null || groupName == ""){
				unitNameMapping[i] = [i];
				totalNum ++;
				continue;
			}
			groupArr = groupNameMapping[groupName];
			if(groupArr == null){
				groupArr = [];
				groupNameMapping[groupName] = groupArr;
				totalNum ++;
			}
			groupArr[groupArr.length] = i;
		}
		
		var arr = [];
		arr[arr.length] = "<table id='_hideTable' width='100%' cellspacing='1' class='search'>";
		arr[arr.length] = "<tr>";
		var i = 1;
		for(var p in groupNameMapping){
			id = "hide_"+i;
			arr[arr.length] = "<td align='left' width='33%'><input type='checkbox' id='"+id+"' value='"+groupNameMapping[p].join(",")+"' checked><label for='"+id+"'>"+p+"</label></td>";
			if(i%3 == 0 && i < totalNum){
				arr[arr.length] = "</tr>";
				arr[arr.length] = "<tr>";
			}
			i++;
		}
		for(var p in unitNameMapping){
			id = "hide_"+i;
			colNode = columnNodes[p];
			arr[arr.length] = "<td align='left' width='33%'><input type='checkbox' id='"+id+"' value='"+unitNameMapping[p].join(",")+"' checked><label for='"+id+"'>"+colNode.innerText+"</label></td>";
			if(i%3 == 0 && i < totalNum){
				arr[arr.length] = "</tr>";
				arr[arr.length] = "<tr>";
			}
			i++;
		}
		for(var a=(i-1)%3;a>0 && a<3;a++){
			arr[arr.length] = "<td width='33%'></td>";
		}
		arr[arr.length] = "</tr>";
		arr[arr.length] = "</table>";
		
		tempNode = document.createElement("div");
		div.appendChild(tempNode);
		tempNode.innerHTML = arr.join("");
		
		_qt._hideColDiv = div;
		document.body.appendChild(div);
	}
	
	if(_qt._hideColDiv.style.display == "none"){
		var pos = Position.cumulativeOffset(source);
		_qt._hideColDiv.style.left = (pos[0] + 5)+"px";
		_qt._hideColDiv.style.top = (pos[1] + source.offsetHeight)+"px";
		_qt._hideColDiv.show();
	}else{
		_qt._hideColDiv.hide();
	}
};
_qt.hideComSelectAll = function(e){
	if(e==null)e=window.event;
	var source = Event.element(e);
	Util.nodeIteratorByTagName($("_hideTable"),"input",function(node){
		node.checked = source.checked;
	});
};
_qt.hideColAction = function(action){
	if(action == 1){
		var colNodeArr = $(_qt._comResultTableFlag).firstChild.nextSibling.childNodes;
		Util.nodeIteratorByTagName($("_hideTable"),"input",function(node){
			var arr = node.value.split(",");
			for(var i=0;i<arr.length;i++){
				colNodeArr[parseInt(arr[i])].style.display = node.checked?"":"none";
			}
		});
		
		_qt._resetFloatHead();
	}
	$(_qt._hideColDiv).hide();
};

//��ʼ��ajax����Ĭ����ͬ��
_qt.initAjax=function(){
	_qt.ajax = new AjaxXmlHttp(_qt.async, "post");
	_qt.ajax.progressBar = window.top;
};
//�趨ajaxͬ���첽
_qt.setAjaxAsync=function(async){
	_qt.async=async;
	_qt.initAjax();
};
//�������岼��
_qt.createFrame = function(){
	_qt.getMinWidthHeight();	
	_qt._container = document.createElement("div");
	_qt._container.style.padding = "0px";
	_qt._container.style.margin = "0px";
	_qt._container.style.border = "0px";
	while(document.body.firstChild){
		_qt._container.appendChild(document.body.firstChild);
	}
	document.body.appendChild(_qt._container);

	_qt.createAllConCom();
	_qt.createConCom();
	_qt.createAdvConCom();
	_qt.createResultCom();
	_qt.createPageCom();	
	_qt._onresize();
};
//�õ���С��͸�
_qt.getMinWidthHeight = function(){
	var minWidth = document.body.getAttribute("minwidth");
	if(minWidth){
		_qt.minWidth = minWidth;
	}
	var minHeight = document.body.getAttribute("minheight");
	if(minHeight){
		_qt.minHeight = minHeight;
	}
};
//�߱߾�
_qt.getMarginHeight = function(ele){
	var result = 0;
	var str = $(ele).getStyle("margin-top");
	if(str){
		result += parseInt(str);
	}
	str = $(ele).getStyle("margin-bottom");
	if(str){
		result += parseInt(str);
	}
	return result;
};
//��߾�
_qt.getMarginWidth = function(ele){
	var result = 0;
	var str = $(ele).getStyle("margin-left");
	if(str){
		result += parseInt(str);
	}
	str = $(ele).getStyle("margin-right");
	if(str){
		result += parseInt(str);
	}
	return result;
};
//����Ӧ��С
_qt._onresize = function(){
	var totalHeight = Math.max(_qt.minHeight,document.body.clientHeight);
	
	var realHeight = _qt.getMarginHeight(document.body);
	var child = _qt._container.firstChild;
	while(child){
		if(child.style != null){
			if(child.style.position != "absolute"){
				realHeight += child.offsetHeight + _qt.getMarginHeight(child);
			}
		}
		child = child.nextSibling;
	}
	
	var overHeight = realHeight - totalHeight ;
	_qt._resultCom.style.height = Math.max(0,_qt._resultCom.offsetHeight - overHeight)+"px";
	
	window.setTimeout(function(){
		_qt._container.style.width = (Math.max(_qt.minWidth,document.body.clientWidth - _qt.getMarginWidth(document.body)))+"px";
	},0);
};
//����������ͨ��ѯ�����͸߼���ѯ�������������
_qt.createAllConCom=function(){
	_qt._conFieldSet = document.createElement("fieldset");
}
//���ز�ѯ�����������
_qt.hiddenConditaionCom=function(){
	while(!_qt._conFieldSet){
		_qt._onload();
	}
	if(_qt._conFieldSet&&_qt._conFieldSet.style.display!="none"){
		_qt._resultCom.style.height=(_qt._resultCom.offsetHeight+_qt._conFieldSet.offsetHeight)+"px";
	}
	_qt._conFieldSet.style.display="none";
}
//������ѯ�������
_qt.createConCom = function(){
	_qt._conCom= $(_qt._comConditationFlag);
	if(!_qt._conCom){
		alert(noSupport);
		return ;
	}
	if(_qt._conCom.style.display == "none"){
		_qt._conFieldSet.style.display = "none";
	}
	_qt._conCom.parentNode.replaceChild(_qt._conFieldSet,_qt._conCom);	
	
	var _title = _qt._conCom.getAttribute(_qt._comTitleFlag);
	if(!_title){
		_title = "";
	}
	var legend = document.createElement("legend");
	legend.innerText = _title;
	_qt._conFieldSet.appendChild(legend);
	_qt._conFieldSet.appendChild(_qt._conCom);

};
//�鿴�߼���ѯ������ť�¼�
_qt.showAdvConControlButtonClick=function(e){
	if(e == null)e=window.event;
	var source = Event.element(e);
	if (source.innerText==6){
		source.innerText=5;
		if(_qt._advConCom){
			_qt.showNode(_qt._advConCom);
		}		
	}else{
		source.innerText=6;
		if(_qt._advConCom){
			_qt.showNode(_qt._advConCom);
		}	
	}
	_qt._onresize();
};
//��ʾ�߼���ѯ�������
_qt.showNode=function(node){
	node.style.display="block";
};
//���ظ߼���ѯ�������
_qt.hiddenNode=function(node){
	node.style.display="none";
};
//�����߼���ѯ��������
_qt.createAdvConCom = function(){	
	var showAdvConControl;	
	_qt._advConCom=$(_qt._comAdvConditationFlag);	
	if(_qt._advConCom){
		showAdvConControl=document.createElement("div");
		showAdvConControl.id="_showAdvConControl";
		showAdvConControl.style.textAlign="center";
		
		var arr = [];
		arr[arr.length] = "<hr size=\"1\" noshade='noshade' />";
		arr[arr.length] = "<span valign=\"top\" class=\"navPoint\" onclick='_qt.showAdvConControlButtonClick();'>6</span>";
	
		showAdvConControl.innerHTML = arr.join("");
		
		document.body.appendChild(showAdvConControl);
	}else{
		return;
	}	
	showAdvConControl.parentNode.replaceChild(_qt._conFieldSet,showAdvConControl);	
	_qt._conFieldSet.appendChild(showAdvConControl);
	if(_qt._advConCom){
		_qt._advConCom.parentNode.replaceChild(_qt._conFieldSet,_qt._advConCom);
		_qt._conFieldSet.appendChild(_qt._advConCom);	
		_qt._advConCom.style.display="none";		
	}		
		
	
};
//ѡ���е�Ĭ����ɫ
_qt.selectedColor = "yellow";
//�趨ѡ���е���ɫ
_qt.setSelectedColor = function(selectedColor){
	_qt.selectedColor = selectedColor;
};
//�õ�ѡ����ж���
_qt.getSelectedRow = function(){
	return _qt._resultContainer.selectedRow;
};
//�õ�ѡ���еĸ�����Ϣ
_qt.getSelectedRowExtraInfo = function(){
	if(_qt._resultContainer.selectedRow == null){
		return null;
	}
	return _qt._resultContainer.selectedRow.getAttribute(_qt._extraFlag);
};
//������ѯ�������
_qt.createResultCom = function(){
	var comNode = $(_qt._comResultTableFlag);
	if(!comNode){
		alert(noSupport);
		return ;
	}
	if(comNode.tagName != "TABLE"){
		alert(noSupport);
		return ;
	}
	_qt._resultFieldSet = document.createElement("fieldset");
	_qt._resultFieldSet.style.marginTop = "10px";
	var scrollCom = document.createElement("div");
	scrollCom.style.width = "100%";
	scrollCom.style.overflowX = "auto";
	scrollCom.style.overflowY = "scroll";
	
	comNode.parentNode.replaceChild(_qt._resultFieldSet,comNode);
	scrollCom.appendChild(comNode);
	
	var tbodyArr = comNode.getElementsByTagName("tbody");
	_qt._resultContainer = tbodyArr[tbodyArr.length - 1];
	try{
		_qt._resultContainer.style.cursor="hand"; 
	}catch(e){
		
	}
	Event.observe(_qt._resultContainer,"click",function(e){
		if(e==null)e=window.event;
		var source = Event.element(e);
		if(_qt.debug){
			alert("tableClick"+source.tagName);
		}
		while(source != _qt._resultContainer){
			if(source.tagName == "TR"){
				if(_qt._resultContainer.selectedRow != null){
					_qt._resultContainer.selectedRow.style.backgroundColor = _qt._resultContainer.oldBgColor;
				}
				_qt._resultContainer.selectedRow = source;
				_qt._resultContainer.oldBgColor = source.style.backgroundColor;
				source.style.backgroundColor = _qt.selectedColor;
				//�����û��Զ������¼�
				if(_qt._resultContainer.selectedRow&&_qt._resultContainer.getAttribute(_qt._rowSelectedActionFlag)){
					eval(_qt._resultContainer.getAttribute(_qt._rowSelectedActionFlag))();
				}
				break;
			}
			source = source.parentNode;
		}
	});
	var _title = comNode.getAttribute(_qt._comTitleFlag);
	if(!_title){
		_title = defaultResultDesc;		
	}else{
		_qt._resultReportTitle=_title;
	}	
	var legend = document.createElement("legend");
	legend.id="resultLegend";
	if(!_qt.isPageFunctionCanceled)//���ȡ���Ͳ���ʾ��ҳ
	{
		legend.innerHTML = _title.escapeHTML()+" <span>"+curAndTotalNumDesc+"<span id='_numDescCom'></span>&nbsp;"+curAndTotalPageDesc+"<span id='_pageDescCom'></span>&nbsp;&nbsp;<input type='button' class='button' style='cursor:hand' value='"+exportDesc+"' onclick='_qt.exportReport();'>&nbsp;<input type='button' id='exportAllBut' class='button' style='cursor:hand' value='"+exportAllDesc+"' onclick='_qt.exportAllReport();'></span>";
	}else{
		legend.innerHTML = _title.escapeHTML()+" <span><input type='button' class='button' style='cursor:hand' value='"+exportDesc+"' onclick='_qt.exportReport();'></span>";
	}
	_qt._resultFieldSet.appendChild(legend);
	_qt._resultFieldSet.appendChild(scrollCom);
	
	_qt._resultCom = scrollCom;
	
	//������������div
	_qt._createHideDiv(legend);
	
};
//������ҳ����
_qt.createPageCom = function(){
	var comNode = $(_qt._comPageControlFlag);
	if(!comNode){
		alert(noSupport);
		return ;
	}
	
	comNode.style.marginTop = "5px";
	comNode.style.textAlign = "center";	
	if(!_qt.isPageFunctionCanceled){
		var btn;	
		var descArr = [firstPage,prePage,nextPage,endPage];
		var actionTypeArr = [1,2,3,4];
		var num = descArr.length;
		var fragment = document.createDocumentFragment();
		for(var i=0;i<num;i++){
			btn = document.createElement("input");
			btn.type = "button";
			btn.className = "button";
			btn.value = descArr[i];
			btn.action = actionTypeArr[i];
			fragment.appendChild(btn);
			fragment.appendChild(document.createTextNode(" "));
			
			Event.observe(btn,"click",_qt._pageScroll);
		}
		
		btn = document.createElement("input");
		btn.style.width = "40px";
		fragment.appendChild(btn);
		btn = document.createElement("input");
		btn.type = "button";
		btn.className = "button";
		btn.value = toPage;
		btn.action = 5;
		fragment.appendChild(btn);
		Event.observe(btn,"click",_qt._pageScroll);
		
		comNode.appendChild(fragment);
	}
	_qt._pageCom = comNode;
};
//��ҳ���ܵ�ȡ������
_qt.cancelPageFunction=function(userDefineCurPageValue){
	_qt.isPageFunctionCanceled=true;
	//�û��Զ����ȡ����ҳ��ѯ��curPage�����־ֵ
	_qt.caneledPageFunctionCurPageValue=userDefineCurPageValue;
}
//ȡ����ѯ����
_qt.cannelQueryAction=function(){	
	_qt._isCannelQueryAction=true;
}
//�Ƿ���ڲ�ѯ���
_qt.isQuerySuccess = function(){
	return _qt._curQueryStr != null;
};
//�趨��ѯ��ť�Ƿ���Ե��
_qt.setQueryButtonStatus=function(status){
	if(_qt.queryButtonObject==null||!_qt.queryButtonObject){
		return;
	}
	_qt.queryButtonObject.disabled =status;	
	
};

//ִ�в�ѯ�����ӿ�,��Ҫ�����ⲿ���������Ĵ�����
_qt.queryAction=function(isShowNoResult,eventObj){
	
	
	_qt.queryButtonObject=eventObj;
	
	_qt.pageInfo.queryType = _qt.submitQueryType;
	if(isShowNoResult == null){
		_qt.isShowNoResult = true;
	}else{
		_qt.isShowNoResult=isShowNoResult;
	}
	_qt._queryAction();
};

//ִ�������ѯ
_qt.sortQueryAction=function(isShowNoResult){
	_qt.pageInfo.queryType = _qt.sortQueryType;
	if(isShowNoResult == null){
		_qt.isShowNoResult = true;
	}else{
		_qt.isShowNoResult=isShowNoResult;
	}
	_qt._queryAction();
};
_qt._queryAction=function(){
	_qt.setStatusInfo(dataQuerying,true);
	
	var queryStr=null;
	if(_qt.pageInfo.queryType==_qt.submitQueryType){
		_qt.pageInfo.curPage=1;
		queryStr = _qt._curQueryStr = _qt.getQueryString();
	}else if(_qt.pageInfo.queryType==_qt.sortQueryType){
		if( _qt._curQueryStr==null){
			_qt.setStatusInfo(dataQueryFail,false);
			return;
		}else{
			queryStr=_qt.getQueryString();
		}
	}else{
		queryStr=_qt._curQueryStr;
	}
	if(queryStr==null){
		_qt.setStatusInfo("",true);
		return;
	}

	if(_qt._isCannelQueryAction){
		_qt._isCannelQueryAction=false;
		return ;
	}
	if(_qt._advConCom){
		_qt.hiddenNode(_qt._advConCom);	
	}				
	
	_qt._resultContainer.selectedRow = null;
	while(_qt._resultContainer.firstChild){
		_qt._resultContainer.removeChild(_qt._resultContainer.firstChild);
	}
	//�ж��Ƿ�ȡ����ҳ����
	if(_qt.isPageFunctionCanceled){
		_qt.pageInfo.curPage=_qt.caneledPageFunctionCurPageValue;
	}

	queryStr+="&"+_qt.curPageStringName+"="+_qt.pageInfo.curPage+"&"+_qt.pageSizeStringName+"="+_qt.pageInfo.pageSize;
	var strArr=queryStr.split("?");
	
	var urlStr=strArr[0];	
	var contentStr="";
	
	if(queryStr.indexOf("?")!=-1){
		contentStr=queryStr.substring(queryStr.indexOf("?")+1,queryStr.length);
		contentStr+="&random="+Math.random();
	}else{
		contentStr+="?random="+Math.random();
	}
	
	try{
		_qt.ajax.abort();
		_qt.ajax.sendXmlHttpRequest(urlStr,contentStr,_qt.setResult);	
	}catch(e){
		_qt.setStatusInfo(dataQueryFail,false);
		alert(e);
		return;
	}
};
//��ѯ�������
_qt.setResult=function(xmlResult){
	if(xmlResult == null){
		_qt.setStatusInfo(dataQueryFail,false);
		return ;
	}
	if(_qt.debug){
		alert(xmlResult.xml);	
	}
	var container=_qt._resultContainer;
	//�ṩ�ӿڣ����ⲿȫȨ���ƽ������.
	if(container.parentNode.getAttribute(_qt._resultActionFlag) != null&&container.parentNode.getAttribute(_qt._resultActionFlag)!=''){
		 if(!eval(container.parentNode.getAttribute(_qt._resultActionFlag))(xmlResult)){
		 	return ;
		 }
	}

	var root = xmlResult.documentElement;
	if(root.getAttribute(_qt._resultIsSuccessFlag)=="false"){
		alert(root.getAttribute(_qt._resultFailureReasonFlag));
		_qt.setStatusInfo(root.getAttribute(_qt._resultFailureReasonFlag),false);
		return ;
	}
	_qt.pageInfo.isSuccess = true;
	_qt.pageInfo.totalPage = parseInt(root.getAttribute(_qt._resultTotalPageFlag));
	_qt.pageInfo.curPage = parseInt(root.getAttribute(_qt._resultCurPageFlag));
	_qt.pageInfo.totalNum = parseInt(root.getAttribute(_qt._resultTotalNumFlag));
	_qt.pageInfo.curNum = parseInt(root.getAttribute(_qt._resultCurNumFlag));	
	if(_qt.debug){
		alert("��ҳ��"+_qt.pageInfo.totalPage+"��ǰҳ"+_qt.pageInfo.curPage+"�ܽ����"+_qt.pageInfo.totalNum+"��ǰ�����"+_qt.pageInfo.curNum);
	}
	//�ж��Ƿ�ȡ����ҳ����		
	if(!_qt.isPageFunctionCanceled){
		$("_pageDescCom").innerText = (_qt.pageInfo.curPage+"/"+_qt.pageInfo.totalPage);
		$("_numDescCom").innerText = (_qt.pageInfo.curNum+"/"+_qt.pageInfo.totalNum);	
	}	
	
	var allRecordArr = root.getElementsByTagName("record"),record;
	var num=allRecordArr.length;
	if(num==0 && _qt.isShowNoResult){
		alert(noResult);
	}
	var columnNodes=$(_qt._comResultTableFlag).getElementsByTagName("tbody")[0].rows[0].getElementsByTagName("th"),columnNode;
	var index = (_qt.pageInfo.curPage-1)*_qt.pageInfo.pageSize + 1;	
	//�ж��Ƿ�ȡ����ҳ����
	if(_qt.isPageFunctionCanceled){
		index=1;
		_qt.pageInfo.totalPage = 1;
		_qt.pageInfo.curPage = _qt.caneledPageFunctionCurPageValue;
		_qt.pageInfo.curNum = parseInt(root.getAttribute(_qt._resultCurNumFlag));
		_qt.pageInfo.totalNum =_qt.pageInfo.curNum;
		
	}

	var fragment = document.createDocumentFragment();
	var tr,td,action;	
	var tempValue;
	for(var i=0;i<num;i++){
		index++;	
		record = allRecordArr[i];
		tr = document.createElement("tr");
		tr.setAttribute(_qt._extraFlag,"");
		for(var j=0;j<columnNodes.length;j++){					
			columnNode=columnNodes[j];
			td = document.createElement("td");
			tempValue = columnNode.getAttribute(_qt._xAlignFlag);
			if(tempValue != null){
				td.align = tempValue; 
			}
			tr.appendChild(td);
			
			//�������� text��Ϊ �Լ� html��Ϊ�����Ƚ����Ⱥ���.������Э���û��Զ���.
			action = columnNode.getAttribute(_qt._attrFlag);
			if(action != null){
				tempValue = record.getAttribute(action);
				if(tempValue){
					td.innerText = tempValue;
				}
			}else{
				action = columnNode.getAttribute(_qt._funcAttrFlag);
				if(action != null){
					tempValue = eval(action)(td,record);
					if(tempValue){
						td.innerText = tempValue;
					}
				}else{
					action = columnNode.getAttribute(_qt._htmlFuncAttrFlag);
					if(action != null){
						tempValue = eval(action)(td,record);
						if(tempValue){
							td.innerHTML = tempValue;
						}
					}
				}
			}
			
			var extraInfo=record.getAttribute(_qt._extraFlag);
			if(extraInfo){
				tr.setAttribute(_qt._extraFlag,extraInfo);
			}
		}
		//��ȾTR�ڵ�
		if(_qt._trRenderFun){
			_qt._trRenderFun(tr,record);
		}
		
		fragment.appendChild(tr);			
	}

	while(container.firstChild){
		container.removeChild(container.firstChild);
	}
	container.appendChild(fragment);
	
	if(container.selectedNode){
		container.selectedNode = document.getElementById(container.selectedNode.id);
	}
	
	//�ṩ�ӿڣ����ⲿȫȨ���ƽ����ʾ.
	if(container.parentNode.getAttribute(_qt._resultViewActionFlag) != null&&container.parentNode.getAttribute(_qt._resultViewActionFlag)!=''){
		eval(container.parentNode.getAttribute(_qt._resultViewActionFlag))();
	}
	
	_qt._resetFloatHead();
	_qt.setStatusInfo(dataQuerySuccess,false);
	
};
//��ҳ�¼��ӿڣ���Ҫ�����ⲿ�ṩ��ѯ��url��content
_qt._pageScroll = function(e){
	if(!_qt.pageInfo.isSuccess){
		return;
	}
	if(e == null)e = window.event;
	var source = Event.element(e);
	if(!source.action){
		return ;
	}
	var actionType=Number(source.action);
	var pageNum=0;
	if(actionType==1){
		pageNum=1;
	}else if(actionType==2){
		pageNum=_qt.pageInfo.curPage-1;
	}else if(actionType==3){		
		pageNum=_qt.pageInfo.curPage+1;
	}else if(actionType==4){
		pageNum=_qt.pageInfo.totalPage;
	}else if(actionType == 5){
		var success = true;
		pageNum = source.previousSibling.value.strip();
		if(pageNum == ""){
			success = false;
		}else{
			var	Int_u=/^\d+$/;
			success = Int_u.test(pageNum);
			if(success){
				pageNum = parseInt(pageNum);
				if(pageNum <= 0 || pageNum > _qt.pageInfo.totalPage){
					success = false;
				}
			}
		}
		source.previousSibling.focus();
		if(!success){
			alert(pageError);
			return ;
		}
	}
	if(pageNum<1){
		alert(firstPageDesc);
		return;
	}
	if(pageNum>_qt.pageInfo.totalPage){
		alert(lastPageDesc);
		return;
	}
	_qt.pageInfo.curPage=pageNum;	
	_qt.pageInfo.queryType=_qt.pageQueryType;	
	_qt._queryAction();
};
//ҳ�����ݵ������ܣ���Ҫ�ⲿ�������ĵ�������
_qt.exportReport=function(){
	var excelApp,book,sheet,cell;
	excelApp = new ExcelApp();
	excelApp.progressBar = window.top;
	book = excelApp.addWorkBook();
	sheet = book.addSheet(_qt._resultReportTitle);
	cell = sheet.addCell(_qt._resultReportTitle,false);
	cell.setHAlign(ExcelCell.CENTER_ALIGN);
	
	var columnCount=$(_qt._comResultTableFlag).firstChild.firstChild.childNodes.length;	
	cell.setBounds(1,1,columnCount,1);
	cell = sheet.addCell($(_qt._comResultTableFlag),false); 
	cell.setBounds(1, 3, 1, 1);	
	excelApp.exportToExcel(false);
};

_qt._updateExportProgress = function(desc,curNum,totalNum,status){
	window.status = desc+" "+curNum+"/"+totalNum;
	if(status == 1){
		$("exportAllBut").isCancel = true;
		$("exportAllBut").value = cannelExport;
	}else if(status == 2){
		_qt._resetExportInfo();
		alert(exportSuccess);
	}else if(status == 3){
		_qt._resetExportInfo();
		alert(exportFail);
	}
};
_qt._resetExportInfo = function(){
	_qt._exportInfo.pending = false;
	$("exportAllBut").value = exportAllDesc;
	$("exportAllBut").isCancel = false;
	_qt._exportInfo.excelApp = null;
	_qt._exportInfo = {};
};
//�������н����
_qt._exportInfo = {pending:false,interrupt:false,title:""};
_qt.exportAllReport=function(){
	if($("exportAllBut").isCancel){
		_qt._exportInfo.interrupt = true;
		return ;
	}
	_qt._exportInfo.interrupt = false;
	if(_qt._exportInfo.pending){
		return ;
	}
	if(_qt._curQueryStr == null){
		return ;
	}
	if(_qt.pageInfo.totalNum <= 0){
		return ;
	}
	if(_qt.pageInfo.totalPage == 1){
		_qt.exportReport();
		return ;
	}
	_qt._exportInfo.pending = true;
	
	
	if(_qt._resultContainer.previousSibling){
		var rows = _qt._resultContainer.parentNode.firstChild.rows;
		if(rows.length > 0){
			var arr = [];
			var col = rows[0].firstChild;
			while(col){
				arr[arr.length] = col.innerText;
				col = col.nextSibling;
			}
			_qt._exportInfo.title = arr.join("\t");
		}
	}
	
	_qt._updateExportProgress(startExport,0,_qt.pageInfo.totalNum,1);
	if(!_qt._exportInfo.headRowNum){
		_qt._exportInfo.headRowNum = 4;
	}
	_qt._exportInfo.excelApp = new ExcelApp();
	_qt._exportInfo.book = _qt._exportInfo.excelApp.addWorkBook();
	_qt._exportInfo.sheetCount = 1;
	_qt._exportInfo.sheet = _qt._exportInfo.book.addSheet(_qt._resultReportTitle+"_"+_qt._exportInfo.sheetCount);
	
	var cell = _qt._exportInfo.sheet.addCell(_qt._resultReportTitle,false);
	cell.setHAlign(ExcelCell.CENTER_ALIGN);
	
	var columnCount=$(_qt._comResultTableFlag).firstChild.firstChild.childNodes.length;	
	cell.setBounds(1,1,columnCount,1);
	
	cell = _qt._exportInfo.sheet.addCell(_qt._exportInfo.title,true);
	cell.setBounds(1,_qt._exportInfo.headRowNum-1,1,1);
	
	_qt._exportInfo.columnCount = columnCount;
	_qt._exportInfo.recordCount = 0;
	_qt._exportInfo.totalCount = 0;
	_qt._exportInfo.resultInfo = [];
	
	_qt._exportInfo.ajax = new AjaxXmlHttp(true, "post");
	_qt._exportInfo.destAddr = "";
	_qt._exportInfo.content = "";
	_qt._exportInfo.curPage = 1;
	_qt._exportInfo.pageSize = 1000;
	_qt._exportInfo.totalPage = (_qt.pageInfo.totalPage*_qt.pageInfo.pageSize - 1)/_qt._exportInfo.pageSize + 1;
	
	var queryStr = _qt._curQueryStr+"&"+_qt.pageSizeStringName+"="+_qt._exportInfo.pageSize;
	var strArr = queryStr.split("?");
	_qt._exportInfo.destAddr=strArr[0];
	if(queryStr.indexOf("?")!=-1){
		_qt._exportInfo.content=queryStr.substring(queryStr.indexOf("?")+1,queryStr.length);
	}
	_qt._exportOnePage();
};

_qt._exportOnePage = function(){
	if(_qt._exportInfo.curPage > _qt._exportInfo.totalPage){
		if(_qt._exportInfo.recordCount > 0){
			var cell = _qt._exportInfo.sheet.addCell(_qt._exportInfo.resultInfo.join(""),true);
			cell.setBounds(1,_qt._exportInfo.headRowNum,1,1);
			_qt._exportInfo.sheet.setStrRange(_qt._exportInfo.recordCount+10,_qt._exportInfo.columnCount);
		}
		
		_qt._updateExportProgress(dataDisposing,_qt.pageInfo.totalNum,_qt.pageInfo.totalNum,1);
		_qt._exportInfo.excelApp.exportToExcel(false);
		
		_qt._updateExportProgress(dataExportSuccess,_qt.pageInfo.totalNum,_qt.pageInfo.totalNum,2);
		return ;
	}
	
	_qt._exportInfo.ajax.abort();
	_qt._exportInfo.ajax.sendXmlHttpRequest(_qt._exportInfo.destAddr,_qt._exportInfo.content+"&"+_qt.curPageStringName+"="+_qt._exportInfo.curPage,_qt._responseExportOnePage);
};
_qt._responseExportOnePage = function(xmlResult){
	if(_qt._exportInfo.interrupt){
		_qt._updateExportProgress(dataExportFail,0,0,3);
		return ;
	}
	
	if(xmlResult == null){
		_qt._updateExportProgress(dataExportFail,0,0,3);
		return ;
	}
	var root = xmlResult.documentElement;
	if(root.getAttribute(_qt._resultIsSuccessFlag)=="false"){
		_qt._updateExportProgress(dataExportFail,0,0,3);
		return ;
	}
	
	var allRecordArr = root.selectNodes("record"),record;
	var num=allRecordArr.length;
	
	var columnNodes=$(_qt._comResultTableFlag).firstChild.firstChild.childNodes,columnNode;
	var index = (_qt.pageInfo.curPage-1)*_qt.pageInfo.pageSize + 1;
	
	var action,cell;
	var arr = _qt._exportInfo.resultInfo;
	var colNum = columnNodes.length;
	for(var i=0;i<num;i++){
		index++;	
		record = allRecordArr[i];
		for(var j=0;j<colNum;j++){
			columnNode=columnNodes[j];
			
			//�������� text��Ϊ �Լ� html��Ϊ�����Ƚ����Ⱥ���.������Э���û��Զ���.
			action = columnNode.getAttribute(_qt._attrFlag);
			if(action != null){
				action = record.getAttribute(action);
			}else{
				action = columnNode.getAttribute(_qt._funcAttrFlag);
				if(action != null){
					action = eval(action)(null,record);
				}else{
					action = columnNode.getAttribute(_qt._htmlFuncAttrFlag);
					if(action != null){
						action = eval(action)(null,record);
						if(action != null){
							action = action.unescapeHTML();
						}
					}
				}
			}
			if(action == null){
				action = "";
			}
			arr[arr.length] = action+"\t";
			
		}
		arr[arr.length] = "\n";
		
		_qt._exportInfo.recordCount++;
		_qt._exportInfo.totalCount++;
		if(_qt._exportInfo.recordCount == 60000){
			_qt._exportInfo.sheet.setStrRange(_qt._exportInfo.recordCount+10,colNum);
			cell = _qt._exportInfo.sheet.addCell(arr.join(""),true);
			cell.setBounds(1,3,1,1);
			
			arr = _qt._exportInfo.resultInfo = [];
			
			_qt._exportInfo.recordCount = 0;
			_qt._exportInfo.sheetCount++;
			_qt._exportInfo.sheet = _qt._exportInfo.book.addSheet(_qt._resultReportTitle+"_"+_qt._exportInfo.sheetCount);
		}
		
		if((_qt._exportInfo.recordCount%100) == 0){
			_qt._updateExportProgress(dataExporting,_qt._exportInfo.totalCount,_qt.pageInfo.totalNum,1);
		}
	}
	
	_qt._exportInfo.curPage++;
	_qt._exportOnePage();
};

//�ⲿ�ӿڣ��ṩ�û��Զ������õ�ǰҳ��������ַ����ƣ���ǰҳ
_qt.setCurPageStringName=function(curPageStringName){
	_qt.curPageStringName=curPageStringName;
};
//�ⲿ�ӿڣ��ṩ�û��Զ������õ�ǰҳ���¼�������ַ����ƣ�ҳ���С
_qt.setPageSizeStringName=function(pageSizeStringName){
	_qt.pageSizeStringName=pageSizeStringName;
};
//�ⲿ�ӿڣ��ⲿ����ʵ�ֵĴ���Ŀ��url��ַ�ķ�������ҳ���е�action�ṩ��װ��ѯ�����ķ�����
_qt.getQueryString=function(){
	if(_qt._conCom&&_qt._conCom.getAttribute(_qt._formQueryActionFlag)){
		return eval(_qt._conCom.getAttribute(_qt._formQueryActionFlag))();
	}else{
		return null;
	}	
};
//�ⲿ�ӿ�,�趨pageSize
_qt.setPageSize=function(pageSize){
	_qt.pageInfo.pageSize=pageSize;
}
//�ⲿ�ӿ�,�趨curPage
_qt.setCurPage=function(curPage){
	_qt.pageInfo.curPage=curPage;
}
//�趨״̬����Ϣ
_qt.setStatusInfo=function(info,status){
	window.status=info;
	_qt.setQueryButtonStatus(status);
	
}
//ִ�з���
_qt._init();

