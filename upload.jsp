<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>データ導入</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
	<efw:Client/>
	<script>

			function initUpload(){
				Efw('initupload');
			}

			function importData(){

				var rd = $("input[name='opt_type']:checked").val();

				Efw('uploadfile',{data:'liststock', liststock: rd});

			}

  	</script>
    <style>
      .upfile {
          border-top: 2px;
          border-right: 2px;
          border-left: 2px;
          border-bottom: 2px;
          border-style: solid;

      }
    </style>
</head>
<body style="background-color:ghostwhite;" onload="initUpload();">

<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="goBackToMenu()">
</div>
<br/>
<table class="upfile" id="mastertable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			商品マスタ情報
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_master" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導出" disabled="disabled" onclick="Efw('master/outputmaster')">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('master/importmaster')">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="producttable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			出品、在庫、注文インポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<span style="font-weight: bold;">出品詳細レポート</span><input type="file" id="importfile_product" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<!--<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'product',liststock:''})">-->
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<span style="font-weight: bold;">FBA在庫レポート</span><input type="file" id="importfile_fba" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<!--<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'fba',liststock:''})">-->
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<span style="font-weight: bold;">全注文レポート</span><input type="file" id="importfile_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('uploadfile',{data:'pfo'})">
		</td>
	</tr>
</table>
<!--
<br/>
<table class="upfile" id="fbatable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			FBA在庫レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_fba" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'fba',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="ordertable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			全注文レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'order',liststock:''})">
		</td>
	</tr>
</table>

<br/>
<table class="upfile" id="localstocktable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			在庫情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_localstock" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'localstock'})">
		</td>
	</tr>
</table>
-->
<br/>
<table class="upfile" id="earningstable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			売上詳細情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_earnings" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'earnings'})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="costtable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			コスト情報
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_cost" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導出" disabled="disabled" onclick="Efw('cost/outputcost')">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('cost/importcost')">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="shiptable_amazon">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			Amazon発送情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_ship_amazon" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('uploadfile',{data:'ship_amazon'})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="shiptable_qoo10">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			Qoo10発送情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 120px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			商品情報<br>
			<input type="file" id="importfile_ship_qoo10_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('uploadfile',{data:'ship_qoo10_order'})">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			発送情報<br>
			<input type="file" id="importfile_ship_qoo10_ship" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" disabled="disabled" onclick="Efw('uploadfile',{data:'ship_qoo10_ship'})">
		</td>
	</tr>
</table>
<br/>
</body>
</html>