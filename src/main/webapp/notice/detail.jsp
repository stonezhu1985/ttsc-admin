<%@ page contentType="text/html;charset=gb2312"%>
<%@ page import="java.util.*" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="com.fleety.base.StrFilter"%>
<%@ page import="com.fleety.GlobalPara" %>
<%@ page import="com.fleety.action.login.UserInfo"%>
<%@ page import="com.fleety.action.template.TemplateColInfo"%>
<%@ page import="com.fleety.action.template.TemplateContainerServer"%>
<%@page import="com.fleety.action.template.addupdatedelete.AddUpdateDeleteTemplate"%>
<%@ page import="com.fleety.server.i18n.AnaI18n"%>
<%@page import="java.net.URLDecoder"%>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="<%=GlobalPara.VIRTUAL_NAME %>/module/js/easyui/themes/default/easyui.css"/>
		<link rel="stylesheet" type="text/css" href="<%=GlobalPara.VIRTUAL_NAME %>/module/js/easyui/themes/icon.css"/>
		<link rel="stylesheet" type="text/css" href="<%=GlobalPara.VIRTUAL_NAME%>/template/add_update_delete_first/local.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript"	src="<%=GlobalPara.VIRTUAL_NAME %>/module/js/easyui/jquery.min.js"></script>
		<script type="text/javascript"	src="<%=GlobalPara.VIRTUAL_NAME %>/module/js/easyui/jquery.easyui.min.js"></script>
		
		<script src="<%=GlobalPara.VIRTUAL_NAME%>/js/DatePicker/WdatePicker.js"></script>
		<script src="<%=GlobalPara.VIRTUAL_NAME%>/js/check_standard.js"></script>
		<script type="text/javascript" src="<%=GlobalPara.VIRTUAL_NAME%>/module/js/FCKeditor/fckeditor.js"></script>
		
		<script>
		var _virtualName = "<%=GlobalPara.VIRTUAL_NAME%>";
		$(function(){
				window.queryInfo();
		});
		
		window.queryInfo = function(){
			var url=_virtualName+"/company_desc_common.go?optype=query";
			
			$.ajax(
				{async:true,type:"post",url:url,dataType:"json",
					success:setContent
			});
		};
			
		function saveInfo(){
			var content = FCKeditorAPI.GetInstance("content").GetXHTML("true"); 
			var url=_virtualName+"/company_desc_common.go?optype=save";

			if (content == "" || content == "<br type=\"_moz\" />" || content == "<br />"){
				alert("请输入企业简介！");
				return;
			}
			var para = "&content="+encodeURIComponent(content);
			$.ajax(
				{async:true,type:"post",url:url,dataType:"json",
				 data:para,
				 success:setResult
			});
		};
		
		function setResult(data){
			alert(data.result);
		}
		
		function setContent(data){
			var oEditor =FCKeditorAPI.GetInstance("content");   
		    if(oEditor.EditorDocument!=null){      
		        oEditor.EditorDocument.body.innerHTML = data.content;   
		    }
		}
		
		</script>
	</head>
	<body style="padding-top:10px;margin-bottom:5px;text-align:center" >
		<div class="bg_linear-gradient box_searchCondition_item" align="center">
			<div style="font-size:16px;text-align:center;height:35px;line-height:35px;color:#3766a1;font-weight:bold;">企业简介</div>
			<textarea style="width:90%" id="content"  name="content"></textarea>
		</div>
		<div align="center">
			<a id="saveSubmit" class="button" type="button" href="javascript:void(0)" onClick="saveInfo()" > 保 存 </a>
		</div>
	</body>
	
	<script type="text/javascript">
		var oFCKeditor = new FCKeditor('content') ;
		oFCKeditor.BasePath = '<%=GlobalPara.VIRTUAL_NAME%>/module/js/FCKeditor/' ;
		oFCKeditor.ToolbarSet = 'Define' ;
		oFCKeditor.Width = '900px' ;
		oFCKeditor.Height = '360px' ;
		oFCKeditor.ReplaceTextarea();
	</script>
</html>

