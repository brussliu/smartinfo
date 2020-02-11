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
			    // alert(sku);
			    // alert(asin);
			     
			});

			Efw('savemaster',{"subsku": skuArr ,"subasin": asinArr });


		}

	</SCRIPT>
	<TABLE STYLE="WIDTH: 100%" BORDER="0">
		<COLGROUP>
			<COL WIDTH="120PX">
			<COL>
		</COLGROUP>
		<TR style="height:40px;">
			<TD>商品管理番号</TD>
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:200px;height:30px;" id="productid"></TD>
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
			<TD>
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
			<TD style="text-align: center;">
				<input type="button" id="addsub" style="width: 80px;" value="▼" onclick="addsub()">
				<input type="button" id="delsub" style="width: 80px;" value="▲" onclick="delsub()">
			</TD>
		</TR>
		<TR>
			<TD></TD>
			<TD>
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
			<TD><INPUT TYPE="TEXT" STYLE="WIDTH:1000px;height:30px;" id="productname"></TD>
		</TR>
	</TABLE>
	<INPUT TYPE="HIDDEN" CLASS="action"> <BR>
	<DIV STYLE="TEXT-ALIGN: CENTER">
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="savemaster()" >登録</BUTTON>
		<BUTTON style="width: 150px;background-color: blue;color: white;" ONCLICK="si_master_inputdialog.dialog('close');" >キャンセル</BUTTON>
	</DIV>
</DIV>

