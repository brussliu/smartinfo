var outputlabeldata={};
outputlabeldata.name="ラベル番号印刷用データ出力";
outputlabeldata.paramsFormat={
};


outputlabeldata.fire=function(params){
	
	var ret = new Result();

	// var selectResult1 = db.select(
	// 	"LABEL",
	// 	"selectLabelData",
	// 	{"shop":"Smart-KM"}
	// ).getArray();

	var selectResult2 = db.select(
		"LABEL",
		"selectLabelData",
		{"shop":"Smart-Bear"}
	).getArray();


	var excel = new Excel("templates/labellist.xlsx");

	var tempFilePathName = file.getTempFileName();

	// var sheet1 = 'Smart-KM';
	// for(var i = 0; i < selectResult1.length; i ++){

	// 	excel.setCell(sheet1, "A" + (i+2), selectResult1[i].productno);
	// 	excel.setCell(sheet1, "B" + (i+2), selectResult1[i].productname);
	// 	excel.setCell(sheet1, "C" + (i+2), selectResult1[i].color);
	// 	excel.setCell(sheet1, "D" + (i+2), selectResult1[i].size);
	// 	excel.setCell(sheet1, "E" + (i+2), selectResult1[i].labelno);
	// 	excel.setCell(sheet1, "F" + (i+2), selectResult1[i].asin);
	// 	excel.setCell(sheet1, "G" + (i+2), selectResult1[i].sku);
	// 	excel.setCell(sheet1, "H" + (i+2), selectResult1[i].sortno);

	// }

	var delResult = db.change(
		"LABEL",
		"deleteAllLabelInfo",
		{
		},
		"jdbc/efw2"
	);

	var sheet2 = 'Smart-Bear';
	for(var i = 0; i < selectResult2.length; i ++){

		excel.setCell(sheet2, "A" + (i+2), selectResult2[i].productno);
		excel.setCell(sheet2, "B" + (i+2), selectResult2[i].productname);
		excel.setCell(sheet2, "C" + (i+2), selectResult2[i].color);
		excel.setCell(sheet2, "D" + (i+2), selectResult2[i].size);
		excel.setCell(sheet2, "E" + (i+2), selectResult2[i].labelno);
		excel.setCell(sheet2, "F" + (i+2), selectResult2[i].asin);
		excel.setCell(sheet2, "G" + (i+2), selectResult2[i].sku);
		excel.setCell(sheet2, "H" + (i+2), selectResult2[i].sortno);


		
		var insertResult = db.change(
			"LABEL",
			"insertProductLabel",
			{
				"col0":changeLabelValue(selectResult2[i].productno ),
				"col1":changeLabelValue(selectResult2[i].productname),
				"col2":changeLabelValue(selectResult2[i].color),
				"col3":changeLabelValue(selectResult2[i].size),
				"col4":changeLabelValue(selectResult2[i].labelno),
				"col5":changeLabelValue(selectResult2[i].asin),
				"col6":changeLabelValue(selectResult2[i].sku),
				"col7":changeLabelValue(selectResult2[i].sortno)
			},
			"jdbc/efw2"
		);

	}


	excel.setActiveSheet(sheet2).save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("ラベル印刷用データ_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();

	return ret;

};

function changeLabelValue(value){

	if (value == null || value.length == 0){
		return " ";
	}

}