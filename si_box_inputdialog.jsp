<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="si_box_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var si_box_inputdialog = null;
		$(function() {
			si_box_inputdialog = $("#si_box_inputdialog").dialog({
				title : "箱詰め",
				autoOpen : false,
				resizable : false,
				height : 900,
				width : 1400,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					setTimeout(function(){
						Efw('menu_goto',{page:'si_delivery.jsp',shop:$("#shop").val()})
						},
						100
						);
				},
			});


			if($("#shop").val() == "Smart-Bear"){
				$(".newshop").show();
				$(".oldshop").hide();
			}
			if($("#shop").val() == "Smart-KM"){
				$(".oldshop").show();
				$(".newshop").hide();
			}

			$("#scanInput").focus();

		});

		function addbox(){

			var addboxcount = parseInt($("#maxboxcount").val()) + 1;
			$title_td = $("<TD>箱No." + addboxcount + "<input type='radio' name='boxno' value='" + addboxcount + "' onclick='' checked></TD>");
			$data_td = $("<td></td>");
			$("#boxinfo>thead>tr").append($title_td);
			$("#boxinfo>tbody>tr").append($data_td);

			$("#maxboxcount").val(addboxcount);
			
		}

		function displayToTable(pno, color, size, sku, asin){

			var colq = 0;

			var overflg = false;

			var opttype = parseInt($("input[name='opttype']:checked").val());

			alert(opttype);

			$("#boxinfobody").find("tr").each(function(){

				var tdArr = $(this).children();

				// 列の数
				colq = tdArr.length;
				
			    var td_sku = tdArr.eq(3).html();
				var td_asin = tdArr.eq(4).html();

			    if(sku == td_sku || asin == td_asin){

					// 箱詰め数量+1
					var boxCol = 6 + parseInt($("input[name='boxno']:checked").val());

					var td_q = tdArr.eq(boxCol).html().length <= 0 ? 0 : parseInt(tdArr.eq(boxCol).html());
					tdArr.eq(boxCol).html(td_q + 1);

					// 実際数量+1
					tdArr.eq(6).html(parseInt(tdArr.eq(6).html()) + 1);

					// 予定数量
					if(parseInt(tdArr.eq(5).html()) < parseInt(tdArr.eq(6).html())){

						if(parseInt(tdArr.eq(5).html()) == 0){
							var audioElement = document.createElement('audio');
		        				audioElement.setAttribute('src', 'chaochuzhonglei.mp3');
								audioElement.setAttribute('autoplay', 'autoplay');

						}else{
							var audioElement = document.createElement('audio');
		        				audioElement.setAttribute('src', 'shuliangchaoguo.mp3');
								audioElement.setAttribute('autoplay', 'autoplay');

						}

						overflg = true;

						return;
					}
					
					var audioElement = document.createElement('audio');
					audioElement.setAttribute('src', 'facai.mp3');
					audioElement.setAttribute('autoplay', 'autoplay');

					overflg = true;

					return;

			    }
			     
			});

			if(overflg){
				$("#scanInput").val("");
				return;// 処理終了
			}

			// 箱部分の列数
			var boxq = colq - 7;
			// 操作対象箱
			var boxno = parseInt($("input[name='boxno']:checked").val());

			var boxhtml = "";
			for(var i = 1;i <= boxq;i++){
				if(boxq == boxno){
					boxhtml = boxhtml + "<TD>1</TD>";
				}else{
					boxhtml = boxhtml + "<TD></TD>";
				}
				
			}

			var resultHTML = 
				"<TR style='height:40px;'>" +
					"<TD>" + pno + "</TD>" +	// 商品管理番号
					"<TD>" + color + "</TD>" +	// 色
					"<TD>" + size + "</TD>" +	// サイズ
					"<TD>" + sku + "</TD>" +	// SKU
					"<TD>" + asin + "</TD>" +	// ASIN
					"<TD>0</TD>" +				// 予定数量
					"<TD>1</TD>" +				// 実際数量
					boxhtml +					// 箱No.1
				"</TR>";

			$("#boxinfobody").append(resultHTML);

			var audioElement = document.createElement('audio');
		        	audioElement.setAttribute('src', 'chaochuzhonglei.mp3');
					audioElement.setAttribute('autoplay', 'autoplay');

			$("#scanInput").val("");

		}

		function errorMsg(){

			$("#scanInput").val("");

			// ダメの音声
			var audioElement = document.createElement('audio');
			audioElement.setAttribute('src', 'damei.mp3');
			audioElement.setAttribute('autoplay', 'autoplay');

		}
		function inputLabel(obj){

			if($(obj).val().length == 10 && $(obj).val().startsWith("X000")){
			
				// 商品情報取得
				Efw('searchProductInfoByLabel',{"labelno" : $(obj).val()});

			}else{

				return;
			}

		}

		function savebox(){

			var skuArr = new Array();
			var asinArr = new Array();
			var qArr = new Array();

			

			$("#boxinfobody").find("tr").each(function(){

				var tdArr = $(this).children();

				var td_sku = tdArr.eq(3).html();
				var td_asin = tdArr.eq(4).html();
				var td_q = tdArr.eq(6).html();

				if(parseInt(td_q) > 0){
					skuArr[skuArr.length] = td_sku;
					asinArr[asinArr.length] = td_asin;
					qArr[qArr.length] = td_q;
				}
			
			});

			//alert(skuArr);alert(asinArr);alert(qArr);

			Efw('savebox',{"skuArr" : skuArr, "asinArr" : asinArr, "qArr" : qArr});
		}

	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="0">
		<COLGROUP>
			<COL WIDTH="100PX">
			<COL WIDTH="250PX">
			<COL WIDTH="350PX">
			<COL>
			<COL WIDTH="100PX">
		</COLGROUP>
		<TR style="height:40px;">
			<TD>スキャン欄</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;ime-mode:disabled;" autocomplete="off" id="scanInput" oninput="inputLabel(this);" maxlength="10" onblur="this.focus();"></TD>
			<TD>
				<input type="radio" name="opttype" value="1" onclick="" checked>増加操作(+)
				<input type="radio" name="opttype" value="-1" onclick="" >減少操作(-)
			</TD>
			<TD>
				<DIV STYLE="TEXT-ALIGN: CENTER">
					<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savebox();" >確定</BUTTON>
					<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_box_inputdialog.dialog('close');" >キャンセル</BUTTON>
				</DIV>
			</TD>
			<TD>
				<input type="button" style="text-align: right;float: right;" value="箱増加" onclick="addbox();">
			</TD>
		</TR>
	</TABLE>
	<TABLE BORDER="1" id="boxinfo">
		<thead>
			<TR style="height:40px;background-color: aquamarine;">
				<TD style="width: 100px;">商品管理番号</TD>
				<TD style="width: 100px;">色</TD>
				<TD style="width: 100px;">サイズ</TD>
				<TD style="width: 100px;">SKU番号</TD>
				<TD style="width: 100px;">ASIN番号</TD>
				<TD style="width: 100px;">予定数量</TD>
				<TD style="width: 100px;">実際数量</TD>
				<TD style="width: 100px;">箱No.1<input type="radio" name="boxno" value="1" onclick="" checked></TD>
			</TR>
		</thead>
		<tbody id="boxinfobody">
			<TR style="height:40px;">
				<TD>T001</TD>
				<TD>ピンク</TD>
				<TD>XL</TD>
				<TD>1A-NZX0-PYW2</TD>
				<TD>B07RP5SL37</TD>
				<TD>99</TD>
				<TD>19</TD>
				<TD>19</TD>
			</TR>
		</tbody>
	</TABLE>
	<INPUT TYPE="HIDDEN" id="maxboxcount" value="1">
	<INPUT TYPE="HIDDEN" CLASS="action">
	<BR>
</DIV>

