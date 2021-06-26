var global={};
global.name="システム初期化";

var addressList = file.readAllLines("templates/addressList.txt").split("\r\n");
/**
 * グローバルイベント実行関数
 */
global.fire=function(){


};
/**
 * ページング用データの取得<br>
 * <br>
 * select(groupId,getCountSqlId,getDataSqlId,searchCondition)
 * select(groupId,getCountSqlId,getDataSqlId,searchCondition,pageRows)
 * <br>
 * @パラメータ {String}
 *			groupId
 * @パラメータ {String}
 *			getCountSqlId レコードの総数
 * @パラメータ {String}
 *			getDataSqlId 毎ページの記録
 * @パラメータ {Object}
 *			searchCondition 検索条件
 * @パラメータ {String}
 *			pageRows 毎ページの行数
 * @return {Record}
 */
function getPageData(groupId,getCountSqlId,getDataSqlId,searchCondition,pageRows,jdbcResourceName) {
	if(pageRows == null){
		pageRows = 100;
	}
	// レコード総数の取得
	var cnt=db
	.select(
			groupId,																				// 外だしSQLファイル名
			getCountSqlId,																			// 总记录数取得しようのデータを検索するSQL名
			searchCondition,																		// 検索条件
			jdbcResourceName																		// jdbc接続名
	)
	.getValue("cnt");
	var pages = Number.parse((cnt/pageRows).format("0","UP"));
	
	if (pages<cnt/pageRows)pages = pages + 1;
	if (searchCondition.currentPage>pages)searchCondition.currentPage = pages;
	if (searchCondition.currentPage<1)searchCondition.currentPage = 1;
	searchCondition["offset"] = (searchCondition.currentPage - 1) * pageRows;
	searchCondition["limit"] = pageRows;
	if (searchCondition.orderBy != null){
		searchCondition[searchCondition.orderBy] = "true";
	}
	var pageData = db
	.select(
			groupId,																				// 外だしSQLファイル名
			getDataSqlId,																			// 总记录数取得しようのデータを検索するSQL名
			searchCondition,																		// 検索条件
			jdbcResourceName																		// jdbc接続名
	);
	searchCondition.allPages = pages;
	searchCondition.totalNumber = cnt;
	return pageData;
}

function getStandardAddress(address){

	var standardAddress = new Array();

	var address1 = address;
	var address2 = "";

	//addressList.length.debug("000000000000");
	for(var i = 0; i < addressList.length; i ++){

		if(address.indexOf(addressList[i]) >= 0){

			//addressList[i].debug("TTTTTTTTTTTTT");
			//i.debug("IIIIIIIIIIIIIIIIIII");

			address1 = addressList[i];
			break;
		}

	}

	//address1.debug("111111111111111111");

	address2 = address.substring(address1.length);
	//address2.debug("222222222222222222");

	standardAddress.push(address1);
	standardAddress.push(address2);

	//standardAddress.debug("999999999999999")

	return standardAddress;
}

function outputMasterList(excel, selectResult, sheetName, productnameFlg){

	var shop_X = "B";
	var p_no_X = "C";
	var p_category_X = "D";
	var p_type_X = "E";
	var p_color_X = "F";
	var p_size_X = "G";
	var p_sku_X = "H";
	var p_asin_X = "I";
	var p_name_X = "J";

	var row_from = 2;

	for(var i = 0;i < selectResult.length;i ++){

		var y = i + row_from;

		var shopnm = selectResult[i]["shopname"];

		var productno = selectResult[i]["productno"];
		var productdiv = selectResult[i]["productdiv"];
		var producttype = selectResult[i]["producttype"];

		var color = selectResult[i]["color"];
		var size = selectResult[i]["size"];

		var sku = selectResult[i]["sku"];
		var asin = selectResult[i]["asin"];

		var productname = selectResult[i]["productname"];

		excel.setCell(sheetName, shop_X + y, shopnm);

		excel.setCell(sheetName, p_no_X + y, productno);

		excel.setCell(sheetName, p_category_X + y, productdiv);

		excel.setCell(sheetName, p_type_X + y, producttype);

		excel.setCell(sheetName, p_color_X + y, color);

		excel.setCell(sheetName, p_size_X + y, size);

		excel.setCell(sheetName, p_sku_X + y, sku);

		excel.setCell(sheetName, p_asin_X + y, asin);

		if(productnameFlg){
			excel.setCell(sheetName, p_name_X + y, productname);
		}

	}

}

