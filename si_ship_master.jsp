<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>発送商品マスタ情報</title>
	<efw:Client/>
	<script>

        (function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
        })(jQuery);

		function searchShipMaster(){

			Efw('searchshipmaster');
		}

		function activebutton(){

			$("#updateshipmaster").show();

		}

		function addShipMaster(){
			Efw('addshipmaster')
		}

		function updateshipMaster(){

			var shipmasterno = $('input:radio[name=selectshipmasterno]:checked').val();

			Efw('updateshipmasterinfo',{'shipmasterno': shipmasterno})

		}


  	</script>
</head>
<body style="background-color:ghostwhite;" onload="searchShipMaster();">
<efw:Part path="si_ship_master_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	発送商品マスタ情報
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<br/>
<input type="button" id="addmaster" style="width: 170px;height: 30px;" value="親商品登録" onclick="addShipMaster()">
<input type="button" id="updateshipmaster" style="width: 170px;height: 30px;display: none;" value="更新" onclick="updateshipMaster()">
<br/><br/>
<table id="productlist" border="1" style="width: 100%">
	<COLGROUP>
		<COL WIDTH="50PX">
		<COL WIDTH="200PX">
		<COL WIDTH="200PX">
		<COL WIDTH="200PX">
		<COL WIDTH="200PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL>
	</COLGROUP>
	<tr>
		<td style="font-size: 14px;font-weight: bold;">
			操作
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			商品管理番号
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			商品分類
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			名称（中国語）
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			名称（日本語）
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			色（中国語）
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			サイズ（中国語）
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			数量
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			備考
		</td>
		<td style="font-size: 14px;font-weight: bold;">
			商品写真
		</td>
	</tr>
</table>


</body>
</html>