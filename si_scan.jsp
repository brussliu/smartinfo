<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>マスタ情報</title>
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

            var page = "商品スキャン";

            var t = page + "（" + shop + "）" + $("#pagehead").html();

            $("#pagehead").html(t);

            $("#shop").val(shop);
		 
		});

		function checkInput(obj){

			if($(obj).val().length == 0){

			}else if($(obj).val().length == 10 && $(obj).val().startsWith("X000")){

			}else{

				$(obj).focus();
			}
		}

		function inputLabel(obj,n){

			//Efw('searchmaster');

			if($(obj).val().length == 10 && $(obj).val().startsWith("X000")){
				//alert($(obj).val());

				// 商品管理コード取得
				

				// 画面表示
				// 商品管理コード表示

				// 数量表示

				var row = $(obj).parent().parent().parent().find("tr").length;
				var count = (row - 2) * 10 + n;
				$(obj).parent().parent().parent().children(":first").children(":first").children(":last").html("数量：" + count);

				//音声

		        var audioElement = document.createElement('audio');
		        audioElement.setAttribute('src', 'facai.mp3');
		        audioElement.setAttribute('autoplay', 'autoplay');

				//次の入力欄生成
				

				if(n < 10){

					var next = $(obj).parent().next().children();

					if(next.length > 0){


					}else{

						var html = "<INPUT TYPE='TEXT' STYLE='WIDTH:100%;height:30px;ime-mode:disabled;' value='' oninput='inputLabel(this," + (n+1) + ");' maxlength='10' onblur='checkInput(this);'>";
						$(obj).parent().next().html(html);
						$(obj).parent().next().children().focus();

					}

				}else{

					var next = $(obj).parent().parent().next().children().children();

					if(next.length > 0){


					}else{

						var $tdName1 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'><INPUT TYPE='TEXT' STYLE='WIDTH:100%;height:30px;ime-mode:disabled;' value='' oninput='inputLabel(this,1);' maxlength='10' onblur='checkInput(this);'></td>");
						var $tdName2 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName3 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName4 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName5 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName6 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName7 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName8 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName9 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
						var $tdName10 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");

						var $tr = $("<tr></tr>");
						$tr.append($tdName1);
						$tr.append($tdName2);
						$tr.append($tdName3);
						$tr.append($tdName4);
						$tr.append($tdName5);
						$tr.append($tdName6);
						$tr.append($tdName7);
						$tr.append($tdName8);
						$tr.append($tdName9);
						$tr.append($tdName10);


						$(obj).parent().parent().parent().append($tr);

						$(obj).parent().parent().next().children().children().focus();

					}

				}

			}else{

				return;
			}

		}

		function addgroup(){

			var addhtml = $("#plist0").html();

			$("#plist").append("<br/>");

			$("#plist").append(addhtml);

			$("#plist").children(":last").show();

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
<body style="background-color:ghostwhite;">
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<input type="hidden" id="shop">
<br/>
<input type="button" id="addgroup" style="width: 170px;height: 30px;" value="新規グループ" onclick="addgroup();">
<input type="button" id="importstock" style="width: 170px;height: 30px;" value="集計" onclick="liststock();">
<br/><br/>
<table border="1">
	<tr>
		<td>
			スキャンコード：<input type="text" id="" style="width: 120px;height: 32px;">&nbsp;
			名前：<input type="text" id="" style="width: 200px;height: 32px;">&nbsp;
			内容：<input type="text" id="" style="width: 300px;height: 32px;">
			<div style="width: 1300px;height: 750px;">
				<table border="1">
					<COLGROUP>
						<COL WIDTH="50PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="100PX">
						<COL WIDTH="600PX">
						<COL WIDTH="100PX">
					</COLGROUP>
					<tr style="background-color: lightblue;">
						<td>No</td>
						<td>SKU番号</td>
						<td>ASIN番号</td>
						<td>ラベル番号</td>
						<td>商品名称</td>
						<td>数量</td>
					</tr>
					<tr>
						<td>1</td>
						<td>123456789012345</td>
						<td>123456789012345</td>
						<td>123456789012345</td>
						<td>【Smart-Bear】W502 スポーツソックス プロ用スキーソックス 子供用 厚手のニット 冬用 登山 遠足 スポーツソックス 男の子 女の子 2足入り</td>
						<td>999</td>
					</tr>
					<tr>
						<td>1</td>
						<td>123456789012345</td>
						<td>123456789012345</td>
						<td>123456789012345</td>
						<td>【Smart-Bear】W502 スポーツソックス プロ用スキーソックス 子供用 厚手のニット 冬用 登山 遠足 スポーツソックス 男の子 女の子 2足入り</td>
						<td>999</td>
					</tr>
				</table>
			</div>
		</td>
		<td style="text-align: top;">
			<div style="width: 500px;height: 750px;">
				<table border="1">
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
					<tr>
						<td><input type="radio" name=""></td>
						<td>2022/12/31 12:23:23</td>
						<td>XXXXXXXXXXXXXXE</td>
					</tr>
					<tr>
						<td colspan="3">W001,W002,W003</td>
					</tr>
				</table>
			</div>
		</td>
	</tr>
</table>




</body>
</html>