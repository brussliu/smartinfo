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


		var PJ_labelX = ["F","G","H","I","J","K"];
		var RJ_purchaseX = ["BN","BO","BP","BQ","BR","BS"];

		var PJ_labelY_from = 4;
		var PJ_labelY_to = 11;

		var sheetName = "在庫情報（居家服）";

		for(var y = PJ_labelY_from;y <= PJ_labelY_to;y++){

			for(var x = 0;x < PJ_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, PJ_labelX[x] + y);
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

				var purchase = excelXSSF.getValue(sheetName, RJ_purchaseX[x] + y);
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


		var UB_labelX = ["F"];
		var UB_purchaseX = ["P"];

		var UB_labelY_from = 4;
		var UB_labelY_to = 14;

		var sheetName = "在庫情報（雨伞等）";

		for(var y = UB_labelY_from;y <= UB_labelY_to;y++){

			for(var x = 0;x < UB_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, UB_labelX[x] + y);
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

				var purchase = excelXSSF.getValue(sheetName, UB_purchaseX[x] + y);
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


		var RB_labelX = ["H"];
		var RB_purchaseX = ["R"];

		var RB_labelY_from = 3;
		var RB_labelY_to = 142;

		var sheetName = "在庫情報（雨靴）";

		for(var y = RB_labelY_from;y <= RB_labelY_to;y++){

			for(var x = 0;x < RB_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, RB_labelX[x] + y);
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

				var purchase = excelXSSF.getValue(sheetName, RB_purchaseX[x] + y);
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


		var W_labelX = "J";
		var W_purchaseX = "U";

		var W_labelY_from = 4;

		var sheetName = "在庫情報（袜子）";


		for(var y = W_labelY_from;y <= 9999;y++){

			var label = excelXSSF.getValue(sheetName, W_labelX + y);

			if(label == null || label.length <= 0){
				break;
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

			var purchase = excelXSSF.getValue(sheetName, W_purchaseX[x] + y);
			if(purchase == null || purchase.length == 0 || purchase == 0 || purchase == "0"){
				continue;
			}


			var localstock = excelXSSF.getValue(sheetName, W_localStockX + y);
			var onboardstock = excelXSSF.getValue(sheetName, W_onboardStockX + y);

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

	return (new Result())
	.eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};
