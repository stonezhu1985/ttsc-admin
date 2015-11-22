<%@ page contentType="text/html;charset=gb2312"%>
<%@ page import="com.fleety.Constant" %>
<%@ page import="com.fleety.i18n.IflowI18n"%>
<%@ page import="com.fleety.action.login.UserInfo"%>
<%
	UserInfo info = UserInfo.getUserInfo(request);
	String lang = null;
	if(info !=null){
		lang = info.lang;
	}
%>

<script>
	var defaultTitle="报表";
	var noSupport="不被支持的模板格式!";
	var defaultResultDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.query_result",lang),"utf-8")%>');
	
	var curAndTotalNumDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.curAndTotalNumDesc",lang),"utf-8")%>');
	var curAndTotalPageDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.curAndTotalPageDesc",lang),"utf-8")%>');
	var exportDesc = decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.exportDesc",lang),"utf-8")%>');
	var exportAllDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.exportAllDesc",lang),"utf-8")%>');
	var firstPage=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.firstPage",lang),"utf-8")%>');
	var prePage=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.prePage",lang),"utf-8")%>');
	var nextPage=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.nextPage",lang),"utf-8")%>');
	var endPage=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.endPage",lang),"utf-8")%>');
	var toPage = decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.topage",lang),"utf-8")%>');
	var noResult=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.noResult",lang),"utf-8")%>');
	var firstPageDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.firstPageDesc",lang),"utf-8")%>');
	var lastPageDesc=decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.lastPageDesc",lang),"utf-8")%>');
	
	var cannelExport="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.cannelExport",lang)%>";
	var exportSuccess="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.exportSuccess",lang)%>";
	var exportFail="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.exportFail",lang)%>";
	var startExport="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.startExport",lang)%>";
	
	var dataDisposing="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.dataDisposing",lang)%>";
	var dataExportSuccess="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.dataExportSuccess",lang)%>";
	var dataExportFail="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.dataExportFail",lang)%>";
	var dataExporting="<%=IflowI18n.getSingleInstance().formatInfo("web_query_template.dataExporting",lang)%>";

	
	var pageError = decodeURIComponent('<%=Constant.encode(IflowI18n.getSingleInstance().formatInfo("global.pageError",lang),"utf-8")%>');

	var dataQuerying="正在查询数据，请稍等......";
	var dataQuerySuccess="数据查询成功";
	var dataQueryFail="数据查询失败";
	
</script>

<script src="<%=Constant.VIRTUAL_NAME%>/js/prototype.js"></script>
<script src="<%=Constant.VIRTUAL_NAME%>/js/xmlhttp.js"></script>
<script src="<%=Constant.VIRTUAL_NAME%>/js/excelExport.js"></script>
<script src="<%=Constant.VIRTUAL_NAME%>/js/template/webquery/_query_template.js"></script>

