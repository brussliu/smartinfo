var updatepurchasestatus={};
updatepurchasestatus.name="仕入情報ステータス更新";
updatepurchasestatus.paramsFormat={

	"#purchaseno":"required:true;display-name:仕入No;",
	"status":"required:true;display-name:仕入ステータス;",

};

updatepurchasestatus.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 仕入No
	var purchaseno = params["#purchaseno"];
	// 仕入ステータス
	var status = params["status"];

	var statusStr = "";
	var sql = "";

	if(status == 0 || status == "0" ){

		return (new Result()).eval("Efw('menu_goto',{page:'purchase.jsp'})");

	}else if(status == 1 || status == "1" ){
		statusStr = "1：仕入確定";
		sql = "updatePurchase1";

	}else if(status == 2 || status == "2" ){
		statusStr = "2：発送済み";
		sql = "updatePurchase2";

	}else if(status == 3 || status == "3" ){
		statusStr = "3：到着済み";
		sql = "updatePurchase3";

	}else if(status == 4 || status == "4" ){
		statusStr = "4：受取済み";
		sql = "updatePurchase4";
	}

	var today = new Date();

	var dDate = today.format("yyyy/MM/dd");

	// 仕入管理テーブル登録
	var updateResult = db.change(
		"PURCHASE",
		sql,
		{
			"shop":getShopId(),
			"col0":purchaseno,
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



	return ret.eval("Efw('menu_goto',{page:'purchase.jsp'})");
};
