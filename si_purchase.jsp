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

            var page = "仕入管理";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);

		});

        function outputpurchase(){

			Efw('purchase/outputpurchase');

        }

        function searchPurchase(){

			Efw('purchase/searchpurchase');

        }

        function updatepurchase(){

			Efw('purchase/updatepurchase');

		}

		function updatepurchasestatus(no){

			Efw('purchase/updatepurchasestatus',{status:no});
		}

		function selectitem(obj){

			var purchaseno = $(obj).parent().next().html();

			var purchasename = $(obj).parent().next().next().html();

			var status = $(obj).parent().next().next().next().next().next().html();

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

			$("#purchaseno").val($(obj).parent().next().html());

			$("#purchasename").val($(obj).parent().next().next().html());

			var ship = $(obj).parent().next().next().next().next().next().next().next().next().html();
			var rate = $(obj).parent().next().next().next().next().next().next().next().next().next().html();

			var productamount = ($(obj).parent().next().next().next().next().next().next().next().next().next().next().html().split('<br>'))[0]; // 1
			var shipamount =    ($(obj).parent().next().next().next().next().next().next().next().next().next().next().html().split('<br>'))[1]; // 2
			var faxamount =    ($(obj).parent().next().next().next().next().next().next().next().next().next().next().next().html().split('<br>'))[2]; // 3

			$(".ship").show();$("#ship option[text='" + ship + "']").attr("selected", true); 

			$(".rate").show();$(".rate").val(rate);
			$(".productamount").show();$(".productamount").val(productamount);
			$(".shipamount").show();$(".shipamount").val(shipamount);
			$(".faxamount").show();$(".faxamount").val(faxamount);
			
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
<table id="purchaseInfo" border="0">
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
			<input type=button value="新規登録" style="width:100px;height: 32px;" id="add" onclick="Efw('purchase/addpurchase')">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="出　　力" style="width:100px;height: 32px;" id="output" disabled onclick="outputpurchase()">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="更　　新" style="width:100px;height: 32px;" id="update" disabled onclick="updatepurchase()">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="仕入確定" style="width:100px;height: 32px;" id="confirm" disabled onclick="updatepurchasestatus(1);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="発送した" style="width:100px;height: 32px;" id="shopping" disabled onclick="updatepurchasestatus(2);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="到着した" style="width:100px;height: 32px;" id="arrival" disabled onclick="updatepurchasestatus(3);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="受　　取" style="width:100px;height: 32px;" id="acceptance" disabled onclick="updatepurchasestatus(4);">
		</td>
	</tr>
</table>
<span style="font-weight: bold;color: red;">※発送した際に、在庫情報一覧の途中欄に計上</span>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<span class="ship" style="display: none;">物流方式：</span>
<select class="ship" style="WIDTH:100px;height:32px;display: none;" id="ship">
	<option>1:空運（EMS）</option>
	<option>2:海運（呉）</option>	
	<option>9:その他</option>
</select>
<span class="rate" style="display: none;">為替レート：</span><input type="text" class="rate" id="rate" style="width: 100px;height: 32px;display: none;">
<span class="productamount" style="display: none;">商品費用：</span><input type="text" class="productamount" id="purchasename" style="width: 100px;height: 32px;display: none;">
<span class="shipamount" style="display: none;">物流費用：</span><input type="text" class="shipamount" id="purchasename" style="width: 100px;height: 32px;display: none;">
<span class="faxamount" style="display: none;">税金（円）：</span><input type="text" class="faxamount" id="purchasename" style="width: 100px;height: 32px;display: none;">

<br/>
<span style="font-weight: bold;color: red;">※受取した際に、在庫情報一覧の家欄に計上</span>

<hr>

<span style="font-weight: bold;">仕入情報一覧</span>
<br/>

<table border="1">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="170PX">
		<COL WIDTH="350PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="150PX">
		<COL WIDTH="140PX">
		<COL WIDTH="140PX">
		<COL WIDTH="150PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="140PX">
		<COL WIDTH="150PX">
	</COLGROUP>
	<tr style="font-size: 18px;font-weight: bold;background-color:rgb(128,255,255);height: 30px;">
		<td ></td>
		<td >仕入No</td>
		<td >仕入名称</td>
		<td >数量</td>
		<td >金额</td>
		<td >ステータス</td>
		<td >新規登録日<br>仕入確定日</td>
		<td >商品発送日<br>商品届く日<br>商品受取日</td>
		<td >発送方式</td>
		<td >為替レート</td>
		<td >商品費用<br>物流費用<br>税金</td>
		<td >商品費用(円)<br>物流費用(円)<br>税金(円)</td>
		<td >合計仕入費用<br>合計仕入費用(円)</td>
	</tr>
</table>
<table border="1" id="purchasenamelist" style="font-size: 16px;">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="170PX">
		<COL WIDTH="350PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="150PX">
		<COL WIDTH="140PX">
		<COL WIDTH="140PX">
		<COL WIDTH="150PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="140PX">
		<COL WIDTH="150PX">
	</COLGROUP>
	<tr style="height: 30px;">
		<td ><input type="radio" name="purchaseitem"></td>
		<td >20210501-192356</td>
		<td >20210501_靴下</td>
		<td >999</td>
		<td >999,999,999</td>
		<td >0:新規登録</td>
		<td >2021/12/31<br>2021/12/31</td>
		<td >2021/12/31<br>2021/12/31<br>2021/12/31</td>
		<td >1:空輸(EMS)</td>
		<td >5</td>
		<td >123456789<br>123456789<br>123456789</td>
		<td >123456789<br>123456789<br>123456789</td>
		<td >123456789<br>123456789</td>
	</tr>
</table>

</body>
</html>