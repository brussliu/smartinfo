var outputpurchase={};
outputpurchase.name="仕入情報出力";
outputpurchase.paramsFormat={

	"#shop":null,
	"#purchaseno":"required:true;display-name:仕入No;",

};
var shopname = "";
outputpurchase.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	shopname = params["#shop"];

	var purchaseno = params["#purchaseno"];

	var selectResult = db.select(
		"STOCK",
		"selectstockAndPurchase",
		{
		shop : shopname,
		purchaseno : purchaseno
		}
	).getArray();


	if(shopname == "Smart-KM"){

		var tempFilePathName = outputProductForSmartKM(selectResult, false, true);

		ret.attach(tempFilePathName)
		.saveas("Smart-KM仕入情報_" + purchaseno + ".xlsx")
		.deleteAfterDownload();

	}else{

		var tempFilePathName = outputProductForSmartBear(selectResult, false, true);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear仕入情報_" + purchaseno + ".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};