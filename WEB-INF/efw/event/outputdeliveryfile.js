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
		var csvWriter = new CSVWriter("templates/deliverytemplete.txt","\t");

		var ary = new Array(10);

		ary[0] = "PlanName,testplan1";
		ary[1] = "AddressName,SmartBear";
		ary[2] = "AddressFieldOne,浮間３－１－３７";
		ary[3] = "AddressFieldTwo,トミンタワー浮間三丁目411号室";
		ary[4] = "AddressCity,北区";
		ary[5] = "AddressCountryCode,JP";
		ary[6] = "AddressStateOrRegion,東京都";
		ary[7] = "AddressPostalCode,1150051";
		ary[8] = ",";
		ary[9] = "MerchantSKU,Quantity";

		csvWriter.writeLine(ary);



		var sheetName = "納品プランの作成";

		


		ret.attach("templates/deliverytemplete.txt")
		.saveas("Smart-Bear納品用ファイル_" + deliveryno + ".txt");
		//.deleteAfterDownload();

	}

	return (ret);

};