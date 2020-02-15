<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="si_master_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var si_master_inputdialog = null;
		$(function() {
			si_master_inputdialog = $("#si_master_inputdialog").dialog({
				title : "親商品登録",
				autoOpen : false,
				resizable : false,
				height : 800,
				width : 1200,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					setTimeout(function(){
						Efw('menu_goto',{page:'si_master.jsp',shop:$("#shop").val()})
						},
						100
						);
				},
			});
		});

		function addsub(){

			var ptype = $('input:radio[name=ptype]:checked').val();

			$("#subproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var checkflg = tdArr.eq(0).children()[0].checked;

			    if(checkflg){
			    	var $tr = $(this).clone(true);

					$tr.click(function(){
						$(this).addClass("SELECTED").siblings().removeClass("SELECTED");
					});

					var pn = tdArr.eq(3).html();
					var color = " ";
					var size = " ";
					if(ptype == "10"){
						color = pn.substring(pn.lastIndexOf("(")+1,pn.lastIndexOf(")"));
					}

					if(ptype == "20"){
						size = pn.substring(pn.lastIndexOf("(")+1,pn.lastIndexOf(")"));
					}
					if(ptype == "30"){//color-size
						var str = pn.substring(pn.lastIndexOf("(")+1,pn.lastIndexOf(")"));

						var strArr = str.split(",");
						color = strArr[0].trim();
						size = strArr[1].trim();
					}
					if(ptype == "40"){//size-color
						var str = pn.substring(pn.lastIndexOf("(")+1,pn.lastIndexOf(")"));

						var strArr = str.split(",");
						color = strArr[1].trim();
						size = strArr[0].trim();
					}

			    	$tr.append("<td>"+color+"</td>");
			    	$tr.append("<td>"+size+"</td>");


			        $('#selectedsubproduct').append($tr);
			        $(this).remove();
			    }
			     
			});

		}

		function delsub(){

			$("#selectedsubproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var checkflg = tdArr.eq(0).children()[0].checked;

			    tdArr[tdArr.length-1].remove();
			    tdArr[tdArr.length-2].remove();

			    if(checkflg){
			    	var $tr = $(this).clone(true);

			        $('#subproduct').append($tr);
			        $(this).remove();
			    }
			     
			});

		}

		function savemaster(){

			var skuArr = new Array();
			var asinArr = new Array();
			var colorArr = new Array();
			var sizeArr = new Array();


			$("#selectedsubproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var sku = tdArr.eq(1).html();
				var asin = tdArr.eq(2).html();
				var color = tdArr.eq(4).html();
				var size = tdArr.eq(5).html();
				//alert(color);
				//alert(size);
				skuArr.push(sku);
				asinArr.push(asin);
				colorArr.push(color);
				sizeArr.push(size);
			});

			alert(colorArr.length);
			alert(sizeArr.length);

			Efw('savemaster',{"subsku": skuArr ,"subasin": asinArr,"subcolor": colorArr,"subsize": sizeArr });

		}

		function uplaodPic(){
			$("#productpic").click();
		}

		function changepic() {
		
			$("#prompt3").css("display", "none");
			
			var reads = new FileReader();
			f = document.getElementById('productpic').files[0];

			reads.readAsDataURL(f);
			reads.onload = function(e) {
				document.getElementById('img3').src = this.result;
				$("#img3").css("display", "block");
				//$("#productpicStr").val(reads.result);

				var image = new Image();
        		image.src=e.target.result;
        		image.onload = function(){
          			square = 0.2,   //定义画布的大小，也就是图片压缩之后的像素
                	canvas = document.createElement('canvas'), //创建canvas元素
                	context = canvas.getContext('2d'),
                	imageWidth = Math.round(square*image.width),    //压缩图片的大小
                	imageHeight = Math.round(square*image.height),
                	data = '';

        			canvas.width = imageWidth;
        			canvas.height = imageHeight;
        			context.clearRect(0, 0, imageWidth, imageHeight);  //在给定矩形内清空一个矩形
        			context.drawImage(this, 0, 0, imageWidth, imageHeight);
        			var data = canvas.toDataURL('image/jpeg',0.6);

        			$("#productpicStr").val(data);
        		};

			};
		}
		function selectTR(obj) {
			$(obj).addClass("SELECTED").siblings().removeClass("SELECTED");
		}
		function moveup(){

			$("#selectedsubproduct").find("tr").each(function(){

			    if($(this).hasClass("SELECTED")){
					
					$(this).prev("tr").before($(this));

			    }
				     
			});

		}
		function movedown(){

			$("#selectedsubproduct").find("tr").each(function(){

			    if($(this).hasClass("SELECTED")){
					
					$(this).before($(this).next("tr"));
			    }
				     
			});

		}

		function activebutton(){
			$("#addsub").attr("disabled",false);
			$("#delsub").attr("disabled",false);
		}
	</SCRIPT>
	<style>
		#img3 {
		 height: 200px;
		 width: 200px;
		 display: none;
		 padding-left: 17px;
		}
		.SELECTED{
			background-color: rgb(0,255,255);
		}
    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1">
		<COLGROUP>
			<COL WIDTH="120PX">
			<COL WIDTH="800PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>商品管理番号</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productid"></TD>
			<TD rowspan="6" style="text-align: center;">
				<div id="imgPreview">
					<div id="prompt3">
						<img src="img/pic.png" style="width: 100px;height: 100px;" onclick="uplaodPic();">
						<input type="file" id="productpic" style="display: none;" class="filepath" 
						onchange="changepic(this)" accept="image/jpg,image/jpeg,image/png,image/PNG">
					</div>
					<img src="#" id="img3" />
					<input type="hidden" id="productpicStr">
				</div>
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD>商品分類</TD>
			<TD>
				<select STYLE="WIDTH:200px;height:32px;" id="productdiv">
					<option id="01">01:レインコート</option>	
					<option id="05">05:傘</option>
					<option id="21">21:靴下（夏用）</option>
					<option id="22">22:靴下（秋冬用）</option>
					<option id="31">31:パジャマ</option>
					<option id="41">41:バスタオル</option>
				</select>
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD>SKU番号</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="sku"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>ASIN番号</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="asin"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>商品名称</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:700px;height:30px;" id="productname"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>子商品選択</TD>
			<TD>
				<INPUT TYPE="TEXT" ID="txt_freeWord" STYLE="WIDTH:200px;height:30px;">
				<input type="button" id="searchsubproduct" style="width: 80px;" value="検索" onclick="Efw('searchsubproduct')">
			</TD>
		</TR>
		<TR>
			<TD></TD>
			<TD colspan="2">
				<DIV style="height:150px;width:1000px;overflow:auto;background:#F1F1F1;">
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
			<TD style="text-align: center;" colspan="2">
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
				<input type="button" style="text-align: right;" value="▲" onclick="moveup();">
				<br/><br/>
				<input type="button" style="text-align: right;" value="▼" onclick="movedown();">
			</TD>
			<TD colspan="2">
				<DIV style="height:150px;width:1000px;overflow:auto;background:#F1F1F1;">
					<TABLE border="1" style="font-size: 12px;width: 100%">
						<COLGROUP>
							<COL WIDTH="50PX">
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
							<COL>
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
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
							<COL WIDTH="100PX">
							<COL WIDTH="100PX">
						</COLGROUP>
					</TABLE>
				</DIV>
			</TD>
		</TR>
	</TABLE>
	<INPUT TYPE="HIDDEN" CLASS="action"> <BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savemaster()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_master_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

