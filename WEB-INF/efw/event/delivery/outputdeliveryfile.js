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

	file.remove("output/test.txt");
	file.makeFile("output/test.txt");

	var csvWriter = new CSVWriter("output/test.txt", ",", "\"", "MS932");

	var ary = [
		["PlanName	" + deliveryname],
		["AddressName	" + shopname],
		["AddressFieldOne	浮間３－１－３７－４１１号室"],
		["AddressFieldTwo	"],
		["AddressCity	北区"],
		["AddressCountryCode	JP"],
		["AddressStateOrRegion	東京都"],
		["AddressPostalCode	1150051"],
		["	"],
		["MerchantSKU	Quantity"],
		[""],
	];

	csvWriter.writeAllLines(ary);

	for(var i = 0;i < skuResult.length;i ++){

		var dary = [skuResult[i]["skuinfo"]];

		csvWriter.writeLine(dary);

	}

	ret.attach("output/test.txt")
	.saveas("納品用ファイル_" + deliveryno + ".txt");

	return (ret);

};