var importcost={};
importcost.name="コストデータ導入";
importcost.paramsFormat={
	// 商品マスタ情報
	"#importfile_cost":null,
	"#shop":null
};

importcost.fire=function(params){

	file.saveUploadFiles("upload");

	var shopname = params["#shop"];

	var ret = new Result();

	var fa = params["#importfile_cost"].split("\\");

	var f = fa[fa.length-1];

	var sheetName = "コスト一覧";

	// マスタデータ全件削除
	var delResult = db.change(
		"COST",
		"delAllCost",
		{shop:shopname}
	);

	var count = importCostList(f, shopname, sheetName);

	var d = new Date().format("yyyy-MM-dd");

	var historyResult = db.change(
		"UPLOAD",
		"insertHistory",
		{
			"col0":shopname,
			"col1":"cost",
			"col2":d,
			"col3":count
		}
	);
	
	return ret.navigate("upload.jsp?shop=" + shopname);

};

function importCostList(f, shopname, sheetName){


	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	var p_accrualdate_X = "B";
	var p_div_X = "C";
	var p_title_X = "D";
	var p_amount_X = "E";
	var p_remarks_X = "F";

	var row_from = 2;
	var row_to = 9999;

	var count = 0;
	
	for(var y = row_from;y <= row_to;y++){

		var accrualdate = excelXSSF.getValue(sheetName, p_accrualdate_X + y);
		var div = excelXSSF.getValue(sheetName, p_div_X + y);
		var title = excelXSSF.getValue(sheetName, p_title_X + y);
		var amount = excelXSSF.getValue(sheetName, p_amount_X + y);
		var remarks = excelXSSF.getValue(sheetName, p_remarks_X + y);


		if(accrualdate == null || accrualdate.length <= 0){
			break;
		}

		var insertResult = db.change(
			"COST",
			"insertCost",
			{
				"col0" : count,
				"col1" : accrualdate.toISOString().substr(10),
				"col2" : div,
				"col3" : title,
				"col4" : amount,
				"col5" : remarks
			}
		);

		count = count + 1;

	}

	return count;

}