<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>販売情報</title>
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

            var page = "販売情報一覧";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);
		 
		});

		function initSellinfo(){
			Efw('initsellinfo');
		}

		function searchSellinfo(){

			Efw('searchsellinfo');

			$("#sellinfolist").find("td").each(function(){

				// 評価数
				if ($(this).hasClass(".topcol3")){

					//alert($(this).innerHTML)
					
					// 評価先
					var value1 = $(this).innerHTML.replaceAll('個','');
					var value2 = $(this).parent().next().children()[2].innerHTML.replaceAll('個','');
					
					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}



			});

			
			// for(var i = 0;i < tdArr.length;i ++){

			// 	alert(tdArr[i].innerHTML);

	
			// }


		}

		

  	</script>
    <style>
	.bottomrow {
		border-bottom-style: solid;
		border-bottom-width: 2px;
	}
    </style>
</head>
<body style="background-color:ghostwhite;" onload="initSellinfo();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
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
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;">
			比較先
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="datefrom">
				<option id=""></option>
				<option id="W001">W001</option>	
				<option id="W002">W002</option>
				<option id="W003">W003</option>
				<option id="W004">W004</option>
			</select>
		</td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;">
			比較元
		</td>
		<td style="font-size: 16px;">
			<select STYLE="WIDTH:150px;height:32px;" id="dateto">
				<option id=""></option>
				<option id="W001">W001</option>	
				<option id="W002">W002</option>
				<option id="W003">W003</option>
				<option id="W004">W004</option>
			</select>
		</td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 20px;font-weight: bold;height: 50px;"></td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchproduct" style="width: 200px;height: 40px;font-size: 20px;" value="比較" onclick="searchSellinfo()">
		</td>
	</tr>
</table>
<hr>
<table border="1" style="width: 100%;background-color: aquamarine;">
	<COLGROUP>
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL >
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
	<tr style="border-bottom-style: solid;">
		<td >更新日</td>
		<td >商品管理番号</td>
		<td >評価数</td>
		<td >評価度</td>
		<td >レベル1種類</td>
		<td >レベル1数</td>
		<td >レベル2種類</td>
		<td >レベル2数</td>
		<td >質問数</td>
		<td >最新評価1</td>
		<td >最新評価2</td>
		<td >最新評価3</td>
		<td >販売数量</td>
		<td >在库合計</td>
	</tr>
</table>
<table border="0" id="sellinfolist" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL >
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
		<COL WIDTH="100PX">
	</COLGROUP>
</table>


</body>
</html>