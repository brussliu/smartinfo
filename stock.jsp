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

			$("#stocktable").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var html = tdArr.eq(2).html();
			    if(html == "親商品"){
			    	tdArr.eq(0).children().hide();
			    }


			    if(html == "子商品"){
			    	//alert($(this));
			    	for(var i=3;i < tdArr.length;i ++){
			    		tdArr.eq(i).css({"background": "rgb(255,255,205)"});
			    	}

			    	// 販売数量（週間平均値）
			    	var num1 = parseFloat(tdArr.eq(14).html());
			    	if(num1 < 0.2){
			    		tdArr.eq(14).css({"background": "rgb(255,153,255)"});
			    	}else if(num1 >= 0.2 && num1 < 0.5){
			    		tdArr.eq(14).css({"background": "rgb(255,204,255)"});
			    	}else if(num1 >= 0.5 && num1 < 1){
			    		tdArr.eq(14).css({"background": "rgb(204,255,255)"});
			    	}else if(num1 >= 1 && num1 < 2){
			    		tdArr.eq(14).css({"background": "rgb(153,255,153)"});
			    	}else if(num1 >= 2 && num1 < 5){
			    		tdArr.eq(14).css({"background": "rgb(102,255,102)"});
			    	}else if(num1 >= 5){
			    		tdArr.eq(14).css({"background": "rgb(0,255,255)"});
			    	}	

			    	// 在庫
			    	var num2 = parseFloat(tdArr.eq(16).html());
			    	if(num2 < 5){
			    		tdArr.eq(16).css({"background": "rgb(102,153,255)"});
			    	}else if(num2 >= 5 && num2 < 10){
			    		tdArr.eq(16).css({"background": "rgb(153,204,255)"});
			    	}else if(num2 >= 10){
			    		tdArr.eq(16).css({"background": "rgb(204,236,255)"});
			    	}

			    	// 販売可能期間
			    	var num3 = parseFloat(tdArr.eq(21).html());
			    	if(num2 == 0 || num3 < 10){
			    		tdArr.eq(21).css({"background": "rgb(255,153,255)"});
			    		$(this).addClass("stock1");
			    	}else if(num3 >= 10 && num3 < 30){
			    		tdArr.eq(21).css({"background": "rgb(255,204,255)"});
			    		$(this).addClass("stock2");
			    	}else{
			    		$(this).addClass("stock0");
			    	}

			    }
			     
			});

        }

        // function showstock(){
        // 	$(".stock0").hide();
        // }

        function searchstock(){

        	var productdivArr = new Array();

        	$('#productdiv input:checkbox:checked').each(function (index, item) {
        		productdivArr.push($(this).val());
    		});

        	Efw('stock/searchstock',{'productdiv': productdivArr});
        }

        // function outputstock(){

        // 	var productdivArr = new Array();

        // 	$('#productdiv input:checkbox:checked').each(function (index, item) {
        // 		productdivArr.push($(this).val());
    	// 	});

		// 	Efw('outputstock',{'productdiv': productdivArr});
        // }

        function initstock(){
        	Efw('stock/initstock');
        }

        function showless(){
        	$(".moreinfo").hide();

        	$("#stocktablehead").css("width","1870px");
        	$("#stocktable").css("width","1870px");

        	$("#showmore").show();
        	$("#showless").hide();
        }
        function showmore(){
        	$(".moreinfo").show();
        	$("#stocktablehead").css("width","3054px");
        	$("#stocktable").css("width","3054px");

			$("#showmore").hide();
			$("#showless").show();

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
<table class="productlist" border="1" style="width: 100%;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="100PX">
		<COL >
		<COL WIDTH="100PX">
		<COL WIDTH="400PX">
		<COL WIDTH="220PX">
	</COLGROUP>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品分類
		</td>
		<td style="font-size: 16px;" id="productdiv">
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchstock" style="width: 200px;height: 40px;font-size: 20px;" value="検索" onclick="searchstock()">
			
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品番号
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="productno">
				<option value=""></option>
				<option value="マスタ未登録">マスタ未登録</option>
			</select>
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			商品名称
		</td>
		<td style="font-size: 16px;">
			<input type="text" id="productname" style="width: 600px;height: 32px;">
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="outputstock" style="width: 200px;height: 40px;font-size: 20px;" value="出力" onclick="outputstock()">
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
<table border="1" id="stocktablehead" style="width: 3500px; font-size: 12px;">
	<tr>
		<td style="width: 50px;">選択</td>
		<td style="width: 120px;">商品分類</td>
		<td style="width: 100px;">商品管理番号</td>
		<td style="width: 70px;">商品種別</td>
		<td style="width: 100px;">色</td>
		<td style="width: 150px;">サイズ</td>
		<td style="width: 120px;" class="moreinfo">SKU番号</td>
		<td style="width: 120px;" class="moreinfo">ASIN番号</td>
		<td style="width: 120px;" class="moreinfo">ラベル番号</td>
		<td style=""              class="moreinfo">商品名称</td>
		<td style="width: 80px;">FBA在庫</td>
		<td style="width: 80px;">FBM在庫</td>
		<td style="width: 80px;">LOCAL<br>在庫</td>
		<td style="width: 80px;">ONBOARD<br>在庫</td>
		<td style="width: 80px;">販売中<br>在庫合計</td>
		<td style="width: 80px;">予備<br>在庫合計</td>
		<td style="width: 80px;">全体<br>在庫合計</td>
		<td style="width: 100px;">販売数量<br/>(昨日)</td>
		<td style="width: 100px;">販売数量<br/>(直近7日間)</td>
		<td style="width: 100px;">販売数量<br/>(直近30日間)</td>
		<td style="width: 100px;">販売数量<br/>(直近60日間)</td>
		<td style="width: 100px;">販売数量<br/>(直近90日間)</td>
		<td style="width: 100px;">販売数量<br/>(週間平均値)</td>
		<td style="width: 100px;">販売可能期間<br/>(平均値)</td>
	</tr>
</table>
<div id="stocklist" style="height: 600px; width:4000px; overflow:auto;border-style: solid;border-width: 1px;">
<table border="1" id="stocktable" style="width: 3500px; font-size: 10px;">
</table>

</div>


</body>
</html>