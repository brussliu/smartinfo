<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>発送管理</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->

	<efw:Client/>
	<script>

        function outputship(){

        	var shipnoArr = new Array();

        	var postnoArr = new Array();
        	var shipaddressArr = new Array();
	        var receiverArr = new Array();


        	$('#shipinfotable input:checkbox:checked').each(function (index, item) {

        		shipnoArr.push($(this).val());

        		postnoArr.push($(this).parent().next().next().next().next().next().next().next().next().next().html());
        		shipaddressArr.push($(this).parent().next().next().next().next().next().next().next().next().next().next().html());
        		receiverArr.push($(this).parent().next().next().next().next().next().next().next().next().html());
        		
    		});


			outputType = $('input:radio[name=outputType]:checked').val();

        	Efw('outputship',{'shipno': shipnoArr, 'postno': postnoArr, 'shipaddress': shipaddressArr, 'receiver': receiverArr, 'outputType': outputType});
        }

        function searchship(){

        	Efw('searchship');

        }

        function addproductkind(){

        	Efw('addproductkind')
        }

        function ship(obj){

        	var shipno = $(obj).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().html();

        	

        	Efw('updateship',{'shipno': shipno});

        	$(obj).parent().html("発送済");

        }

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;">
<efw:Part path="si_ship_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/si_menu.jsp'">
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
			<input type="file" id="importfile_ship_info" style="width: 400px;height: 30px;">
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="import" style="width: 200px;height: 40px;font-size: 20px;" value="導入" onclick="Efw('uploadship',{data:'ship_amazon'})">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			注文期間
		</td>
		<td style="font-size: 16px;" colspan="5" id="orderTerm">
			<input type="radio" name="orderTerm01" value="7" disabled>7日以内
			<input type="radio" name="orderTerm01" value="30" checked>30日以内
			<input type="radio" name="orderTerm01" value="999" disabled>すべて
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchship" style="width: 200px;height: 40px;font-size: 20px;" value="検索" onclick="searchship()">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			状態
		</td>
		<td style="font-size: 16px;" colspan="5" id="orderTerm">
			<input type="checkbox" checked id="upship" value="1">未発送
			<input type="checkbox" checked id="shppped" value="2">発送済
		</td>
		<td style="font-size: 16px;text-align: right;">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			出力方式
		</td>
		<td style="font-size: 16px;" colspan="5">
			<input type="radio" name="outputType" value="old" disabled>旧：インクジェットプリンター
			<input type="radio" name="outputType" value="new" checked>新：サーマルプリンター
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="outputship" style="width: 200px;height: 40px;font-size: 20px;" value="出力" onclick="outputship()">
		</td>
	</tr>
</table>
<br/>
<hr>
<span style="font-weight: bold;">【未発送分の商品集計情報】</span>
<table border="1" id="ship_productinfo" style="font-size: 14px;">
	<tr style="font-weight: bold;background-color: rgb(34,177,76);">
		<td style="width: 100px;">商品管理番号</td>
		<td style="width: 120px;">商品種別</td>
		<td style="width: 120px;">SKU番号</td>
		<td style="width: 120px;">ASIN番号</td>
		<td style="width: 100px;">ラベル番号</td>
		<td style="">商品名称</td>
		<td style="width: 250px;">色</td>
		<td style="width: 100px;">サイズ</td>
		<td style="width: 100px;">数量</td>
	</tr>

</table>
<br/>
<hr>
<span style="font-weight: bold;">【発送情報】</span>

<table border="1" id="shipinfotable" style="font-size: 14px;">
	<tr style="font-weight: bold;background-color: rgb(128,255,255);">
		<td style="width: 50px;">選択</td>
		<td style="width: 70px;">区分</td>
		<td style="width: 70px;">状態</td>
		<td style="width: 170px;">注文番号</td>
		<td style="width: 170px;">注文時間</td>
		<td style="width: 120px;">商品分類</td>
		<td style="width: 70px;">数量合計</td>
		<td style="width: 70px;">金額合計</td>
		<td style="width: 120px;">お客様名称</td>
		<td style="width: 80px;">郵便番号</td>
		<td style="width: 600px;">住所</td>
		<td style="width: 120px;">電話番号</td>
		<td style="width: 70px;">発送</td>
	</tr>
</table>
<!--
<div id="stocklist" style="height: 580px; width:1900px; overflow:auto;border-style: solid;border-width: 1px;">
</div>
-->
</body>
</html>