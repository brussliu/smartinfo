var updatedeliverystatus={};
updatedeliverystatus.name="納品情報ステータス更新";
updatedeliverystatus.paramsFormat={

	"#deliveryno":"required:true;display-name:納品No;",
	"status":"required:true;display-name:納品ステータス;",
	"#importfile_acceptance":null,
	"#shop" : null
};

var shopname = "";
var deliveryno = "";

updatedeliverystatus.fire=function(params){

	shopname = params["#shop"];

	// 納品No
	deliveryno = params["#deliveryno"];

	// 納品ステータス
	var status = params["status"];

	// 納品受領または納品完了の場合、受領ファイルが必須
	if(status == 3 || status == "3" || status == 4 || status == "4"){
		if(params["#importfile_acceptance"] == null || params["#importfile_acceptance"].length == 0){
			return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
		}
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

	var oldstatus = detailResult[0]["status"];

	var statusStr = "";
	var sql = "";

	// 納品確定
	if(status == 1 || status == "1" ){
		statusStr = "1：納品確定";
		sql = "updateDelivery1";
	
	// 納品発送
	}else if(status == 2 || status == "2" ){
		statusStr = "2：納品発送";
		sql = "updateDelivery2";

	}
	// 納品受領
	if(status == 3 || status == "3" ){
		statusStr = "3：納品受領";
		sql = "updateDelivery3";
	}
	// 納品完了
	if(status == 4 || status == "4" ){
		statusStr = "4：納品完了";
		sql = "updateDelivery4";
	}

	var today = new Date();
	var dDate = today.format("yyyy/MM/dd");

	// 仕入管理テーブル更新
	var updateResult = db.change(
		"DELIVERY",
		sql,
		{
			"shop":shopname,
			"col0":deliveryno,
			"col1":statusStr,
			"col2":dDate
		}
	);
	
	
	// 納品受領または納品完了
	if(status == 3 || status == "3" || status == 4 || status == "4"){

		// 現ステータスが納品受領の場合、前回の受領数量を家在庫へ戻る
		if(oldstatus == "3：納品受領"){

			var updateResult = db.change(
				"DELIVERY",
				"updateDeliveryShipping1",
				{
					"col0":deliveryno
				}
			);

		}

		file.saveUploadFiles("upload");
		var importfile_acceptance = params["#importfile_acceptance"];

		// 受領ファイルをループし、明細テーブルの受領数量を更新する
		var fa = importfile_acceptance.split("\\");
		var f = fa[fa.length-1];

		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件導入
		csvReader.loopAllLines(importAcceptance);
	
		// 家在庫から、最新の受領数量を削減
		var updateResult = db.change(
			"DELIVERY",
			"updateDeliveryShipping2",
			{
				"col0":deliveryno
			}
		);

	}

	return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");

};


function importAcceptance(aryField, index) {

	var amz_delivery_no = "";
	var amz_delivery_name = "";
	var amz_delivery_plan = "";

	if(index == 0){
		amz_delivery_no = aryField[1];
		amz_delivery_no.debug("XXXXXXXXXXXXXXX1");
		var updResult = db.change(
			"DELIVERY",
			"updateDeliveryAmz1",
			{
				"info":amz_delivery_no,
				"col0":deliveryno
			}
		);
	}
	if(index == 1){
		amz_delivery_name = aryField[1];
		amz_delivery_name.debug("XXXXXXXXXXXXXXX2");
		var updResult = db.change(
			"DELIVERY",
			"updateDeliveryAmz2",
			{
				"info":amz_delivery_name,
				"col0":deliveryno
			}
		);
	}
	if(index == 2){
		amz_delivery_plan = aryField[1];
		amz_delivery_plan.debug("XXXXXXXXXXXXXXX3");
		var updResult = db.change(
			"DELIVERY",
			"updateDeliveryAmz3",
			{
				"info":amz_delivery_plan,
				"col0":deliveryno
			}
		);
	}

	if(index >= 8){

		// 納品明細の受領数量を更新
		var updResult = db.change(
			"DELIVERY",
			"updateDeliveryAcceptance",
			{
				"acceptance":aryField[9],
				"sku":aryField[0],
				"asin":aryField[2],
				"col0":deliveryno
			}
		);

		// 想定外納品
		if(updResult == 0 || updResult == "0"){
			var insResult3 = db.change(
				"DELIVERY",
				"insertAcceptanceDetail",
				{
					"col0":deliveryno,
					"col1":aryField[0],
					"col2":aryField[2],
					"col3":aryField[9]
				}
			);
		}

	}

};
