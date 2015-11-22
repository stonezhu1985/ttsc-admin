<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="com.ttsc.data.util.Constant" %>
<%
	String path = request.getContextPath();

	if (request.getSession().getAttribute(Constant.USER_LOGIN_INFO) == null) {
		response.sendRedirect("index.jsp");
	}
%>
<html>
	<head>
		<style type="text/css">
			body {
				margin-left: 0px;
				margin-top: 0px;
				margin-right: 0px;
				margin-bottom: 0px;
				text-align: center;
				background-color: #78B1E8;
				SCROLLBAR-FACE-COLOR: #eeeeee;
				SCROLLBAR-HIGHLIGHT-COLOR: #ffffff;
				SCROLLBAR-SHADOW-COLOR: #ffffff;
				SCROLLBAR-3DLIGHT-COLOR: #999999;
				SCROLLBAR-ARROW-COLOR: #ffffff;
				SCROLLBAR-TRACK-COLOR: #eeeeee;
				SCROLLBAR-DARKSHADOW-COLOR: #999999
				overflow-x:hidden;
				overflow-y:hidden;
			}
			div{
				margin-left: 0px;
				margin-top: 0px;
				margin-right: 0px;
				margin-bottom: 0px;
				width:100%;
				height:100%;
				text-align: center;
			}
			table{
				margin-left: 0px;
				margin-top: 0px;
				margin-right: 0px;
				margin-bottom: 0px;
				text-align: center;
			}
			
			.navPoint {
				COLOR: white;
				CURSOR: hand;
				FONT-FAMILY: Webdings;
				FONT-SIZE: 9pt
			}
		</style>
		<script>
		function switchSysBar(){
			if (switchPoint.innerText==3){
				switchPoint.innerText=4
				document.all("frmTitle").style.display="none"
			}
			else{
				switchPoint.innerText=3
				document.all("frmTitle").style.display=""
			}
		}
		var chaHeight; 
		var tempHeight=0;
		function getwah() 
		{ 
		if(document.documentElement && document.documentElement.clientHeight) 
		{
			chaHeight = document.documentElement.clientHeight;
		} 
		else if(document.body) 
		{
			chaHeight = document.body.clientHeight;
		} 
			document.getElementById("middleTable").style.height = parseInt(chaHeight)-95;
		} 
		</script>
		<title>天天生财后台管理系统</title>
	</head>
	<body bgcolor="#FFFFFF" onload="getwah()" onresize="getwah()">
	<center>
	<div>
		<table align="center" width="100%" height="90px" border="0" cellspacing="0">
			<tr>
				<td>
					<iframe style="z-index:-1" name="top" align="right" marginWidth=0
						marginHeight=0 src="<%=path%>/top.jsp" frameBorder=0
						width="100%" scrolling=no height="90px"></iframe>
				</td>
			</tr>
		</table>
		<table id="middleTable" style="width:100%;height:500px" border="0" cellspacing="0">
			<tr>
				<td style="width:160px;height:100%" align="center" valign="middle" noWrap id="frmTitle">
					<iframe frameBorder="0" scrolling="no" id="left" name="left"
						src="<%=path%>/left.jsp"
						style="height:100%; visibility:inherit;width:160px;z-index:1">
					</iframe>
				</td>
				<td bgColor=#99ccff style="width:10px;height:100%">
					<table border="0" cellPadding="0" cellSpacing="0" height="100%">
						<tr>
							<td style="width:100%;height:100%" onclick="switchSysBar()">
								<span class="navPoint" id="switchPoint" title="关闭/打开左栏">3</span>
							</td>
						</tr>
					</table>
				</td>
				<td style="width:*">
					<iframe frameBorder="0" scrolling="auto" id="right" name="right"
						src="<%=path%>/right.jsp"
						style="height:100%; visibility:inherit;width:100%;z-index:1">
					</iframe>
				</td>
			</tr>
		</table>
		
		<table width="100%" height="50px" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="100%">
					<iframe name=bottom align=right marginWidth=0 marginHeight=0
						src="<%=path%>/bottom.jsp" frameBorder=0 width="100%"
						scrolling=no height="50px"></iframe>
				</td>
			</tr>
		</table>
		 
		</div>
		</center>
	</body>
</html>
