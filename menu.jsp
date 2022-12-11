<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Menu</title>
	<efw:Client/>
	<script>
  	</script>
  	   <style>
      .menuHeader {
      	width: 750px;
      	height: 40px;
      	background-color: blue;
      	color: white;
      	font-size: 20px;
      	font-weight: bold;
      }
      .menuHeader2 {
      	width: 1506px;
      	height: 40px;
      	background-color: blue;
      	color: white;
      	font-size: 20px;
      	font-weight: bold;
      }
    </style>
</head>
<body style="background-color:ghostwhite;">
<table style="width:1500px;" border="1">
	<tr>
		<td>
			<div class="menuHeader">メニュー</div>
		</td>
	</tr>
	<tr>
		<td><div style="text-align:center;"><br>
			<input type=button value="発送商品管理" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'shipactingmaster_list.jsp'})">
			<br><br>
			<input type=button value="代行発送管理" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'shipacting_list.jsp'})">
			<br><br>
		</div></td>
	</tr>
</table>

</body>
</html>