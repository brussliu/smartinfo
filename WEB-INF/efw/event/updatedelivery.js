var updatedelivery={};
updatedelivery.name="納品情報更新";
updatedelivery.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",
	"#deliveryname":"required:true;display-name:仕入名称;",
	"#importfile_delivery":null,
	"#shop" : null
};

var shopname = "";

updatedelivery.fire=function(params){

	shopname = params["#shop"];

	// 仕入No
	var deliveryno = params["#deliveryno"];

	// 仕入名称
	var deliveryname = params["#deliveryname"];

	// 仕入名称更新
	var updateResult = db.change(
		"DELIVERY",
		"updateDelivery00",
		{
			"shop":shopname,
			"col0":deliveryno,
			"col1":deliveryname
		}
	);

	// 仕入明細
	var importfile_delivery = params["#importfile_delivery"];

	if(importfile_delivery == null || importfile_delivery.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"DELIVERY",
		"selectDeliveryStatus",
		{
			col0:deliveryno,
			shop:shopname
		}
	).getArray();

	var status = detailResult[0]["status"];

	// 新規登録の場合、仕入明細テーブルを再度導入
	if(status == "0：新規登録"){

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"DELIVERY",
			"delDeliveryDetail",
			{
				"col0":deliveryno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadDeliveryDetail(importfile_delivery, deliveryno);

	}

	// 受取済みの場合、明細は更新しない
	if(status == "3：納品受領" || status == "4：納品完了"){
		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");

	}
	// 
	// if(status == "1：仕入確定"){

	// 		// 2, 既存仕入明細を全件削除
	// 		var delResult = db.change(
	// 			"PURCHASE",
	// 			"delPurchaseDetail",
	// 			{
	// 				"col0":purchaseno
	// 			}
	// 		);
	
	// 		// 3, 新しい仕入明細を挿入
	// 		uploadPurchaseDetail(importfile_purchase);

	// 		// 5, 確定数量及び確定金額を再計算
	// 		var updateResult = db.change(
	// 			"PURCHASE",
	// 			"updatePurchase01",
	// 			{
	// 				col0:purchaseno,
	// 				shop:shopname
	// 			}
	// 		);

	// }

	// // 発送済みまたは到着済みの場合、途中在庫へ計上する処理を行う
	// if(status == "2：発送済み" || status == "3：到着済み"){

	// 	// 1, 途中在庫から既存仕入明細の数量を減らす
	// 	var updateResult = db.change(
	// 		"PURCHASE",
	// 		"updatePurchaseShipping1",
	// 		{
	// 			"col0":purchaseno
	// 		}
	// 	);

	// 	// 2, 既存仕入明細を全件削除
	// 	var delResult = db.change(
	// 		"PURCHASE",
	// 		"delPurchaseDetail",
	// 		{
	// 			"col0":purchaseno
	// 		}
	// 	);

	// 	// 3, 新しい仕入明細を挿入
	// 	uploadPurchaseDetail(importfile_purchase, purchaseno);

	// 	// 4, 途中在庫に新しい仕入明細の数量を計上
	// 	var updateResult = db.change(
	// 		"PURCHASE",
	// 		"updatePurchaseShipping2",
	// 		{
	// 			"col0":purchaseno
	// 		}
	// 	);

	// 	// 5, 確定数量及び確定金額を再計算
	// 	var updateResult = db.change(
	// 		"PURCHASE",
	// 		"updatePurchase01",
	// 		{
	// 			col0:purchaseno,
	// 			shop:shopname
	// 		}
	// 	);

	// }

	return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
};


function uploadDeliveryDetail(excelfile, deliveryno){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(shopname == "Smart-KM"){

	}else{

		var RC_labelX = ["F","G","H","I","J","K"];
		var RC_deliveryX = ["BN","BO","BP","BQ","BR","BS"];

		var RC_labelY_from = 4;
		var RC_labelY_to = 30;

		var sheetName = "在庫情報（雨衣）";

		for(var y = RC_labelY_from;y <= RC_labelY_to;y++){

			for(var x = 0;x < RC_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, RC_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}

				var delivery = excelXSSF.getValue(sheetName, RC_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery, deliveryno);

			}

		}


		var PJ_labelX = ["F","G","H","I","J","K"];
		var PJ_deliveryX = ["BN","BO","BP","BQ","BR","BS"];

		var PJ_labelY_from = 4;
		var PJ_labelY_to = 11;

		var sheetName = "在庫情報（居家服）";

		for(var y = PJ_labelY_from;y <= PJ_labelY_to;y++){

			for(var x = 0;x < PJ_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, PJ_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}

				var delivery = excelXSSF.getValue(sheetName, PJ_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery, deliveryno);

			}

		}


		var UB_labelX = ["F"];
		var UB_deliveryX = ["P"];

		var UB_labelY_from = 4;
		var UB_labelY_to = 14;

		var sheetName = "在庫情報（雨伞等）";

		for(var y = UB_labelY_from;y <= UB_labelY_to;y++){

			for(var x = 0;x < UB_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, UB_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}

				var delivery = excelXSSF.getValue(sheetName, UB_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery, deliveryno);

			}

		}


		var RB_labelX = ["H"];
		var RB_deliveryX = ["R"];

		var RB_labelY_from = 3;
		var RB_labelY_to = 142;

		var sheetName = "在庫情報（雨靴）";

		for(var y = RB_labelY_from;y <= RB_labelY_to;y++){

			for(var x = 0;x < RB_labelX.length;x ++){

				var label = excelXSSF.getValue(sheetName, RB_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}

				var delivery = excelXSSF.getValue(sheetName, RB_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery, deliveryno);

			}

		}


		var W_labelX = "J";
		var W_deliveryX = "U";

		var W_labelY_from = 4;

		var sheetName = "在庫情報（袜子）";

		var W_priceX = "K";
		var price_sheetName = "入荷見積（袜子）";

		for(var y = W_labelY_from;y <= 9999;y++){

			var label = excelXSSF.getValue(sheetName, W_labelX + y);
			if(label == null || label.length <= 0){
				break;
			}

			var delivery = excelXSSF.getValue(sheetName, W_deliveryX + y);
			if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
				continue;
			}

			insertDeliveryDetail(label, delivery, deliveryno);

		}

	}



}


function insertDeliveryDetail(label, delivery, deliveryno){

	var detailResult = db.select(
		"UPLOAD",
		"searchSKUASIN",
		{
			label:label,
			shop:shopname
		}
	).getArray();
	if(detailResult == null || detailResult.length <= 0){
		return;
	}

	var sku = detailResult[0]["sku"];
	var asin = detailResult[0]["asin"];

	var insResult = db.change(
		"DELIVERY",
		"insertDeliveryDetail",
		{
			"col0":deliveryno,
			"col1":sku,
			"col2":asin,
			"col3":delivery
		}
	);

}