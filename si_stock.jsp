<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>在庫情報</title>
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

            var page = "在庫情報一覧";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);
		 
		});

        function changeColor(){

			$("#stocktable").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var html = tdArr.eq(2).html();
			    if(html == "子商品"){
			    	//alert($(this));
			    	for(var i=3;i < tdArr.length;i ++){
			    		tdArr.eq(i).css({"background": "rgb(255,255,205)"});
			    	}
			    	
			    }
			     
			});

        }
  	</script>
    <style>
      .productlist {

      }
    </style>
</head>
<body style="background-color:ghostwhite;" onload1="searchMaster();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
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
			<input type="button" id="searchproduct" style="width: 200px;height: 40px;font-size: 20px;" value="検索" onclick="Efw('searchstock')">
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
</table>
<hr>
<div id="stocklist" style="height: 650px; width:1900px; overflow:scroll;border-style: solid;border-width: 1px;display: none;">
<table border="1" style="width: 2500px;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL >
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
	</COLGROUP>
	<tr>
		<td>選択</td>
		<td>商品管理番号</td>
		<td>商品種別</td>
		<td>SKU番号</td>
		<td>ASIN番号</td>
		<td>ラベル番号</td>
		<td>商品名称</td>
		<td>販売数量<br/>（昨日）</td>
		<td>販売数量<br/>（直近7日間）</td>
		<td>販売数量<br/>（直近30日間）</td>
		<td>販売数量<br/>（直近90日間）</td>
		<td>FBM在庫</td>
		<td>FBA在庫</td>
		<td>販売可能期間<br/>(7)</td>
		<td>販売可能期間<br/>(30)</td>
		<td>販売可能期間<br/>(90)</td>
	</tr>
</table>
<table border="1" id="stocktable" style="width: 2500px;font-size: 14px;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL >
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
	</COLGROUP>
	<tr>
		<td>選択</td>
		<td>商品管理番号</td>
		<td>商品種別</td>
		<td>SKU番号</td>
		<td>ASIN番号</td>
		<td>ラベル番号</td>
		<td>商品名称</td>
		<td>販売数量（昨日）</td>
		<td>販売数量（直近7日間）</td>
		<td>販売数量（直近30日間）</td>
		<td>販売数量（直近90日間）</td>
		<td>FBM在庫</td>
		<td>FBA在庫</td>
		<td>販売可能期間(7)</td>
		<td>販売可能期間(30)</td>
		<td>販売可能期間(90)</td>
	</tr>
</table>
</div>


</body>
</html>