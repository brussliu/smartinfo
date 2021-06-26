var outputdelivery={};
outputdelivery.name="納品情報出力";
outputdelivery.paramsFormat={

	"#shop":null,
	"#deliveryno":"required:true;display-name:仕入No;",

};
var shopname = "";
outputdelivery.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	// 注文基準日
	var selectResult = db.select(
		"STOCK",
		"searchhistory",
		{shop:shopname}
	);
	var orderArr = selectResult.seek("importtype","eq","order").getArray();
	var orderBaseDate = orderArr[0]["basetime"];

	var deliveryno = params["#deliveryno"];

	var selectResult = db.select(
		"STOCK",
		"selectstockAndDelivery",
		{
		shop : shopname,
		basedate_order : orderBaseDate,
		deliveryno : deliveryno
		}
	).getArray();

	if(shopname == "Smart-KM"){

		var tempFilePathName = outputProductForSmartKM(selectResult, true);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM納品情報_" + deliveryno + ".xlsx")
		.deleteAfterDownload();


	}else{

		var tempFilePathName = outputProductForSmartBear(selectResult, true);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear納品情報_" + deliveryno + ".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};
