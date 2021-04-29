<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


	<title>仕入管理</title>

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

            // var shop = $.getUrlParam('shop');

            // var page = "発送管理";

            // var t = page + "（" + shop + "）" + $("#pagehead").html();

            // $("#pagehead").html(t);

            // $("#shop").val(shop);

		});


   //      function changeColor(){

			// $("#stocktable").find("tr").each(function(){

			//     var tdArr = $(this).children();
			//     var html = tdArr.eq(2).html();
			//     if(html == "親商品"){
			//     	tdArr.eq(0).children().hide();
			//     }


			//     if(html == "子商品"){
			//     	//alert($(this));
			//     	for(var i=3;i < tdArr.length;i ++){
			//     		tdArr.eq(i).css({"background": "rgb(255,255,205)"});
			//     	}

			//     	// 販売数量（週間平均値）
			//     	var num1 = parseFloat(tdArr.eq(14).html());
			//     	if(num1 < 0.2){
			//     		tdArr.eq(14).css({"background": "rgb(255,153,255)"});
			//     	}else if(num1 >= 0.2 && num1 < 0.5){
			//     		tdArr.eq(14).css({"background": "rgb(255,204,255)"});
			//     	}else if(num1 >= 0.5 && num1 < 1){
			//     		tdArr.eq(14).css({"background": "rgb(204,255,255)"});
			//     	}else if(num1 >= 1 && num1 < 2){
			//     		tdArr.eq(14).css({"background": "rgb(153,255,153)"});
			//     	}else if(num1 >= 2 && num1 < 5){
			//     		tdArr.eq(14).css({"background": "rgb(102,255,102)"});
			//     	}else if(num1 >= 5){
			//     		tdArr.eq(14).css({"background": "rgb(0,255,255)"});
			//     	}	

			//     	// 在庫
			//     	var num2 = parseFloat(tdArr.eq(16).html());
			//     	if(num2 < 5){
			//     		tdArr.eq(16).css({"background": "rgb(102,153,255)"});
			//     	}else if(num2 >= 5 && num2 < 10){
			//     		tdArr.eq(16).css({"background": "rgb(153,204,255)"});
			//     	}else if(num2 >= 10){
			//     		tdArr.eq(16).css({"background": "rgb(204,236,255)"});
			//     	}

			//     	// 販売可能期間
			//     	var num3 = parseFloat(tdArr.eq(21).html());
			//     	if(num2 == 0 || num3 < 10){
			//     		tdArr.eq(21).css({"background": "rgb(255,153,255)"});
			//     		$(this).addClass("stock1");
			//     	}else if(num3 >= 10 && num3 < 30){
			//     		tdArr.eq(21).css({"background": "rgb(255,204,255)"});
			//     		$(this).addClass("stock2");
			//     	}else{
			//     		$(this).addClass("stock0");
			//     	}

			//     }
			     
			// });

   //      }

   //      function showstock(){
   //      	$(".stock0").hide();
   //      }
        function outputship(){

        	var shipnoArr = new Array();

        	var postnoArr = new Array();
        	var shipaddressArr = new Array();
	        var receiverArr = new Array();


        	$('#shipinfotable input:checkbox:checked').each(function (index, item) {

        		shipnoArr.push($(this).val());

        		postnoArr.push($(this).parent().next().next().next().next().next().next().next().next().html());
        		shipaddressArr.push($(this).parent().next().next().next().next().next().next().next().next().next().html());
        		receiverArr.push($(this).parent().next().next().next().next().next().next().next().html());
        		
    		});

        	Efw('outputship',{'shipno': shipnoArr, 'postno': postnoArr, 'shipaddress': shipaddressArr, 'receiver': receiverArr});
        }

        function searchship(){

        	Efw('searchship');

        }

        function addproductkind(){

        	Efw('addproductkind')
        }

        function ship(obj){

        	var shipno = $(obj).parent().prev().prev().prev().prev().prev().prev().prev().prev().html();

        	

        	Efw('updateship',{'shipno': shipno});

        	$(obj).parent().html("発送済");

        }

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>

<input type="hidden" id="shop">
<br/>
<table border="0" style="width: 100%;">
	<COLGROUP>
		<COL WIDTH="350PX">
		<COL WIDTH="450PX">
		<COL WIDTH="150PX">
		<COL >
	</COLGROUP>
	<tr>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="1">
			<input type="text" id="purchasename" style="width: 300px;height: 32px;">
		</td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="1">
			<input type="file" id="importfile_purchase" style="width: 400px;height: 30px;">
		</td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="新規登録" style="width:100px;height: 40px;" onclick="">
		</td>
		<td>
		</td>
	</tr>
</table>

<br/>
<hr>
<span style="font-weight: bold;">仕入情報一覧</span>
<table border="1" id="purchasenamelist" style="font-size: 14px;">
	<tr style="font-weight: bold;background-color:rgb(128,255,255)">
		<td style="width: 150px;">仕入No</td>
		<td style="width: 300px;">仕入名称</td>
		<td style="width: 100px;">数量</td>
		<td style="width: 100px;">金额</td>
		<td style="width: 100px;">ステータス</td>
		<td style="width: 100px;">新規登録日</td>
		<td style="width: 100px;">仕入確定日</td>
		<td style="width: 100px;">発送日</td>
		<td style="width: 100px;">届く日</td>
		<td style="width: 100px;">受取日</td>
	</tr>
	<tr>
		<td rowspan="2">20210501-192356</td>
	</tr>
	<tr>
		<td >20210501_靴下</td>
		<td >999</td>
		<td >999,999,999</td>
		<td >0:新規登録</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
	</tr>
	<tr>
		<td colspan="4">20210501_靴下</td>
		<td ><input type=button value="更　　新" style="width:80px;height: 40px;" onclick=""></td>
		<td ><input type=button value="仕入確定" style="width:80px;height: 40px;" onclick=""></td>
		<td ><input type=button value="発送した" style="width:80px;height: 40px;" onclick=""></td>
		<td ><input type=button value="到着した" style="width:80px;height: 40px;" onclick=""></td>
		<td ><input type=button value="受け取り" style="width:80px;height: 40px;" onclick=""></td>
	</tr>
</table>
<!--
<br/>
<hr>
<span style="font-weight: bold;">【発送情報】</span>

<table border="1" id="shipinfotable" style="font-size: 14px;">
	<tr style="font-weight: bold;background-color: rgb(128,255,255);">
		<td style="width: 50px;">選択</td>
		<td style="width: 80px;">状態</td>
		<td style="width: 80px;">区分</td>
		<td style="width: 200px;">注文番号</td>
		<td style="width: 250px;">注文時間</td>
		<td style="width: 100px;">注文数量合計</td>
		<td style="width: 100px;">注文金額合計</td>
		<td style="width: 100px;">お客様名称</td>
		<td style="width: 100px;">郵便番号</td>
		<td style="width: 400px;">住所</td>
		<td style="width: 150px;">電話番号</td>
		<td style="width: 150px;">発送</td>
	</tr>
</table>


</div>
-->
</body>
</html>