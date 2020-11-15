var outputmaster={};
outputmaster.name="マスタ導出";
outputmaster.paramsFormat={

	"#shop":null,

};
var shopname = "";
outputmaster.fire=function(params){
	
	var ret = new Result();

	var selectResult1 = db.select(
		"MASTER",
		"selectmaster",
		{shop:"Smart-Bear"}
	).getArray();

	var selectResult2 = db.select(
		"MASTER",
		"selectmaster",
		{shop:"Smart-KM"}
	).getArray();


	var shop_X = "B";
	var p_no_X = "C";
	var p_category_X = "D";
	var p_type_X = "E";
	var p_color_X = "F";
	var p_size_X = "G";

	var sku_X = "H";
	var asin_X = "I";

	var row_from = 2;

	// テンプレートにより、EXCELオブジェクトを作成する
	var excel=new Excel("templates/output_master.xlsx");

	var tempFilePathName=file.getTempFileName();

	for(var i = 0;i < selectResult1.length;i ++){

		var y = i + row_from;

		var shopnm = selectResult1[i]["shopname"];

		var productno = selectResult1[i]["productno"];
		var productdiv = selectResult1[i]["productdiv"];
		var producttype = selectResult1[i]["producttype"];

		var color = selectResult1[i]["color"];
		var size = selectResult1[i]["size"];

		var sku = selectResult1[i]["sku"];
		var asin = selectResult1[i]["asin"];

		var sheetName = "新店";

		excel.setCell(sheetName, shop_X + y, shopnm);

		excel.setCell(sheetName, p_no_X + y, productno);

		excel.setCell(sheetName, p_category_X + y, productdiv);

		excel.setCell(sheetName, p_type_X + y, producttype);

		excel.setCell(sheetName, p_color_X + y, color);

		excel.setCell(sheetName, p_size_X + y, size);

		excel.setCell(sheetName, sku_X + y, sku);

		excel.setCell(sheetName, asin_X + y, asin);

	}

	for(var i = 0;i < selectResult2.length;i ++){

		var y = i + row_from;

		var shopnm = selectResult2[i]["shopname"];

		var productno = selectResult2[i]["productno"];
		var productdiv = selectResult2[i]["productdiv"];
		var producttype = selectResult2[i]["producttype"];

		var color = selectResult2[i]["color"];
		var size = selectResult2[i]["size"];

		var sku = selectResult2[i]["sku"];
		var asin = selectResult2[i]["asin"];

		var sheetName = "旧店";

		excel.setCell(sheetName, shop_X + y, shopnm);

		excel.setCell(sheetName, p_no_X + y, productno);

		excel.setCell(sheetName, p_category_X + y, productdiv);

		excel.setCell(sheetName, p_type_X + y, producttype);

		excel.setCell(sheetName, p_color_X + y, color);

		excel.setCell(sheetName, p_size_X + y, size);

		excel.setCell(sheetName, sku_X + y, sku);

		excel.setCell(sheetName, asin_X + y, asin);

	}
	
	excel.setActiveSheet("新店").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("MASTER_INFO_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();


	return (ret);

};
