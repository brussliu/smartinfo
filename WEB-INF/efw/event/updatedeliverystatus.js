var updatedeliverystatus={};
updatedeliverystatus.name="納品情報ステータス更新";
updatedeliverystatus.paramsFormat={

	"#deliveryno":"required:true;display-name:納品No;",
	"status":"required:true;display-name:納品ステータス;",
	"#shop" : null
};

var shopname = "";

updatedeliverystatus.fire=function(params){

	shopname = params["#shop"];

	// 仕入No
	var deliveryno = params["#deliveryno"];
	// 仕入ステータス
	var status = params["status"];

	var statusStr = "";
	var sql = "";

	if(status == 0 || status == "0" ){

		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");

	}else if(status == 1 || status == "1" ){
		statusStr = "1：納品確定";
		sql = "updateDelivery1";

	}else if(status == 2 || status == "2" ){
		statusStr = "2：納品発送";
		sql = "updateDelivery2";

	}else if(status == 3 || status == "3" ){
		statusStr = "3：納品受領";
		sql = "updateDelivery3";

	}else if(status == 4 || status == "4" ){
		statusStr = "4：納品完了";
		sql = "updateDelivery4";
	}

	var today = new Date();

	var dDate = today.format("yyyy/MM/dd");

	// 仕入管理テーブル登録
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

	if(status == 2 || status == "2" ){

		var updateResult1 = db.change(
			"PURCHASE",
			"updatePurchaseShipping",
			{
				"col0":purchaseno
			}
		);

	}


	if(status == 4 || status == "4" ){

		// 途中数量から削減
		var updateResult1 = db.change(
			"PURCHASE",
			"updatePurchaseAcceptance1",
			{
				"col0":purchaseno
			}
		);
		// 家数量に計上
		var updateResult2 = db.change(
			"PURCHASE",
			"updatePurchaseAcceptance2",
			{
				"col0":purchaseno
			}
		);
	}



	return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};
