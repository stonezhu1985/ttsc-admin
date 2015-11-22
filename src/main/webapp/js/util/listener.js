if(!Listener){
	var Listener = {};
}

/**
 * 为某个节点下的所有inputcheckbox设定全选或取消全选的事件创建监听函数
 * 如果sourceNode存在,则直接创建监听事件,如果不存在,则返回监听函数
 * @param {Object} destNode    目标节点
 * @param {Object} sourceNode  监听节点
 */
Listener.createCheckboxSelectListener = function(destNode,sourceNode){
	if(!destNode){
		return null;
	}
	var fun = Listener.checkboxSelectByEvent.bind(null,destNode);
	if(!sourceNode){
		return fun;
	}else{
		Event.observe(sourceNode,"click",fun);
	}
};

/**
 * 以e的事件源的选择状态决定destNode内所有的checkbox的选择状态
 * @param {Object} destNode
 * @param {Object} e
 */
Listener.checkboxSelectByEvent = function(destNode,e){
	if(!destNode){
		return ;
	}
	if(e == null){
		e = window.event;
	}
	var source = Event.element(e);
	Listener.checkboxSelect(destNode,source.checked);
};

/**
 * 通过直接值的方式或者接口函数进行checkbox的选择
 * @param {Object} destNode
 * @param {Object} valueOrFunc
 */
Listener.checkboxSelect = function(destNode,valueOrFunc){
	var isFunc = (typeof valueOrFunc == "function");
	var allInput = destNode.getElementsByTagName("input"),input;
	var num = allInput.length;
	for(var i=0;i<num;i++){
		input = allInput[i];
		if(input.checked != null){
			if(isFunc){
				input.checked = valueOrFunc.call(null,input);
			}else{
				input.checked = valueOrFunc;
			}
		}
	}
};