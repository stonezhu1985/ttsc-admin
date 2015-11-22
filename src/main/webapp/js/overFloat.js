/**
 * �����࣬ͬʱ�ṩһ��������ķ���
 * ������
 * <tr id="overFloat_1" overFloatMode="viewtop" overFloatScope="infoTable">
 * ����
 * <tbody id="overFloat_2" overFloatMode="viewbottom" overFloatScope="infoTable">
 */

if( ! Class){
      var Class = {};
}
Class.create = function() {
      var newClass = function() {
            if(typeof(this.initialize) == "function"){
                  this.initialize.apply(this, arguments);
            }
      }
      ;

      var length = arguments.length;
      if(length > 1){
            newClass.prototype = arguments[1];
      }
      newClass.prototype.className = length > 0 ? arguments[0] : "anonymous";

      return newClass;
};

//�����
var overfloat = {};
//�������������࣬�ֱ��Ǹ��������Լ��������������������к�ҳ����������Ҫ�����Ķ���
overfloat.OverFloatObject = Class.create("overfloat.OverFloatObject",new Object());
overfloat.OverFloatContainer = Class.create("overfloat.OverFloatContainer",new Object());

//����ģʽ
overfloat.OverFloatObject.OverFloatModeFlag = "overFloatMode";
//������Χ��������ֵͨ����һ��Ԫ�صı�ʶ
overfloat.OverFloatObject.OverFloatScopeFlag = "overFloatScope";

