<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>販売情報</title>
	<efw:Client/>
	<script>

		(function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
        })(jQuery);


        $(function(){

            var shop = $.getUrlParam('shop');

            var page = "販売情報一覧";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);
		 
		});

		function searchMaster(){
			Efw('searchmaster');
		}

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;" onload1="searchMaster();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<input type="hidden" id="shop">
<br/>
<table class="productlist" border="1" style="width: 100%;">
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
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;">
			比較先
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
		<td style="font-size: 20px;font-weight: bold;height: 50px;">
			比較元
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
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchproduct" style="width: 200px;height: 40px;font-size: 20px;" value="検索" onclick="Efw('searchproduct')">
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