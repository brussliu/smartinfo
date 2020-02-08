<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Smart-Infoメニュー</title>
	<efw:Client/>
	<script>
  	</script>
</head>
<body style="background-color:ghostwhite;">
<table style="width:60%" border="0">
	<tr>
		<td>
			<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle" style="width:500px">Smart-Bear(新店)メニュー</div>
		</td>
		<td>
			<div class="ui-helper-reset ui-widget-header ui-corner-all mytitle" style="width:500px">Smart-KM(旧店)メニュー</div>
		</td>
	</tr>
	<tr>
		<td>
			<div style="text-align:center"><br>
				<input type=button value="データ導入" style="width:300px;height: 30px;" onclick="Efw('menu_goto',{page:'si_upload.jsp'})"><br><br>
				<input type=button value="マスタ情報" style="width:300px;height: 30px;" onclick="Efw('menu_goto',{page:'si_master.jsp'})"><br><br>
				<input type=button value="商品情報" style="width:300px;height: 30px;" onclick="Efw('menu_goto',{page:'si_product.jsp'})"><br><br>
				<input type=button value="注文情報" style="width:300px;height: 30px;" onclick="Efw('menu_goto',{page:'si_order.jsp'})"><br><br>
				<input type=button value="在庫情報" style="width:300px;height: 30px;" onclick="Efw('menu_goto',{page:'si_stock.jsp'})"><br><br>
			</div>
		</td>
		<td>
			<div style="text-align:center"><br><br>
				<!--
				<input type=button value="健康診断閲覧" style="width:300px" onclick="Efw('menu_goto',{page:'mdclexam.jsp'})"><br><br>
				<input type=button value="Hello World" style="width:300px" onclick="Efw('menu_goto',{page:'helloworld.jsp'})"><br><br>
				<input type=button value="各種サンプル" style="width:300px" onclick="Efw('menu_goto',{page:'sample.jsp'})"><br><br>
				<input type=button value="elFinderタグ" style="width:300px" onclick="Efw('menu_goto',{page:'elfinder.jsp'})"><br><br>
				<input type=button value="Signatureタグ" style="width:300px" onclick="Efw('menu_goto',{page:'signature.jsp'})"><br><br>
				<input type=button value="CKEditorタグ" style="width:300px" onclick="Efw('menu_goto',{page:'ckeditor.jsp'})"><br><br>
				<input type=button value="Chartタグ" style="width:300px" onclick="Efw('menu_goto',{page:'chart.jsp'})"><br><br>
				<input type=button value="統計情報" style="width:300px" onclick="Efw('menu_goto',{page:'statistics.jsp'})"><br><br>
				-->
			</div>
		</td>
	</tr>
</table>

</body>
</html>