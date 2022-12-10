var outputcost={};
outputcost.name="コスト導出";
outputcost.paramsFormat={
	"#shop":null,
};
var shopname = "";
outputcost.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var selectResult = db.select(
		"COST",
		"selectcost",
		{}
	).getArray();



	// テンプレートにより、EXCELオブジェクトを作成する
	var excel = new Excel("templates/output_cost.xlsx");

	outputCostList(excel, selectResult, "コスト一覧");

	var tempFilePathName=file.getTempFileName();
	
	excel.setActiveSheet("コスト一覧").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("COST_INFO_" + (new Date()).format("yyyyMMdd-HHmmss")+".xlsx")
	.deleteAfterDownload();

	return (ret);

};


function outputCostList(excel, selectResult, sheetName){

	var p_accrualdate_X = "B";
	var p_div_X = "C";
	var p_title_X = "D";
	var p_amount_X = "E";
	var p_rate_X = "F";
	var p_amountjp_X = "G";
	var p_remarks_X = "H";
	var p_status_X = "I";


	var row_from = 2;


	for(var i = 0;i < selectResult.length;i ++){

		var y = i + row_from;

		var accrualdate = selectResult[i]["accrualdate"];
		var div = selectResult[i]["div"];
		var title = selectResult[i]["title"];
		var amount = selectResult[i]["amount"];
		var rate = selectResult[i]["rate"];
		var amountjp = selectResult[i]["amountjp"];

		var remarks = selectResult[i]["remarks"];
		var status = selectResult[i]["status"];


		excel.setCell(sheetName, p_accrualdate_X + y, new Date(accrualdate));

		excel.setCell(sheetName, p_div_X + y, div);

		excel.setCell(sheetName, p_title_X + y, title);

		excel.setCell(sheetName, p_amount_X + y, amount);

		excel.setCell(sheetName, p_rate_X + y, rate);

		excel.setCell(sheetName, p_amountjp_X + y, amountjp);

		excel.setCell(sheetName, p_remarks_X + y, remarks);

		excel.setCell(sheetName, p_status_X + y, status);

	}

}