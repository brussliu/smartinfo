var repairmaster={};
repairmaster.name="マスタデータ修復";
repairmaster.paramsFormat={

};

var shopname = "";

repairmaster.fire=function(params){

	var ret = new Result();

	var today = new Date();

	// 仕入No
	var masterkey = today.format("yyyyMMdd-HHmmss");

	// 無効のマスタ(子)をバックアップする
	var insertResult = db.change(
		"MASTER",
		"backupmaster",
		{
			"masterkey":masterkey
		}
	);
	// // 無効のマスタを削除する
	var delResult = db.change(
		"MASTER",
		"delbackupmaster",
		{
			"masterkey":masterkey
		}
	);
	// 無効のマスタ(親)をバックアップする
	var insertResult = db.change(
		"MASTER",
		"backupoyamaster",
		{
			"masterkey":masterkey
		}
	);
	// // 無効のマスタを削除する
	var delResult = db.change(
		"MASTER",
		"delbackupmaster",
		{
			"masterkey":masterkey
		}
	);

	// マスタに登録する必要なデータを洗い出す
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

	var selectResult3 = db.select(
		"MASTER",
		"selectnotmaster",
		{}
	).getArray();

	var shop_X = "B";
	var p_no_X = "C";
	var p_category_X = "D";
	var p_type_X = "E";
	var p_color_X = "F";
	var p_size_X = "G";

	var sku_X = "H";
	var asin_X = "I";

	var p_name_X = "J";

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
	
	for(var i = 0;i < selectResult3.length;i ++){

		var y = i + row_from;

		var shopnm = selectResult3[i]["shopname"];

		var productno = selectResult3[i]["productno"];
		var productdiv = selectResult3[i]["productdiv"];
		var producttype = selectResult3[i]["producttype"];

		var color = selectResult3[i]["color"];
		var size = selectResult3[i]["size"];

		var sku = selectResult3[i]["sku"];
		var asin = selectResult3[i]["asin"];

		var productname = selectResult3[i]["productname"];

		var sheetName = "登録必要";

		excel.setCell(sheetName, shop_X + y, shopnm);

		excel.setCell(sheetName, p_no_X + y, productno);

		excel.setCell(sheetName, p_category_X + y, productdiv);

		excel.setCell(sheetName, p_type_X + y, producttype);

		excel.setCell(sheetName, p_color_X + y, color);

		excel.setCell(sheetName, p_size_X + y, size);

		excel.setCell(sheetName, sku_X + y, sku);

		excel.setCell(sheetName, asin_X + y, asin);

		excel.setCell(sheetName, p_name_X + y, productname);
		

	}

	excel.setActiveSheet("新店").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("MASTER_INFO_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();





	return ret;
};
