<%@page import="com.fleety.base.MD5"%>
<%@page import="server.db.DbServer"%>
<%
	response.setHeader("Content-Type","text/xml;charset=utf-8");
	response.setHeader("Cache-Control","no-cache");
	response.setHeader("Expire","0");
	out.print("<?xml version=\"1.0\"?>");
%>
<%@ page language="java" pageEncoding="GBK"%>
<%@ page import="java.util.*" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.sql.*"%>

<%
			
		   Class.forName(DbServer.getSingleInstance().getStringPara(DbServer.DRIVER_FLAG));
		   Connection conn = DriverManager.getConnection(DbServer.getSingleInstance().getStringPara(DbServer.DB_URL_FLAG),DbServer.getSingleInstance().getStringPara(DbServer.DB_USER_FLAG),DbServer.getSingleInstance().getStringPara(DbServer.DB_PWD_FLAG));
		   
		   Statement stmt1=conn.createStatement();
 			String sql1=" select distinct * from (select * from test3 union all select * from test4) "; 			
		   System.out.println(sql1);
	
		   ResultSet rs=stmt1.executeQuery(sql1);
		   HashMap map=new HashMap();
		   while(rs.next()){
			   System.out.println(rs.getString("test3")+"          "+rs.getString("taxi_company_id"));
			   map.put(rs.getString("test3"),rs.getString("taxi_company_id"));
		   }
		 	
		   int maxId=1000;
		   String userAccount="";
		   Iterator itr=map.keySet().iterator();
		   
		   StringBuffer sql=null;
		   
		   while(itr.hasNext()){
			   sql=new StringBuffer();
			   maxId=maxId+1;
			   userAccount=itr.next().toString();			   
			   sql.append(" insert into operator ");
				sql.append(" (");
				sql.append(" user_id,account,user_name,password,");
				sql.append(" com_id,address,phone,ygc,remark,");
				sql.append(" valid_beg,valid_end,");
				sql.append(" mdt_ctrcmd_acnt,mdt_ctrcmd_pwd,grant_right,role_id,user_type,customer");
				sql.append(" ) values (");
				sql.append( maxId+",");
				sql.append( "'"+userAccount+"',");
				sql.append( "'"+userAccount+"',");
				sql.append( "'"+MD5.getHexDigest(userAccount)+"',");
				sql.append( map.get(userAccount)+",");
				sql.append( "'',");
				sql.append( "'',");
				sql.append( 0+",");
				sql.append( "'ÆóÒµÕÊºÅ',");
				sql.append("to_date('2010-08-01 00:00:00','yyyy-mm-dd hh24:mi:ss'),");
				sql.append("to_date('2020-08-01 00:00:00','yyyy-mm-dd hh24:mi:ss'),");
				sql.append( "'',");
				sql.append( "'',");
				sql.append("1,");
				sql.append("1,");
				sql.append("1,");
				sql.append("0");
				sql.append(")");
				System.out.println(sql.toString());
				//stmt1.execute(sql.toString());
		   }
		   
		   
		   for(int i=1001;i<1132;i++){
			   sql=new StringBuffer();
			   sql.append(" insert into user_role_bind (role_id,user_id) values (21,"+i+")");
			   stmt1.execute(sql.toString());
		   }
		   
		   
		   
		   
%>