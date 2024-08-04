<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Smart-Infoメニュー</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
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
			<div class="menuHeader">&nbsp;Smart-Bear(新店)メニュー</div>
		</td>
		<td>
			<div class="menuHeader">&nbsp;代発送メニュー</div>
		</td>
	</tr>
	<tr>
		<td><div style="text-align:center"><br>
			<input type=button value="データ導入" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'upload.jsp'})">
			<br><br>
			<!--
			<input type=button value="商品情報" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'si_product.jsp'})">
			<br><br>
			<input type=button value="注文情報" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'si_order.jsp'})">
			<br><br>
			-->
			<input type=button value="在庫情報" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('menu_goto',{page:'stock.jsp'})">
			<br><br>
			<!--
			<input type=button value="在庫情報" style="width:400px;height: 40px;" onclick="Efw('outputstock',{shop:'Smart-Bear'})">
			<br><br>
			-->
			<input type=button value="仕入管理" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('menu_goto',{page:'purchase.jsp'})">
			<br><br>
			<input type=button value="納品管理" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('menu_goto',{page:'delivery.jsp'})">
			<br><br>
			<input type=button value="販売情報" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('menu_goto',{page:'si_sellinfo.jsp'})">
			<br><br>
			<input type=button value="売上情報" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'earnings.jsp'})">
			<br><br>
		</div></td>
		<td><div style="text-align:center;"><br>
			<input type=button value="発送商品管理" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'shipactingmaster_list.jsp'})">
			<br><br>
			<input type=button value="代行発送管理" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'shipacting_list.jsp'})">
			<br><br>
		</div></td>
	</tr>
</table>
<table style="width:1506px;" border="1">
	<tr>
		<td>
			<div class="menuHeader2">&nbsp;共通メニュー</div>
		</td>
	</tr>
	<tr>
		<td><div style="text-align:center"><br>
			<input type=button value="発送管理" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('menu_goto',{page:'si_ship.jsp'})">
			<br><br>
			<input type=button value="商品スキャン" style="width:400px;height: 40px;" onclick="Efw('menu_goto',{page:'scan.jsp'})">
			<br><br>
			<input type=button value="ラベル番号印刷用データ出力" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('outputlabeldata')">
			<br><br>
			<input type=button value="マスタ修復" style="width:400px;height: 40px;" disabled="disabled" onclick="Efw('master/repairmaster')">
			<br><br>
			<input type="text" id="delno" style="width: 190px;height: 32px;">
			<input type=button value="仕入削除" style="width:100px;height: 40px;" disabled="disabled" onclick="Efw('purchase/delpurchase')">
			<input type=button value="納品削除" style="width:100px;height: 40px;" disabled="disabled" onclick="Efw('delivery/deldelivery')">
			<br><br>
		</div></td>
	</tr>
</table>

</body>
</html>