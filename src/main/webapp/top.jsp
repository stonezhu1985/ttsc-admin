<%@ page language="java" pageEncoding="GBK"%>

<html>
	<%
		String path = request.getContextPath();
	%>
	<head>
		<title>天天生财后台管理系统</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">
		<style type="text/css">
<
style type  ="text /css"><!--.style1 {
	color: #78B2F2
}
;
-->
</style>
		<script language="javascript">
function logout(){
	var temp=confirm("确认要退出系统吗?");
	if(temp){
		window.top.location.href="<%=path%>/account/loginout";
	}
}
function bodyLoad(){
	      var dateTime=new Date();
	      var hh=dateTime.getHours();         
	      var mm=dateTime.getMinutes();		  
	      var ss=dateTime.getSeconds();          		  
	      var yy=dateTime.getFullYear();		  
	      var MM=dateTime.getMonth()+1;  //因为1月这个方法返回为0，所以加1		  
	      var dd=dateTime.getDate();		  
	      var week=dateTime.getDay();
	      var days=[ "日 ", "一 ", "二 ", "三 ", "四 ", "五 ", "六 "]; 		  
	      document.getElementById("dateTime").innerHTML="&nbsp;当前时间: "+yy+"年"+MM+"月"+dd+"日&nbsp;"+hh+"时"+mm+"分"+ss+"秒&nbsp;&nbsp;星期"+days[week] ;		  	  
	      setTimeout(bodyLoad,1000);	
}
</script>

		<link href="images/common.css" rel="stylesheet" type="text/css">
	</head>
	<body bgcolor="#FFFFFF" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="bodyLoad()">
		<table width="100%" height="85px" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" id="7">
			<tr>
				<td height="60px" align="left" valign="middle" bgcolor="3379C6">
					<div align="left" style="color:#FFFFFF; font-size:30pt;font-family:楷体">天天生财后台管理系统</div>
				</td>
			</tr>
			<tr>
				<td height="25px" bgcolor="3379C6">
					<table width="100%" height="25px" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="left">
								<div id="dateTime" align="left" style="color:#FFFFFF; font-size:10pt"></div>
							</td>
							<td align="center">
								<div align="center" style="color:#FFFFFF; font-size:10pt"></div>
							</td>
							<td nowrap="nowrap" align="center">
								<a style="cursor:pointer; color: #FFFFFF; font-size:10pt" onclick="logout();">退出系统</a>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>