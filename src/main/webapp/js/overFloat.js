/**
 * 定义类，同时提供一个创建类的方法
 * 样本：
 * <tr id="overFloat_1" overFloatMode="viewtop" overFloatScope="infoTable">
 * 或者
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

//定义包
var overfloat = {};
//创建包的两个类，分别是浮动对象以及浮动容器，浮动容器中含页面上所有需要浮动的对象
overfloat.OverFloatObject = Class.create("overfloat.OverFloatObject",new Object());
overfloat.OverFloatContainer = Class.create("overfloat.OverFloatContainer",new Object());

//浮动模式
overfloat.OverFloatObject.OverFloatModeFlag = "overFloatMode";
//浮动范围，该属性值通常是一个元素的标识
overfloat.OverFloatObject.OverFloatScopeFlag = "overFloatScope";

//定义浮动的几种模式，视图顶、底、左、右、左上、右上、左下、右下
overfloat.OverFloatObject.AlwaysViewTopFlag = "viewtop";
overfloat.OverFloatObject.AlwaysViewBottomFlag = "viewbottom";
overfloat.OverFloatObject.AlwaysViewLeftFlag = "viewleft";
overfloat.OverFloatObject.AlwaysViewRightFlag = "viewright";
overfloat.OverFloatObject.AlwaysViewLeftTopFlag = "viewlefttop";
overfloat.OverFloatObject.AlwaysViewRightTopFlag = "viewrighttop";
overfloat.OverFloatObject.AlwaysViewLeftBottomFlag = "viewleftbottom";
overfloat.OverFloatObject.AlwaysViewRightBottomFlag = "viewrightbottom";
//对象构造时的初始化方法
overfloat.OverFloatObject.prototype.initialize = function(overFloatElement,parentScrollElement){
	this.overFloatElement = overFloatElement;
	this.copyOverFloatElement = null;
	this.parentScrollElement = parentScrollElement;
	this.overFloatMode = null;
	this.scopeElement = null;
	this.overFloatOriBounds = {top:0,left:0,width:0,height:0};
};
//初始化滚动对象
overfloat.OverFloatObject.prototype.init = function(){
	this.overFloatMode = this.overFloatElement.getAttribute(overfloat.OverFloatObject.OverFloatModeFlag);
	//判断是否支持模式
	if(!this.isSupportMode()){
		return false;
	}

	//获取浮动范围，由范围元素标识指定，其值为某元素的ｉｄ，如果该值不存在，则使用浮动元素的父元素作为浮动范围
	this.scopeElement = this.overFloatElement.getAttribute(overfloat.OverFloatObject.OverFloatScopeFlag);
	if(this.scopeElement == null　|| this.scopeElement == ""){
		this.scopeElement = this.overFloatElement.parentNode;
	}else{
		try{
			this.scopeElement = eval(this.scopeElement);
		}catch(e){
			this.scopeElement = this.overFloatElement.parentNode;
		}
	}
	//初始化浮动元素是相对布局元素
	this.changeElementLayoutMode();
	//获取浮动元素的原始位置
	var loc = WindUtil.getAbsolutePositionInContainer(this.overFloatElement,this.parentScrollElement);

	this.overFloatOriBounds.top = loc.top;
	this.overFloatOriBounds.left = loc.left;
	this.overFloatOriBounds.width = this.overFloatElement.offsetWidth;
	this.overFloatOriBounds.height = this.overFloatElement.offsetHeight;
	
	return true;
}
overfloat.OverFloatObject.prototype.reInit = function(){
	//重新初始化拷贝元素的宽度和高度，根据源元素的值
	if(this.copyOverFloatElement != null){
		var tGroup = this.copyOverFloatElement.childNodes[0];
		var trs = tGroup.childNodes,tds,tr,td;
		var trNum = trs.length,tdNum;
		
		//设定两次，在ＩＥ中只设定一次好像未能生效，具体原因不知道，但是连续设定两次就ｏｋ．
		//看每日路牌车人计划
		this.copyOverFloatElement.style.width = this.overFloatElement.offsetWidth;
		this.copyOverFloatElement.style.width = this.overFloatElement.offsetWidth;
		
		var destTrs = this.overFloatElement.childNodes,destTds;
		//复制实际对象的宽和高
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
	//重新初始化浮动元素的初始位置
	this.overFloatElement.style.top = 0;
	this.overFloatElement.style.left = 0;
	var loc = WindUtil.getAbsolutePositionInContainer(this.overFloatElement,this.parentScrollElement);
	this.overFloatOriBounds.top = loc.top;
	this.overFloatOriBounds.left = loc.left;
	this.overFloatOriBounds.width = this.overFloatElement.offsetWidth;
	this.overFloatOriBounds.height = this.overFloatElement.offsetHeight;
};
//创建新的滚动显示对象或者改变原些的滚动元素的布局方式
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
//判断模式是否支持
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
//重定位滚动对象
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
//定位到视图顶端
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
//定位到视图底端
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
//定义滚动对象的属性标识
overfloat.OverFloatContainer.OverFloatElementFlag = "overfloatelement";
//对象构造时的初始化方法
overfloat.OverFloatContainer.prototype.initialize = function(containerElement){
	this.containerElement = containerElement;
	this.container = [];
};
//初始化页面中所有的滚动对象
overfloat.OverFloatContainer.prototype.init = function(){
	//在页面中寻找到所有需要浮动的元素，对每一个浮动元素都产生一个对应的浮动对象，该浮动对象将被添加到容器中。
};
//添加一个指定的浮动元素
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
//重定位容器中所有的浮动对象
overfloat.OverFloatContainer.prototype.reLocation = function(parentScrollElement){
	for(var i = this.container.length-1;i>=0;i--){
		if(parentScrollElement == null || this.container[i].parentScrollElement == parentScrollElement){
			this.container[i].reLocation();
		}
	}
};
//因为文档结构的变动，或者表格布局的变动，重新初始化滚动对象信息
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