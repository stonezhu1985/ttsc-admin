<%@ page language="java" pageEncoding="GBK"%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean"%>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html"%>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic"%>
<%@ taglib uri="/WEB-INF/struts-tiles.tld" prefix="tiles"%>
<%@ page import="com.fleety.GlobalPara" %>
<%@ page import="com.fleety.GlobalPara,java.text.SimpleDateFormat,java.util.Calendar" %>
<%
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	Calendar c1 = Calendar.getInstance();
	String now = sdf.format(c1.getTime());
	c1.add(Calendar.DAY_OF_MONTH,7);
	String end = sdf.format(c1.getTime());
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GBK">
<title>公告管理</title>
<script type="text/javascript" src="<%=GlobalPara.VIRTUAL_NAME%>/module/js/FCKeditor/fckeditor.js"></script>
<script src="<%=GlobalPara.VIRTUAL_NAME%>/js/DatePicker/WdatePicker.js"></script>
<script language="javascript">

</script>
</head>
<body>
<form name='f1' method='post'>

<table width="100%" border=1 align="center" cellpadding="0"
	cellspacing="1" class="edit">
	<tr>
		<th>公告标题：</th>
		<td><input type="text" name="title" style="width:300px;" value=""></td>
	</tr>
	<tr>
		<th>发布日期：</th>
		<td>
			<input type="text" name="statDate" id="startDate" value="<%=now %>" class="Wdate" style="width:100px;" readonly
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,minDate:'<%=now %>',readOnly:true})" />
		</td>
	</tr>
	<tr>
		<th>截止日期：</th>
		<td>
			<input type="text" name="statDate" id="endDate" value="<%=end %>" class="Wdate" style="width:100px;" readonly
										onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false,minDate:'<%=now %>',readOnly:true})" />
		</td>
	</tr>
	<tr>
		<th>公告内容：</th>
		<td>
			<div align="left">
			<textarea id="content" name="content"></textarea>
			<script type="text/javascript">
			var oFCKeditor = new FCKeditor( 'content' ) ;
			oFCKeditor.BasePath = '<%=GlobalPara.VIRTUAL_NAME%>/module/js/FCKeditor/' ;
			oFCKeditor.ToolbarSet = 'Define' ;
			oFCKeditor.Width = '100%' ;
			oFCKeditor.Height = '350px' ;
			oFCKeditor.ReplaceTextarea(); 
			</script>
			</div></td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<input type="button" id="save" name="save" value="保存" style="width:100px;" onclick="" />
		</td>
	</tr>
</table>
</form>
</body>
</html>
