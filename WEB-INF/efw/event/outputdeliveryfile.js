var outputdeliveryfile={};
outputdeliveryfile.name="納品作成用ファイル出力";
outputdeliveryfile.paramsFormat={

	"#shop":null,
	"#deliveryno":"required:true;display-name:仕入No;",

};
var shopname = "";
outputdeliveryfile.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	// // 注文基準日
	// var selectResult = db.select(
	// 	"STOCK",
	// 	"searchhistory",
	// 	{shop:shopname}
	// );

	// var orderArr = selectResult.seek("importtype","eq","order").getArray();


	// var orderBaseDate = orderArr[0]["basetime"];

	var deliveryno = params["#deliveryno"];

	// var selectResult = db.select(
	// 	"STOCK",
	// 	"selectstockAndDelivery",
	// 	{
	// 	shop : shopname,
	// 	basedate_order : orderBaseDate,
	// 	deliveryno : deliveryno
	// 	}
	// ).getArray();


	if(shopname == "Smart-KM"){



	}else{

		// テンプレートにより、EXCELオブジェクトを作成する
		var excel = new Excel("templates/DeliveryTemplete.xls");

		var tempFilePathName = file.getTempFileName();

		var sheetName = "納品プランの作成";

		
		excel.setCell(sheetName, "B1", "プラン名称");
		excel.setCell(sheetName, "A11", "SKUSKI");
		excel.setCell(sheetName, "B11", "123");

		excel.setActiveSheet("納品プランの作成").save(tempFilePathName);

		ret.attach(tempFilePathName)
		.saveas("Smart-Bear納品用ファイル_" + deliveryno + ".xlsx")
		.deleteAfterDownload();

	}

	return (ret);

};