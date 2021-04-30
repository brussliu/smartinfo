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

            var shop = $.getUrlParam('shop');

            var page = "発送管理";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);

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

        function searchPurchase(){

			Efw('searchpurchase');

        }

        function update(obj){

			//$("#importfile_purchase_forupdate").val($(obj).parent().prev().children(0));

			alert($(obj).parent().parent().prev().children(0).html());
			alert($("#importfile_purchase_forupdate"));

			Efw('updatepurchase', 
				{
					purchaseNo : $(obj).parent().parent().prev().children(0).html(), 
					"importfile_purchase_forupdate" : $(obj).parent().prev().children(0)
					//purchasefile : $(obj).parent().prev().children(0)
				}
			);


		}

		function select(obj){

			alert(obj);

			var purchaseno = $(obj).parent().next().html();

			var purchasename = $(obj).parent().next().next().html();

			var status = $(obj).parent().next().next().next().next().next().html();

			alert(purchaseno);

			alert(purchasename);

			alert(status);

			if(status == "0：新規登録"){

				// 新規登録
				$("#add").attr("disabled", false);
				// 出力
				$("#output").attr("disabled", false);
				// 更新
				$("#update").attr("disabled", false);
				// 仕入確定
				$("#confirm").attr("disabled", false);
				// 発送した
				$("#shopping").attr("disabled", true);
				// 到着した
				$("#arrival").attr("disabled", true);
				// 受取
				$("#acceptance").attr("disabled", true);
				
			}else if(status == "1：仕入確定"){

				// 新規登録
				$("#add").attr("disabled", false);
				// 出力
				$("#output").attr("disabled", false);
				// 更新
				$("#update").attr("disabled", false);
				// 仕入確定
				$("#confirm").attr("disabled", true);
				// 発送した
				$("#shopping").attr("disabled", false);
				// 到着した
				$("#arrival").attr("disabled", true);
				// 受取
				$("#acceptance").attr("disabled", true);

			}else if(status == "2：発送済み"){

				// 新規登録
				$("#add").attr("disabled", false);
				// 出力
				$("#output").attr("disabled", false);
				// 更新
				$("#update").attr("disabled", false);
				// 仕入確定
				$("#confirm").attr("disabled", true);
				// 発送した
				$("#shopping").attr("disabled", true);
				// 到着した
				$("#arrival").attr("disabled", false);
				// 受取
				$("#acceptance").attr("disabled", true);

			}else if(status == "3：到着済み"){

				// 新規登録
				$("#add").attr("disabled", false);
				// 出力
				$("#output").attr("disabled", false);
				// 更新
				$("#update").attr("disabled", false);
				// 仕入確定
				$("#confirm").attr("disabled", true);
				// 発送した
				$("#shopping").attr("disabled", true);
				// 到着した
				$("#arrival").attr("disabled", true);
				// 受取
				$("#acceptance").attr("disabled", false);

			}else if(status == "4：受取済み"){
				// 新規登録
				$("#add").attr("disabled", false);
				// 出力
				$("#output").attr("disabled", false);
				// 更新
				$("#update").attr("disabled", true);
				// 仕入確定
				$("#confirm").attr("disabled", true);
				// 発送した
				$("#shopping").attr("disabled", true);
				// 到着した
				$("#arrival").attr("disabled", true);
				// 受取
				$("#acceptance").attr("disabled", true);
			}


			$("#purchasename").val($(obj).parent().next().next().html());


			

			//$("#importfile_purchase_forupdate").val($(obj).parent().prev().children(0));

			// alert($(obj).parent().parent().prev().children(0).html());
			// alert($("#importfile_purchase_forupdate"));

			// Efw('updatepurchase', 
			// 	{
			// 		purchaseNo : $(obj).parent().parent().prev().children(0).html(), 
			// 		"importfile_purchase_forupdate" : $(obj).parent().prev().children(0)
			// 		//purchasefile : $(obj).parent().prev().children(0)
			// 	}
			// );


		}

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;" onload="searchPurchase();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>

<input type="hidden" id="shop">
<input type="hidden" id="purchaseno">

<br/>
<br/>
<table id="purchaseInfo" border="0" style="">
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
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			仕入名称：<input type="text" id="purchasename" style="width: 300px;height: 32px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			仕入内容：<input type="file" id="importfile_purchase" style="width: 400px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="新規登録" style="width:100px;height: 32px;" id="add" onclick="Efw('addpurchase')">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="出　　力" style="width:100px;height: 32px;" id="output" disabled onclick="">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="更　　新" style="width:100px;height: 32px;" id="update" disabled onclick="">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="仕入確定" style="width:100px;height: 32px;" id="confirm" disabled onclick="">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="発送した" style="width:100px;height: 32px;" id="shopping" disabled onclick="">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="到着した" style="width:100px;height: 32px;" id="arrival" disabled onclick="">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="受　　取" style="width:100px;height: 32px;" id="acceptance" disabled onclick="">
		</td>
	</tr>
</table>

<hr>

<span style="font-weight: bold;">仕入情報一覧</span>
<br/>

<table border="1">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="150PX">
		<COL WIDTH="300PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
	<tr style="font-size: 18px;font-weight: bold;background-color:rgb(128,255,255);height: 30px;">
		<td ></td>
		<td >仕入No</td>
		<td >仕入名称</td>
		<td >数量</td>
		<td >金额</td>
		<td >ステータス</td>
		<td >新規登録日</td>
		<td >仕入確定日</td>
		<td >発送日</td>
		<td >届く日</td>
		<td >受取日</td>
	</tr>
</table>
<table border="1" id="purchasenamelist" style="font-size: 16px;">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="150PX">
		<COL WIDTH="300PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
	<tr style="height: 30px;">
		<td ><input type="radio" name="purchaseitem"></td>
		<td >20210501-192356</td>
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
</table>

</body>
</html>