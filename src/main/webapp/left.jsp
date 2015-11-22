<%@ page language="java"%>
<%@ page contentType="text/html; charset=GBK"%>

<html>
<%
String path = request.getContextPath();
%>
	<head>
		<title>CRM客户关系管理系统</title>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk">

		<style type="text/css">
<!--
@import url("css/common.css");

body {
	background-image: url();
	text-align:center;
}

.style2 {
	font-size: 9pt;
	line-height: normal;
	font-weight: normal;
	text-decoration: none;
	font-family: "宋体";
}
-->
</style>
<script language=JavaScript1.2>
   scores = new Array(20);
   var numTotal=0;
   var lastEl="";
   NS4 = (document.layers) ? 1 : 0;
   IE4 = (document.all) ? 1 : 0;
   ver4 = (NS4 || IE4) ? 1 : 0;
   if (ver4) {    
      with (document) {        
	    write("<STYLE TYPE='text/css'>");
		    if (NS4) {  
			    write(".parent {position:absolute; visibility:visible}");
				write(".child {position:absolute; visibility:visible}");            
				write(".regular {position:absolute; visibility:visible}")        
			} else { 
			    write(".child {display:none}")        
			} 
			write("</STYLE>");    
	  }
   }

	function initIt(){    
        divColl = document.getElementsByTagName("div");        
		for (i=0; i<divColl.length; i++) {           
			var whichEl = divColl[i];          
		    if (whichEl.className == "child") 
				whichEl.style.display = "none";  
		}     
	}
	function expandIt(el) {
		var whichEl1 = eval(el + "Child");   
		if (whichEl1.style.display == "none") {            
	 		whichEl1.style.display = "block"; 
		 	document.getElementById(el + "Img").src="images/-.gif"       
	  	} else {           
	     	whichEl1.style.display = "none";  
		 	document.getElementById(el + "Img").src="images/+.gif"        
	  	}
	  	if(lastEl !="" && lastEl !=el){
	  		whichEl2 = eval(lastEl + "Child");        
	  		if (whichEl2.style.display == "block") {                       
	     		whichEl2.style.display = "none";  
		 		document.getElementById(lastEl + "Img").src="images/+.gif"        
	  		}
	  	}
	 	lastEl = el;
	}
  </SCRIPT>
	</head>
	<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="initIt();">
		<table width="160px" height="285px" border="0" align="center" cellpadding="0" cellspacing="0" id="_01">
			<tr>
				<td background="images/dh1.gif">
					<table width="157px" height="32px" border="0" cellpadding="0"
						cellspacing="0">
						<tr>
							<td>
								<img src="images/dh.gif" width="157" height="32">
							</td>
						</tr>
					</table>

					<table width="157px" border=0 cellpadding="0" class="normal" cellspacing="0" borderColor=blue>
						<tr>
							<td width="156" align=left valign="top">
								<div class=parent id=KB1Parent>
									<table width="142px" height="26px" border="0" align="center" cellpadding="0" cellspacing="0" background="images/shop6.gif">
										<tr>
											<td width="36px" height="21px">
												<div align="center">
													<A onClick="expandIt('KB1'); return false" style="cursor:pointer"><IMG
															id="KB1Img" src="images/+.gif" width="19xp" height="20px"
															border=0>
													</A>
												</div>
											</td>
											<td width="125px" onClick="expandIt('KB1'); return false" style="cursor:pointer">
												信息审核管理
											</td>
										</tr>
									</table>
								</div>
								<div class=child id=KB1Child>
									<div style="margin-left: 20px;" align="left" valign="top">
										<table width="142px" border="0" align="center" cellpadding="0" cellspacing="4" valign="top">
											
											<tr>
												<td width="14">
													<div align="center"></div>
												</td>
												<td width="135" valign="top" nowrap>
													<A target=_target><IMG src="images/jiao.gif"
															width="9" height="9" border=0> </A><span valign="top">
														<a href="<%=path%>/userShopBind.jsp" target="right">商家店铺绑定审核</a>
													</span>
												</td>
											</tr>
											<tr>
												<td width="14">
													<div align="center"></div>
												</td>
												<td width="135" valign="top" nowrap>
													<A target=_target><IMG src="images/jiao.gif"
															width="9" height="9" border=0> </A><span valign="top">
														<a href="<%=path%>/thirdAccountBind.jsp" target="right">任务账号绑定审核</a>
													</span>
												</td>
											</tr>
											<tr>
												<td width="14">
													<div align="center"></div>
												</td>
												<td width="135" valign="top" nowrap>
													<A target=_target><IMG src="images/jiao.gif"
															width="9" height="9" border=0> </A><span valign="top">
														<a href="<%=path%>/buyerInfoValid.jsp" target="right">买手信息审核</a>
													</span>
												</td>
											</tr>
										</table>
									</div>
								</div>
							</td>
						</tr>
					</table>
					<table width="157" border=0 cellpadding="0" class="normal" cellspacing="0" borderColor=blue>
						<tr>
							<td width="156" height="400" align=left valign="top">
								<div class=parent id=KB8Parent>
									<table width="142" height="26" border="0" align="center" cellpadding="0" cellspacing="0" background="images/shop6.gif">
										<tr>
											<td width="36" height="21">
												<div align="center">
													<A onClick="expandIt('KB8'); return false" style="cursor:pointer"><IMG
															id="KB8Img" src="images/+.gif" width="19" height="20" border=0>
													</A>
												</div>
											</td>
											<td width="125" onClick="expandIt('KB8'); return false" style="cursor:pointer">
												公告发布管理
											</td>
										</tr>
									</table>
								</div>
								<div class=child id=KB8Child>
									<div style="margin-left: 20px;" align="left" valign="top">
										<table width="142" border="0" align="center" cellpadding="0" cellspacing="4" valign="top">
											<tr>
												<td width="14">
													<div align="center"></div>
												</td>
												<td width="135" valign="top" nowrap>
													<A target=_target><IMG src="images/jiao.gif" width="9" height="9" border=0> </A>
													<span valign="top">
														<a href="<%=path%>/notice/notice.jsp" target="right">公告发布管理</a>
													</span>
												</td>
											</tr>

										</table>
									</div>
								</div>

							</td>
						</tr>
					</table>
					<table width="157px" height="1000" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td height="1000">
								&nbsp;
							</td>
						</tr>
					</table>
					<table width="157px" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<img src="images/dh2.gif" width="157px" height="19px">
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
