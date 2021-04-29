var addpurchase={};
addpurchase.name="仕入新規登録";
addpurchase.paramsFormat={

	"#purchaseInfo":{

		"#purchasename":"required:true;display-name:仕入名称;",
		"#importfile_purchase":"required:true;display-name:仕入内容;",

	},
	"#shop":null
};

var shopname = "";

addpurchase.fire=function(params){

	shopname = params["#shop"];

	// 仕入名称
	var purchasename = params["#purchaseInfo"]["#purchasename"];
	// 仕入内容
	var importfile_purchase = params["#purchaseInfo"]["#importfile_purchase"];

	var today = new Date();

	// 新規登録日
	var registrationDate = today.format("yyyy/MM/dd");

	// 仕入No
	var purchaseNo = today.format("yyyyMMdd-HHmmss");

	// 仕入管理テーブル登録
	var insertResult = db.change(
		"PURCHASE",
		"insertPurchase",
		{
			"shop":shopname,
			"col0":purchaseNo,
			"col1":purchasename,
			"col2":"0：新規登録",
			"col3":registrationDate
		}
	);

	file.saveUploadFiles("upload");

	var fa = importfile_purchase.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(shopname == "Smart-KM"){

	}else{

		var RC_labelX = ["F","G","H","I","J","K"];
		var RC_localStockX = ["R","S","T","U","V","W"];
		var RC_onboardStockX = ["X","Y","Z","AA","AB","AC"];
		var RC_purchaseX = ["BN","BO","BP","BQ","BR","BS"];

		var RC_labelY_from = 4;
		var RC_labelY_to = 30;

		var sheetName = "在庫情報（雨衣）";

		for(var y = RC_labelY_from;y <= RC_labelY_to;y++){

			for(var x = 0;x < RC_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, RC_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}

				var detailResult = db.select(
					"UPLOAD",
					"searchSKUASIN",
					{
						label:label,
						shop:shopname
					}
				).getArray();
				if(detailResult == null || detailResult.length <= 0){
					continue;
				}

				var sku = detailResult[0]["sku"];
				var asin = detailResult[0]["asin"];

				var purchase = excelXSSF.getValue(sheetName, RC_purchaseX[x] + y);
				if(purchase == null || purchase.length == 0 || purchase == 0 || purchase == "0"){
					continue;
				}

				var insResult = db.change(
					"PURCHASE",
					"insertPurchaseDetail",
					{
						"col0":purchaseNo,
						"col1":sku,
						"col2":asin,
						"col3":"10",
						"col4":purchase,
						"col5":purchase * 10
					}
				);

			}

		}


		// var PJ_labelX = ["F","G","H","I","J","K"];
		// var PJ_localStockX = ["R","S","T","U","V","W"];
		// var PJ_onboardStockX = ["X","Y","Z","AA","AB","AC"];
		// var PJ_labelY_from = 4;
		// var PJ_labelY_to = 11;

		// var sheetName = "在庫情報（居家服）";

		// sheetName.debug("BBBBBBBBBBB");

		// for(var y = PJ_labelY_from;y <= PJ_labelY_to;y++){

		// 	for(var x = 0;x < PJ_labelX.length;x ++){

		// 		var label = excelXSSF.getValue(sheetName, PJ_labelX[x] + y);
		// 		var detailResult = db.select(
		// 			"UPLOAD",
		// 			"searchSKUASIN",
		// 			{
		// 				label:label,
		// 				shop:shopname
		// 			}
		// 		).getArray();
		// 		if(detailResult == null || detailResult.length <= 0){
		// 			continue;
		// 		}

		// 		var sku = detailResult[0]["sku"];
		// 		var asin = detailResult[0]["asin"];
		// 		if(label != null && label.length > 0){

		// 			var localstock = excelXSSF.getValue(sheetName, PJ_localStockX[x] + y);
		// 			var onboardstock = excelXSSF.getValue(sheetName, PJ_onboardStockX[x] + y);

		// 			if(localstock == null || localstock.length == 0){
		// 				localstock = "0";
		// 			}
		// 			if(onboardstock == null || onboardstock.length == 0){
		// 				onboardstock = "0";
		// 			}

		// 			var delResult = db.change(
		// 				"UPLOAD",
		// 				"delLocalstock",
		// 				{
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			var insResult = db.change(
		// 				"UPLOAD",
		// 				"insLocalstock",
		// 				{
		// 					"localstock":localstock,
		// 					"onboardstock":onboardstock,
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			count = count + 1;

		// 		}else{

		// 			continue;

		// 		}

		// 	}

		// }


		// var UB_labelX = ["F"];
		// var UB_localStockX = ["H"];
		// var UB_onboardStockX = ["I"];
		// var UB_labelY_from = 4;
		// var UB_labelY_to = 14;

		// var sheetName = "在庫情報（雨伞等）";

		// sheetName.debug("CCCCCCCCCC");

		// for(var y = UB_labelY_from;y <= UB_labelY_to;y++){

		// 	for(var x = 0;x < UB_labelX.length;x ++){

		// 		var label = excelXSSF.getValue(sheetName, UB_labelX[x] + y);
		// 		var detailResult = db.select(
		// 			"UPLOAD",
		// 			"searchSKUASIN",
		// 			{
		// 				label:label,
		// 				shop:shopname
		// 			}
		// 		).getArray();
		// 		if(detailResult == null || detailResult.length <= 0){
		// 			continue;
		// 		}

		// 		var sku = detailResult[0]["sku"];
		// 		var asin = detailResult[0]["asin"];

		// 		if(label != null && label.length > 0){

		// 			var localstock = excelXSSF.getValue(sheetName, UB_localStockX[x] + y);
		// 			var onboardstock = excelXSSF.getValue(sheetName, UB_onboardStockX[x] + y);

		// 			if(localstock == null || localstock.length == 0){
		// 				localstock = "0";
		// 			}
		// 			if(onboardstock == null || onboardstock.length == 0){
		// 				onboardstock = "0";
		// 			}

		// 			var delResult = db.change(
		// 				"UPLOAD",
		// 				"delLocalstock",
		// 				{
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			var insResult = db.change(
		// 				"UPLOAD",
		// 				"insLocalstock",
		// 				{
		// 					"localstock":localstock,
		// 					"onboardstock":onboardstock,
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			count = count + 1;

		// 		}else{

		// 			continue;

		// 		}

		// 	}

		// }

		// var RB_labelX = ["H"];
		// var RB_localStockX = ["J"];
		// var RB_onboardStockX = ["K"];
		// var RB_labelY_from = 3;
		// var RB_labelY_to = 142;

		// var sheetName = "在庫情報（雨靴）";

		// sheetName.debug("DDDDDDDDDDDD");

		// for(var y = RB_labelY_from;y <= RB_labelY_to;y++){

		// 	for(var x = 0;x < RB_labelX.length;x ++){

		// 		var label = excelXSSF.getValue(sheetName, RB_labelX[x] + y);
		// 		var detailResult = db.select(
		// 			"UPLOAD",
		// 			"searchSKUASIN",
		// 			{
		// 				label:label,
		// 				shop:shopname
		// 			}
		// 		).getArray();
		// 		if(detailResult == null || detailResult.length <= 0){
		// 			continue;
		// 		}

		// 		var sku = detailResult[0]["sku"];
		// 		var asin = detailResult[0]["asin"];

		// 		if(label != null && label.length > 0){

		// 			var localstock = excelXSSF.getValue(sheetName, RB_localStockX[x] + y);
		// 			var onboardstock = excelXSSF.getValue(sheetName, RB_onboardStockX[x] + y);

		// 			if(localstock == null || localstock.length == 0){
		// 				localstock = "0";
		// 			}
		// 			if(onboardstock == null || onboardstock.length == 0){
		// 				onboardstock = "0";
		// 			}

		// 			var delResult = db.change(
		// 				"UPLOAD",
		// 				"delLocalstock",
		// 				{
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			var insResult = db.change(
		// 				"UPLOAD",
		// 				"insLocalstock",
		// 				{
		// 					"localstock":localstock,
		// 					"onboardstock":onboardstock,
		// 					"sku":sku,
		// 					"asin":asin
		// 				}
		// 			);

		// 			count = count + 1;

		// 		}else{

		// 			continue;

		// 		}

		// 	}

		// }


		// var W_labelX = "J";
		// var W_localStockX = "M";
		// var W_onboardStockX = "N";
		// var W_labelY_from = 4;

		// var sheetName = "在庫情報（袜子）";

		// sheetName.debug("EEEEEEEEEEEEEEEEEEE");

		// for(var y = W_labelY_from;y <= 9999;y++){

		// 	var label = excelXSSF.getValue(sheetName, W_labelX + y);

		// 	if(label == null || label.length <= 0){
		// 		break;
		// 	}

		// 	var detailResult = db.select(
		// 		"UPLOAD",
		// 		"searchSKUASIN",
		// 		{
		// 			label:label,
		// 			shop:shopname
		// 		}
		// 	).getArray();

		// 	detailResult.debug("ZZZZZZZZZZZZZZZZZZZZZ");
		// 	if(detailResult == null || detailResult.length <= 0){
		// 		continue;
		// 	}

		// 	var sku = detailResult[0]["sku"];
		// 	var asin = detailResult[0]["asin"];


		// 	var localstock = excelXSSF.getValue(sheetName, W_localStockX + y);
		// 	var onboardstock = excelXSSF.getValue(sheetName, W_onboardStockX + y);

		// 	if(localstock == null || localstock.length == 0){
		// 		localstock = "0";
		// 	}
		// 	if(onboardstock == null || onboardstock.length == 0){
		// 		onboardstock = "0";
		// 	}

		// 	var delResult = db.change(
		// 		"UPLOAD",
		// 		"delLocalstock",
		// 		{
		// 			"sku":sku,
		// 			"asin":asin
		// 		}
		// 	);

		// 	var insResult = db.change(
		// 		"UPLOAD",
		// 		"insLocalstock",
		// 		{
		// 			"localstock":localstock,
		// 			"onboardstock":onboardstock,
		// 			"sku":sku,
		// 			"asin":asin
		// 		}
		// 	);

		// 	count = count + 1;


		// }




	}















	return (new Result())
	.eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};
