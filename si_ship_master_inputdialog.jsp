<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="si_ship_master_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var si_ship_master_inputdialog = null;
		$(function() {
			si_ship_master_inputdialog = $("#si_ship_master_inputdialog").dialog({
				title : "発送商品登録",
				autoOpen : false,
				resizable : false,
				height : 500,
				width : 1210,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					setTimeout(function(){
						Efw('menu_goto',{page:'si_ship_master.jsp',shop:"Smart-Bear"})
						},
						100
						);
				},
			});

		});


		function savemaster(){

			$("#allpic").find("input").each(function(){

				if($(this).attr("type") == "hidden"){
					var picsrc = $(this).val();
					var piccolor = $(this).next().html();
					//picColorArr.push(piccolor);
					//picArr.push(picsrc);
				}

			});


			Efw('saveshipmaster',{"picColor":piccolor });

		}

		function changepic(obj) {
		
			$(obj).parent().css("display", "none");

			
			var reads = new FileReader();

			f = $(obj)[0].files[0];

			reads.readAsDataURL(f);
			reads.onload = function(e) {

				$(obj).parent().next().attr("src",this.result);
				$(obj).parent().next().css("display", "block");

				var image = new Image();
        		image.src=e.target.result;
        		image.onload = function(){

          			//square = 0.2;   //定义画布的大小，也就是图片压缩之后的像素
					square = 500 / image.height;

                	canvas = document.createElement('canvas'); //创建canvas元素
                	context = canvas.getContext('2d');

                	imageWidth = Math.round(square*image.width);    //压缩图片的大小
                	imageHeight = Math.round(square*image.height);

        			canvas.width = imageWidth;
        			canvas.height = imageHeight;
        			context.clearRect(0, 0, imageWidth, imageHeight);  //在给定矩形内清空一个矩形
        			context.drawImage(this, 0, 0, imageWidth, imageHeight);
        			var data = canvas.toDataURL('image/jpeg',0.6);

        			$(obj).parent().next().next().val(data);
        		};

			};
		}




	</SCRIPT>
	<style>
		.img {
		 height: 160px;
		 width: 160px;
		 display: none;
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
			<COL WIDTH="220PX">
			<COL WIDTH="150PX">
			<COL WIDTH="220PX">
			<COL WIDTH="150PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>商品管理番号</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productid" readonly="readonly"></TD>
			<TD>色</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="color"></TD>
			<TD>サイズ</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="size"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>商品分類</TD>
			<TD>
				<select STYLE="WIDTH:200px;height:32px;" id="productdiv">
					<option id="" class=""></option>	
					<option id="A" class="newshop">A:販売商品</option>	
					<option id="B" class="newshop">B:返送商品</option>
					<option id="C" class="newshop">C:FBA転送商品</option>
					<option id="D" class="newshop">D:その他</option>
				</select>
			</TD>
			<TD>商品名称(日本語)</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productnamejp"></TD>
			<TD>商品名称(中国語)</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productnamecn"></TD>
		</TR>
		<TR>
			<TD>備考</TD>
			<TD colspan="3">
				<INPUT TYPE="TEXT" STYLE="WIDTH:550px;height:30px;" id="biko">
			</TD>
			<TD>数量</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productcount"></TD>
		</TR>

		<TR style="height:220px;">
			<TD>商品写真</TD>
			<TD colspan="5">
				<div style="display: inline;width: 100%;height: 100%" id="allpic">
			    	<div id='imgPreview' class='picdiv'>
						<div id='prompt' style='text-align: center;'>
							<img src='img/pic.png' style='width: 100px;height: 100px;padding-top: 30px;' onclick='uplaodPic(this);'>
							<input type='file' id='productpic' style='display: none;' onchange='changepic(this)'>
						</div>
						<img src='#' id='img' class='img'/>
						<input type='hidden' id='productpicStr'>
					</div>";
				</div>
			</TD>
		</TR>
	</TABLE>
	<INPUT TYPE="HIDDEN" CLASS="action"> <BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savemaster()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_ship_master_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

