<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>マスタ情報</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
	<efw:Client/>
	<script>

		function checkInput(obj){

			if($(obj).val().length == 0){

			}else if($(obj).val().length == 10 && $(obj).val().startsWith("X000")){

			}else{

				$(obj).focus();
			}
		}

		function inputLabel(obj){

			//Efw('searchmaster');

			if($(obj).val().length == 10 && $(obj).val().startsWith("X000")){


				// 商品管理コード取得
				Efw('scan/searchProductInfoByLabel',{label: $(obj).val()});


				// 画面表示
				// 商品管理コード表示



				//次の入力欄生成
				


			}else{

				return;
			}

			$(obj).val("");

		}

		function addRecord(pno, color, size, sku, asin, labelno, pname){

			var flg = false;
			$("#lefttable").find("tr").each(function(){

				var label = $(this).children().eq(5).html();

				if(label == labelno){

					var count = $(this).children().eq(7).html();
					$(this).children().eq(7).html(parseInt(count)+1);

					flg = true;

					return;
				}
			});

			if(flg == false){

				var $tr = $("<tr class='listcontent'></tr>");

				var $td1 = $("<td>" + pno + "</td>");
				var $td2 = $("<td>" + color + "</td>");
				var $td3 = $("<td>" + size + "</td>");
				var $td4 = $("<td>" + sku + "</td>");
				var $td5 = $("<td>" + asin + "</td>");
				var $td6 = $("<td>" + labelno + "</td>");
				var $td7 = $("<td>" + pname + "</td>");
				var $td8 = $("<td>1</td>");

				$tr.append($td1).append($td2).append($td3).append($td4).append($td5).append($td6).append($td7).append($td8);

				$("#lefttable").append($tr);

				var newcontent = ($("#listcontent").val() == "" ? "": ($("#listcontent").val() + ",")) + pno + "-" + color + "-" + size;

				$("#listcontent").val(newcontent);
			}

			//音声
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'facai.mp3');
			audioElement.setAttribute('autoplay', 'autoplay');
		}

		function addlist(){

			$("#leftdiv").show();

			$("#lefttable .listcontent").remove();

			$("#scancode").val("");

			$("#listname").val("");

			$("#listcontent").val("");

			$("#listno").val("");

		}

		function savelist(){

			var skuArr = new Array();
			var asinArr = new Array();
			var labelArr = new Array();
			var countArr = new Array();

			$("#lefttable").find("tr").each(function(){
				
				var sku = $(this).children().eq(3).html();
				var asin = $(this).children().eq(4).html();
				var label = $(this).children().eq(5).html();
				var count = $(this).children().eq(7).html();

				if(count != "数量"){
					skuArr.push(sku);
					asinArr.push(asin);
					labelArr.push(label);
					countArr.push(count);
				}

			});

			Efw('scan/savescanlist',{skuArr: skuArr, asinArr: asinArr, labelArr: labelArr, countArr: countArr});

		}

		function searchScanlist(){

			Efw('scan/searchscanlist');

		}

		function openScanlist(obj){

			var listno = $(obj).parent().next().html();
			
			Efw('scan/searchscandetail',{listno: listno});

			$("#leftdiv").show();
		}

		function deletelist(){

			Efw('scan/deletescanlist');
		}

		function liststock(){

			var groupNameArr = new Array();

			var groupLabelArr = new Array();

			$("#plist").find("table").each(function(){
				
				// var trArr = $(this).children();

				// var groupname = trArr.eq(0).children().children(":first").val();

				// for(var i=1;i < trArr.length; i++){

				// 	trArr.eq(i)

				// }
				var n = 0;
				var groupname = "";
				var labelArr = new Array();
				var label = "";
				$(this).find("input").each(function(){

					if(n == 0){
						groupname = $(this).val();
					}else{
						label = $(this).val();

						if(label.length > 0){
							labelArr.push(label);
						}
					}
					n = n + 1;
				});

				groupNameArr.push(groupname);
				groupLabelArr.push(labelArr);

			});

			// alert(groupNameArr);
			// alert(groupNameArr.length);
			// alert(groupLabelArr);
			// alert(groupLabelArr.length);

			Efw('liststock',{'groupNameArr': groupNameArr, 'groupLabelArr': groupLabelArr});

		}

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;" onload="searchScanlist();">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/si_menu.jsp'">
</div>
<input type="hidden" id="shop">
<br/>
<input type="button" id="addgroup" style="width: 170px;height: 30px;" value="新規リスト" onclick="addlist();">
<input type="button" id="importstock" style="width: 170px;height: 30px;" value="集計" onclick="liststock();">
<br/><br/>
<table border="0">
	<tr>
		<td>
			<div style="width: 1300px;height: 750px;display: none;" id="leftdiv">
				スキャンコード：<input type="text" id="scancode" style="width: 120px;height: 32px;ime-mode:disabled;" oninput="inputLabel(this);" maxlength="10" onblur="checkInput(this);">&nbsp;
				名前：<input type="text" id="listname" style="width: 200px;height: 32px;">&nbsp;
				内容：<input type="text" id="listcontent" style="width: 300px;height: 32px;">&nbsp;
				<input type="hidden" id="listno">
				<input type="button" id="savelist" style="width: 150px;height: 30px;" value="保存" onclick="savelist();">
				<input type="button" id="deletelist" style="width: 150px;height: 30px;" value="削除" onclick="deletelist();">
				<hr>
				<table border="1" id="lefttable">
					<COLGROUP>
						<COL WIDTH="50PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="600PX">
						<COL WIDTH="50PX">
					</COLGROUP>
					<tr style="background-color: lightblue;">
						<td>商品管理番号</td>
						<td>色</td>
						<td>サイズ</td>
						<td>SKU番号</td>
						<td>ASIN番号</td>
						<td>ラベル番号</td>
						<td>商品名称</td>
						<td>数量</td>
					</tr>
				</table>
			</div>
		</td>
		<td style="vertical-align: top;">
			<div style="width: 500px;height: 750px;">
				<table border="1" id="scanlisttable">
					<COLGROUP>
						<COL WIDTH="50PX">
						<COL WIDTH="200PX">
						<COL WIDTH="250PX">
					</COLGROUP>
					<tr style="background-color: lightblue;">
						<td>選択</td>
						<td>登録日時</td>
						<td>名前</td>
					</tr>
					<tr style="background-color: lightblue;">
						<td colspan="3">内容</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
</table>




</body>
</html>