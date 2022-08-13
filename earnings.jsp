<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>売上情報</title>

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

            var page = "売上情報";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);

		});

        function searchearningslistinfo(){

			Efw('earnings/searchearningslist');
		}

        // function changeColor(){

		// 	$("#stocktable").find("tr").each(function(){

		// 	    var tdArr = $(this).children();
		// 	    var html = tdArr.eq(2).html();
		// 	    if(html == "親商品"){
		// 	    	tdArr.eq(0).children().hide();
		// 	    }


		// 	    if(html == "子商品"){
		// 	    	//alert($(this));
		// 	    	for(var i=3;i < tdArr.length;i ++){
		// 	    		tdArr.eq(i).css({"background": "rgb(255,255,205)"});
		// 	    	}

		// 	    	// 販売数量（週間平均値）
		// 	    	var num1 = parseFloat(tdArr.eq(14).html());
		// 	    	if(num1 < 0.2){
		// 	    		tdArr.eq(14).css({"background": "rgb(255,153,255)"});
		// 	    	}else if(num1 >= 0.2 && num1 < 0.5){
		// 	    		tdArr.eq(14).css({"background": "rgb(255,204,255)"});
		// 	    	}else if(num1 >= 0.5 && num1 < 1){
		// 	    		tdArr.eq(14).css({"background": "rgb(204,255,255)"});
		// 	    	}else if(num1 >= 1 && num1 < 2){
		// 	    		tdArr.eq(14).css({"background": "rgb(153,255,153)"});
		// 	    	}else if(num1 >= 2 && num1 < 5){
		// 	    		tdArr.eq(14).css({"background": "rgb(102,255,102)"});
		// 	    	}else if(num1 >= 5){
		// 	    		tdArr.eq(14).css({"background": "rgb(0,255,255)"});
		// 	    	}	

		// 	    	// 在庫
		// 	    	var num2 = parseFloat(tdArr.eq(16).html());
		// 	    	if(num2 < 5){
		// 	    		tdArr.eq(16).css({"background": "rgb(102,153,255)"});
		// 	    	}else if(num2 >= 5 && num2 < 10){
		// 	    		tdArr.eq(16).css({"background": "rgb(153,204,255)"});
		// 	    	}else if(num2 >= 10){
		// 	    		tdArr.eq(16).css({"background": "rgb(204,236,255)"});
		// 	    	}

		// 	    	// 販売可能期間
		// 	    	var num3 = parseFloat(tdArr.eq(21).html());
		// 	    	if(num2 == 0 || num3 < 10){
		// 	    		tdArr.eq(21).css({"background": "rgb(255,153,255)"});
		// 	    		$(this).addClass("stock1");
		// 	    	}else if(num3 >= 10 && num3 < 30){
		// 	    		tdArr.eq(21).css({"background": "rgb(255,204,255)"});
		// 	    		$(this).addClass("stock2");
		// 	    	}else{
		// 	    		$(this).addClass("stock0");
		// 	    	}

		// 	    }
			     
		// 	});

        // }

        // function showstock(){
        // 	$(".stock0").hide();
        // }

        // function searchstock(){

        // 	var productdivArr = new Array();

        // 	$('#productdiv input:checkbox:checked').each(function (index, item) {
        // 		productdivArr.push($(this).val());
    	// 	});

        // 	Efw('searchstock',{'productdiv': productdivArr});
        // }

        function opendetail(obj){

			var yearmonth = $(obj).html();

			Efw('earnings/openearningsdetail',{'yearmonth': yearmonth});

		}

  	</script>
</head>
<body style="background-color:ghostwhite;" onload="searchearningslistinfo()">
	<efw:Part path="earnings_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<input type="hidden" id="shop">
<!--
<table id="" border="0">
	<COLGROUP>
		<COL WIDTH="350PX">
		<COL WIDTH="450PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
		<COL WIDTH="120PX">
	</COLGROUP>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="8"></td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="検    索" style="width: 150px;height: 35px;font-size: 18px;" id="acceptance" onclick="searchearningslistinfo();">
		</td>
	</tr>
</table>
-->
<hr>
<table border="1" id="earningslisttable" style="font-size: 16px;">
	<tr style="background-color: aqua;height:40px;font-weight: bold;">
		<td style="width: 120px;">年月</td>
		<td style="width: 100px;">注文数量</td>
		<td style="width: 150px;">注文粗利益</td>
		<td style="width: 150px;">月額登録料</td>
		<td style="width: 150px;">広告費用</td>
		<td style="width: 150px;">返品損失金額</td>
		<td style="width: 150px;">FBA入庫料金</td>
		<td style="width: 150px;">FBA保管料金</td>
		<td style="width: 150px;">振込金額</td>
		<td style="width: 150px;">仕入金額</td>
		<td style="width: 150px;">その他</td>
		<td style="width: 150px;">純利益</td>
	</tr>
	<!--
	<tr style="height:40px">
		<td style="text-align: right">2021年01月</td>
		<td style="text-align: right">999個</td>
		<td style="text-align: right">99999999円</td>
		<td style="text-align: right">99999999円</td>
		<td style="text-align: right">99999999円</td>
		<td style="text-align: right">-99999999円</td>
		<td style="text-align: right">-99999999円</td>
		<td style="text-align: right">-99999999円</td>
		<td style="text-align: right">99999999円</td>
		<td style="text-align: right">-99999999円</td>
		<td style="text-align: right">-99999999円</td>
		<td style="text-align: right">99999999円</td>
	</tr>
	-->
</table>

</body>
</html>