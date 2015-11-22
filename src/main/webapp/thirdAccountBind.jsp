<%@ page language="java" import="java.util.*,java.text.*" pageEncoding="GBK"%>
<%@ page import="com.ttsc.data.util.Constant" %>
<%
String path = request.getContextPath();
DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
Calendar calendar = Calendar.getInstance();
String end = df.format(calendar.getTime());
calendar.add(Calendar.DAY_OF_MONTH,-7);
String start = df.format(calendar.getTime());

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  	<head>
    	<title></title>
    	<link rel="stylesheet" type="text/css" href="css/crm.css"></link>
    	<link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
		<link rel="stylesheet" type="text/css" href="themes/icon.css">
		<script src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
    	<script src="js/DatePicker/WdatePicker.js"></script>
    	<script type="text/javascript">
    	var vir = "<%=Constant.vir%>";
    	var curId = "";
    	function queryData(){
    		var userId = document.getElementById('userId');
    		var realName = document.getElementById('realName');
    		var telephone = document.getElementById('telephone');
    		var platId = document.getElementById('platId');
    		var status = document.getElementById('status');
    		var startDate = document.getElementById('startDate');
    		var endDate = document.getElementById('endDate');
    		
    		$.ajax({
	                type: "POST",
	                url: vir+'/thirdAccount/queryUnCheckInfoList?num=' + Math.random(),
	                dataType: "json",
	                data: {'userId': userId.value,'realName': realName.value,'telephone': telephone.value,'platId': platId.value,'status':status.value,'startTime': startDate.value,'endTime': endDate.value},
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
					 height: $(window).height() - 147,
                    singleSelect: true,
                    rownumbers: true,
                    columns: [[
                    	{
                            field: 'id', hidden:'true'
                        },
                        {
                            field: 'userId', width: '12%', title: '生财ID', align: "center"
                        },
                        {
                            field: 'realName', width: '13%', title: '用户姓名', align: "center"
                        },
                        {
                            field: 'telephone', width: '13%', title: '手机号码', align: "center"
                        },
                        {
                            field: 'account', width: '12%', title: '账号名称', align: "center"
                        },
                        {
                            field: 'partName', width: '12%', title: '平台类型', align: "center"
                        },
                        {
                            field: 'levelName', width: '12%', title: '平台等级', align: "center"
                        },
                        {
                            field: 'createTime', width: '12%', title: '申请日期', align: "center"
                        },
                        {
                            field: 'checkMessage', hidden:'true'
                        },
                        {
                            field: 'status', width: '12%', title: '审核状态', align: "center",
                             formatter: function (value, row, index) {
                             	var status = "";
                             	if(value == '0'){
                             		status = "未审核";
                             	}else if(value == '1'){
                             		status = "已通过";
                             	}else{
                             		status = "已驳回";
                             	}
                                return status;
                            }
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
                    onDblClickRow: function (rowIndex, rowData) {
                    	getThirdAccount(rowData['id']);
					}
                }).datagrid('hideColumn', 'id').datagrid('hideColumn', 'id').datagrid('getPager').pagination({
				beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 0 条记录'});
                
                
			 $('#dlg').dialog({
		            title: '任务账号绑定信息审核',
		            iconCls:"icon-edit",
		            collapsible: false,
		            minimizable: false,
		            maximizable: false,
		            resizable: false,
		            width: 600,
		            height: 470,
		            modal: true
		        }).dialog('close'); 
		        
		    $('#imgdlg').dialog({
		            iconCls:"icon-edit",
		            collapsible: false,
		            minimizable: false,
		            maximizable: false,
		            resizable: false,
		            width: 600,
		            height: 450,
		            modal: true
		    }).dialog('close'); 
			 
			$(window).resize(function () {
	            $('#dg').datagrid('resize', {
	                height: $(window).height() - 147
	            });
			 });
		  });
		
			function bindcheckYes(){
				var message = document.getElementById('checkMessage').value;
				$.ajax({
	                type: "POST",
	                url: vir+'/thirdAccount/checkInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': curId,'status': '1','checkMessage': message},
	                success: function (data) {
	                	if(data.code == "0"){
	                		$('#dlg').dialog('close');
	                		document.getElementById('checkMessage').value='';
	                		queryData();
	                    }else{
	                    	document.getElementById('checkMessage').value='';
	                    	alert(data.message);
	                    }
	                },
	                error: function () {
	                    alert("审核失败!");
	                }
	            });
			};
			
			function bindcheckNo(){
				var message = document.getElementById('checkMessage').value;
				if( message == ''){
					alert("请输入驳回原因!");
					return;
				}
				$.ajax({
	                type: "POST",
	                url: vir+'/thirdAccount/checkInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': curId,'status': '2','checkMessage': message},
	                success: function (data) {
	                	if(data.code == "0"){
	                		document.getElementById('checkMessage').value='';
	                		$('#dlg').dialog('close');
	                		queryData();
	                    }else{
	                    	document.getElementById('checkMessage').value='';
	                    	alert(data.message);
	                    }
	                },
	                error: function () {
	                    alert("驳回失败!");
	                }
	            });
			};
			
			function getThirdAccount(id){
				$.ajax({
	                type: "POST",
	                url: vir+'/thirdAccount/findThirdAccountById?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': id},
	                success: function (data) {
	                	if(data.code == "0"){
	                		var rowData = data.singleResult;
	                		curId = rowData.id;
	                    	$('#d_userId').text(rowData.userId);
	                    	$('#d_realName').text(rowData.realName);
	                    	$('#d_account').text(rowData.account);
	                    	$('#d_city').text(rowData.cityName);
	                    	$('#d_telephone').text(rowData.telephone);
	                    	$('#d_address').text(rowData.address);
	                    	
	                    	$('#d_consigneePerson').text(rowData.consigneePerson);
	                    	$('#d_levelName').text(rowData.levelName);
	                    	$('#d_partName').text(rowData.partName);
	                    	
	                    	var reputationImg = document.getElementById('reputationImg');
	                    	if(rowData.reputationPhoto != ""){
								reputationImg.src = rowData.reputationPhoto+"?num=" + Math.random();
								$("#reputationImg").bind("click",function(){         
								   $('#imgdlg').dialog('open');
								   $("#imgShow").attr("src",rowData.reputationPhoto+"?num=" + Math.random()); 
								});
	                    	}else{
	                    		reputationImg.src = "<%=path%>/images/wupicture.jpg";
	                    		$('#reputationImg').unbind("click"); 
	                    	}
	                    	
	                    	var realNameImg = document.getElementById('realNameImg');
	                    	if(rowData.realNamePhoto != ""){
								realNameImg.src = rowData.realNamePhoto+"?num=" + Math.random();
								$("#realNameImg").bind("click",function(){         
								   $('#imgdlg').dialog('open');
								   $("#imgShow").attr("src",rowData.realNamePhoto+"?num=" + Math.random()); 
								});
	                    	}else{
	                    		realNameImg.src = "<%=path%>/images/wupicture.jpg";
	                    		$('#realNameImg').unbind("click"); 
	                    	}
	                    	
	                    	var otherImg = document.getElementById('otherImg');
	                    	if(rowData.flowersPhoto != ""){
								otherImg.src = rowData.flowersPhoto+"?num=" + Math.random();
								$("#otherImg").bind("click",function(){         
								   $('#imgdlg').dialog('open');
								   $("#imgShow").attr("src",rowData.flowersPhoto+"?num=" + Math.random()); 
								});
	                    	}else{
	                    		otherImg.src = "<%=path%>/images/wupicture.jpg";
	                    		$('#otherImg').unbind("click"); 
	                    	}
	                    	
	                    	document.getElementById('checkMessage').value=rowData.checkMessage;
	                    	if(rowData['status'] !=0){
	                    		$('#checkMessage').attr("disabled",true);
	                    		$('#buttonDiv').hide();
	                    	}else{
	                    		$('#checkMessage').attr("disabled",false);
	                    		$('#buttonDiv').show();
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
			
			function dgClose(){
				$('#dlg').dialog('close');
			};
			
			function imgdgClose(){
				$('#imgdlg').dialog('close');
				$("#imgShow").attr("src",""); 
			};

    	</script>
  	</head>
  
	<body style="overflow-x:hidden; overflow-y:auto">
    	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="ffffff">
    		<tr>
				<td width="100%" height="33px" background="<%=path%>/images/td01.gif">
					<span class="td1">&nbsp;当前位置&gt;&gt;&gt;信息审核管理&gt;&gt;&gt;任务账号绑定信息审核</span>
				</td>
			</tr>
    		<tr>
    			<td>
    				<table class="DataTable">
						<tr>
							<td class="Label" style="width:150px">生财ID</td>
							<td><input type="text" id="userId" name="userId" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">用户姓名</td>
							<td><input type="text" id="realName" name="realName" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">开始日期</td>
							<td>
								<input type="text" name="startDate" id="startDate"
										value="<%=start %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
						</tr>
						
						<tr>
							<td class="Label" style="width:150px">手机号码</td>
							<td><input type="text" id="telephone" name="telephone" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">平台类型</td>
							<td>
								<select id="platId" name="platId" style="width:180px">
									<option value="">请选择</option>
									<option value="1">淘宝/天猫</option>
									<option value="2">京东</option>
								</select>
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
							<td class="Label" style="width:180px">审核状态</td>
							<td colspan="5">
								<select id="status" name="status" style="width:180px">
									<option value="">请选择</option>
									<option value="0">未审核</option>
									<option value="1">已通过</option>
									<option value="2">已驳回</option>
								</select> 
							</td>
						</tr>
						<tr>
							<td colspan="8" align="center" height="40px">
								<img src="<%=path%>/images/query.jpg" alt="查询" style="cursor:pointer" border="0" onClick="queryData()">
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
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">用 户 ID:</td>
					<td style="width:120px;font-size:9pt;"><div id="d_userId"></div></td>
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">用户姓名:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_realName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">城   市:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_city"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">账号名称:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_account"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">平台类型:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_partName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">平台等级:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_levelName"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">收 货 人:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_consigneePerson"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">收货人手机:</td>
        			<td style="width:120px;font-size:9pt;" colspan="3"><div id="d_telephone"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">详细地址:</td>
        			<td style="width:120px;font-size:9pt;" colspan="5"><div id="d_address"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td colspan="2" align="center" style="font-size:9pt;">
						<img id="reputationImg" style="width:150px;height:90px;" align="middle" border=1 src="<%=path%>/images/wupicture.jpg" /><br>信誉等级
					</td>
   					<td colspan="2" align="center" style="font-size:9pt;">
						<img id="realNameImg" style="width:150px;height:90px;" align="middle" border=1 src="<%=path%>/images/wupicture.jpg" /><br>实名认证
					</td>
					<td colspan="2" align="center" style="font-size:9pt;">
						<img id="otherImg" style="width:150px;height:90px;" align="middle" border=1 src="<%=path%>/images/wupicture.jpg" /><br>花呗认证
					</td>
        		</tr>
				<tr style="height:5px">
        			<td colspan="6"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		</tr>
        		<tr>
        			<td colspan="6" style="width:80px;font-size:9pt;font-weight:bold;" align="left">&nbsp;&nbsp;&nbsp;审核意见:</td>
        		</tr>
        		<tr>
        			<td colspan="6" style="font-size:9pt;" align="center"><textarea id="checkMessage" style="width:550px;height:60px"></textarea></td>
        		</tr>        		
        		<tr style="height:35px">
        			<td colspan="6" style="font-size:9pt;" align="center">
        				<div id="buttonDiv">
						<input type="button" value=" 驳 回 " style="cursor:pointer" onClick="bindcheckNo()" >&nbsp;&nbsp;
						<input type="button" value=" 通 过 " style="cursor:pointer" onClick="bindcheckYes()" >&nbsp;&nbsp;
						<input type="button" value=" 取 消 " style="cursor:pointer" onClick="dgClose()" >
						</div>
					</td>
        		</tr>
        	</table>
    	</div>
    	<div id="imgdlg" style="overflow: hidden;">
    		<img id="imgShow" style="width:600px;height:450px;" align="middle" border="0"  onClick="imgdgClose()"/>
    	</div>
  	</body>
</html>
