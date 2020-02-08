<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>マスタ情報（Smart-Bear）</title>
	<efw:Client/>
	<script>
		function searchMaster(){
			Efw('searchmaster');
		}

  	</script>
    <style>
      .productlist {

      }
    </style>
</head>
<body style="background-color:ghostwhite;" onload="searchMaster();">
<efw:Part path="si_master_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;">
	親子商品情報一覧（Smart-Bear）
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<br/>
<input type="button" id="addmaster" style="width: 170px;height: 30px;" value="親商品登録" onclick="Efw('addmaster')">
<br/><br/>
<table class="productlist" border="1" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL>
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
	</COLGROUP>
	<tr>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			商品管理番号
		</td>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			商品分類
		</td>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			親商品SKU番号
		</td>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			親商品ASIN番号
		</td>
		<td style="font-size: 16px;font-weight: bold;">
			親商品名称
		</td>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			子商品SKU番号
		</td>
		<td style="width: 150px;font-size: 16px;font-weight: bold;">
			子商品ASIN番号
		</td>
	</tr>
</table>
<table class="productlist" border="1" id="producttable" style="width: 100%">
</table>
	<COLGROUP>
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL>
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
	</COLGROUP>
</body>
</html>