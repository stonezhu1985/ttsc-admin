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
    	function queryData(){
    		var userId = document.getElementById('userId');
    		var realName = document.getElementById('realName');
    		var telephone = document.getElementById('telephone');
    		var passPostNum = document.getElementById('passPostNum');
    		var status = document.getElementById('status');
    		var startDate = document.getElementById('startDate');
    		var endDate = document.getElementById('endDate');
    		
    		$.ajax({
	                type: "POST",
	                url: vir+'/buyerCheck/queryUnCheckInfoList?num=' + Math.random(),
	                dataType: "json",
	                data: {'userId': userId.value,'realName': realName.value,'telephone': telephone.value,'passPostNum': passPostNum.value,'status': status.value,'startTime': startDate.value,'endTime': endDate.value},
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
					height: $(window).height()-147,
                    singleSelect: true,
                    rownumbers: true,
                    columns: [[
                        {
                            field: 'id', width: '8%', title: '����ID', align: "center"
                        },
                        {
                            field: 'name', width: '8%', title: '�ǳ�', align: "center"
                        },
                        {
                            field: 'realName', width: '10%', title: '�û�����', align: "center"
                        },
                        {
                            field: 'sex', width: '18%', title: '�Ա�', align: "center",
                             formatter: function (value, row, index) {
                                return value == "0" ? "��" : "Ů";
                            }
                        },
                        {
                            field: 'telephone', width: '9%', title: '�ֻ�����', align: "center"
                        },
                        {
                            field: 'passPostNum', width: '12%', title: '���֤��', align: "center"
                        },
                        {
                            field: 'qq', width: '11%', title: 'QQ����', align: "center"
                        },
                        {
                            field: 'weixin', width: '11%', title: '΢�ź�', align: "center"
                        },
                        {
                            field: 'createTime', width: '12%', title: '��������', align: "center"
                        },
                        {
                            field: 'checkMessage', hidden:'true'
                        },
                        {
                            field: 'status', width: '10%', title: '���״̬', align: "center",
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
                    	getBuyer(rowData['id']);
					}
                }).datagrid('hideColumn', 'checkMessage').datagrid('getPager').pagination({
				beforePageText: '��',//ҳ���ı���ǰ��ʾ�ĺ���
                afterPageText: 'ҳ    �� {pages} ҳ',
                displayMsg: '��ǰ��ʾ {from} - {to} ����¼   �� 0 ����¼'});
                
                
			 $('#dlg').dialog({
		            title: '������Ϣ���',
		            iconCls:"icon-edit",
		            collapsible: false,
		            minimizable: false,
		            maximizable: false,
		            resizable: false,
		            width: 800,
		            height: 560,
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
	                url: vir+'/buyerCheck/checkInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': $('#d_id').text(),'status': '1','checkMessage': message},
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
	                url: vir+'/buyerCheck/checkInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'id': $('#d_id').text(),'status': '2','checkMessage': message},
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
			
			function getBuyer(userId){
				$.ajax({
	                type: "POST",
	                url: vir+'/buyerCheck/getBuyerInfo?num=' + Math.random(),
	                dataType: "json",
	                data: {'userId': userId},
	                success: function (data) {
	                	if(data.code == "0"){
	                		var rowData = data.singleResult;
	                    	$('#d_id').text(rowData.id);
	                    	$('#d_userName').text(rowData.realName);
	                    	$('#d_sex').text(rowData.sex== "0" ? "��" : "Ů");
	                    	$('#d_passPortNo').text(rowData.passPostNum);
	                    	$('#d_telephone').text(rowData.telephone);
	                    	$('#d_qq').text(rowData.qq);
	                    	$('#d_weixin').text(rowData.weixin);
	                    	var bankType = "";
	                    	if(rowData.bankType =='0'){
	                    		bankType="֧����";
	                    	}else if(rowData.bankType =='1'){
	                    		bankType="�Ƹ�ͨ";
	                    	}else{
	                    		bankType="���п�";
	                    	}
	                    	$('#d_bank_type').text(bankType);
	                    	$('#d_bank_account').text(rowData.account);
	                    	$('#d_city').text(rowData.bankCity);
	                    	$('#d_bankName').text(rowData.bankName);
	                    	$('#d_openAccount').text(rowData.openAccount);
	                    	var passportImg = document.getElementById('passportImg');
	                    	if(rowData.passPortPhoto != ""){
								passportImg.src = rowData.passPortPhoto+"?num=" + Math.random();
								$("#passportImg").bind("click",function(){         
								   $('#imgdlg').dialog('open');
								   $("#imgShow").attr("src",rowData.passPortPhoto+"?num=" + Math.random()); 
								});
	                    	}else{
	                    		passportImg.src = "<%=path%>/images/wupicture.jpg";
	                    		$('#passportImg').unbind("click"); 
	                    	}
	                    	
	                    	var handImg = document.getElementById('handImg');
	                    	if(rowData.handPassPortPhoto != ""){
								handImg.src = rowData.handPassPortPhoto+"?num=" + Math.random();
								$("#handImg").bind("click",function(){         
								   $('#imgdlg').dialog('open');
								   $("#imgShow").attr("src",rowData.handPassPortPhoto+"?num=" + Math.random()); 
								});
	                    	}else{
	                    		handImg.src = "<%=path%>/images/wupicture.jpg";
	                    		$('#handImg').unbind("click"); 
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
	                    alert("��ѯʧ��!");
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
					<span class="td1">&nbsp;��ǰλ��&gt;&gt;&gt;��Ϣ��˹���&gt;&gt;&gt;������Ϣ���</span>
				</td>
			</tr>
    		<tr>
    			<td>
    				<table class="DataTable">
						<tr>
							<td class="Label" style="width:150px">����ID</td>
							<td><input type="text" id="userId" name="userId" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">�û�����</td>
							<td><input type="text" id="realName" name="realName" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">��ʼ����</td>
							<td>
								<input type="text" name="startDate" id="startDate"
										value="<%=start %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
						</tr>
						
						<tr>
							<td class="Label" style="width:150px">�ֻ�����</td>
							<td><input type="text" id="telephone" name="telephone" style="width:180px" value=""></td>
							<td class="Label" style="width:150px">���֤��</td>
							<td><input type="text" id="passPostNum" name="passPostNum" style="width:180px" value=""></td>
							
							<td class="Label" style="width:150px">��������</td>
							<td>
								<input type="text" name="endDate" id="endDate"
										value="<%=end %>" class="Wdate" readonly
										onclick="WdatePicker({isShowClear:false,dateFmt:'yyyy-MM-dd'})"
										style="width:100px;" />
							</td>
						</tr>
						<tr>
							<td class="Label" style="width:150px">���״̬</td>
							<td colspan="5">
								<select id="status" name="status" style="width:180px">
									<option value="">��ѡ��</option>
									<option value="0">δ���</option>
									<option value="1">��ͨ��</option>
									<option value="2">�Ѳ���</option>
								</select> 
							</td>
						</tr>
						
						<tr>
							<td colspan="6" align="center" height="40px">
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
        		<tr style="height:5px">
        			<td colspan="8" style="width:80px;font-size:12pt;font-weight:bold;" align="left">&nbsp;������Ϣ</td>
        		<tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		<tr>
				<tr>
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�� �� ID:</td>
					<td style="width:120px;font-size:9pt;"><div id="d_id"></div></td>
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�û�����:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_userName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��    ��:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_sex"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">΢�ź���:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_weixin"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		<tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">���֤��:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_passPortNo"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�ֻ�����:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_telephone"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">QQ����:</td>
        			<td style="width:120px;font-size:9pt;" colspan="3"><div id="d_qq"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		<tr>
        		<tr>
        			<td colspan="4" align="center" style="font-size:9pt;">
						<img id="passportImg" style="width:150px;height:90px;" align="middle" border=1 src="<%=path%>/images/wupicture.jpg" /><br>����
					</td>
   					<td colspan="4" align="center" style="font-size:9pt;">
						<img id="handImg" style="width:150px;height:90px;" align="middle" border=1 src="<%=path%>/images/wupicture.jpg" /><br>�ֳ����֤��
					</td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		<tr>
        		<tr style="height:5px">
        			<td colspan="8" style="width:80px;font-size:12pt;font-weight:bold;" align="left">&nbsp;���п���Ϣ</td>
        		<tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		<tr>
        		<tr>
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">�˺�����:</td>
					<td style="width:120px;font-size:9pt;"><div id="d_bank_type"></div></td>
					<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��    ��:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_bank_account"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��������:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_bankName"></div></td>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">���ڳ���:</td>
        			<td style="width:120px;font-size:9pt;"><div id="d_city"></div></td>
        		</tr>
        		<tr style="height:5px">
        			<td colspan="8"><hr style=" width:95%;height:1px;border:none;border-top:1px dotted #185598;" /></td>
        		<tr>
        		<tr>
        			<td style="width:80px;font-size:9pt;font-weight:bold;" align="right">��������:</td>
        			<td style="width:120px;font-size:9pt;" colspan="7"><div id="d_openAccount"></div></td>
        		</tr>
				<tr style="height:5px">
        			<td colspan="8"><hr style="width:98%;height:1px;border:none;border-top:1px solid #555555;" /></td>
        		<tr>
        		<tr>
        			<td colspan="8" style="width:80px;font-size:9pt;font-weight:bold;" align="left">&nbsp;&nbsp;&nbsp;������:</td>
        		<tr>
        		<tr>
        			<td colspan="8" style="font-size:9pt;" align="center"><textarea id="checkMessage" style="width:550px;height:60px"></textarea></td>
        		<tr>        		
        		<tr style="height:35px">
        			
        			<td colspan="8" style="font-size:9pt;" align="center">
        				<div id="buttonDiv">
						<input type="button" value=" �� �� " style="cursor:pointer" onClick="bindcheckNo()" >&nbsp;&nbsp;
						<input type="button" value=" ͨ �� " style="cursor:pointer" onClick="bindcheckYes()" >&nbsp;&nbsp;
						<input type="button" value=" ȡ �� " style="cursor:pointer" onClick="dgClose()" >
						</div>
					</td>
					
        		<tr>
        	</table>
    	</div>
    	<div id="imgdlg" style="overflow: hidden;">
    		<img id="imgShow" style="width:600px;height:450px;" align="middle" border="0"  onClick="imgdgClose()"/>
    	</div>
  	</body>
</html>
