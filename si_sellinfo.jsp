<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>販売情報</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
	<efw:Client/>
	<script>

		function initSellinfo(){
			Efw('initsellinfo');
		}

		function searchSellinfo(){

			Efw('searchsellinfo');

		}

		function changeColor(){


			$("#sellinfolist").find("td").each(function(){

				// 評価数
				if($(this).hasClass("topcol3")){

					var value1 = $(this).html().replaceAll('個','');

					var obj = $(this).parent().next().children()[2];

					var value2 = obj.innerHTML.replaceAll('個','');
					
					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}

				// 評価度
				if($(this).hasClass("topcol4")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[3];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}

				// レベル1数
				if($(this).hasClass("topcol6")){

					var value1 = $(this).html().replaceAll('位','').replaceAll(',','');

					var obj = $(this).parent().next().children()[5];

					var value2 = obj.innerHTML.replaceAll('位','').replaceAll(',','');

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}

				// レベル2数
				if($(this).hasClass("topcol8")){

					var value1 = $(this).html().replaceAll('位','').replaceAll(',','');

					var obj = $(this).parent().next().children()[7];

					var value2 = obj.innerHTML.replaceAll('位','').replaceAll(',','');

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}

				// 最新評価1
				if($(this).hasClass("topcol10")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[9];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}
				// 最新評価2
				if($(this).hasClass("topcol11")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[10];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}
				// 最新評価3
				if($(this).hasClass("topcol12")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[11];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}
				// 販売数量
				if($(this).hasClass("topcol13")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[12];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}

				// 在库合計
				if($(this).hasClass("topcol14")){

					var value1 = $(this).html();

					var obj = $(this).parent().next().children()[13];

					var value2 = obj.innerHTML;

					if(parseFloat(value1) < parseFloat(value2)){
						$(this).css("background-color", "lightgreen");
					}

					if(parseFloat(value1) > parseFloat(value2)){
						$(this).css("background-color", "khaki");
					}

				}


			});


			// $("#sellinfolist").find("tr").each(function(){

			// 	var tdArr = $(this).children();

			// 	// for(var i = 0;i < tdArr.length;i ++){

					

			// 	// 	// 評価数
			// 	// 	// if (tdArr[i].hasClass("topcol3")){
			// 	// 	// 		alert(tdArr[i]);
			// 	// 	// 		alert(tdArr[i].innerHTML);
			// 	// 	// }

			// 	// 	//if(i == 2){
						




			// 	// 		// var value1 = tdAll.html().replaceAll('個','');
			// 	// 		// var value2 = tdAll.parent().next().children()[2].html().replaceAll('個','');
						
			// 	// 		// if(parseFloat(value1) > parseFloat(value2)){
			// 	// 		// 	tdAll.css("background-color", "lightgreen");
			// 	// 		// }

			// 	// 		// if(parseFloat(value1) < parseFloat(value2)){
			// 	// 		// 	tdAll.css("background-color", "khaki");
			// 	// 		// }


			// 	// 	//}
			// 	// }
				
				
			// });
			
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
		<COL WIDTH="50PX">
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
		<td >URL</td>
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
		<COL WIDTH="50PX">
	</COLGROUP>
</table>


</body>
</html>