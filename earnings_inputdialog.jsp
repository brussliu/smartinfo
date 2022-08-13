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
				height : 800,
				width : 1500,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					setTimeout(function(){});
				},
			});
		});

	</SCRIPT>
	<style>
		.bg1 {
			background-color: rgb(200, 255, 255);
		}
		.bg2 {
			background-color: rgb(255, 220, 200);
		}
		.bg3 {
			background-color: rgb(255, 255, 200);
		}
		.bg4 {
			background-color: rgb(200, 255, 200);
		}
    </style>
	<table border="1" id="detialtable" style="font-size: 16px;">
		<COLGROUP>
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
			<COL WIDTH="150PX">
		</COLGROUP>
		<tr style="height: 40px;">
			<td colspan="8" style="text-align: center;">2022年07月</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1">注文数量</td>
			<td colspan="3">999個</td>
			<td class="bg1">注文粗利益</td>
			<td colspan="3">999999999円</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1">注文売上</td>
			<td colspan="3">999個</td>
			<td class="bg1">配送料</td>
			<td>999999999円</td>
			<td class="bg1">包装手数料</td>
			<td>999999999円</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg1">手数料</td>
			<td>999999999円</td>
			<td class="bg1">FBA手数料</td>
			<td>999999999円</td>
			<td class="bg1">ポイント費用</td>
			<td>999999999円</td>
			<td class="bg1">その他料金</td>
			<td>999999999円</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg2">広告費用</td>
			<td>999999999円</td>
			<td class="bg2">月額登録料</td>
			<td>999999999円</td>
			<td colspan="4"></td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg3">返品数量</td>
			<td>999個</td>
			<td class="bg3">返品金額</td>
			<td>999999999円</td>
			<td class="bg3">返品作業料</td>
			<td>999999999円</td>
			<td class="bg3">返金調整額</td>
			<td>999999999円</td>
		</tr>
		<tr style="height: 40px;">
			<td class="bg4">FBA商品発送料金</td>
			<td>999999999円</td>
			<td class="bg4">FBA保管手数料</td>
			<td>999999999円</td>
			<td class="bg4">FBA長期在庫保管手数料</td>
			<td>999999999円</td>
			<td class="bg4">FBA廃棄返送手数料</td>
			<td>999999999円</td>
		</tr>
	</table>

</DIV>

