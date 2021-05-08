var outputdeliveryfile={};
outputdeliveryfile.name="納品作成用ファイル出力";
outputdeliveryfile.paramsFormat={

	"#shop":null,
	"#deliveryno":"required:true;display-name:納品No;",
	"#deliveryname":"required:true;display-name:納品名称;",

};
var shopname = "";
outputdeliveryfile.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var deliveryno = params["#deliveryno"];
	var deliveryname = params["#deliveryname"];


	var skuResult = db.select(
		"DELIVERY",
		"selectSkuList",
		{
			col0:deliveryno
		}
	).getArray();


	if(shopname == "Smart-KM"){



	}else{

		file.remove("output/test.txt");
		file.makeFile("output/test.txt");

		// テンプレートにより、EXCELオブジェクトを作成する
		var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");

		// var ary1 = new Array(1);
		// var ary2 = new Array(1);
		// var ary3 = new Array(1);
		// var ary4 = new Array(1);
		// var ary5 = new Array(1);
		// var ary6 = new Array(1);
		// var ary7 = new Array(1);
		// var ary8 = new Array(1);
		// var ary9 = new Array(1);
		// var ary10 = new Array(1);


		// ary1[0] = "PlanName	aaa";
		// ary2[0] = "AddressName	SmartBear";
		// ary3[0] = "AddressFieldOne	浮間３－１－３７－４１１号室";
		// ary4[0] = "AddressFieldTwo	";
		// ary5[0] = "AddressCity	北区";
		// ary6[0] = "AddressCountryCode	JP";
		// ary7[0] = "AddressStateOrRegion	東京都";
		// ary8[0] = "AddressPostalCode	1150051";
		// ary9[0] = "	";
		// ary10[0] = "MerchantSKU	Quantity";

		// // ary[10] = "EM-GSK7-J02B	999";


		// csvWriter.writeLine(ary1);
		// csvWriter.writeLine(ary2);
		// csvWriter.writeLine(ary3);

		var ary = [
			["PlanName	" + deliveryname],
			["AddressName	SmartBear"],
			["AddressFieldOne	浮間３－１－３７－４１１号室"],
			["AddressFieldTwo	"],
			["AddressCity	北区"],
			["AddressCountryCode	JP"],
			["AddressStateOrRegion	東京都"],
			["AddressPostalCode	1150051"],
			["	"],
			["MerchantSKU	Quantity"]
		];

		csvWriter.writeAllLines(ary);

		for(var i = 0;i < skuResult.length;i ++){

			csvWriter.writeLine(skuResult[i]["skuinfo"]);
			

		}




		ret.attach("output/test.txt")
		.saveas("Smart-Bear納品用ファイル_" + deliveryno + ".txt");

		//.deleteAfterDownload();

	}

	return (ret);

};