//���帡���ļ���ģʽ����ͼ�����ס����ҡ����ϡ����ϡ����¡�����
overfloat.OverFloatObject.AlwaysViewTopFlag = "viewtop";
overfloat.OverFloatObject.AlwaysViewBottomFlag = "viewbottom";
overfloat.OverFloatObject.AlwaysViewLeftFlag = "viewleft";
overfloat.OverFloatObject.AlwaysViewRightFlag = "viewright";
overfloat.OverFloatObject.AlwaysViewLeftTopFlag = "viewlefttop";
overfloat.OverFloatObject.AlwaysViewRightTopFlag = "viewrighttop";
overfloat.OverFloatObject.AlwaysViewLeftBottomFlag = "viewleftbottom";
overfloat.OverFloatObject.AlwaysViewRightBottomFlag = "viewrightbottom";
//������ʱ�ĳ�ʼ������
overfloat.OverFloatObject.prototype.initialize = function(overFloatElement,parentScrollElement){
	this.overFloatElement = overFloatElement;
	this.copyOverFloatElement = null;
	this.parentScrollElement = parentScrollElement;
	this.overFloatMode = null;
	this.scopeElement = null;
	this.overFloatOriBounds = {top:0,left:0,width:0,height:0};
};
//��ʼ����������
overfloat.OverFloatObject.prototype.init = function(){
	this.overFloatMode = this.overFloatElement.getAttribute(overfloat.OverFloatObject.OverFloatModeFlag);
	//�ж��Ƿ�֧��ģʽ
	if(!this.isSupportMode()){
		return false;
	}

	//��ȡ������Χ���ɷ�ΧԪ�ر�ʶָ������ֵΪĳԪ�صģ�䣬�����ֵ�����ڣ���ʹ�ø���Ԫ�صĸ�Ԫ����Ϊ������Χ
	this.scopeElement = this.overFloatElement.getAttribute(overfloat.OverFloatObject.OverFloatScopeFlag);
	if(this.scopeElement == null��|| this.scopeElement == ""){
		this.scopeElement = this.overFloatElement.parentNode;
	}else{
		try{
			this.scopeElement = eval(this.scopeElement);
		}catch(e){
			this.scopeElement = this.overFloatElement.parentNode;
		}
	}
	//��ʼ������Ԫ������Բ���Ԫ��
	this.changeElementLayoutMode();
	//��ȡ����Ԫ�ص�ԭʼλ��
	var loc = WindUtil.getAbsolutePositionInContainer(this.overFloatElement,this.parentScrollElement);

	this.overFloatOriBounds.top = loc.top;
	this.overFloatOriBounds.left = loc.left;
	this.overFloatOriBounds.width = this.overFloatElement.offsetWidth;
	this.overFloatOriBounds.height = this.overFloatElement.offsetHeight;
	
	return true;
}
overfloat.OverFloatObject.prototype.reInit = function(){
	//���³�ʼ������Ԫ�صĿ�Ⱥ͸߶ȣ�����ԴԪ�ص�ֵ
	if(this.copyOverFloatElement != null){
		var tGroup = this.copyOverFloatElement.childNodes[0];
		var trs = tGroup.childNodes,tds,tr,td;
		var trNum = trs.length,tdNum;
		
		//�趨���Σ��ڣɣ���ֻ�趨һ�κ���δ����Ч������ԭ��֪�������������趨���ξͣ�룮
		//��ÿ��·�Ƴ��˼ƻ�
		this.copyOverFloatElement.style.width = this.overFloatElement.offsetWidth;
		this.copyOverFloatElement.style.width = this.overFloatElement.offsetWidth;
		
		var destTrs = this.overFloatElement.childNodes,destTds;
		//����ʵ�ʶ���Ŀ�͸�
		for(var i =0 ;i<trNum;i++){
			tr = trs[i];
			tds = tr.childNodes;
			tdNum = tds.length;
			tr.style.height = destTrs[i].offsetHeight;
			destTds = destTrs[i].childNodes;
			for(var j = 0;j < tdNum;j++){
				tds[j].style.width = destTds[j].offsetWidth;
			}
		}
	}
	//���³�ʼ������Ԫ�صĳ�ʼλ��
	this.overFloatElement.style.top = 0;
	this.overFloatElement.style.left = 0;
	var loc = WindUtil.getAbsolutePositionInContainer(this.overFloatElement,this.parentScrollElement);
	this.overFloatOriBounds.top = loc.top;
	this.overFloatOriBounds.left = loc.left;
	this.overFloatOriBounds.width = this.overFloatElement.offsetWidth;
	this.overFloatOriBounds.height = this.overFloatElement.offsetHeight;
};
//�����µĹ�����ʾ������߸ı�ԭЩ�Ĺ���Ԫ�صĲ��ַ�ʽ
overfloat.OverFloatObject.prototype.changeElementLayoutMode = function(){
	var tagName = this.overFloatElement.tagName;
	if(tagName == "THEAD" || tagName == "TBODY"){
		this.copyOverFloatElement = this.overFloatElement.parentNode.cloneNode(false);
		this.copyOverFloatElement.appendChild(this.overFloatElement.cloneNode(true));
		this.copyOverFloatElement.removeAttribute("id");
		this.copyOverFloatElement.removeAttribute("name");
		this.copyOverFloatElement.style.position = "absolute";
		this.copyOverFloatElement.style.zIndex = 100;
		this.copyOverFloatElement.style.display = "none";
		
		this.overFloatElement.parentNode.parentNode.appendChild(this.copyOverFloatElement);
	}else{
		this.overFloatElement.style.position = "relative";
		this.overFloatElement.style.left = 0;
		this.overFloatElement.style.top = 0;
	}
};
//�ж�ģʽ�Ƿ�֧��
overfloat.OverFloatObject.prototype.isSupportMode = function(){
	return this.overFloatMode == overfloat.OverFloatObject.AlwaysViewTopFlag 
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewBottomFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftTopFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightTopFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftBottomFlag
		|| this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightBottomFlag;
};
//�ض�λ��������
overfloat.OverFloatObject.prototype.reLocation = function(){
	var viewBounds = {
			left:this.parentScrollElement.scrollLeft,
			top:this.parentScrollElement.scrollTop,
			width:this.parentScrollElement.clientWidth,
			height:this.parentScrollElement.clientHeight
			};
			
	var loc = WindUtil.getAbsolutePositionInContainer(this.scopeElement,this.parentScrollElement);

	var scopeBounds = {
		left:loc.left,
		top:loc.top,
		width:this.scopeElement.offsetWidth,
		height:this.scopeElement.offsetHeight
	};
	var interBounds = {
		left:Math.max(viewBounds.left,scopeBounds.left),
		top:Math.max(viewBounds.top,scopeBounds.top),
		width:Math.min(viewBounds.left+viewBounds.width,scopeBounds.left+scopeBounds.width)-Math.max(viewBounds.left,scopeBounds.left),
		height:Math.min(viewBounds.top+viewBounds.height,scopeBounds.top+scopeBounds.height)-Math.max(viewBounds.top,scopeBounds.top)
	};

	if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewTopFlag){
		this.moveToViewTop(interBounds);
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewBottomFlag){
		this.moveToViewBottom(interBounds);
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftFlag){
		
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightFlag){
		
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftTopFlag){
		
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightTopFlag){
		
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewLeftBottomFlag){
		
	}else if(this.overFloatMode == overfloat.OverFloatObject.AlwaysViewRightBottomFlag){
		
	}
};
//��λ����ͼ����
overfloat.OverFloatObject.prototype.moveToViewTop = function(interBounds){
	var tagName = this.overFloatElement.tagName;
	if(this.copyOverFloatElement != null){
		if(this.overFloatOriBounds.top < interBounds.top){
			this.copyOverFloatElement.style.display = "";
			this.copyOverFloatElement.style.top = interBounds.top;
		}else{
			this.copyOverFloatElement.style.display = "none";
		}
	}else{
		this.overFloatElement.style.top = interBounds.top - this.overFloatOriBounds.top;
	}
};
//��λ����ͼ�׶�
overfloat.OverFloatObject.prototype.moveToViewBottom = function(interBounds){
	if(this.copyOverFloatElement != null){
		if(this.overFloatOriBounds.top + this.overFloatOriBounds.height > interBounds.top + interBounds.height){
			this.copyOverFloatElement.style.display = "";
			this.copyOverFloatElement.style.top = interBounds.top + interBounds.height - this.overFloatOriBounds.height;
		}else{
			this.copyOverFloatElement.style.display = "none";
		}
	}else{
		this.overFloatElement.style.top = interBounds.top + interBounds.height - this.overFloatElement.offsetHeight - this.overFloatOriBounds.top;
	}
};
//���������������Ա�ʶ
overfloat.OverFloatContainer.OverFloatElementFlag = "overfloatelement";
//������ʱ�ĳ�ʼ������
overfloat.OverFloatContainer.prototype.initialize = function(containerElement){
	this.containerElement = containerElement;
	this.container = [];
};
//��ʼ��ҳ�������еĹ�������
overfloat.OverFloatContainer.prototype.init = function(){
	//��ҳ����Ѱ�ҵ�������Ҫ������Ԫ�أ���ÿһ������Ԫ�ض�����һ����Ӧ�ĸ������󣬸ø������󽫱���ӵ������С�
};
//���һ��ָ���ĸ���Ԫ��
overfloat.OverFloatContainer.prototype.addOverFloatElement = function(overFloatElement,parentScrollElement){
	if(overFloatElement == null){
		return false;
	}
	
	var obj = new overfloat.OverFloatObject(overFloatElement,parentScrollElement == null?document.body:parentScrollElement);
	var isSuccess = obj.init();
	if(isSuccess){
		this.container[this.container.length] = obj;
	}
	
	return isSuccess;
};
//�ض�λ���������еĸ�������
overfloat.OverFloatContainer.prototype.reLocation = function(parentScrollElement){
	for(var i = this.container.length-1;i>=0;i--){
		if(parentScrollElement == null || this.container[i].parentScrollElement == parentScrollElement){
			this.container[i].reLocation();
		}
	}
};
//��Ϊ�ĵ��ṹ�ı䶯�����߱�񲼾ֵı䶯�����³�ʼ������������Ϣ
overfloat.OverFloatContainer.prototype.reInit = function(parentScrollElement){
	for(var i = this.container.length-1;i>=0;i--){
		if(parentScrollElement == null || this.container[i].parentScrollElement == parentScrollElement){
			this.container[i].reInit();
		}
	}
};
overfloat.OverFloatContainer.prototype.getOverFloatObject = function(element){
	for(var i = this.container.length-1;i>=0;i--){
		if(this.container[i].overFloatElement == element){
			return this.container[i];
		}
	}
	return null;
};