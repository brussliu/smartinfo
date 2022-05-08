var outputshipinfo={};
outputshipinfo.name="発送情報出力";
outputshipinfo.paramsFormat={};


outputshipinfo.fire=function(params){
	
	var ret = new Result();

	var selectResult = db.select(
		"SHIP",
		"searchShipInfoToCSV",
		{}
	).getArray();

	file.remove("output/clickpost.txt");
	file.makeFile("output/clickpost.txt");

	var csvWriter = new CSVWriter("output/clickpost.txt", ",", "\"", "MS932");

	var ary = [
		["お届け先郵便番号","お届け先氏名","お届け先敬称","お届け先住所1行目","お届け先住所2行目","お届け先住所3行目","お届け先住所4行目","内容品"]
	];

	csvWriter.writeAllLines(ary);

	// for(var i = 0;i < skuResult.length;i ++){

	// 	var dary = [skuResult[i]["skuinfo"]];

	// 	csvWriter.writeLine(dary);

	// }

	ret.attach("output/clickpost.txt").saveas("クリックポスト作成用.txt");

	return ret;

};
