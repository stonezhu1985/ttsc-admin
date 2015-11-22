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
    	var curBindId= 0;
    	function queryData(){
    		var userId = document.getElementById('userId');
    		var platId = document.getElementById('platId');
    		var status = document.getElementById('status');
    		var startDate = document.getElementById('startDate');
    		var endDate = document.getElementById('endDate');
    		
    		$.ajax({
	                type: "POST",
	                url: vir+'/userShopBind/queryBindingInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'userId': userId.value,'platId': platId.value,'status': status.value,'startTime': startDate.value,'endTime': endDate.value},
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
                            field: 'id', width: '8%', title: '生财ID', align: "center"
                        },
                        {
                            field: 'telephone', width: '8%', title: '账号', align: "center"
                        },
                        {
                            field: 'platId', width: '10%', title: '平台类型', align: "center",
                             formatter: function (value, row, index) {
                                return value == "1" ? "淘宝/天猫" : "京东";
                            }
                        },
                        {
                            field: 'shopName', width: '9%', title: '店铺名称', align: "center"
                        },
                        {
                            field: 'validCode', width: '9%', title: '校验码', align: "center"
                        },
                        {
                            field: 'linkUrl', width: '37%', title: '校验商品地址', align: "center"
                        },
                        {
                            field: 'checkMessage', hidden:'true'
                        },
                        {
                            field: 'createTime', width: '9%', title: '申请日期', align: "center"
                        },
                        {
                            field: 'status', width: '9%', title: '审核状态', align: "center",
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
                    	curBindId = rowData['id'];
                    	$('#d_id').text(rowData['id']);
                    	$('#d_telephone').text(rowData['telephone']);
                    	$('#d_platId').text(rowData['platId'] == "1" ? "淘宝/天猫" : "京东");
                    	$('#d_shopName').text(rowData['shopName']);
                    	$('#d_validCode').text(rowData['validCode']);
                    	$('#d_createTime').text(rowData['createTime']);
                    	$('#d_linkUrl').text(rowData['linkUrl']);
                    	document.getElementById('checkMessage').value=rowData['checkMessage'];
                    	if(rowData['status'] !=0){
                    		$('#checkMessage').attr("disabled",true);
                    		$('#buttonDiv').hide();
                    	}else{
                    		$('#checkMessage').attr("disabled",false);
                    		$('#buttonDiv').show();
                    	}
                    	
                    	$('#dlg').dialog('open');
					}
                }).datagrid('hideColumn', 'checkMessage').datagrid('getPager').pagination({
				beforePageText: '第',//页数文本框前显示的汉字
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 0 条记录'});
                
                
			 $('#dlg').dialog({
		            title: '商户店铺绑定审核',
		            iconCls:"icon-edit",
		            collapsible: false,
		            minimizable: false,
		            maximizable: false,
		            resizable: false,
		            width: 600,
		            height: 300,
		            modal: true
		        }).dialog('close'); 
			 
			$(window).resize(function () {
	            $('#dg').datagrid('resize', {
	                height: $(window).height() - 102
	            });
			 });
		  });
		
			function bindcheckYes(){
				var message = document.getElementById('checkMessage').value;
				$.ajax({
	                type: "POST",
	                url: vir+'/userShopBind/checkBindingInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': curBindId,'status': '1','checkMessage': message},
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
	                url: vir+'/userShopBind/checkBindingInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': curBindId,'status': '2','checkMessage': message},
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
			
			function dgClose(){
				$('#dlg').dialog('close');
			};

    	</script>
  	</head>
  
	<body style="overflow-x:hidden; overflow-y:auto">
    	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="ffffff">
    		<tr>
				<td width="100%" height="33px" background="<%=path%>/images/td01.gif">
					<span class="td1">&nbsp;当前位置&gt;&gt;&gt;信息审核管理&gt;&gt;&gt;商家店铺绑定审核</span>
				</td>
			</tr>
    		<tr>
    			<td>
    				<table class="DataTable">
						<tr>
							<td class="Label" style="width:150px">生财ID</td>
							<td><input type="text" id="userId" name="userId" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">平台类型</td>
							<td>
								<select id="platId" name="platId" style="width:150px">
									<option value="">请选择</option>
									<option value="1">淘宝/天猫</option>
									<option value="2">京东</option>
								</select>
							</td>
							<td class="Label" style="width:150px">审核状态</td>
							<td>
								<select id="status" name="status" style="width:150px">
									<option value="">请选择</option>
									<option value="0">未审核</option>
									<option value="1">已通过</option>
									<option value="2">已驳回</option>
								</select>
							</td>
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
							<td colspan="10" align="center" height="40px">
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
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">生 财 ID:</td>
					<td style="width:120px;font-size:9pt;"><div id="d_id"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">商户账号:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_telephone"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">申请日期:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_createTime"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">平台类型:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_platId"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">店铺名称:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_shopName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">校 验 码:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_validCode"></div></td>
        			
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">校验地址:</td>
        			<td colspan="5" style="font-size:9pt;"><div id="d_linkUrl"></div></td>
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
  	</body>
</html>
