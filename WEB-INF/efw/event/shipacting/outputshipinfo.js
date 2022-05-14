var outputshipinfo={};
outputshipinfo.name="発送情報出力";
outputshipinfo.paramsFormat={};


outputshipinfo.fire=function(params){
	
	var ret = new Result();

	var selectResult = db.select(
		"SHIPACTING",
		"searchShipInfoToCSV",
		{}
	).getArray();

	file.remove("output/clickpost.csv");
	file.makeFile("output/clickpost.csv");

	var csvWriter = new CSVWriter("output/clickpost.csv", ",", "", "MS932");

	var ary = ["お届け先郵便番号,お届け先氏名,お届け先敬称,お届け先住所1行目,お届け先住所2行目,お届け先住所3行目,お届け先住所4行目,内容品"];

	csvWriter.writeLine(ary);


	for(var i = 0;i < selectResult.length;i ++){

		var ary = new Array(1);

		var line = selectResult[i]["postno"] + "," +
		selectResult[i]["name"] + "," +
		selectResult[i]["sama"] + "," +
		selectResult[i]["address1"] + "," +
		selectResult[i]["address2"] + "," +
		selectResult[i]["address3"] + "," +
		selectResult[i]["address4"] + "," +
		selectResult[i]["shipcontent"];

		ary[0] = line;

		csvWriter.writeLine(ary);

	}

	ret.attach("output/clickpost.csv").saveas("クリックポスト作成用.csv");

	return ret;

};
