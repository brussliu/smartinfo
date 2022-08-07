<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


	<title>在庫情報</title>

	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">

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

			var oyflg = false;
			var oldproductno = "";

			$("#stocktable").find("tr").each(function(){

			    var tdArr = $(this).children();

				// 商品管理番号
				var newproductno = tdArr.eq(2).html();
				// 商品種別
			    var productkinds = tdArr.eq(3).html();

				var flg = false;
				if(newproductno != oldproductno){
					flg = true;
				}
				// 商品管理番号変わる
				if(flg){
					oyflg = false;
				}

			    if(productkinds == "親商品"){

					// チェックボックス非表示
			    	tdArr.eq(0).children().hide();
					// 行の色を変更
					$(this).css({"background": "rgb(153,217,234)"});

					oyflg = true;
			    }

			    if(productkinds == "子商品"){

					// チェックボックス列の色を変更
					if(oyflg){

						tdArr.eq(0).css({"background": "rgb(153,217,234)"});

					}else{

						// 行の色を変更
						$(this).css({"background": "rgb(159,252,253)"});
					}
					
					// 販売中在庫
					var stockonsell = parseFloat(tdArr.eq(14).html());

					if(stockonsell == 0){
						tdArr.eq(10).css({"background": "rgb(255,0,0)"});
						tdArr.eq(11).css({"background": "rgb(255,0,0)"});
					}

			    	// 販売数量（週間平均値）
			    	var num1 = parseFloat(tdArr.eq(18).html());
			    	if(num1 < 0.2){
						//tdArr.eq(17).css({"background": "rgb(255,153,255)"});
			    		//tdArr.eq(18).css({"background": "rgb(255,153,255)"});
			    	}else if(num1 >= 0.2 && num1 < 1){
						tdArr.eq(17).css({"background": "rgb(202,255,202)"});
			    		tdArr.eq(18).css({"background": "rgb(202,255,202)"});
			    	}else if(num1 >= 1 && num1 < 2){
						tdArr.eq(17).css({"background": "rgb(152,255,152)"});
			    		tdArr.eq(18).css({"background": "rgb(152,255,152)"});
			    	}else if(num1 >= 2 && num1 < 5){
						tdArr.eq(17).css({"background": "rgb(102,255,102)"});
			    		tdArr.eq(18).css({"background": "rgb(102,255,102)"});
			    	}else if(num1 >= 5){
						tdArr.eq(17).css({"background": "rgb(52,255,52)"});
			    		tdArr.eq(18).css({"background": "rgb(52,255,52)"});
			    	}	


			    	// 販売中在庫販売可能期間
			    	var num3 = parseFloat(tdArr.eq(19).html());
			    	if(num3 < 10){
			    		tdArr.eq(21).css({"background": "rgb(255,153,255)"});

			    	}else if(num3 >= 10 && num3 < 30){
			    		tdArr.eq(21).css({"background": "rgb(255,204,255)"});

			    	}else{

			    	}

			    }


				oldproductno = newproductno;
			     
			});


        }

        function searchstock(){

        	var productdivArr = new Array();

        	$('#productdiv input:checkbox:checked').each(function (index, item) {
        		productdivArr.push($(this).val());
    		});

			var displayflg2 = "0";
			$('#displayitem input:checkbox:checked').each(function (index, item) {

				if($(this).val() == '商品名称'){
					displayflg2 = "1";
				}

			});


        	Efw('stock/searchstock',{'productdiv': productdivArr, 'displayflg2':displayflg2});
        }

		function updatestock(){

			var alllocalArr = new Array();

			$("#stocktable").find("tr").each(function(){

				var tdArr = $(this).children();

				if(tdArr.eq(0).children().get(0).checked) {

					// SKU番号
					var sku = tdArr.eq(6).html();
					// ASIN番号
					var asin = tdArr.eq(7).html();
					// LOCAL在庫
					var local = tdArr.eq(12).children().val();

					var localArr = new Array();

					localArr.push(sku);
					localArr.push(asin);
					localArr.push(local);

					alllocalArr.push(localArr);

				}
			
			});

			if(alllocalArr.length > 0){
				Efw('stock/updatestock',{'localtoupdate': alllocalArr});
			}
			

		}

        function outputstock(){

        	// var productdivArr = new Array();

        	// $('#productdiv input:checkbox:checked').each(function (index, item) {
        	// 	productdivArr.push($(this).val());
    		// });

			// Efw('outputstock',{'productdiv': productdivArr});

			Efw('stock/outputstock',{shop:'Smart-Bear'})
        }

        function initstock(){
        	Efw('stock/initstock');
        }

		function scrollHead(obj){

			var p = $(obj).get(0).scrollLeft;

			$("#stocklisthead").get(0).scrollLeft = p;

		}

		function showitem(obj){

			var flg2 = false;

			$('#displayitem input:checkbox:checked').each(function (index, item) {

				if($(this).val() == '商品名称'){

					$(".display2").show();
					flg2 = true;

					$("#stocktablehead").width($("#stocktablehead").width() + 1030);
					$("#stocktable").width($("#stocktable").width() + 1030);
				}

			});

			if(flg2 == false){

				$(".display2").hide();

				$("#stocktablehead").width($("#stocktablehead").width() - 1030);
				$("#stocktable").width($("#stocktable").width() - 1030);
			}

		}


  	</script>
