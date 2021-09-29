<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>データ導入</title>
	<efw:Client/>
	<script>
            (function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);


            $(function(){
 
	            var shop = $.getUrlParam('shop');

	            var page = "データ導入";

	            var t = page + "（" + shop + "）" + $("#pagehead").html();

	            $("#pagehead").html(t);

	            $("#shop").val(shop);
			 
			});

			function searchHistory(){
				Efw('searchhistory');
			}

			function importData(){

				var rd = $("input[name='opt_type']:checked").val();

				Efw('uploadfile',{data:'liststock', liststock: rd});

			}

  	</script>
    <style>
      .upfile {
          border-top: 2px;
          border-right: 2px;
          border-left: 2px;
          border-bottom: 2px;
          border-style: solid;

      }
    </style>
</head>
<body style="background-color:ghostwhite;" onload="searchHistory();">

<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/'">
</div>
<input type="hidden" id="shop">
<br/>
<table class="upfile" id="mastertable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			商品マスタ情報
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_master" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導出" onclick="Efw('outputmaster')">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('importmaster')">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="producttable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			出品詳細レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_product" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'product',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="fbatable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			FBA在庫レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_fba" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'fba',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="ordertable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			全注文レポート
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'order',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="localstocktable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			在庫情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_localstock" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'localstock',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="liststocktable">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			在庫情報統計
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_liststock" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="importData();">
		</td>
	</tr>
	<tr>
		<td colspan="5" style="font-size: 14px;">
			<input type="radio" name="opt_type" value="output" checked>情報出力のみ　　
			<input type="radio" name="opt_type" value="updatePart" >在庫数量リフレッシュ(統計対象のみ) ↻　　
			<input type="radio" name="opt_type" value="updateAll" >在庫数量リフレッシュ(店舗全体) ↻　　
			<input type="radio" name="opt_type" value="add" >在庫数量カウントアップ ↑
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="shiptable_amazon">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			Amazon発送情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="file" id="importfile_ship_amazon" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'ship_amazon',liststock:''})">
		</td>
	</tr>
</table>
<br/>
<table class="upfile" id="shiptable_qoo10">
	<tr>
		<td style="width: 350px;font-size: 20px;font-weight: bold;">
			Qoo10発送情報導入
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入日時：
		</td>
		<td style="width: 220px;font-size: 16px;" class="importtime">
		</td>
		<td style="width: 120px;font-size: 16px;">
			前回導入件数：
		</td>
		<td style="width: 80px;font-size: 16px;text-align: right;" class="importcount">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			商品情報<br>
			<input type="file" id="importfile_ship_qoo10_order" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'ship_qoo10_order',liststock:''})">
		</td>
	</tr>
	<tr>
		<td colspan="2">
			発送情報<br>
			<input type="file" id="importfile_ship_qoo10_ship" style="width: 400px;height: 30px;">
		</td>
		<td colspan="3" style="text-align: right;">
			<input type="button" id="import" style="width: 170px;height: 30px;" value="導入" onclick="Efw('uploadfile',{data:'ship_qoo10_ship',liststock:''})">
		</td>
	</tr>
</table>
<br/>
</body>
</html>