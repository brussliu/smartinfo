var importcost={};
importcost.name="コストデータ導入";
importcost.paramsFormat={
	// 商品マスタ情報
	"#importfile_cost":null,
};

importcost.fire=function(params){

	file.saveUploadFiles("upload");

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var fa = params["#importfile_cost"].split("\\");

	var f = fa[fa.length-1];

	var sheetName = "コスト一覧";

	// マスタデータ全件削除
	var delResult = db.change(
		"COST",
		"delAllCost",
		{shop:getShopId()}
	);

	var count = importCostList(f, getShopId(), sheetName);

	var d = new Date().format("yyyy-MM-dd");

	var historyResult = db.change(
		"UPLOAD",
		"insertHistory",
		{
			"col0":getShopId(),
			"col1":"cost",
			"col2":d,
			"col3":count
		}
	);
	
	return ret.navigate("upload.jsp?shop=" + getShopId());

};

function importCostList(f, getShopId(), sheetName){


	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	var p_accrualdate_X = "B";
	var p_div_X = "C";
	var p_title_X = "D";
	var p_amount_X = "E";
	var p_rate_X = "F";
	var p_amountjp_X = "G";
	var p_remarks_X = "H";
	var p_status_X = "I";

	var row_from = 2;
	var row_to = 9999;

	var count = 0;
	
	for(var y = row_from;y <= row_to;y++){

		var accrualdate = excelXSSF.getValue(sheetName, p_accrualdate_X + y);
		var div = excelXSSF.getValue(sheetName, p_div_X + y);
		var title = excelXSSF.getValue(sheetName, p_title_X + y);
		var amount = excelXSSF.getValue(sheetName, p_amount_X + y);
		var rate = excelXSSF.getValue(sheetName, p_rate_X + y);
		var amountjp = excelXSSF.getValue(sheetName, p_amountjp_X + y);
		var remarks = excelXSSF.getValue(sheetName, p_remarks_X + y);
		var status = excelXSSF.getValue(sheetName, p_status_X + y);

		if(accrualdate == null || accrualdate.length <= 0){
			break;
		}

		if(amountjp == null || amountjp.length <= 0){
			amountjp = amount / rate * 100
		}

		if(amount == null || amount.length <= 0){
			amount = amountjp * rate / 100
		}

		var insertResult = db.change(
			"COST",
			"insertCost",
			{
				"col0" : count,
				"col1" : accrualdate.toISOString().substring(0,10).replaceAll("-","/"),
				"col2" : div,
				"col3" : title,
				"col4" : Number(amount).toFixed(0),
				"col5" : Number(rate).toFixed(2),
				"col6" : Number(amountjp).toFixed(0),
				"col7" : remarks,
				"col8" : status
			}
		);

		count = count + 1;

	}

	return count;

}