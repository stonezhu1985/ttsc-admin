<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%@ page import="com.ttsc.data.util.Constant" %>
<%
	String path = request.getContextPath();
	String msg = (String) request.getAttribute("msg");
	String nologin = request.getParameter("nologin");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>天天生财后台管理系统</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
		<script src="<%=path%>/js/jquery.js"></script>
		<script src="<%=path%>/js/md5.js"></script>
		<style type="text/css">
			body {
				font-family:"宋体";
				font-size:9pt;
				font-weight:normal;
				background-color:#78B1E8;
				overflow:hidden;
				margin:auto;
				padding:0;
				marginwidth:0;
				marginheight:0;
			}
			table,tr,td {
				font-family:"宋体";
				font-size:9pt;
				font-weight:normal;
			}
		</style>
		<script type="text/javascript">
			var vir = "<%=Constant.vir%>";
			$(function(){
			
			 $('#bk').height( ($(window).height() - 500)/2);
				$(window).resize(function () {
		            $('#bk').height( ($(window).height() - 500)/2);
				 });
			});
			function getValidCode(){
				//重载验证码
				var timenow = new Date().getTime();
				var validCodeImg = document.getElementById('validCodeImg');
				validCodeImg.src = "<%=path%>/validCode.jsp?d=" + timenow;
			}
			
			function bodyLogin(){
	    		if(window.event.keyCode=='13'){
	    			login();
	    		}
    		}
			
			function login(){
				var userName = document.getElementById('userName');
				var pwd = document.getElementById('pwd');
				var validCode = document.getElementById('validCode');
				if(userName.value==""){
					alert("请输入用户名！");
					userName.focus();
					return;
				}
				
				if(pwd.value==""){
					alert("请输入密码！");
					pwd.focus();
					return;
				}
				
				if(validCode.value==""){
					alert("请输入验证码！");
					validCode.focus();
					return;
				}

				$.ajax({
	                type: "POST",
	                url: vir+'/account/userLogin?num=' + Math.random(),
	                dataType: "json",
	                data: {'account': userName.value,'password': hex_md5(pwd.value),'validCode': validCode.value},
	                success: function (data) {
	                	if(data.code == "0"){
	                    	window.location.href = "<%=path%>/frame.jsp";
	                    }else{
	                    	alert(data.message);
	                    }
	                },
	                error: function () {
	                    alert("登录失败!");
	                }
	            });
    			
			}
			
			function reset(){
				document.getElementById('userName').value="";
				document.getElementById('pwd').value="";
				document.getElementById('validCode').value="";
			}
			
			function checkMsg(){
		     <%if(msg!=null && !"".equals(msg)){%>
		     	alert('<%=msg%>');
		     <%}%>
		     <%if(nologin!=null&&nologin.equals("redo")){%>
		     alert("请重新登录系统!");
		     <%}%>
		  }
		</script>
	</head>
	
	<body onload="checkMsg()">
		<div id="bk"></div>
		<form name="fm" method="post">
			<table width="980px" border="0" cellpadding="0" cellspacing="0" align="center">
				<tr>
					<td colspan="3"><img id="login_01" src="<%=path%>/images/login_01.gif" style="width:980px;height:203px" /></td>
				</tr>
				<tr>
					<td><img id="login_02" src="<%=path%>/images/login_02.gif" width="410px" height="130px" /></td>
					<td background="<%=path%>/images/login_03.gif" width="303px" height="130px" valign="middle" align="center">
						<table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
							<tr>
								<td align="right" height="30px">用&nbsp;户&nbsp;名:</td>
								<td colspan="2"><input type="text" id="userName" name="userName" style="height:20px;width:120px" onkeydown="bodyLogin()" /></td>
							</tr>
							<tr>
								<td align="right" height="30px">密&nbsp;&nbsp;&nbsp;&nbsp;码:</td>
								<td colspan="2"><input type="password" id="pwd" name="pwd" style="height:20px;width:120px" onkeydown="bodyLogin()" /></td>
							</tr>
							<tr>
								<td align="right" width="165px" height="30px">验&nbsp;证&nbsp;码:</td>
								<td valign="middle" width="65px">
									<input type="text" id="validCode" name="validCode" maxlength="4" style="height:20px;width:56px;" onkeydown="bodyLogin()" />
									
								</td>
								<td width="180px"><img id="validCodeImg" style="width:56px;height:16px;cursor:pointer" align="middle" class="bt" onclick="getValidCode();" src="<%=path%>/validCode.jsp" /></td>
							</tr>
							<tr>
								<td colspan="3" align="center" height="40px">
									<img src="<%=path%>/images/login.gif" onclick="login()" style="width:61px;height:23px;cursor:pointer" alt="登录" border="0">&nbsp;&nbsp;
									<img src="<%=path%>/images/reset.gif" onclick="reset()" style="width:61px;height:23px;cursor:pointer" alt="重置" border="0">&nbsp;
								</td>
							</tr>
						</table>
					</td>
					<td><img id="login_04" src="<%=path%>/images/login_04.gif" style="width:267px;height:130px" /></td>
				</tr>
				<tr>
					<td colspan="3">
						<img id="login_05" src="<%=path%>/images/login_05.gif" width="980px" height="167px" />
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>
