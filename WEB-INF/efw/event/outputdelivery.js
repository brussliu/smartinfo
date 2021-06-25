var outputdelivery={};
outputdelivery.name="納品情報出力";
outputdelivery.paramsFormat={

	"#shop":null,
	"#deliveryno":"required:true;display-name:仕入No;",

};
var shopname = "";
outputdelivery.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	// 注文基準日
	var selectResult = db.select(
		"STOCK",
		"searchhistory",
		{shop:shopname}
	);

	var orderArr = selectResult.seek("importtype","eq","order").getArray();


	var orderBaseDate = orderArr[0]["basetime"];

	var deliveryno = params["#deliveryno"];

	var selectResult = db.select(
		"STOCK",
		"selectstockAndDelivery",
		{
		shop : shopname,
		basedate_order : orderBaseDate,
		deliveryno : deliveryno
		}
	).getArray();


	if(shopname == "Smart-KM"){

		// テンプレートにより、EXCELオブジェクトを作成する
		var excel=new Excel("templates/output_stock_smartkm.xlsx");

		var tempFilePathName=file.getTempFileName();

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



		for(var i = 0;i < selectResult.length;i ++){

			var sku = selectResult[i]["sku"];
			var asin = selectResult[i]["asin"];
			var labelno = selectResult[i]["label"];
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

				newListY_from = newListY_from + 1;

			}

		}

		excel.setActiveSheet(sheetNameList[0]).save(tempFilePathName);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();


	}else{

		// テンプレートにより、EXCELオブジェクトを作成する
		var excel=new Excel("templates/output_stock.xlsx");

		var tempFilePathName=file.getTempFileName();

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

			var productno = selectResult[i]["productno"];
			var labelno = selectResult[i]["label"];
			var localstock = returnQuantity(selectResult[i]["localstock"]);
			var fba = returnQuantity(selectResult[i]["fba"]);
			var onboard = returnQuantity(selectResult[i]["onboard"]);
			var selled7 = returnQuantity(selectResult[i]["selled7"]);
			var selled30 = returnQuantity(selectResult[i]["selled30"]);
			var selled60 = returnQuantity(selectResult[i]["selled60"]);
			var selled90 = returnQuantity(selectResult[i]["selled90"]);
			var selledweek = returnNumber(selectResult[i]["selledweek"]);
			var price = returnJPPrice(selectResult[i]["price"]);
			var delivery = returnQuantity(selectResult[i]["delivery"]);

			// レインコート
			if(productno == "T001" || productno == "T002" || productno == "T003" || productno == "T004" || productno == "T005" 
			|| productno == "T006" || productno == "T007" || productno == "T008" || productno == "T009" || productno == "T010" ){

				var sheetName = "在庫情報（雨衣）";
				// 在庫情報シート
				for(var x = 0;x < RC_labelX.length;x ++){
					for(var y = RC_labelY_from;y <= RC_labelY_to;y ++){

						var excellabelno = excel.getValue(sheetName, RC_labelX[x] + y);
						if(excellabelno == null){
							continue;
						}
						if(excellabelno == labelno){
							// 商品価格
							setExcelValue(excel, sheetName, RC_writePriceX[x]+y, price);
							// FBA在庫数量
							setExcelValue(excel, sheetName, RC_writeStockX[x]+y, fba);
							// ローカル在庫
							setExcelValue(excel, sheetName, RC_writeLocalStockX[x]+y, localstock);
							// ONBOARD在庫
							setExcelValue(excel, sheetName, RC_writeOnboardStockX[x]+y, onboard);
							// 販売数量(直近7日間)
							setExcelValue(excel, sheetName, RC_writeSell7X[x]+y, selled7);
							// 販売数量(直近30日間)
							setExcelValue(excel, sheetName, RC_writeSell30X[x]+y, selled30);
							// 販売数量(直近60日間)
							setExcelValue(excel, sheetName, RC_writeSell60X[x]+y, selled60);
							// 販売数量(直近90日間)
							setExcelValue(excel, sheetName, RC_writeSell90X[x]+y, selled90);
							// 販売数量(週間平均値)
							setExcelValue(excel, sheetName, RC_writeSellWeekX[x]+y, selledweek);
							// 仕入数量
							setExcelValue(excel, sheetName, RC_writeDeliveryX[x]+y, delivery);
							
						}
					}
				}

			}

			// レインコート
			if(productno == "P001" || productno == "P002"){

				var sheetName = "在庫情報（居家服）";
				// 在庫情報シート
				for(var x = 0;x < PJ_labelX.length;x ++){
					for(var y = PJ_labelY_from;y <= PJ_labelY_to;y ++){

						var excellabelno = excel.getValue(sheetName, PJ_labelX[x] + y);
						if(excellabelno == null){
							continue;
						}
						if(excellabelno == labelno){
							// 商品価格
							setExcelValue(excel, sheetName, PJ_writePriceX[x]+y, price);
							// FBA在庫数量
							setExcelValue(excel, sheetName, PJ_writeStockX[x]+y, fba);
							// ローカル在庫
							setExcelValue(excel, sheetName, PJ_writeLocalStockX[x]+y, localstock);
							// ONBOARD在庫
							setExcelValue(excel, sheetName, PJ_writeOnboardStockX[x]+y, onboard);
							// 販売数量(直近7日間)
							setExcelValue(excel, sheetName, PJ_writeSell7X[x]+y, selled7);
							// 販売数量(直近30日間)
							setExcelValue(excel, sheetName, PJ_writeSell30X[x]+y, selled30);
							// 販売数量(直近60日間)
							setExcelValue(excel, sheetName, PJ_writeSell60X[x]+y, selled60);
							// 販売数量(直近90日間)
							setExcelValue(excel, sheetName, PJ_writeSell90X[x]+y, selled90);
							// 販売数量(週間平均値)
							setExcelValue(excel, sheetName, PJ_writeSellWeekX[x]+y, selledweek);
							// 仕入数量
							setExcelValue(excel, sheetName, PJ_writeDeliveryX[x]+y, delivery);
							
						}
					}
				}
				
			}

			// 傘
			if(productno == "T206" || productno == "T207" || productno == "T208" 
			|| productno == "T209" || productno == "T101"){

				var sheetName = "在庫情報（雨伞等）";
				// 在庫情報シート
				for(var x = 0;x < UB_labelX.length;x ++){
					for(var y = UB_labelY_from;y <= UB_labelY_to;y ++){

						var excellabelno = excel.getValue(sheetName, UB_labelX[x] + y);
						if(excellabelno == null){
							continue;
						}
						if(excellabelno == labelno){
							// 商品価格
							setExcelValue(excel, sheetName, UB_writePriceX[x]+y, price);
							// FBA在庫数量
							setExcelValue(excel, sheetName, UB_writeStockX[x]+y, fba);
							// ローカル在庫
							setExcelValue(excel, sheetName, UB_writeLocalStockX[x]+y, localstock);
							// ONBOARD在庫
							setExcelValue(excel, sheetName, UB_writeOnboardStockX[x]+y, onboard);
							// 販売数量(直近7日間)
							setExcelValue(excel, sheetName, UB_writeSell7X[x]+y, selled7);
							// 販売数量(直近30日間)
							setExcelValue(excel, sheetName, UB_writeSell30X[x]+y, selled30);
							// 販売数量(直近60日間)
							setExcelValue(excel, sheetName, UB_writeSell60X[x]+y, selled60);
							// 販売数量(直近90日間)
							setExcelValue(excel, sheetName, UB_writeSell90X[x]+y, selled90);
							// 販売数量(週間平均値)
							setExcelValue(excel, sheetName, UB_writeSellWeekX[x]+y, selledweek);
							// 仕入数量
							setExcelValue(excel, sheetName, UB_writeDeliveryX[x]+y, delivery);
						}
					}
				}
				
			}

			// 雨靴
			if(productno == "T301" || productno == "T302" || productno == "T303" 
			|| productno == "T306" || productno == "T308" || productno == "T309"){

				var sheetName = "在庫情報（雨靴）";
				// 在庫情報シート
				for(var x = 0;x < RB_labelX.length;x ++){
					for(var y = RB_labelY_from;y <= RB_labelY_to;y ++){

						var excellabelno = excel.getValue(sheetName, RB_labelX[x] + y);
						if(excellabelno == null){
							continue;
						}
						if(excellabelno == labelno){
							// 商品価格
							setExcelValue(excel, sheetName, RB_writePriceX[x]+y, price);
							// FBA在庫数量
							setExcelValue(excel, sheetName, RB_writeStockX[x]+y, fba);
							// ローカル在庫
							setExcelValue(excel, sheetName, RB_writeLocalStockX[x]+y, localstock);
							// ONBOARD在庫
							setExcelValue(excel, sheetName, RB_writeOnboardStockX[x]+y, onboard);
							// 販売数量(直近7日間)
							setExcelValue(excel, sheetName, RB_writeSell7X[x]+y, selled7);
							// 販売数量(直近30日間)
							setExcelValue(excel, sheetName, RB_writeSell30X[x]+y, selled30);
							// 販売数量(直近60日間)
							setExcelValue(excel, sheetName, RB_writeSell60X[x]+y, selled60);
							// 販売数量(直近90日間)
							setExcelValue(excel, sheetName, RB_writeSell90X[x]+y, selled90);
							// 販売数量(週間平均値)
							setExcelValue(excel, sheetName, RB_writeSellWeekX[x]+y, selledweek);
							// 仕入数量
							setExcelValue(excel, sheetName, RB_writeDeliveryX[x]+y, delivery);
						}
					}
				}
				
			}

			// 靴下
			if(productno != null && productno.length > 0 && productno.substring(0,1) == "W"){

				var sheetName = "在庫情報（袜子）";

				for(var y = W_labelY_from;y <= W_labelY_to;y ++){

						var excellabelno = excel.getValue(sheetName, W_labelX + y);

						if(excellabelno == null || excellabelno.length <= 0){
							break;
						}
						if(excellabelno == labelno){

							setExcelValue(excel, sheetName, W_writePriceX+y, price);

							setExcelValue(excel, sheetName, W_writeStockX+y, fba);

							setExcelValue(excel, sheetName, W_writeLocalStockX+y, localstock);

							setExcelValue(excel, sheetName, W_writeOnboardStockX+y, onboard);

							setExcelValue(excel, sheetName, W_writeSell7X+y, selled7);

							setExcelValue(excel, sheetName, W_writeSell30X+y, selled30);

							setExcelValue(excel, sheetName, W_writeSell60X+y, selled60);

							setExcelValue(excel, sheetName, W_writeSell90X+y, selled90);

							setExcelValue(excel, sheetName, W_writeSellWeekX+y, selledweek);
							// 仕入数量
							setExcelValue(excel, sheetName, W_writeDeliveryX+y, delivery);
						}

				}

			}


		}

		excel.setActiveSheet("在庫情報（雨衣）").save(tempFilePathName);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear納品情報_" + deliveryno + ".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};

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