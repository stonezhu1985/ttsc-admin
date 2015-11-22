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
	                    alert("��ѯʧ��!");
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
				beforePageText: '��',//ҳ���ı���ǰ��ʾ�ĺ���
                afterPageText: 'ҳ    �� {pages} ҳ',
                displayMsg: '��ǰ��ʾ {from} - {to} ����¼   �� {total} ����¼',
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
                            field: 'id', width: '8%', title: '����ID', align: "center"
                        },
                        {
                            field: 'telephone', width: '8%', title: '�˺�', align: "center"
                        },
                        {
                            field: 'platId', width: '10%', title: 'ƽ̨����', align: "center",
                             formatter: function (value, row, index) {
                                return value == "1" ? "�Ա�/��è" : "����";
                            }
                        },
                        {
                            field: 'shopName', width: '9%', title: '��������', align: "center"
                        },
                        {
                            field: 'validCode', width: '9%', title: 'У����', align: "center"
                        },
                        {
                            field: 'linkUrl', width: '37%', title: 'У����Ʒ��ַ', align: "center"
                        },
                        {
                            field: 'checkMessage', hidden:'true'
                        },
                        {
                            field: 'createTime', width: '9%', title: '��������', align: "center"
                        },
                        {
                            field: 'status', width: '9%', title: '���״̬', align: "center",
                             formatter: function (value, row, index) {
                             	var status = "";
                             	if(value == '0'){
                             		status = "δ���";
                             	}else if(value == '1'){
                             		status = "��ͨ��";
                             	}else{
                             		status = "�Ѳ���";
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
                    loadMsg: '���ݼ����У����Ե�<b> . . . </b>',
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
                    	$('#d_platId').text(rowData['platId'] == "1" ? "�Ա�/��è" : "����");
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
				beforePageText: '��',//ҳ���ı���ǰ��ʾ�ĺ���
                afterPageText: 'ҳ    �� {pages} ҳ',
                displayMsg: '��ǰ��ʾ {from} - {to} ����¼   �� 0 ����¼'});
                
                
			 $('#dlg').dialog({
		            title: '�̻����̰����',
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
	                    alert("���ʧ��!");
	                }
	            });
			};
			
			function bindcheckNo(){
				var message = document.getElementById('checkMessage').value;
				if( message == ''){
					alert("�����벵��ԭ��!");
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
	                    alert("����ʧ��!");
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
					<span class="td1">&nbsp;��ǰλ��&gt;&gt;&gt;��Ϣ��˹���&gt;&gt;&gt;�̼ҵ��̰����</span>
				</td>
			</tr>
    		<tr>
    			<td>
    				<table class="DataTable">
						<tr>
							<td class="Label" style="width:150px">����ID</td>
							<td><input type="text" id="userId" name="userId" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">ƽ̨����</td>
							<td>
								<select id="platId" name="platId" style="width:150px">
									<option value="">��ѡ��</option>
									<option value="1">�Ա�/��è</option>
									<option value="2">����</option>
								</select>
							</td>
							<td class="Label" style="width:150px">���״̬</td>
							<td>
								<select id="status" name="status" style="width:150px">
									<option value="">��ѡ��</option>
									<option value="0">δ���</option>
									<option value="1">��ͨ��</option>
									<option value="2">�Ѳ���</option>
								</select>
							</td>
							<td class="Label" style="width:150px">��ʼ����</td>
							<td>
								<input type="text" name="startDate" id="startDate"
										value="<%=start %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
							<td class="Label" style="width:150px">��������</td>
							<td>
								<input type="text" name="endDate" id="endDate"
										value="<%=end %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
						</tr>
						
						<tr>
							<td colspan="10" align="center" height="40px">
								<img src="<%=path%>/images/query.jpg" alt="��ѯ" style="cursor:pointer" border="0" onClick="queryData()">
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
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�� �� ID:</td>
					<td style="width:120px;font-size:9pt;"><div id="d_id"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�̻��˺�:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_telephone"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��������:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_createTime"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">ƽ̨����:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_platId"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��������:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_shopName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">У �� ��:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_validCode"></div></td>
        			
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		</tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">У���ַ:</td>
        			<td colspan="5" style="font-size:9pt;"><div id="d_linkUrl"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="6"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		</tr>
        		<tr>
        			<td colspan="6" style="width:80px;font-size:9pt;font-weight:bold;" align="left">&nbsp;&nbsp;&nbsp;������:</td>
        		</tr>
        		<tr>
        			<td colspan="6" style="font-size:9pt;" align="center"><textarea id="checkMessage" style="width:550px;height:60px"></textarea></td>
        		</tr>        		
        		<tr style="height:35px">
        			<td colspan="6" style="font-size:9pt;" align="center">
        				<div id="buttonDiv">
						<input type="button" value=" �� �� " style="cursor:pointer" onClick="bindcheckNo()" >&nbsp;&nbsp;
						<input type="button" value=" ͨ �� " style="cursor:pointer" onClick="bindcheckYes()" >&nbsp;&nbsp;
						<input type="button" value=" ȡ �� " style="cursor:pointer" onClick="dgClose()" >
						</div>
					</td>
        		</tr>
        	</table>
    	</div>
  	</body>
</html>
