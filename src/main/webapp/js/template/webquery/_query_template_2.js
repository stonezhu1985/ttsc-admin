//本类的方法需要用户实现，必须事先的方法是3个
//1._qt2.getQueryString用于组织查询url参数，用于ajax查询
//2._qt2.onload自动加载方法，用户需要提前加载的项目
//3._qt2.destSelected行选择事件
if(!_qt2){
	var _qt2 = {};
};
//是否是测试使用
_qt.debug=false;
//_qt.ajax
//得到url的string，需要用户提供
_qt2.getQueryString=function(){
	var queryString="../jsp/result_record.jsp?opid=208";
	return queryString;	
};
//自动加载项目
_qt2.onload=function(){
	if(_qt.debug){
		alert("test");
	}
}
//选择行
_qt2.destSelected=function(){
	alert("row selected");
}