function importMasterList(f, shopname, sheetName){

	// マスタデータ全件削除
	var delResult = db.change(
		"MASTER",
		"delAllMaster",
		{shop:shopname}
	);
		
	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	var shop_X = "B";
	var p_no_X = "C";
	var p_category_X = "D";
	var p_type_X = "E";
	var p_color_X = "F";
	var p_size_X = "G";

	var sku_X = "H";
	var asin_X = "I";

	var row_from = 2;
	var row_to = 9999;

	var count = 0;
	
	for(var y = row_from;y <= row_to;y++){

		var shop = excelXSSF.getValue(sheetName, shop_X + y);
		var p_no = excelXSSF.getValue(sheetName, p_no_X + y);
		var p_category = excelXSSF.getValue(sheetName, p_category_X + y);
		var p_type = excelXSSF.getValue(sheetName, p_type_X + y);
		var p_color = excelXSSF.getValue(sheetName, p_color_X + y);
		var p_size = excelXSSF.getValue(sheetName, p_size_X + y);
		var sku = excelXSSF.getValue(sheetName, sku_X + y);
		var asin = excelXSSF.getValue(sheetName, asin_X + y);

		if(shop == null || shop.length <= 0){
			break;
		}

		var insertResult = db.change(
			"MASTER",
			"insertMaster",
			{
				"col0" : count,
				"col1" : shopname,
				"col2" : p_no,
				"col3" : p_category,
				"col4" : p_type,
				"col5" : p_color,
				"col6" : p_size,
				"col7" : sku,
				"col8" : asin
			}
		);

		count = count + 1;

	}

	return count;

}


function outputProductForSmartKM(selectResult, deliveryFlg){

		// テンプレートにより、EXCELオブジェクトを作成する
		var excel = new Excel("templates/output_stock_smartkm.xlsx");

		var tempFilePathName = file.getTempFileName();

		var Y_from = 4;

		var sku_X = "C";
		var asin_X = "D";

		var productname_X = "G";

		var writePriceX = "H";
		var writeFBAX = "I";
		var writeFBMX = "J";
		var writeLocalStockX = "K";
		var writeOnboardStockX = "L";

		var writeSell7X = "M";
		var writeSell30X = "N";
		var writeSell60X = "O";
		var writeSell90X = "P";
		var writeSellWeekX = "Q";

		var writeFBAFlgX = "V";
		var writeDeliveryX = "S";

		for(var i = 0;i < selectResult.length;i ++){

			var sku = selectResult[i]["sku"];
			var asin = selectResult[i]["asin"];
			var productname = selectResult[i]["productname"];
			var price = selectResult[i]["price"];
			var fbaflg = "";

			var fba;
			if(selectResult[i]["fba"] == null || selectResult[i]["fba"].length == 0){
				fba = 0;
				
			}else{
				fba = parseInt(selectResult[i]["fba"]);
				fbaflg = "FBA";
			}

			var fbm;
			if(selectResult[i]["fbm"] == null || selectResult[i]["fbm"].length == 0){
				fbm = 0;
				
			}else{
				fbm = parseInt(selectResult[i]["fbm"]);
				fbaflg = "FBM";
			}

			var localstock;
			if(selectResult[i]["localstock"] == null || selectResult[i]["localstock"].length == 0){
				localstock = 0;
			}else{
				localstock = parseInt(selectResult[i]["localstock"]);
			}

			var onboardstock;
			if(selectResult[i]["onboard"] == null || selectResult[i]["onboard"].length == 0){
				onboardstock = 0;
			}else{
				onboardstock = parseInt(selectResult[i]["onboard"]);
			}

			var selled7 = selectResult[i]["selled7"];
			var selled30 = selectResult[i]["selled30"];
			var selled60 = selectResult[i]["selled60"];
			var selled90 = selectResult[i]["selled90"];
			var selledweek = selectResult[i]["selledweek"];

			var delivery = selectResult[i]["delivery"];

			var sheetNameList = [
				"廃止予定", 		"スマホ保護フィルム",	"カメラ保護",
				"スマホケース",		"花柄ケース",			"イヤホン",
				"タブレットケース",	"スマホリング",			"その他"];

			for(var sn = 0;sn < sheetNameList.length;sn ++){

				var sheetName = sheetNameList[sn];

				for(var y = Y_from;y <= 9999;y ++){

					var excel_sku = excel.getValue(sheetName, sku_X + y);
					var excel_asin = excel.getValue(sheetName, asin_X + y);

					if(excel_sku == null || excel_sku.length <= 0 || excel_asin == null || excel_asin.length <= 0){
						break;
					}

					if(excel_sku == sku && excel_asin == asin){

						excel.setCell(sheetName, writePriceX + y, price);

						excel.setCell(sheetName, writeFBAX + y, fba);

						excel.setCell(sheetName, writeFBMX + y, fbm);

						excel.setCell(sheetName, writeLocalStockX + y, localstock);

						excel.setCell(sheetName, writeOnboardStockX + y, onboardstock);

						excel.setCell(sheetName, writeSell7X + y, selled7);

						excel.setCell(sheetName, writeSell30X + y, selled30);

						excel.setCell(sheetName, writeSell60X + y, selled60);

						excel.setCell(sheetName, writeSell90X + y, selled90);

						excel.setCell(sheetName, writeSellWeekX + y, selledweek);

						excel.setCell(sheetName, writeFBAFlgX + y, fbaflg);

						if(deliveryFlg){
							excel.setCell(sheetName, writeDeliveryX + y, delivery);
						}

						listedflg = true;

					}

				}

			}

			if(listedflg == false){

				excel.setCell("NEW", sku_X + newListY_from, sku);

				excel.setCell("NEW", asin_X + newListY_from, asin);

				excel.setCell("NEW", productname_X + newListY_from, productname);

				excel.setCell("NEW", writePriceX + newListY_from, price);

				excel.setCell("NEW", writeFBAX + newListY_from, fba);

				excel.setCell("NEW", writeFBMX + newListY_from, fbm);

				excel.setCell("NEW", writeLocalStockX + newListY_from, localstock);

				excel.setCell("NEW", writeOnboardStockX + newListY_from, onboardstock);

				excel.setCell("NEW", writeSell7X + newListY_from, selled7);

				excel.setCell("NEW", writeSell30X + newListY_from, selled30);

				excel.setCell("NEW", writeSell60X + newListY_from, selled60);

				excel.setCell("NEW", writeSell90X + newListY_from, selled90);

				excel.setCell("NEW", writeSellWeekX + newListY_from, selledweek);

				excel.setCell("NEW", writeFBAFlgX + newListY_from, fbaflg);

				if(deliveryFlg){
					excel.setCell("NEW", writeDeliveryX + newListY_from, delivery);
				}

				newListY_from = newListY_from + 1;

			}

		}

		excel.setActiveSheet(sheetNameList[0]).save(tempFilePathName);

		return tempFilePathName;

}


