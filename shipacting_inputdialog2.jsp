<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="shipacting_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var shipacting_inputdialog = null;
		$(function() {
			shipacting_inputdialog = $("#shipacting_inputdialog2").dialog({
				title : "发送请求录入",
				autoOpen : false,
				resizable : false,
				height : 550,
				width : 1000,
				modal : true,
				open : function(){
					setTimeout(function(){});
				},
				close : function(){
				},
			});

		});

		function saveshipinfo(){
			Efw('shipacting2/saveshipinfo');
		}

		function cancelshipinfo(status){
			Efw('shipacting2/cancelshipinfo');
		}

		function displaymasterinfo(){
			Efw('shipacting2/displaymasterinfo');
		}

		function showdetailInfo(){
			alert($("#detailinfo").val().replaceAll('【','\n【'));
		}

	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1" id="shipinfotable">
		<COLGROUP>
			<COL WIDTH="150PX">
			<COL WIDTH="300PX">
			<COL WIDTH="50PX">
			<COL WIDTH="100PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>NO</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_shipno" STYLE="WIDTH:200px;height:30px;background-color: lightgray;" readonly="readonly"></TD>
			<TD rowspan="9" valign="top">
				<img src='#' id='img' style="display: none;height: 300px;"/>
				<br>
				<BUTTON ONCLICK="showdetailInfo()" id="showdetailbutton" style="display: none;">详细信息</BUTTON>
				<INPUT TYPE="TEXT" ID="detailinfo" STYLE="display: none;" readonly="readonly">
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD>发送商品</TD>
			<TD>
				<select STYLE="WIDTH:280px;height:32px;" id="product_name" onchange="displaymasterinfo()">
					<option></option>
				</select>
			</TD>
			<TD>数量</TD>
			<TD>
				<INPUT TYPE="TEXT" ID="product_count" STYLE="WIDTH:100px;height:30px;">
			</TD>
		</TR>
		<TR style="height:40px;">
			<TD>邮政编码</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_postno" STYLE="WIDTH:200px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所1</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address1" STYLE="WIDTH:500px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所2</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address2" STYLE="WIDTH:500px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>住所3</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_address3" STYLE="WIDTH:500px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>姓名</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_name" STYLE="WIDTH:200px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>电话号码</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_tel" STYLE="WIDTH:200px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>备考</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_biko" STYLE="WIDTH:500px;height:30px;"></TD>
		</TR>
	</TABLE>
	<br>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;display: none;" ONCLICK="cancelshipinfo(9)" id="cancelbutton">请求取消</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="saveshipinfo()" id="savebutton">保存</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="shipacting_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

