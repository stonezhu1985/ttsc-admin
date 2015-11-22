<%@ page language="java" import="java.util.*,java.text.*" pageEncoding="GBK"%>
<%@ page import="com.ttsc.data.util.Constant" %>
<%
String path = request.getContextPath();
DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
Calendar calendar = Calendar.getInstance();
String end = df.format(calendar.getTime());
calendar.add(Calendar.DAY_OF_MONTH,-7);
String start = df.format(calendar.getTime());

df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String now = df.format(Calendar.getInstance().getTime());

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  	<head>
    	<title></title>
    	<link rel="stylesheet" type="text/css" href="<%=Constant.vir%>/css/crm.css"></link>
    	<link rel="stylesheet" type="text/css" href="<%=Constant.vir%>/themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="<%=Constant.vir%>/themes/icon.css">
		<script src="<%=Constant.vir%>/js/jquery.js"></script>
		<script type="text/javascript" src="<%=Constant.vir%>/js/jquery.easyui.min.js"></script>
    	<script src="<%=Constant.vir%>/js/DatePicker/WdatePicker.js"></script>
    	<script type="text/javascript" src="<%=Constant.vir%>/js/FCKeditor/fckeditor.js"></script>
    	<script type="text/javascript">
    	var vir = "<%=Constant.vir%>";
    	var curId= "";
    	function queryData(){
    		var title = document.getElementById('title');
    		var startDate = document.getElementById('startDate');
    		var endDate = document.getElementById('endDate');
    		
    		$.ajax({
	                type: "POST",
	                url: vir+'/notice/queryList?num=' + Math.random(),
	                dataType: "json",
	                data: {'title': title.value,'startDate': startDate.value,'endDate': endDate.value},
	                success: function (data) {
	                	if(data.code == "0"){
	                		$('#dg').datagrid('loadData', data.singleResult);	
	                    }else{
	                    	alert(data.message);
	                    }
	                },
	                error: function () {
	                    alert("查询失败!");
	                }
	            });
    	}
		
		function pagerFilter(data){
			if (typeof data.length == 'number' && typeof data.splice == 'function'){	
				data = {
					total: data.length,
					rows: data
				}
			}
			var dg = $(this);
			var opts = dg.datagrid('options');
			var pager = dg.datagrid('getPager');
			pager.pagination({
				beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
				onSelectPage:function(pageNum, pageSize){
					opts.pageNumber = pageNum;
					opts.pageSize = pageSize;
					pager.pagination('refresh',{
						pageNumber:pageNum,
						pageSize:pageSize
					});
					dg.datagrid('loadData',data);
				}
			});
			if (!data.originalRows){
				data.originalRows = (data.rows);
			}
			var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
			var end = start + parseInt(opts.pageSize);
			data.rows = (data.originalRows.slice(start, end));
			return data;
		}
		
		$(function(){
			$('#dg').datagrid({loadFilter:pagerFilter}).datagrid({
					width:'100%',
					height: $(window).height() - 102,
                    singleSelect: true,
                    rownumbers: true,
                    columns: [[
                        {
                            field: 'id', width: '6%', title: '公告ID', align: "center"
                        },
                        {
                            field: 'title', width: '81%', title: '公告标题', align: "center"
                        },
                        {
                            field: 'noticeTime', width: '12%', title: '发布日期', align: "center"
                        }
                    ]],
                    striped: true,
                    selectOnCheck: true,
                    checkOnSelect: true,
                    remoteSort: true,
                    pageSize: 15,
                    pageNumber: 1,
                    pageList: [15, 30, 50],
                    pagination: true,
                    loadMsg: '数据加载中，请稍等<b> . . . </b>',
                    onCheck: function (index, row) {
                    },
                    onLoadSuccess: function () {
                       
                    },
                    onLoadError: function () {
                    },
                    onClickRow:function(index,rowData){
                    	curId = rowData['id'];
                    },
                    onDblClickRow: function (rowIndex, rowData) {
                    	curId = rowData['id'];
                    	getNotice(rowData['id']);
                    	$('#dlg').dialog('open');
					}
                }).datagrid('getPager').pagination({
				beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 0 条记录'});
                
                
			 $('#dlg').dialog({
		            title: '公告发布',
		            iconCls:"icon-edit",
		            collapsible: false,
		            minimizable: false,
		            maximizable: false,
		            resizable: false,
		            width: 700,
		            height: 500,
		            modal: true
		        }).dialog('close'); 
			 
			$(window).resize(function () {
	            $('#dg').datagrid('resize', {
	                height: $(window).height() - 102
	            });
			 });
		  });
		  
		  function deleteNotice(){
		  	if(curId == ""){
				alert("请选中一行删除");
				return;
			}
			$.ajax({
				type: "POST",
		        url: vir+ '/notice/delete?num=' + Math.random(),
		        dataType: "json",
		        data: {'id':curId},
		        success: function (data) {
					if(data.code == "0"){
		            	$('#dlg').dialog('close');
		                	queryData();
		                }else{
		                	alert(data.message);
		            	}
		           },
					error: function () {
						alert("删除失败!");
					}
			});
		  }
		
			function save(){
				var title = document.getElementById('notice_title').value;
				var content = FCKeditorAPI.GetInstance("content").GetXHTML("true");
				var noticeTime = document.getElementById('notice_time').value;
				
				if(title == ""){
					alert("请输入公告标题!");
					return;
				}
				
				if (content == "" || content == "<br type=\"_moz\" />" || content == "<br />"){
					alert("请输入公告内容！");
					return;
				}

				if(curId != ""){
					$.ajax({
		                type: "POST",
		                url: vir+ '/notice/update?num=' + Math.random(),
		                dataType: "json",
		                data: {'id':curId,'title': title,'content': content,'noticeTime': noticeTime},
		                success: function (data) {
		                	if(data.code == "0"){
		                		$('#dlg').dialog('close');
		                		var oEditor =FCKeditorAPI.GetInstance("content");   
							    if(oEditor.EditorDocument!=null){      
							        oEditor.EditorDocument.body.innerHTML ='';   
							    };
		                		document.getElementById('notice_title').value='';
		                		document.getElementById('notice_time').value='<%=now%>';
		                		queryData();
		                    }else{
		                    	alert(data.message);
		                    }
		                },
		                error: function () {
		                    alert("发布失败!");
		                }
		            });
				}else{
					$.ajax({
		                type: "POST",
		                url: vir+ '/notice/save?num=' + Math.random(),
		                dataType: "json",
		                data: {'title': title,'content': content,'noticeTime': noticeTime},
		                success: function (data) {
		                	if(data.code == "0"){
		                		$('#dlg').dialog('close');
		                		var oEditor =FCKeditorAPI.GetInstance("content");   
							    if(oEditor.EditorDocument!=null){      
							        oEditor.EditorDocument.body.innerHTML ='';   
							    };
		                		document.getElementById('notice_title').value='';
		                		document.getElementById('notice_time').value='<%=now%>';
		                		queryData();
		                    }else{
		                    	alert(data.message);
		                    }
		                },
		                error: function () {
		                    alert("发布失败!");
		                }
		            });
				}	            
	            
			};
			
			function getNotice(id){
				$.ajax({
	                type: "POST",
	                url: vir+'/notice/getNotice?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': id},
	                success: function (data) {
	                	if(data.code == "0"){
	                		var rowData = data.singleResult;
	                    	curId = rowData.id;
	                    	$('#notice_time').val(rowData.noticeTime);
	                    	$('#notice_title').val(rowData.title);
							var oEditor =FCKeditorAPI.GetInstance("content");   
						    if(oEditor.EditorDocument!=null){      
						        oEditor.EditorDocument.body.innerHTML = rowData.content;   
						    }
	                    	$('#dlg').dialog('open');
	                    }else{
	                    	alert(data.message);
	                    }
	                },
	                error: function () {
	                    alert("查询失败!");
	                }
	            });
			}
			
			function createNotice(){
				curId= "";
				var oEditor =FCKeditorAPI.GetInstance("content");   
				if(oEditor.EditorDocument!=null){      
					oEditor.EditorDocument.body.innerHTML ='';   
				};
		        document.getElementById('notice_title').value='';
		        document.getElementById('notice_time').value='<%=now%>';
				$('#dlg').dialog('open');
			}
			
			function dgClose(){
				var oEditor =FCKeditorAPI.GetInstance("content");   
				if(oEditor.EditorDocument!=null){      
					oEditor.EditorDocument.body.innerHTML ='';   
				};
		        document.getElementById('notice_title').value='';
		        document.getElementById('notice_time').value='<%=now%>';
				$('#dlg').dialog('close');
			};

    	</script>
  	</head>
  
	<body style="overflow-x:hidden; overflow-y:auto">
    	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="ffffff">
    		<tr>
				<td width="100%" height="33px" background="<%=path%>/images/td01.gif">
					<span class="td1">&nbsp;当前位置&gt;&gt;&gt;公告管理&gt;&gt;&gt;公告管理</span>
				</td>
			</tr>
    		<tr>
    			<td>
    				<table class="DataTable">
						<tr>
							<td class="Label" style="width:150px">公告标题</td>
							<td><input type="text" id="title" name="title" style="width:250px" value=""></td>
							<td class="Label" style="width:150px">开始日期</td>
							<td>
								<input type="text" name="startDate" id="startDate"
										value="<%=start %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
							<td class="Label" style="width:150px">结束日期</td>
							<td>
								<input type="text" name="endDate" id="endDate"
										value="<%=end %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
						</tr>
						
						<tr>
							<td colspan="6" align="center" height="40px">
								<img src="<%=path%>/images/query.jpg" alt="查询" style="cursor:pointer" border="0" onClick="queryData()">&nbsp;&nbsp;
								<img src="<%=path%>/images/add.jpg" alt="创建" style="cursor:pointer" border="0" onClick="createNotice()">&nbsp;&nbsp;
								<img src="<%=path%>/images/delete.jpg" alt="删除" style="cursor:pointer" border="0" onClick="deleteNotice()">
							</td>
						</tr>
					</table>
    			</td>
    		</tr>
    	</table>
    	<div id="dg">
    	</div>
    	<div id="dlg" style="overflow: hidden;padding-top:5px">
        	<table width="100%" border="0">
				
        		<tr>
        			<td style="font-size:9pt;" align="left">发布时间:<input type="text" name="notice_time" id="notice_time"
										value="<%=now%>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd HH:mm:ss'})"
										style="width:150px;" /></td>
        		</tr>  
        		<tr>
        			<td style="font-size:9pt;" align="left">公告标题:<input type="text" id="notice_title" name="notice_title" style="width:300px" value=""></td>
        		</tr>  
        		<tr>
        			<td style="font-size:9pt;" align="left" valign="top">公告内容:<textarea id="content" name="content"></textarea></td>
        		</tr>        		
        		<tr style="height:35px">
        			<td colspan="6" style="font-size:9pt;" align="center">
        				<div id="buttonDiv">
						<input type="button" value=" 保 存 " style="cursor:pointer" onClick="save()" >&nbsp;&nbsp;
						<input type="button" value=" 取 消 " style="cursor:pointer" onClick="dgClose()" >
						</div>
					</td>
        		</tr>
        	</table>
        	<script type="text/javascript">
				var oFCKeditor = new FCKeditor('content') ;
				oFCKeditor.BasePath = '<%=Constant.vir%>/js/FCKeditor/' ;
				oFCKeditor.ToolbarSet = 'Define' ;
				oFCKeditor.Width = '690px' ;
				oFCKeditor.Height = '350px' ;
				oFCKeditor.ReplaceTextarea();
			</script>
    	</div>
  	</body>
  	
</html>
