<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="si_stock_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var si_stock_inputdialog = null;
		$(function() {
			si_stock_inputdialog = $("#si_stock_inputdialog").dialog({
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

		function changeDialogColor(){

			$("#addstocktable").find("tr").each(function(){

			    var tdArr = $(this).children();

			    	//alert($(this));
			    	for(var i=0;i < tdArr.length;i ++){
			    		tdArr.eq(i).css({"background": "rgb(255,255,205)"});
			    	}

			    	// 販売数量（週間平均値）
			    	var num1 = parseFloat(tdArr.eq(7).html());
			    	if(num1 < 0.2){
			    		tdArr.eq(7).css({"background": "rgb(255,153,255)"});
			    	}else if(num1 >= 0.2 && num1 < 0.5){
			    		tdArr.eq(7).css({"background": "rgb(255,204,255)"});
			    	}else if(num1 >= 0.5 && num1 < 1){
			    		tdArr.eq(7).css({"background": "rgb(204,255,255)"});
			    	}else if(num1 >= 1 && num1 < 2){
			    		tdArr.eq(7).css({"background": "rgb(153,255,153)"});
			    	}else if(num1 >= 2 && num1 < 5){
			    		tdArr.eq(7).css({"background": "rgb(102,255,102)"});
			    	}else if(num1 >= 5){
			    		tdArr.eq(7).css({"background": "rgb(0,255,255)"});
			    	}	

			    	// 在庫
			    	var num2 = parseFloat(tdArr.eq(9).html());
			    	if(num2 < 5){
			    		tdArr.eq(9).css({"background": "rgb(102,153,255)"});
			    	}else if(num2 >= 5 && num2 < 10){
			    		tdArr.eq(9).css({"background": "rgb(153,204,255)"});
			    	}else if(num2 >= 10){
			    		tdArr.eq(9).css({"background": "rgb(204,236,255)"});
			    	}

			    	// 販売可能期間
			    	var num3 = parseFloat(tdArr.eq(10).html());
			    	if(num2 == 0 || num3 < 10){
			    		tdArr.eq(10).css({"background": "rgb(255,153,255)"});
			    		
			    	}else if(num3 >= 10 && num3 < 30){
			    		tdArr.eq(10).css({"background": "rgb(255,204,255)"});

			    	}
			     
			});

		}

		function compute(obj){

			var a = parseFloat($(obj).parent().prev().prev().prev().prev().html())/7;

			var b = parseInt($(obj).parent().prev().prev().html()) + parseInt($(obj).val());

			//+ parseInt($(obj).val());

			var c = b/a;

			$(obj).parent().next().html(c.toFixed(2));

		}

		function output(){

			var p_no = new Array();
	        var p_label = new Array();
	        var p_addcount = new Array();

			$("#addstocktable").find("tr").each(function(){

			    var tdArr = $(this).children();

	        	var productno = tdArr.eq(0).html();
				var productlabel = tdArr.eq(5).html();
				var productaddcount = tdArr.eq(11).children()[0].value;

        		p_no.push(productno);
				p_label.push(productlabel);
				p_addcount.push(productaddcount);


			});

			Efw('outputstock',
				{
					'addproductno': p_no,
					'addproductlabel': p_label,
					'addproductcount': p_addcount
				}
			);

		}

	</SCRIPT>
	<style>

    </style>
	
	<div id="stocklist" style="height: 670px; width:1450px; overflow:auto;border-style: solid;border-width: 1px;">
		<table border="1" id="addstocktablehead" style="font-size: 14px;width: 1992px;">
			<tr>
				<td style="width: 100px;">商品管理番号</td>
				<td style="width: 100px;">色</td>
				<td style="width: 100px;">サイズ</td>
				<td style="width: 100px;">SKU番号</td>
				<td style="width: 100px;">ASIN番号</td>
				<td style="width: 100px;">ラベル番号</td>
				<td style="width: 750px;">商品名称</td>
				<td style="width: 100px;">販売数量<br/>(週間平均値)</td>
				<td style="width: 80px;">FBM在庫</td>
				<td style="width: 80px;">FBA在庫</td>
				<td style="width: 100px;">販売可能期間<br/>(平均値)</td>
				<td style="width: 100px;">補足数量</td>
				<td style="width: 100px;">販売可能期間<br/>(補足後)</td>
			</tr>
		</table>

		<table border="1" id="addstocktable" style="font-size: 14px;width: 1992px;">
			<tr>
				<td style="width: 100px;">商品管理番号</td>
				<td style="width: 100px;">色</td>
				<td style="width: 100px;">サイズ</td>
				<td style="width: 100px;">SKU番号</td>
				<td style="width: 100px;">ASIN番号</td>
				<td style="width: 100px;">ラベル番号</td>
				<td style="width: 750px;">商品名称</td>
				<td style="width: 100px;">販売数量<br/>(週間平均値)</td>
				<td style="width: 80px;">FBM在庫</td>
				<td style="width: 80px;">FBA在庫</td>
				<td style="width: 100px;">販売可能期間<br/>(平均値)</td>
				<td style="width: 100px;">補足数量</td>
				<td style="width: 100px;">販売可能期間<br/>(補足後)</td>
			</tr>
		</table>
	</div>

	<INPUT TYPE="HIDDEN" CLASS="action"> <BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="output()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_stock_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

