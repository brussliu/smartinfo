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
				height : 1000,
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

	</SCRIPT>
	<style>
		.img {
		 height: 160px;
		 width: 160px;
		 display: none;
		 //padding-left: 17px;
		}
		.SELECTED{
			background-color: rgb(0,255,255);
		}

		.picdiv{
			margin-left: 15px;
			float: left; 
			border-width: 1px;
			border-style: solid;
			width: 160px;height: 160px;
			border-color: gray;
		}
    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1">
		<COLGROUP>
			<COL WIDTH="100PX">
			<COL WIDTH="250PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>スキャン欄</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productid"></TD>
			<TD>
				<input type="radio" name="opttype" value="10" onclick="activebutton();">増加操作(+)
				<input type="radio" name="opttype" value="20" onclick="activebutton();">減少操作(-)
			</TD>

		</TR>
		<!--
		<TR style="height:40px;">
			<TD>商品分類</TD>
			<TD>
				<select STYLE="WIDTH:200px;height:32px;" id="productdiv">
					<option id="" class=""></option>	
					<option id="01" class="newshop">01:レインコート</option>	
					<option id="05" class="newshop">05:傘</option>
					<option id="08" class="newshop">08:雨靴</option>
					<option id="21" class="newshop">21:靴下（夏用）</option>
					<option id="22" class="newshop">22:靴下（秋冬用）</option>
					<option id="31" class="newshop">31:パジャマ</option>
					<option id="41" class="newshop">41:バスタオル</option>
					<option id="050" class="oldshop">050:スマホケース</option>
					<option id="100" class="oldshop">100:スマホ保護フィルム</option>
					<option id="150" class="oldshop">150:スマホカメラ保護フィルム</option>
					<option id="180" class="oldshop">180:充電ケーブル</option>
					<option id="190" class="oldshop">190:無線充電器</option>
					<option id="200" class="oldshop">200:スポーツ用品</option>
					<option id="210" class="oldshop">210:自撮りライト</option>
					<option id="250" class="oldshop">250:スタンド</option>
					<option id="300" class="oldshop">300:イヤホン</option>
					<option id="350" class="oldshop">350:扇風機</option>
					<option id="400" class="oldshop">400:タブレットケース</option>
					<option id="500" class="oldshop">500:セクシー下着</option>
					<option id="600" class="oldshop">600:レインコート</option>
					<option id="900" class="oldshop">900:その他</option>
				</select>
			</TD>
			<TD>商品名称</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" STYLE="WIDTH:100%;height:30px;" id="productname"></TD>
		</TR>

		<TR style="height:40px;">
			<TD>子商品選択</TD>
			<TD colspan="5">
				<INPUT TYPE="TEXT" ID="txt_freeWord" STYLE="WIDTH:200px;height:30px;">
				<input type="button" id="searchsubproduct" style="width: 80px;" value="検索" onclick="Efw('searchsubproduct')">
			</TD>
		</TR>
		<TR>
			<TD></TD>
			<TD colspan="5">
				<DIV style="height:200px;width:1200px;overflow:auto;background:#F1F1F1;">
					<TABLE border="1" style="font-size: 12px;width: 100%">
						<COLGROUP>
							<COL WIDTH="50PX">
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
							<COL>
						</COLGROUP>
						<TR>
							<TH>選択</TH>
							<TH>SKU番号</TH>
							<TH>ASIN番号</TH>
							<TH>商品名称</TH>
						</TR>
					</TABLE>
					<TABLE border="1" style="font-size: 12px;width: 100%" id="subproduct">
						<COLGROUP>
							<COL WIDTH="50PX">
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
							<COL>
						</COLGROUP>
					</TABLE>
				</DIV>
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD></TD>
			<TD style="text-align: center;" colspan="5">
				<input type="button" id="addsub" style="width: 80px;" value="▼" onclick="addsub()" disabled>
				<input type="button" id="delsub" style="width: 80px;" value="▲" onclick="delsub()" disabled>
				<div style="float: right;">
					バリエーション種類：
					<input type="radio" name="ptype" value="10" onclick="activebutton();">color
					<input type="radio" name="ptype" value="20" onclick="activebutton();">size
					<input type="radio" name="ptype" value="30" onclick="activebutton();">color-size
					<input type="radio" name="ptype" value="40" onclick="activebutton();">size-color
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				</div>

			</TD>
		</TR>
		<TR>
			<TD style="text-align: center;">
				<input type="button" style="text-align: center;width: 50px;" value="▲" onclick="moveup();">
				<br/><br/>
				<input type="button" style="text-align: center;width: 50px;" value="▼" onclick="movedown();">
				<br/><br/>
				<input type="button" style="text-align: center;width: 50px;" value="×" onclick="clearTR()">
			</TD>
			<TD colspan="5">
				<DIV style="height:200px;width:1200px;overflow:auto;background:#F1F1F1;">
					<TABLE border="1" style="font-size: 12px;width: 100%">
						<COLGROUP>
							<COL WIDTH="50PX">
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
							<COL>
							<COL WIDTH="150PX">
							<COL WIDTH="150PX">
						</COLGROUP>
						<TR>
							<TH>選択</TH>
							<TH>SKU番号</TH>
							<TH>ASIN番号</TH>
							<TH>商品名称</TH>
							<TH>color</TH>
							<TH>size</TH>
						</TR>
					</TABLE>
					<TABLE border="1" style="font-size: 12px;width: 100%" id="selectedsubproduct">
						<COLGROUP>
							<COL WIDTH="50PX">
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
							<COL>
							<COL WIDTH="150PX">
							<COL WIDTH="150PX">
						</COLGROUP>
					</TABLE>
				</DIV>
				<input type="button" style="text-align: right;float: right;" value="確定" onclick="makepicarea();">
			</TD>
		</TR>
		<TR style="height:220px;">
			<TD>商品写真</TD>
			<TD colspan="5">
				<div style="display: inline;width: 100%;height: 100%" id="allpic">

				</div>
			</TD>
		</TR>
		-->
	</TABLE>
	<TABLE STYLE="WIDTH: 100%" BORDER="1">
		<COLGROUP>
			<COL WIDTH="100PX">
			<COL WIDTH="100PX">
			<COL WIDTH="100PX">
			<COL WIDTH="100PX">
			<COL WIDTH="100PX">
			<COL WIDTH="100PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>商品管理番号</TD>
			<TD>色</TD>
			<TD>サイズ</TD>
			<TD>予定数量</TD>
			<TD>実際数量</TD>
			<TD>箱No.1</TD>
			<TD><input type="button" style="text-align: right;float: right;" value="＋" onclick="addbox();"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>T001</TD>
			<TD>ピンク</TD>
			<TD>XL</TD>
			<TD>99</TD>
			<TD>19</TD>
			<TD>19</TD>
			<TD></TD>
		</TR>
	</TABLE>

	<INPUT TYPE="HIDDEN" CLASS="action">
	<BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savebox()" >確定</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_box_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

