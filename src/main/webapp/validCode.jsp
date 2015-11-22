<%@ page autoFlush="false"  import="java.awt.*,java.awt.image.*,com.sun.image.codec.jpeg.*,java.util.*" pageEncoding="GBK"%>

<%
request.setCharacterEncoding("GBK");
response.setCharacterEncoding("GBK");
response.setContentType("text/html; charset=GBK");
%>
<%
		char[] num = { '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
					   'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X','Y', 'Z' };
		Random r = new Random(new Date().getTime());
		String imgcode = "" + num[r.nextInt(30)] + num[r.nextInt(30)]+ num[r.nextInt(30)] + num[r.nextInt(30)];
		session.setAttribute("validCode",String.valueOf(imgcode));
 %>
<%
        out.clear();
        response.setContentType("image/jpeg");
        response.addHeader("pragma","no-cache");
        response.addHeader("Cache-Control","no-cache");
        response.addDateHeader("Expries",0);
        int width=78, height=14;
        BufferedImage image = new BufferedImage(55, 16,BufferedImage.TYPE_INT_BGR);
        Graphics g = image.getGraphics();
        //以下填充背景颜色
        g.setColor(new Color(71, 70, 72));
        g.fillRect(1, 1, width, height);
       //设置字体颜色
        g.setColor(new Color(255, 255, 255));
        Font font=new Font("Arial",Font.ITALIC,18);
        g.setFont(font);
        g.drawString(imgcode,5,14);
        g.dispose();
        ServletOutputStream outStream = response.getOutputStream();
        JPEGImageEncoder encoder =JPEGCodec.createJPEGEncoder(outStream);
        encoder.encode(image);
        outStream.close();
        out.clear();
		out = pageContext.pushBody();
   %>