function outputProductForSmartBear(selectResult, deliveryFlg){

	// テンプレートにより、EXCELオブジェクトを作成する
	var excel=new Excel("templates/output_stock.xlsx");

	var tempFilePathName=file.getTempFileName();

	// レインコート
	var RC_labelY_from = 4;
	var RC_labelY_to = 48;
	var RC_labelX = ["F","G","H","I","J","K"];
	var RC_writeStockX = ["L","M","N","O","P","Q"];
	var RC_writeLocalStockX = ["R","S","T","U","V","W"];
	var RC_writeOnboardStockX = ["X","Y","Z","AA","AB","AC"];
	var RC_writeSell7X = ["AD","AE","AF","AG","AH","AI"];
	var RC_writeSell30X = ["AJ","AK","AL","AM","AN","AO"];
	var RC_writeSell60X = ["AP","AQ","AR","AS","AT","AU"];
	var RC_writeSell90X = ["AV","AW","AX","AY","AZ","BA"];
	var RC_writeSellWeekX = ["BB","BC","BD","BE","BF","BG"];
	var RC_writePriceX = ["CF","CG","CH","CI","CJ","CK"];
	var RC_writeDeliveryX = ["BN","BO","BP","BQ","BR","BS"];

	// パジャマ
	var PJ_labelY_from = 4;
	var PJ_labelY_to = 11;
	var PJ_labelX = ["F","G","H","I","J","K"];
	var PJ_writeStockX = ["L","M","N","O","P","Q"];
	var PJ_writeLocalStockX = ["R","S","T","U","V","W"];
	var PJ_writeOnboardStockX = ["X","Y","Z","AA","AB","AC"];
	var PJ_writeSell7X = ["AD","AE","AF","AG","AH","AI"];
	var PJ_writeSell30X = ["AJ","AK","AL","AM","AN","AO"];
	var PJ_writeSell60X = ["AP","AQ","AR","AS","AT","AU"];
	var PJ_writeSell90X = ["AV","AW","AX","AY","AZ","BA"];
	var PJ_writeSellWeekX = ["BB","BC","BD","BE","BF","BG"];
	var PJ_writePriceX = ["CF","CG","CH","CI","CJ","CK"];
	var PJ_writeDeliveryX = ["BN","BO","BP","BQ","BR","BS"];

	// 傘
	var UB_labelY_from = 4;
	var UB_labelY_to = 14;
	var UB_labelX = ["F"];
	var UB_writeStockX = ["G"];
	var UB_writeLocalStockX = ["H"];
	var UB_writeOnboardStockX = ["I"];
	var UB_writeSell7X = ["J"];
	var UB_writeSell30X = ["K"];
	var UB_writeSell60X = ["L"];
	var UB_writeSell90X = ["M"];
	var UB_writeSellWeekX = ["N"];
	var UB_writePriceX = ["S"];
	var UB_writeDeliveryX = ["P"];

	// 雨靴
	var RB_labelY_from = 4;
	var RB_labelY_to = 142;
	var RB_labelX = ["H"];
	var RB_writeStockX = ["I"];
	var RB_writeLocalStockX = ["J"];
	var RB_writeOnboardStockX = ["K"];
	var RB_writeSell7X = ["L"];
	var RB_writeSell30X = ["M"];
	var RB_writeSell60X = ["N"];
	var RB_writeSell90X = ["O"];
	var RB_writeSellWeekX = ["P"];
	var RB_writePriceX = ["U"];
	var RB_writeDeliveryX = ["R"];

	// 靴下
	var W_labelY_from = 4;
	var W_labelY_to = 9999;
	var W_labelX = "J";
	var W_writePriceX = "K";
	var W_writeStockX = "L";
	var W_writeLocalStockX = "M";
	var W_writeOnboardStockX = "N";
	var W_writeSell7X = "O";
	var W_writeSell30X = "P";
	var W_writeSell60X = "Q";
	var W_writeSell90X = "R";
	var W_writeSellWeekX = "S";
	var W_writeDeliveryX = "U";

	for(var i = 0;i < selectResult.length;i ++){

		// 商品管理番号
		var productno = selectResult[i]["productno"];

		// レインコート
		if(productno == "T001" || productno == "T002" || productno == "T003" || productno == "T004" || productno == "T005" 
		|| productno == "T006" || productno == "T007" || productno == "T008" || productno == "T009" || productno == "T010" ){

			// 情報設定
			setInfoToExcel(excel, selectResult[i], "在庫情報（雨衣）", 
				RC_labelX, RC_labelY_from, RC_labelY_to,
				RC_writeStockX, RC_writeLocalStockX, RC_writeOnboardStockX,
				RC_writeSell7X, RC_writeSell30X, RC_writeSell60X, RC_writeSell90X, RC_writeSellWeekX,
				RC_writePriceX, RC_writeDeliveryX, deliveryFlg
			);
		}

		// パジャマ
		if(productno == "P001" || productno == "P002"){

			// 情報設定
			setInfoToExcel(excel, selectResult[i], "在庫情報（居家服）", 
				PJ_labelX, PJ_labelY_from, PJ_labelY_to,
				PJ_writeStockX, PJ_writeLocalStockX, PJ_writeOnboardStockX,
				PJ_writeSell7X, PJ_writeSell30X, PJ_writeSell60X, PJ_writeSell90X, PJ_writeSellWeekX,
				PJ_writePriceX, PJ_writeDeliveryX, deliveryFlg
			);
			
		}

		// 傘
		if(productno == "T206" || productno == "T207" || productno == "T208" 
		|| productno == "T209" || productno == "T101"){

			// 情報設定
			setInfoToExcel(excel, selectResult[i], "在庫情報（雨伞等）", 
				UB_labelX, UB_labelY_from, UB_labelY_to,
				UB_writeStockX, UB_writeLocalStockX, UB_writeOnboardStockX,
				UB_writeSell7X, UB_writeSell30X, UB_writeSell60X, UB_writeSell90X, UB_writeSellWeekX,
				UB_writePriceX, UB_writeDeliveryX, deliveryFlg
			);
			
		}

		// 雨靴
		if(productno == "T301" || productno == "T302" || productno == "T303" 
		|| productno == "T306" || productno == "T308" || productno == "T309"){

			// 情報設定
			setInfoToExcel(excel, selectResult[i], "在庫情報（雨靴）", 
				RB_labelX, RB_labelY_from, RB_labelY_to,
				RB_writeStockX, RB_writeLocalStockX, RB_writeOnboardStockX,
				RB_writeSell7X, RB_writeSell30X, RB_writeSell60X, RB_writeSell90X, RB_writeSellWeekX,
				RB_writePriceX, RB_writeDeliveryX, deliveryFlg
			);
			
		}

		// 靴下
		if(productno != null && productno.length > 0 && productno.substring(0,1) == "W"){

			// 情報設定
			setInfoToExcel(excel, selectResult[i], "在庫情報（袜子）", 
				W_labelX, W_labelY_from, W_labelY_to,
				W_writeStockX, W_writeLocalStockX, W_writeOnboardStockX,
				W_writeSell7X, W_writeSell30X, W_writeSell60X, W_writeSell90X, W_writeSellWeekX,
				W_writePriceX, W_writeDeliveryX, deliveryFlg
			);

		}

	}

	excel.setActiveSheet("在庫情報（雨衣）").save(tempFilePathName);

	return tempFilePathName;

}

