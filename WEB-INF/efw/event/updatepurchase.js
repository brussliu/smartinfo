var updatepurchase={};
updatepurchase.name="仕入情報更新";
updatepurchase.paramsFormat={

	"#purchaseno":"required:true;display-name:仕入No;",
	"#purchasename":"required:true;display-name:仕入名称;",
	"#importfile_purchase":null,
	"#shop" : null
};

var shopname = "";

updatepurchase.fire=function(params){

	shopname = params["#shop"];

	// 仕入No
	var purchaseno = params["#purchaseno"];

	// 仕入名称
	var purchasename = params["#purchasename"];
	// 仕入名称更新
	var updateResult = db.change(
		"PURCHASE",
		"updatePurchase00",
		{
			"shop":shopname,
			"col0":purchaseno,
			"col1":purchasename
		}
	);

	// 仕入明細
	var importfile_purchase = params["#importfile_purchase"];

	if(importfile_purchase == null || importfile_purchase.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"PURCHASE",
		"selectPurchaseStatus",
		{
			col0:purchaseno,
			shop:shopname
		}
	).getArray();

	var status = detailResult[0]["status"];

	// 受取済みの場合、明細は更新しない
	if(status == "4：受取済み"){
		return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");

	}
	// 
	if(status == "1：仕入確定"){

			// 2, 既存仕入明細を全件削除
			var delResult = db.change(
				"PURCHASE",
				"delPurchaseDetail",
				{
					"col0":purchaseno
				}
			);
	
			// 3, 新しい仕入明細を挿入
			uploadPurchaseDetail(importfile_purchase);

			// 5, 確定数量及び確定金額を再計算
			var updateResult = db.change(
				"PURCHASE",
				"updatePurchase01",
				{
					col0:purchaseno,
					shop:shopname
				}
			);

	}

	// 発送済みまたは到着済みの場合、途中在庫へ計上する処理を行う
	if(status == "2：発送済み" || status == "3：到着済み"){

		// 1, 途中在庫から既存仕入明細の数量を減らす
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchaseShipping1",
			{
				"col0":purchaseno
			}
		);

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"PURCHASE",
			"delPurchaseDetail",
			{
				"col0":purchaseno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadPurchaseDetail(importfile_purchase);

		// 4, 途中在庫に新しい仕入明細の数量を計上
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchaseShipping2",
			{
				"col0":purchaseno
			}
		);

		// 5, 確定数量及び確定金額を再計算
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchase01",
			{
				col0:purchaseno,
				shop:shopname
			}
		);

	}

	return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};


function uploadPurchaseDetail(excelfile){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
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

		var RC_priceX = ["L","M","N","O","P","Q"];
		var price_sheetName = "入荷見積（雨衣）";

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

				var price = excelXSSF.getValue(price_sheetName, RC_priceX[x] + y);
				if(price == null || price.length == 0){
					price = "0";
				}

				var insResult = db.change(
					"PURCHASE",
					"insertPurchaseDetail",
					{
						"col0":purchaseno,
						"col1":sku,
						"col2":asin,
						"col3":parseFloat(price).toFixed(2),
						"col4":purchase,
						"col5":(parseFloat(price) * purchase).toFixed(2)
					}
				);

			}

		}


		var PJ_labelX = ["F","G","H","I","J","K"];
		var RJ_purchaseX = ["BN","BO","BP","BQ","BR","BS"];

		var PJ_labelY_from = 4;
		var PJ_labelY_to = 11;

		var sheetName = "在庫情報（居家服）";

		var PJ_priceX = ["L","M","N","O","P","Q"];
		var price_sheetName = "入荷見積（居家服）";

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

				var price = excelXSSF.getValue(price_sheetName, PJ_priceX[x] + y);
				if(price == null || price.length == 0){
					price = "0";
				}

				var insResult = db.change(
					"PURCHASE",
					"insertPurchaseDetail",
					{
						"col0":purchaseno,
						"col1":sku,
						"col2":asin,
						"col3":parseFloat(price).toFixed(2),
						"col4":purchase,
						"col5":(parseFloat(price) * purchase).toFixed(2)
					}
				);

			}

		}


		var UB_labelX = ["F"];
		var UB_purchaseX = ["P"];

		var UB_labelY_from = 4;
		var UB_labelY_to = 14;

		var sheetName = "在庫情報（雨伞等）";

		var UB_priceX = ["H"];
		var price_sheetName = "入荷見積（雨伞等）";

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

				var price = excelXSSF.getValue(price_sheetName, UB_priceX[x] + y);
				if(price == null || price.length == 0){
					price = "0";
				}

				var insResult = db.change(
					"PURCHASE",
					"insertPurchaseDetail",
					{
						"col0":purchaseno,
						"col1":sku,
						"col2":asin,
						"col3":parseFloat(price).toFixed(2),
						"col4":purchase,
						"col5":(parseFloat(price) * purchase).toFixed(2)
					}
				);

			}

		}


		var RB_labelX = ["H"];
		var RB_purchaseX = ["R"];

		var RB_labelY_from = 3;
		var RB_labelY_to = 142;

		var sheetName = "在庫情報（雨靴）";

		var RB_priceX = ["J"];
		var price_sheetName = "入荷見積（雨靴）";

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

				var price = excelXSSF.getValue(price_sheetName, RB_priceX[x] + y);
				if(price == null || price.length == 0){
					price = "0";
				}

				var insResult = db.change(
					"PURCHASE",
					"insertPurchaseDetail",
					{
						"col0":purchaseno,
						"col1":sku,
						"col2":asin,
						"col3":parseFloat(price).toFixed(2),
						"col4":purchase,
						"col5":(parseFloat(price) * purchase).toFixed(2)
					}
				);

			}

		}


		var W_labelX = "J";
		var W_purchaseX = "U";

		var W_labelY_from = 4;

		var sheetName = "在庫情報（袜子）";

		var W_priceX = "K";
		var price_sheetName = "入荷見積（袜子）";

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

			var purchase = excelXSSF.getValue(sheetName, W_purchaseX + y);
			if(purchase == null || purchase.length == 0 || purchase == 0 || purchase == "0"){
				continue;
			}

			var price = excelXSSF.getValue(price_sheetName, W_priceX + y);
			if(price == null || price.length == 0){
				price = "0";
			}

			var insResult = db.change(
				"PURCHASE",
				"insertPurchaseDetail",
				{
					"col0":purchaseno,
					"col1":sku,
					"col2":asin,
					"col3":parseFloat(price).toFixed(2),
					"col4":purchase,
					"col5":(parseFloat(price) * purchase).toFixed(2)
				}
			);

		}




	}



















}