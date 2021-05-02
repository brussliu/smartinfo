var adddelivery={};
adddelivery.name="納品新規登録";
adddelivery.paramsFormat={

	"#deliveryInfo":{

		"#deliveryname":"required:true;display-name:納品名称;",
		"#importfile_delivery":"required:true;display-name:納品内容;",

	},
	"#shop":null
};

var shopname = "";

adddelivery.fire=function(params){

	shopname = params["#shop"];

	// 納品名称
	var deliveryname = params["#deliveryInfo"]["#deliveryname"];
	// 納品内容
	var importfile_delivery = params["#deliveryInfo"]["#importfile_delivery"];

	var today = new Date();

	// 新規登録日
	var registrationDate = today.format("yyyy/MM/dd");

	// 仕入No
	var deliveryno = today.format("yyyyMMdd-HHmmss");

	// 仕入管理テーブル登録
	var insertResult = db.change(
		"DELIVERT",
		"insertDelivery",
		{
			"shop":shopname,
			"col0":deliveryno,
			"col1":deliveryname,
			"col2":"0：新規登録",
			"col3":registrationDate
		}
	);

	file.saveUploadFiles("upload");

	var fa = importfile_delivery.split("\\");
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

				// ラベル
				var label = excelXSSF.getValue(sheetName, RC_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}
				// 納品数量
				var delivery = excelXSSF.getValue(sheetName, RC_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}
				
				insertDeliveryDetail(label, delivery);

			}

		}


		var PJ_labelX = ["F","G","H","I","J","K"];
		var PJ_deliveryX = ["BN","BO","BP","BQ","BR","BS"];

		var PJ_labelY_from = 4;
		var PJ_labelY_to = 11;

		var sheetName = "在庫情報（居家服）";

		for(var y = PJ_labelY_from;y <= PJ_labelY_to;y++){

			for(var x = 0;x < PJ_labelX.length;x ++){

				// ラベル
				var label = excelXSSF.getValue(sheetName, PJ_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}
				// 納品数量
				var delivery = excelXSSF.getValue(sheetName, PJ_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery);

			}

		}


		var UB_labelX = ["F"];
		var UB_deliveryX = ["P"];

		var UB_labelY_from = 4;
		var UB_labelY_to = 14;

		var sheetName = "在庫情報（雨伞等）";

		for(var y = UB_labelY_from;y <= UB_labelY_to;y++){

			for(var x = 0;x < UB_labelX.length;x ++){

				// ラベル
				var label = excelXSSF.getValue(sheetName, UB_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}
				// 納品数量
				var delivery = excelXSSF.getValue(sheetName, UB_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery);

			}

		}


		var RB_labelX = ["H"];
		var RB_deliveryX = ["R"];

		var RB_labelY_from = 3;
		var RB_labelY_to = 142;

		var sheetName = "在庫情報（雨靴）";

		for(var y = RB_labelY_from;y <= RB_labelY_to;y++){

			for(var x = 0;x < RB_labelX.length;x ++){

				// ラベル
				var label = excelXSSF.getValue(sheetName, RB_labelX[x] + y);
				if(label == null || label.length == 0){
					continue;
				}
				// 納品数量
				var delivery = excelXSSF.getValue(sheetName, RB_deliveryX[x] + y);
				if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
					continue;
				}

				insertDeliveryDetail(label, delivery);

			}

		}


		var W_labelX = "J";
		var W_deliveryX = "U";

		var W_labelY_from = 4;

		var sheetName = "在庫情報（袜子）";

		for(var y = W_labelY_from;y <= 9999;y++){

			var label = excelXSSF.getValue(sheetName, W_labelX + y);
			// ラベル
			if(label == null || label.length <= 0){
				break;
			}
			// 納品数量
			var delivery = excelXSSF.getValue(sheetName, W_deliveryX + y);
			if(delivery == null || delivery.length == 0 || delivery == 0 || delivery == "0"){
				continue;
			}

			insertDeliveryDetail(label, delivery);

		}

	}

	return (new Result())
	.eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};


function insertDeliveryDetail(label, delivery){

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