<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="shipinfo_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var shipinfo_inputdialog = null;
		$(function() {
			shipinfo_inputdialog = $("#shipinfo_inputdialog").dialog({
				title : "发送请求录入",
				autoOpen : false,
				resizable : false,
				height : 450,
				width : 1000,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
					// setTimeout(function(){
					// 	Efw('menu_goto',{page:'si_ship.jsp',shop:$("#shop").val()})
					// 	},
					// 	100
					// 	);
				},
			});

		});

		function saveshipinfo(){

			Efw('saveshipinfo');

		}

		function cancelshipinfo(status){
			Efw('cancelshipinfo');
		}


	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1" id="shipinfotable">
		<COLGROUP>
			<COL WIDTH="150PX">
			<COL WIDTH="300PX">
			<COL WIDTH="150PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>NO</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_shipno" STYLE="WIDTH:200px;height:30px;background-color: lightgray;" readonly="readonly"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>发送商品</TD>
			<TD>
				<select STYLE="WIDTH:280px;height:32px;" id="product_name"></select>
			</TD>
			<TD>数量</TD>
			<TD>
				<select STYLE="WIDTH:150px;height:32px;" id="product_count">
					<option>1</option>
					<option>2</option>	
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD>邮政编码</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_postno" STYLE="WIDTH:200px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所1</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address1" STYLE="WIDTH:600px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所2</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address2" STYLE="WIDTH:600px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所3</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address3" STYLE="WIDTH:600px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>备考</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_biko" STYLE="WIDTH:600px;height:30px;"></TD>
		</TR>
	</TABLE>
	<br>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;display: none;" ONCLICK="cancelshipinfo(9)" id="cancelbutton">请求取消</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="saveshipinfo()" id="savebutton">保存</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="shipinfo_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

