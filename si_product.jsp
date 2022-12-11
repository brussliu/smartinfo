<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>商品情報</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
	<efw:Client/>
	<script>

		function searchMaster(){
			Efw('searchmaster');
		}

  	</script>

</head>
<body style="background-color:ghostwhite;" onload1="searchMaster();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="goBackToMenu()">
</div>
<input type="hidden" id="shop">
<br/>
<table class="productlist" border="0" style="width: 100%;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL >
		<COL WIDTH="220PX">
	</COLGROUP>
	<tr>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="7">
			検索条件
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchproduct" style="width: 200px;height: 40px;font-size: 20px;" value="検索" onclick="Efw('searchproduct')">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品分類
		</td>
		<td style="font-size: 16px;" colspan="5">
			<input type="checkbox" name="productdiv">&nbsp;レインコート
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;傘
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;靴下（夏用）
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;靴下（秋冬用）
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品番号
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="productdiv">
				<option id=""></option>
				<option id="W001">W001</option>	
				<option id="W002">W002</option>
				<option id="W003">W003</option>
				<option id="W004">W004</option>
			</select>
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			色
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="productdiv">
				<option id=""></option>
				<option id="花柄">花柄</option>
			</select>
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			サイズ
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="productdiv">
				<option id=""></option>
				<option id="S">S</option>
			</select>
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品名称
		</td>
		<td style="font-size: 16px;" colspan="5">
			<input type="text" id="productname" style="width: 600px;height: 32px;">
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			発送方式
		</td>
		<td style="font-size: 16px;" colspan="3">
			<input type="checkbox" name="productdiv">&nbsp;FBA
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;FBM
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			価格
		</td>
		<td style="font-size: 16px;" colspan="1">
			<input type="text" id="price" style="width: 100px;height: 32px;">
			&nbsp;～&nbsp;
			<input type="text" id="price" style="width: 100px;height: 32px;">
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			出品タイプ
		</td>
		<td style="font-size: 16px;" colspan="3">
			<input type="checkbox" name="productdiv">&nbsp;自出品
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;並行出品
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			検索対象
		</td>
		<td style="font-size: 16px;" colspan="1">
			<input type="checkbox" name="productdiv">&nbsp;親商品
			<input type="checkbox" name="productdiv" style="margin-left: 30px;">&nbsp;子商品
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
</table>
<hr>
<table class="productlist" border="0" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="30PX">
		<COL >
	</COLGROUP>
	<tr>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="7">
			表示項目
		</td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="2">
			表示順
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;商品番号
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;色
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;サイズ
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;在庫数量
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;価格
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;SKU番号
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;ASIN番号
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;ラベル番号
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;商品種別
		</td>
		<td style="font-size: 16px;">
			<input type="checkbox" name="productdiv">&nbsp;出品種別
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
		<td style="font-size: 16px;">
		</td>
	</tr>
</table>
<hr>
<div id="productlist" style="height: 370px;overflow-y:scroll; overflow-x:scroll;border-style: solid;border-width: 1px;display: none;">
<table border="1" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="100PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL >
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
	<tr>
		<td rowspan="2">商品管理番号</td>
		<td rowspan="2">SKU番号</td>
		<td rowspan="2">ASIN番号</td>
		<td rowspan="2">ラベル番号</td>
		<td rowspan="2">商品名称</td>
		<td colspan="3">在庫数量</td>
		<td rowspan="2">価格</td>
		<td rowspan="2">商品種別</td>
		<td rowspan="2">出品タイプ</td>
	</tr>
	<tr>
		<td>LOCAL</td>
		<td>FBM</td>
		<td>FBA</td>
	</tr>
</table>
<table border="1" id="producttable" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="100PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL >
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
	<tr>
		<td>P001</td>
		<td>SKU番号</td>
		<td>ASIN番号</td>
		<td>ラベル番号</td>
		<td>商品名称</td>
		<td>在庫数量1</td>
		<td>在庫数量2</td>
		<td>在庫数量3</td>
		<td>価格</td>
		<td>商品種別</td>
		<td>出品タイプ</td>
	</tr>
</table>
</div>


</body>
</html>