<%@ page contentType="text/html;charset=gb2312"%>
<%@include file="/js/template/webquery/include.jsp"%>
<script src="_query_template_2.js"></script>

<body style="margin-bottom:5px;" >
<div id="_conCom" _title="��ѯ����" action="_qt2.getQueryString" onload="_qt2.onload"> 
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
	<input type="button" value="��ѯ" onclick="_qt.queryAction();">
</div>


<div id="_advConCom" _title="�߼���ѯ����">		
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">	
	<input type="text" value="1000">		
</div>

<table id="_resultTable" _title="��ѯ���" style="background-color:#CCCCCC" cellspacing="1" cellpadding="0" border="0" style="width:100%">
	<tr style="background-color:green;color:white;" extra="">
		<td attr="index">���</td>
		<td attr="id">mdtId</td>
		<td attr="desc">���ƺ���</td>
	</tr>
	<tbody id="dataContainer" style="cursor:hand;" selectedAction="_qt2.destSelected">
					
	</tbody>
</table>

<div id="_pageCom" style="display:block"></div>
</body>