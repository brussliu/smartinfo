<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


	<title>納品管理</title>

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

            var page = "納品管理";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);

		});

        function outputpurchase(){

			Efw('outputpurchase');

        }

        function searchDelivery(){

			// Efw('searchpurchase');

        }

        function updatepurchase(){

			Efw('updatepurchase');

		}

		function updatepurchasestatus(no){

			Efw('updatepurchasestatus',{status:no});
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


		}

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;" onload="searchDelivery();">
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

		<COL WIDTH="250PX">

		<COL WIDTH="120PX">
		<COL WIDTH="120PX">

			
	</COLGROUP>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			納品名称：<input type="text" id="purchasename" style="width: 300px;height: 32px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			納品内容：<input type="file" id="importfile_purchase" style="width: 400px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="新規登録" style="width:100px;height: 32px;" id="add" onclick="Efw('addpurchase')">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="出　　力" style="width:100px;height: 32px;" id="output" disabled onclick="outputpurchase()">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="更　　新" style="width:100px;height: 32px;" id="update" disabled onclick="updatepurchase()">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="納品作成用ファイル出力" style="width:100px;height: 32px;" id="confirm" disabled onclick="updatepurchasestatus(1);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="納品確定" style="width:100px;height: 32px;" id="confirm" disabled onclick="updatepurchasestatus(1);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="納品発送" style="width:100px;height: 32px;" id="shopping" disabled onclick="updatepurchasestatus(2);">
		</td>

	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			受領内容：<input type="file" id="importfile_purchase" style="width: 400px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="納品受領" style="width:100px;height: 32px;" id="arrival" disabled onclick="updatepurchasestatus(3);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
			<input type=button value="納品完了" style="width:100px;height: 32px;" id="acceptance" disabled onclick="updatepurchasestatus(4);">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 50px;" colspan="1">
		</td>
	</tr>
</table>
<span style="font-weight: bold;color: red;">※XXXXXXX</span>
<br/>

<span style="font-weight: bold;">納品情報一覧</span>
<br/>
<br/>
<br/>
<table border="1">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="200PX">
		<COL WIDTH="400PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
	</COLGROUP>
	<tr style="font-size: 18px;font-weight: bold;background-color:rgb(128,255,255);height: 30px;">
		<td ></td>
		<td >納品No</td>
		<td >納品名称</td>
		<td >数量</td>
		<td >ステータス</td>
		<td >新規登録日</td>
		<td >納品確定日</td>
		<td >発送日</td>
		<td >受領日</td>
		<td >完了日</td>
		<td >AMZ-納品番号</td>	
		<td >AMZ-納品名</td>
		<td >AMZ-納品プラン番号</td>
		<td >AMZ-納品先</td>
		<td >AMZ-SKU合計</td>
		<td >AMZ-商品合計数</td>
		<td >AMZ輸送箱のリスト</td>
	</tr>
</table>
<table border="1" id="purchasenamelist" style="font-size: 16px;">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="200PX">
		<COL WIDTH="400PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
		<COL WIDTH="150PX">
	</COLGROUP>
	<tr style="height: 30px;">
		<td ><input type="radio" name="purchaseitem"></td>
		<td >20210501-192356</td>
		<td >20210501_靴下</td>
		<td >999</td>
		<td >0:新規登録</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >2021/12/31</td>
		<td >FBA15CPD4JQC</td>	
		<td >FBA (2021/04/19 19:09) - 1</td>
		<td >PLN1MV0GBR</td>
		<td >Amazon.co.jp</td>
		<td >35</td>
		<td >999</td>
		<td >99/99</td>
	</tr>
</table>

</body>
</html>