var outputstock={};
outputstock.name="在庫補足";
outputstock.paramsFormat={

	"shop":null,

};
var shopname = "";
outputstock.fire=function(params){
	
	var ret = new Result();

	shopname = params["shop"];

	// 注文基準日
	var selectResult = db.select(
		"STOCK",
		"searchhistory",
		{shop:shopname}
	);
	var orderArr = selectResult.seek("importtype","eq","order").getArray();
	var orderBaseDate = orderArr[0]["basetime"];

	var selectResult = db.select(
		"STOCK",
		"selectstock",
		{
		shop:shopname,
		basedate_order:orderBaseDate,
		}
	).getArray();

	if(shopname == "Smart-KM"){

		var tempFilePathName = outputProductForSmartKM(selectResult, false, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();

	}else{

		"GGGGGGGGGGGGGGGGGGGGGGGGGGGGG".debug("GGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
		var tempFilePathName = outputProductForSmartBear(selectResult, false, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};
