if(!Listener){
	var Listener = {};
}

/**
 * Ϊĳ���ڵ��µ�����inputcheckbox�趨ȫѡ��ȡ��ȫѡ���¼�������������
 * ���sourceNode����,��ֱ�Ӵ��������¼�,���������,�򷵻ؼ�������
 * @param {Object} destNode    Ŀ��ڵ�
 * @param {Object} sourceNode  �����ڵ�
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
 * ��e���¼�Դ��ѡ��״̬����destNode�����е�checkbox��ѡ��״̬
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
 * ͨ��ֱ��ֵ�ķ�ʽ���߽ӿں�������checkbox��ѡ��
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