</head>
<body style="background-color:ghostwhite;" onload="initstock();">
	<efw:Part path="si_stock_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<input type="hidden" id="shop">
<br/>
<table class="productlist" border="0" style="width: 100%;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="100PX">
		<COL WIDTH="150PX">
		<COL WIDTH="100PX">
		<COL WIDTH="450PX">
		<COL WIDTH="100PX">
		<COL WIDTH="600PX">
		<COL WIDTH="400PX">
	</COLGROUP>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品分類
		</td>
		<td style="font-size: 16px;" id="productdiv" colspan="5">
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="updatestock" style="width: 150px;height: 35px;font-size: 18px;" value="更新" onclick="updatestock()">
			<input type="button" id="searchstock" style="width: 150px;height: 35px;font-size: 18px;" value="検索" onclick="searchstock()">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品番号
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:120px;height:32px;" id="productno">
				<option value=""></option>
				<option value="マスタ未登録">マスタ未登録</option>
			</select>
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			キーワード
		</td>
		<td style="font-size: 16px;">
			<input type="text" id="keyword" style="width: 400px;height: 32px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			表示項目
		</td>
		<td style="font-size: 16px;" id="displayitem">
			<input type="checkbox" checked value="基本情報" id="display1" disabled>&nbsp;基本情報
			<input type="checkbox"         value="商品名称" id="display2" onclick="showitem(this);">&nbsp;商品名称
			<input type="checkbox" checked value="在庫情報" id="display3" disabled>&nbsp;在庫情報
			<input type="checkbox" checked value="販売情報" id="display4" disabled>&nbsp;販売情報
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="outputstock" style="width: 150px;height: 35px;font-size: 18px;" value="出力" onclick="outputstock()">
		</td>
		<!--
		<td style="font-size: 16px;" colspan="5">
			<input type="button" id="showmore" value="▶" onclick="showmore();" style="display: none;float: right;">
			<input type="button" id="showless" value="◀" onclick="showless();" style="float: right;">
		</td>
		-->

	</tr>
</table>
<hr>
<div id="stocklisthead" style="height: 40px; width:1883px; overflow:auto;overflow: hidden; border: none;display: none;">
<table border="1" id="stocktablehead" style="width: 1870px; font-size: 12px;">
	<tr>
		<td style="width: 50px;">選択</td>
		<td style="width: 120px;" class="display1">商品分類</td>
		<td style="width: 80px;" class="display1">商品管理番号</td>
		<td style="width: 60px;"  class="display1">商品種別</td>
		<td style="width: 100px;" class="display1">色</td>
		<td style="width: 120px;" class="display1">サイズ</td>
		<td style="width: 110px;" class="display1">SKU番号</td>
		<td style="width: 100px;" class="display1">ASIN番号</td>
		<td style="width: 100px;" class="display1">ラベル番号</td>
		<td style="display: none;" class="display2">商品名称</td>
		<td style="width: 80px;" class="display3">FBA在庫</td>
		<td style="width: 80px;" class="display3">FBM在庫</td>
		<td style="width: 80px;" class="display3">LOCAL<br>在庫</td>
		<td style="width: 80px;" class="display3">ONBOARD<br>在庫</td>
		<td style="width: 80px;" class="display3">販売中<br>在庫合計</td>
		<td style="width: 80px;" class="display3">予備<br>在庫合計</td>
		<td style="width: 80px;" class="display3">全体<br>在庫合計</td>
		<td style="width: 150px;" class="display4">販売数量<br/>昨日/7日/30日/60日/90日</td>
		<td style="width: 100px;" class="display4">販売数量<br/>(週間平均値)</td>
		<td style="width: 100px;" class="display4">販売可能期間<br/>(平均値)</td>
	</tr>
</table>
</div>
<div id="stocklist" style="height: 685px; width:1900px; overflow:auto;border: none;display: none;" onscroll="scrollHead(this);">
<table border="1" id="stocktable" style="width: 1870px; font-size: 10px;">
</table>

</div>


</body>
</html>