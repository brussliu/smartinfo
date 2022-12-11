var outputdelivery={};
outputdelivery.name="納品情報出力";
outputdelivery.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",

};

outputdelivery.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 注文基準日
	var selectResult = db.select(
		"STOCK",
		"searchhistory",
		{shop:getShopId()}
	);
	var orderArr = selectResult.seek("importtype","eq","order").getArray();
	var orderBaseDate = orderArr[0]["basetime"];

	var deliveryno = params["#deliveryno"];

	var selectResult = db.select(
		"STOCK",
		"selectstockAndDelivery",
		{
		shop : getShopId(),
		basedate_order : orderBaseDate,
		deliveryno : deliveryno
		}
	).getArray();

	if(getShopId() == "Smart-KM"){

		var tempFilePathName = outputProductForSmartKM(selectResult, true, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM納品情報_" + deliveryno + ".xlsx")
		.deleteAfterDownload();


	}else{

		var tempFilePathName = outputProductForSmartBear(selectResult, true, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear納品情報_" + deliveryno + ".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};
