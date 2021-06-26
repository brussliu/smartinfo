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

	// テンプレートにより、EXCELオブジェクトを作成する
	var excel = new Excel("templates/output_master.xlsx");

	outputMasterList(excel, selectResult1, "新店", false);

	outputMasterList(excel, selectResult2, "旧店", false);

	var tempFilePathName=file.getTempFileName();
	
	excel.setActiveSheet("新店").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("MASTER_INFO_" + (new Date()).format("yyyyMMdd-HHmmss")+".xlsx")
	.deleteAfterDownload();

	return (ret);

};
