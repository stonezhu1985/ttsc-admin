<%@ page contentType="text/html;charset=gb2312"%>
<%@include file="/js/template/webquery/include.jsp"%>
<script src="_query_template_2.js"></script>

<body style="margin-bottom:5px;" >
<div id="_conCom" _title="查询条件" action="_qt2.getQueryString" onload="_qt2.onload"> 
	<input type="text" value="1000">
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="button" value="查询" onclick="_qt.queryAction();">
</div>


<div id="_advConCom" _title="高级查询条件">		
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">		
</div>

<table id="_resultTable" _title="查询结果" style="background-color:#CCCCCC" cellspacing="1" cellpadding="0" border="0" style="width:100%">
	<tr style="background-color:green;color:white;" extra="">
		<td attr="index">序号</td>
		<td attr="id">mdtId</td>
		<td attr="desc">车牌号码</td>
	</tr>
	<tbody id="dataContainer" style="cursor:hand;" selectedAction="_qt2.destSelected">
					
	</tbody>
</table>

<div id="_pageCom" style="display:block"></div>
</body>