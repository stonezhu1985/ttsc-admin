//����ķ�����Ҫ�û�ʵ�֣��������ȵķ�����3��
//1._qt2.getQueryString������֯��ѯurl����������ajax��ѯ
//2._qt2.onload�Զ����ط������û���Ҫ��ǰ���ص���Ŀ
//3._qt2.destSelected��ѡ���¼�
if(!_qt2){
	var _qt2 = {};
};
//�Ƿ��ǲ���ʹ��
_qt.debug=false;
//_qt.ajax
//�õ�url��string����Ҫ�û��ṩ
_qt2.getQueryString=function(){
	var queryString="../jsp/result_record.jsp?opid=208";
	return queryString;	
};
//�Զ�������Ŀ
_qt2.onload=function(){
	if(_qt.debug){
		alert("test");
	}
}
//ѡ����
_qt2.destSelected=function(){
	alert("row selected");
}