function setInfoToExcel(excel, selectRecord, sheetName, labelX, labelY_from, labelY_to, writeStockX, writeLocalStockX, writeOnboardStockX,
	writeSell7X, writeSell30X, writeSell60X, writeSell90X, writeSellWeekX, writePriceX, writeDeliveryX, deliveryFlg){

	var labelno = selectRecord["label"];
	var localstock = returnQuantity(selectRecord["localstock"]);
	var fba = returnQuantity(selectRecord["fba"]);
	var onboard = returnQuantity(selectRecord["onboard"]);
	var selled7 = returnQuantity(selectRecord["selled7"]);
	var selled30 = returnQuantity(selectRecord["selled30"]);
	var selled60 = returnQuantity(selectRecord["selled60"]);
	var selled90 = returnQuantity(selectRecord["selled90"]);
	var selledweek = returnNumber(selectRecord["selledweek"]);
	var price = returnJPPrice(selectRecord["price"]);
	var delivery = returnQuantity(selectRecord["delivery"]);

	// 在庫情報シート
	for(var x = 0;x < labelX.length;x ++){
		for(var y = labelY_from;y <= labelY_to;y ++){

			var excellabelno = excel.getValue(sheetName, labelX[x] + y);
			if(excellabelno == null){
				continue;
			}
			if(excellabelno == labelno){
				// 商品価格
				setExcelValue(excel, sheetName, writePriceX[x]+y, price);
				// FBA在庫数量
				setExcelValue(excel, sheetName, writeStockX[x]+y, fba);
				// ローカル在庫
				setExcelValue(excel, sheetName, writeLocalStockX[x]+y, localstock);
				// ONBOARD在庫
				setExcelValue(excel, sheetName, writeOnboardStockX[x]+y, onboard);
				// 販売数量(直近7日間)
				setExcelValue(excel, sheetName, writeSell7X[x]+y, selled7);
				// 販売数量(直近30日間)
				setExcelValue(excel, sheetName, writeSell30X[x]+y, selled30);
				// 販売数量(直近60日間)
				setExcelValue(excel, sheetName, writeSell60X[x]+y, selled60);
				// 販売数量(直近90日間)
				setExcelValue(excel, sheetName, writeSell90X[x]+y, selled90);
				// 販売数量(週間平均値)
				setExcelValue(excel, sheetName, writeSellWeekX[x]+y, selledweek);

				if(deliveryFlg){
					// 仕入数量
					setExcelValue(excel, sheetName, writeDeliveryX[x]+y, delivery);
				}
				
			}
		}
	}


}


function returnQuantity(quantity){

	if(quantity == null || quantity == "" || quantity == "0" || quantity == 0){
		return null;
	}
	return parseInt(quantity);
}

function returnJPPrice(price){

	if(price == null || price == "" || price == "0" || price == 0){
		return null;
	}
	return parseInt(price);
}

function returnNumber(decimalNumber){

	if(decimalNumber == null || decimalNumber == ""){
		return null;
	}

	return parseFloat(decimalNumber);
}

function setExcelValue(excel, sheetName, station, value){

	if(value != null){
		excel.setCell(sheetName, station, value);
	}

}