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

		// function getstrcount(str1,str2){

		// 	var count = 0;

		// 	var strArr = str1.split(str2);

		// 	return strArr.length - 1;

		// }

		// function getsubinfo(productname){

		// 	var subinfo = "";
		// 	if(productname.indexOf("(") <= 0){
		// 		return subinfo;
		// 	}

		// 	var left = productname.lastIndexOf("(");
		// 	var temp = productname;

		// 	for(var j=0; j<999; j++){
				
		// 		subinfo = productname.substring(left + 1,productname.lastIndexOf(")"));

		// 		var countleft = getstrcount(subinfo,"(");
		// 		var countright = getstrcount(subinfo,")");

		// 		if(countleft == countright){

		// 			break;
		// 		}else{

		// 			temp = temp.substring(0,temp.lastIndexOf("("));
		// 			left = temp.lastIndexOf("(");
		// 		}

		// 	}
		// 	return subinfo;
		// }



		// function addsub(){

		// 	var ptype = $('input:radio[name=ptype]:checked').val();

		// 	$("#subproduct").find("tr").each(function(){

		// 	    var tdArr = $(this).children();
		// 	    var checkflg = tdArr.eq(0).children()[0].checked;

		// 	    if(checkflg){
		// 	    	var $tr = $(this).clone(true);

		// 			$tr.click(function(){
		// 				$(this).addClass("SELECTED").siblings().removeClass("SELECTED");
		// 			});

		// 			var pn = tdArr.eq(3).html();
		// 			var color = " ";
		// 			var size = " ";

		// 			var subinfo = getsubinfo(pn);

		// 			if(ptype == "10"){
		// 				color = subinfo;
		// 			}

		// 			if(ptype == "20"){
		// 				size = subinfo;
		// 			}
		// 			if(ptype == "30"){//color-size

		// 				var strArr = subinfo.split(",");
		// 				color = strArr[0].trim();
		// 				size = strArr[1].trim();
		// 			}
		// 			if(ptype == "40"){//size-color

		// 				var strArr = subinfo.split(",");
		// 				color = strArr[1].trim();
		// 				size = strArr[0].trim();
		// 			}

		// 	    	$tr.append("<td>"+color+"</td>");
		// 	    	$tr.append("<td>"+size+"</td>");


		// 	        $('#selectedsubproduct').append($tr);
		// 	        $(this).remove();
		// 	    }
			     
		// 	});

		// }

		// function delsub(){

		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    var tdArr = $(this).children();
		// 	    var checkflg = tdArr.eq(0).children()[0].checked;

		// 	    tdArr[tdArr.length-1].remove();
		// 	    tdArr[tdArr.length-2].remove();

		// 	    if(checkflg){
		// 	    	var $tr = $(this).clone(true);

		// 	        $('#subproduct').append($tr);
		// 	        $(this).remove();
		// 	    }
			     
		// 	});

		// }

		// function savemaster(){

		// 	var skuArr = new Array();
		// 	var asinArr = new Array();
		// 	var colorArr = new Array();
		// 	var sizeArr = new Array();
		// 	var picArr = new Array();
		// 	var picColorArr = new Array();


		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    var tdArr = $(this).children();
		// 	    var sku = tdArr.eq(1).html();
		// 		var asin = tdArr.eq(2).html();
		// 		var color = tdArr.eq(4).html();
		// 		var size = tdArr.eq(5).html();
		// 		//alert(color);
		// 		//alert(size);
		// 		skuArr.push(sku);
		// 		asinArr.push(asin);
		// 		colorArr.push(color);
		// 		sizeArr.push(size);
		// 	});

		// 	$("#allpic").find("input").each(function(){

		// 		if($(this).attr("type") == "hidden"){
		// 			var picsrc = $(this).val();
		// 			var piccolor = $(this).next().html();
		// 			picColorArr.push(piccolor);
		// 			picArr.push(picsrc);
		// 		}

		// 	});


		// 	Efw('savemaster',{"subsku": skuArr ,"subasin": asinArr,"subcolor": colorArr,"subsize": sizeArr,"picStr":picArr,"picColor":picColorArr });

		// }

		// function uplaodPic(obj){

		// 	$(obj).next().click();
		// }

		// function makepicarea(){

		// 	$("#allpic").find("div").each(function(){
		// 		$(this).remove();
		// 	});

		// 	var colorArr = new Array();

		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    var tdArr = $(this).children();

		// 	    var color = tdArr.eq(4).html();
		// 	    if(colorArr.indexOf(color) < 0){
		// 	    	colorArr.push(color);
		// 	    }

		// 	});

		// 	for(var i=0;i < colorArr.length;i ++){

		// 		var color = colorArr[i];

		// 		var pichtml = 
		// 	    	"<div id='imgPreview_" + color + "' class='picdiv'>"+
		// 				"<div id='prompt_" + color + "' style='text-align: center;''>"+
		// 					"<img src='img/pic.png' style='width: 100px;height: 100px;padding-top: 30px;' onclick='uplaodPic(this);'>"+
		// 					"<input type='file' id='productpic" + color + "' style='display: none;' onchange='changepic(this)'>"+
		// 				"</div>"+
		// 				"<img src='#' id='img_" + color + "' class='img'/>"+
		// 				"<input type='hidden' id='productpicStr'>"+
		// 				"<div style='text-align: center;width: 160px;'>" + color + "</div>"+
		// 			"</div>";


		// 	    $("#allpic").append(pichtml);
		// 	}


		// }

		// function changepic(obj) {
		
		// 	//$("#prompt3").css("display", "none");
		// 	$(obj).parent().css("display", "none");

			
		// 	var reads = new FileReader();
		// 	//f = document.getElementById('productpic').files[0];
		// 	f = $(obj)[0].files[0];

		// 	reads.readAsDataURL(f);
		// 	reads.onload = function(e) {
		// 		//document.getElementById('img3').src = this.result;

		// 		$(obj).parent().next().attr("src",this.result);

		// 		$(obj).parent().next().css("display", "block");
		// 		//$("#productpicStr").val(reads.result);

		// 		var image = new Image();
        // 		image.src=e.target.result;
        // 		image.onload = function(){
        //   			square = 0.2,   //定义画布的大小，也就是图片压缩之后的像素
        //         	canvas = document.createElement('canvas'), //创建canvas元素
        //         	context = canvas.getContext('2d'),
        //         	imageWidth = Math.round(square*image.width),    //压缩图片的大小
        //         	imageHeight = Math.round(square*image.height),
        //         	data = '';

        // 			canvas.width = imageWidth;
        // 			canvas.height = imageHeight;
        // 			context.clearRect(0, 0, imageWidth, imageHeight);  //在给定矩形内清空一个矩形
        // 			context.drawImage(this, 0, 0, imageWidth, imageHeight);
        // 			var data = canvas.toDataURL('image/jpeg',0.6);

        // 			$(obj).parent().next().next().val(data);
        // 		};

		// 	};
		// }
		// function selectTR(obj) {
		// 	$(obj).addClass("SELECTED").siblings().removeClass("SELECTED");
		// }
		// function moveup(){

		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    if($(this).hasClass("SELECTED")){
					
		// 			$(this).prev("tr").before($(this));

		// 	    }
				     
		// 	});

		// }

		// function movedown(){

		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    if($(this).hasClass("SELECTED")){
					
		// 			$(this).before($(this).next("tr"));
		// 	    }
				     
		// 	});

		// }

		// function clearTR(){

		// 	$("#selectedsubproduct").find("tr").each(function(){

		// 	    if($(this).hasClass("SELECTED")){
					
		// 			$(this).remove();

		// 	    }
				     
		// 	});

		// }

		// function activebutton(){
		// 	$("#addsub").attr("disabled",false);
		// 	$("#delsub").attr("disabled",false);
		// }
		function addbox(){

			var addboxcount = parseInt($("#maxboxcount").val()) + 1;
			$title_td = $("<TD>箱No." + addboxcount + "<input type='radio' name='boxno' value='" + addboxcount + "' onclick='' checked></TD>");
			$data_td = $("<td></td>");
			$("#boxinfo>thead>tr").append($title_td);
			$("#boxinfo>tbody>tr").append($data_td);

			$("#maxboxcount").val(addboxcount);
			
		}

		function displayToTable(pno, sku, asin){

			var colq = 0;

			$("#boxinfobody").find("tr").each(function(){

				var tdArr = $(this).children();

				alert(tdArr);
				// 列の数
				colq = tdArr.length;
				alert(colq);
				
			    var td_sku = tdArr.eq(3).html();
				var td_asin = tdArr.eq(4).html();

			    if(sku == td_sku || asin == td_asin){

					// 箱詰め数量+1
					var boxCol = 6 + parseInt($("input[name='boxno']:checked").val());
					alert(boxCol);

					var td_q = tdArr.eq(boxCol).html().length <= 0 ? 0 : parseInt(tdArr.eq(boxCol).html());
					tdArr.eq(boxCol).html(td_q + 1);

					// 実際数量+1
					tdArr.eq(6).html(parseInt(tdArr.eq(6).html()) + 1);

					// // 予定数量
					// if(parseInt(tdArr.eq(6).html()) < td_q){
					// 	var audioElement = document.createElement('audio');
		        	// 	audioElement.setAttribute('src', 'shuliangchaoguo.mp3');
					// 	audioElement.setAttribute('autoplay', 'autoplay');
					// 	return;
					// }

					var audioElement = document.createElement('audio');
		        	audioElement.setAttribute('src', 'facai.mp3');
					audioElement.setAttribute('autoplay', 'autoplay');

					$("#scanInput").val("");

					return;

			    }
			     
			});

			// // 箱部分の列数
			// var boxq = colq - 5;
			// // 操作対象箱
			// var boxno = parseInt($("input[name='boxno']:checked").val());

			// var boxhtml = "";
			// for(var i = 1;i <= boxq;i++){
			// 	if(boxq == boxno){
			// 		boxhtml = boxhtml + "<TD>1</TD>";
			// 	}else{
			// 		boxhtml = boxhtml + "<TD></TD>";
			// 	}
				
			// }

			// var resultHTML = 
			// 	"<TR style='height:40px;'>" +
			// 		"<TD>" + pno + "</TD>" +	// 商品管理番号
			// 		"<TD>" + color + "</TD>" +	// 色
			// 		"<TD>" + size + "</TD>" +	// サイズ
			// 		"<TD>0</TD>" +				// 予定数量
			// 		"<TD>1</TD>" +				// 実際数量
			// 		boxhtml +					// 箱No.1
			// 	"</TR>";
			// $("#boxinfobody").append();

			// var audioElement = document.createElement('audio');
		    //     	audioElement.setAttribute('src', 'chaochuzhonglei.mp3');
			// 		audioElement.setAttribute('autoplay', 'autoplay');

		}

		function inputLabel(){

			if($("#scanInput").val().length != 10 || !$("#scanInput").val().startsWith("X000")){
			
				// ダメの音声
				var audioElement = document.createElement('audio');
		        audioElement.setAttribute('src', 'dame.mp3');
				audioElement.setAttribute('autoplay', 'autoplay');
				
				return;
			}

			// 商品情報取得
			Efw('searchProductInfoByLabel',{"labelno" : $("#scanInput").val()});

				// 画面表示
				// 商品管理コード表示

				// 数量表示

				// var row = $(obj).parent().parent().parent().find("tr").length;
				// var count = (row - 2) * 10 + n;
				// $(obj).parent().parent().parent().children(":first").children(":first").children(":last").html("数量：" + count);

				//音声

		        // var audioElement = document.createElement('audio');
		        // audioElement.setAttribute('src', 'facai.mp3');
		        // audioElement.setAttribute('autoplay', 'autoplay');

				//次の入力欄生成
				

				// if(n < 10){

				// 	var next = $(obj).parent().next().children();

				// 	if(next.length > 0){


				// 	}else{

				// 		var html = "<INPUT TYPE='TEXT' STYLE='WIDTH:100%;height:30px;ime-mode:disabled;' value='' oninput='inputLabel(this," + (n+1) + ");' maxlength='10' onblur='checkInput(this);'>";
				// 		$(obj).parent().next().html(html);
				// 		$(obj).parent().next().children().focus();

				// 	}

				// }else{

				// 	var next = $(obj).parent().parent().next().children().children();

				// 	if(next.length > 0){


				// 	}else{

				// 		var $tdName1 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'><INPUT TYPE='TEXT' STYLE='WIDTH:100%;height:30px;ime-mode:disabled;' value='' oninput='inputLabel(this,1);' maxlength='10' onblur='checkInput(this);'></td>");
				// 		var $tdName2 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName3 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName4 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName5 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName6 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName7 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName8 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName9 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");
				// 		var $tdName10 = $("<td style='width: 100px;font-size: 14px;font-weight: bold;'></td>");

				// 		var $tr = $("<tr></tr>");
				// 		$tr.append($tdName1);
				// 		$tr.append($tdName2);
				// 		$tr.append($tdName3);
				// 		$tr.append($tdName4);
				// 		$tr.append($tdName5);
				// 		$tr.append($tdName6);
				// 		$tr.append($tdName7);
				// 		$tr.append($tdName8);
				// 		$tr.append($tdName9);
				// 		$tr.append($tdName10);


				// 		$(obj).parent().parent().parent().append($tr);

				// 		$(obj).parent().parent().next().children().children().focus();

				// 	}

				// }


		}




	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="0">
		<COLGROUP>
			<COL WIDTH="100PX">
			<COL WIDTH="250PX">
			<COL>
			<COL WIDTH="100PX">
		</COLGROUP>
		<TR style="height:40px;">
			<TD>スキャン欄</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="scanInput" oninput="inputLabel();" maxlength="10" onblur=""></TD>
			<TD>
				<input type="radio" name="opttype" value="10" onclick="" checked>増加操作(+)
				<input type="radio" name="opttype" value="20" onclick="">減少操作(-)
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
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savebox()" >確定</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_box_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

