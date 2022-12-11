var outputstock={};
outputstock.name="在庫補足";
outputstock.paramsFormat={

	"shop":null,

};

outputstock.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}


	var selectResult = db.select(
		"STOCK",
		"selectstock",
		{
		shop : getShopId(),
		csvflg : "1",
		highsearch : ""
		}
	).getArray();

	if(getShopId() == "Smart-KM"){

		var tempFilePathName = outputProductForSmartKM(selectResult, false, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();

	}else{

		var tempFilePathName = outputProductForSmartBear(selectResult, false, false);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};
