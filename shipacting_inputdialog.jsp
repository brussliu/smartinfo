<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<DIV CLASS="DIALOG" ID="shipacting_inputdialog" STYLE="DISPLAY: NONE">
	<SCRIPT>
		var shipacting_inputdialog = null;
		$(function() {
			shipacting_inputdialog = $("#shipacting_inputdialog").dialog({
				title : "发送请求录入",
				autoOpen : false,
				resizable : false,
				height : 600,
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
			Efw('shipacting/saveshipinfo');
		}

		function cancelshipinfo(){
			Efw('shipacting/cancelshipinfo');
		}

		function acceptshipinfo(){
			Efw('shipacting/acceptshipinfo');
		}

		function sendshipinfo(){
			Efw('shipacting/sendshipinfo');
		}
		function payshipinfo(){
			Efw('shipacting/payshipinfo');
		}
		

	</SCRIPT>
	<style>

    </style>
	<TABLE STYLE="WIDTH: 100%" BORDER="1" id="shipinfotable">
		<COLGROUP>
			<COL WIDTH="150PX">
			<COL WIDTH="250PX">
			<COL WIDTH="150PX">
			<COL WIDTH="100PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>NO</TD>
			<TD colspan="3"><INPUT TYPE="TEXT" ID="txt_shipno" STYLE="WIDTH:200px;height:30px;background-color: lightgray;" readonly="readonly"></TD>
			<TD rowspan="9"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>发送商品</TD>
			<TD>
				<select STYLE="WIDTH:250px;height:32px;" id="product_name"></select>
			</TD>
			<TD>数量</TD>
			<TD>
				<select STYLE="WIDTH:100px;height:32px;" id="product_count">
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
		<TR style="height:40px;">
			<TD>发送方式</TD>
			<TD>
				<select STYLE="WIDTH:250px;height:32px;" id="ship_div">
					<option value="C">クリックポスト</option>
					<option value="Y">ゆうパケット</option>
					<option value="S">その他</option>
				</select>
			</TD>
			<TD>发送费用（日元）</TD>
			<TD colspan="2"><INPUT TYPE="TEXT" ID="txt_fee" STYLE="WIDTH:150px;height:30px;"></TD>
		</TR>
		<TR style="height:40px;">
			<TD>追踪番号</TD>
			<TD>
				<INPUT TYPE="TEXT" ID="txt_trackingno" STYLE="WIDTH:200px;height:30px;">
			</TD>
			<TD>合计费用（人民币）</TD>
			<TD colspan="2"><INPUT TYPE="TEXT" ID="txt_amount" STYLE="WIDTH:150px;height:30px;"></TD>
		</TR>
	</TABLE>
	<br>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="cancelshipinfo()" id="cancelbutton">请求取消</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="acceptshipinfo()" id="acceptbutton">接受</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="sendshipinfo()" id="sendbutton">已发送</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="payshipinfo()" id="paybutton">已支付</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="shipacting_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

