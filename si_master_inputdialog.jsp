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

			$("#subproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var checkflg = tdArr.eq(0).children()[0].checked;

			    if(checkflg){
			    	var $tr = $(this).clone(true);
			        $('#selectedsubproduct').append($tr);
			        $(this).remove();
			    }
			     
			});

		}

		function delsub(){

			$("#selectedsubproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var checkflg = tdArr.eq(0).children()[0].checked;

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

			$("#selectedsubproduct").find("tr").each(function(){

			    var tdArr = $(this).children();
			    var sku = tdArr.eq(1).html();
				var asin = tdArr.eq(2).html();

				skuArr.push(sku);
				asinArr.push(asin);
			});

			Efw('savemaster',{"subsku": skuArr ,"subasin": asinArr });

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

	</SCRIPT>
	<style>
		#img3 {
		 height: 200px;
		 width: 200px;
		 display: none;
		 padding-left: 17px;
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
				<input type="button" id="addsub" style="width: 80px;" value="▼" onclick="addsub()">
				<input type="button" id="delsub" style="width: 80px;" value="▲" onclick="delsub()">
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
					<TABLE border="1" style="font-size: 12px;width: 100%" id="selectedsubproduct">
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
	</TABLE>
	<INPUT TYPE="HIDDEN" CLASS="action"> <BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savemaster()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_master_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

