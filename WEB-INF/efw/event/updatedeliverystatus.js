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

	// 仕入No
	deliveryno = params["#deliveryno"];
	// 仕入ステータス
	var status = params["status"];

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


	if(status == 0 || status == "0" ){

		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");

	}else if(status == 1 || status == "1" ){
		statusStr = "1：納品確定";
		sql = "updateDelivery1";

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

	}else if(status == 2 || status == "2" ){
		statusStr = "2：納品発送";
		sql = "updateDelivery2";

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

	}else if(status == 3 || status == "3" ){

		file.saveUploadFiles("upload");

		// 受領明細
		var importfile_acceptance = params["#importfile_acceptance"];

		if(importfile_acceptance == null || importfile_acceptance.length == 0){
			return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
		}

		// 受領ファイルをループし、明細テーブルの受領数量を更新する
		var fa = importfile_acceptance.split("\\");
		var f = fa[fa.length-1];

		statusStr = "3：納品受領";
		sql = "updateDelivery3";

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

	}else if(status == 4 || status == "4" ){

		file.saveUploadFiles("upload");
		
		// 受領明細
		var importfile_acceptance = params["#importfile_acceptance"];

		if(importfile_acceptance == null || importfile_acceptance.length == 0){
			return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
		}

		// 受領ファイルをループし、明細テーブルの受領数量を更新する
		var fa = importfile_acceptance.split("\\");
		var f = fa[fa.length-1];

		statusStr = "4：納品完了";
		sql = "updateDelivery4";

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

		// 受領数量で、家の在庫を回復
		var updateResult = db.change(
			"DELIVERY",
			"updateDeliveryShipping1",
			{
				"col0":deliveryno
			}
		);

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

	if(index >= 8){

		// // 家の在庫から削減
		// var insResult1 = db.change(
		// 	"DELIVERY",
		// 	"updateNewLocalstock",
		// 	{
		// 		"acceptance":aryField[9],
		// 		"sku":aryField[0],
		// 		"asin":aryField[2]
		// 	}
		// );

		aryField[0].debug("000000000000000000");
		aryField[2].debug("222222222222222222");
		aryField[9].debug("999999999999999999");

		deliveryno.debug("888888888888888888");

		// 納品明細の受領数量を更新
		var insResult2 = db.change(
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
		if(insResult2 == 0 || insResult2 == "0"){
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

		insResult2.debug("KKKKKKKKKKKKKKKKKKKKKKKK");

	}

};
