<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="earnings_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var earnings_inputdialog = null;
		$(function() {
			earnings_inputdialog = $("#earnings_inputdialog").dialog({
				title : "在庫補足",
				autoOpen : false,
				resizable : false,
				height : 500,
				width : 1300,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					setTimeout(function(){});
				},
			});
		});

		function showyearmonth(txt){
			$("#yearmonth").html(txt);
		}

		function showearnings(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8){
			$("#ordercount").html(txt1);
			$("#orderearnings").html(txt2);
			$("#shipfee").html(txt3);
			$("#packfee").html(txt4);
			$("#orderfee").html(txt5);
			$("#fbafee").html(txt6);
			$("#pointfee").html(txt7);
			$("#others").html(txt8);
		}
		
		function showaddmonthlyfee(txt1,txt2){
			$("#adfee").html(txt1);
			$("#monthlyfee").html(txt2);
		}

	</SCRIPT>
	<style>
		.bg1 {
			background-color: rgb(200, 255, 255);
			font-weight: bold;
		}
		.bg2 {
			background-color: rgb(255, 220, 200);
			font-weight: bold;
		}
		.bg3 {
			background-color: rgb(255, 255, 200);
			font-weight: bold;
		}
		.bg4 {
			background-color: rgb(200, 255, 200);
			font-weight: bold;
		}
    </style>
	<table border="1" id="detialtable" style="font-size: 16px;border-radius: 0px;">
		<COLGROUP>
			<COL WIDTH="160PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="200PX">
			<COL WIDTH="150PX">
			<COL WIDTH="180PX">
			<COL WIDTH="150PX">
		</COLGROUP>
		<tr style="height: 40px;">
			<td colspan="8" style="text-align: center;font-weight: bold;" id="yearmonth">9999年99月</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1" style="border-bottom: none;">&nbsp;注文数量</td>
			<td colspan="3" style="text-align: right;border-bottom: none;" id="ordercount">999個　</td>
			<td class="bg1" style="border-bottom: none;">&nbsp;注文粗利益</td>
			<td colspan="3" style="text-align: right;border-bottom: none;">999999999円　</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1" style="border-bottom: none;">&nbsp;注文売上</td>
			<td colspan="3" style="text-align: right;border-bottom: none;" id="orderearnings">999個　</td>
			<td class="bg1" style="border-bottom: none;">&nbsp;配送料</td>
			<td style="text-align: right;border-bottom: none;" id="shipfee">999999999円　</td>
			<td class="bg1" style="border-bottom: none;">&nbsp;包装手数料</td>
			<td style="text-align: right;border-bottom: none;" id="packfee">999999999円　</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1">&nbsp;手数料</td>
			<td style="text-align: right;" id="orderfee">999999999円　</td>
			<td class="bg1">&nbsp;FBA手数料</td>
			<td style="text-align: right;" id="fbafee">999999999円　</td>
			<td class="bg1">&nbsp;ポイント費用</td>
			<td style="text-align: right;" id="pointfee">999999999円　</td>
			<td class="bg1">&nbsp;その他料金</td>
			<td style="text-align: right;" id="others">999999999円　</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg2">&nbsp;広告費用</td>
			<td style="text-align: right;" id="adfee">999999999円　</td>
			<td class="bg2">&nbsp;月額登録料</td>
			<td style="text-align: right;" id="monthlyfee">999999999円　</td>
			<td colspan="4"></td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg3">&nbsp;返品数量</td>
			<td style="text-align: right;">999個　</td>
			<td class="bg3">&nbsp;返品金額</td>
			<td style="text-align: right;">999999999円　</td>
			<td class="bg3">&nbsp;返品作業料</td>
			<td style="text-align: right;">999999999円　</td>
			<td class="bg3">&nbsp;返金調整額</td>
			<td style="text-align: right;">999999999円　</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg4">&nbsp;FBA商品発送料金</td>
			<td style="text-align: right;">999999999円　</td>
			<td class="bg4">&nbsp;FBA保管手数料</td>
			<td style="text-align: right;">999999999円　</td>
			<td class="bg4">&nbsp;FBA長期在庫保管手数料</td>
			<td style="text-align: right;">999999999円　</td>
			<td class="bg4">&nbsp;FBA廃棄返送手数料</td>
			<td style="text-align: right;">999999999円　</td>
		</tr>
	</table>

</DIV>

