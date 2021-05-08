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

		file.remove("output/test.txt");
		file.makeFile("output/test.txt");

		// テンプレートにより、EXCELオブジェクトを作成する
		var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");

		var ary = new Array(10 + 1);

		ary[0] = "PlanName	aaa";
		ary[1] = "AddressName	SmartBear";
		ary[2] = "AddressFieldOne	浮間３－１－３７－４１１号室";
		ary[3] = "AddressFieldTwo	";
		ary[4] = "AddressCity	北区";
		ary[5] = "AddressCountryCode	JP";
		ary[6] = "AddressStateOrRegion	東京都";
		ary[7] = "AddressPostalCode	1150051";
		ary[8] = "	";
		ary[9] = "MerchantSKU	Quantity";

		ary[10] = "EM-GSK7-J02B	999";


		csvWriter.writeLine(ary);



		ret.attach("output/test.txt")
		.saveas("Smart-Bear納品用ファイル_" + deliveryno + ".txt");

		//.deleteAfterDownload();

	}

	return (ret);

};