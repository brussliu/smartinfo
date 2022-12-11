<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="si_ship_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var si_ship_inputdialog = null;
		$(function() {
			si_ship_inputdialog = $("#si_ship_inputdialog").dialog({
				title : "親商品登録",
				autoOpen : false,
				resizable : false,
				height : 240,
				width : 1000,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){

				},
			});

		});

		function saveproductkind(){

			Efw('saveproductkind');

		}


	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1" id="productkindtable">
		<COLGROUP>
			<COL WIDTH="150PX">
			<COL WIDTH="250PX">
			<COL WIDTH="150PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>商品キー</TD>
			<TD class="productkey"></TD>
			<TD>商品種別</TD>
			<TD><INPUT TYPE="TEXT" ID="txt_productkind" STYLE="WIDTH:200px;height:30px;"></TD>
		</TR>

		<TR style="height:40px;">
			<TD>商品名称</TD>
			<TD class="productname" colspan="3"></TD>
		</TR>
	</TABLE>
	<br>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="saveproductkind()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_ship_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

