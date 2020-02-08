<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>データ導入（Smart-Bear）</title>
	<efw:Client/>
	<script>

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
<body style="background-color:ghostwhite;">

<div style="font-size: 30px;color: blue;display: inline-block;width: 100%">
	データ導入（Smart-Bear）
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<br/>
<table class="upfile">
	<tr>
		<td style="width: 200px;font-size: 20px;font-weight: bold;">
			出品詳細レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 180px;font-size: 16px;">
			2020/12/12 12:12:12
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;">
			9999件
		</td>
	</tr>
	<tr>
		<td colspan="3">
			<input type="file" id="importfile_product" style="width: 400px;height: 30px;">
		</td>
		<td colspan="2" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'product'})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile">
	<tr>
		<td style="width: 200px;font-size: 20px;font-weight: bold;">
			FBA在庫レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 180px;font-size: 16px;">
			2020/12/12 12:12:12
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;">
			9999件
		</td>
	</tr>
	<tr>
		<td colspan="3">
			<input type="file" id="importfile_fba" style="width: 400px;height: 30px;">
		</td>
		<td colspan="2" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'fba'})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile">
	<tr>
		<td style="width: 200px;font-size: 20px;font-weight: bold;">
			全注文レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 180px;font-size: 16px;">
			2020/12/12 12:12:12
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;">
			9999件
		</td>
	</tr>
	<tr>
		<td colspan="3">
			<input type="file" id="importfile_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="2" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'order'})">
		</td>
	</tr>
</table>
</body>
</html>