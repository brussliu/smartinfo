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

	// テンプレートにより、EXCELオブジェクトを作成する
	var excel = new Excel("templates/output_master.xlsx");

	outputMasterList(excel, selectResult1, "新店", false);

	outputMasterList(excel, selectResult2, "旧店", false);

	outputMasterList(excel, selectResult3, "登録必要", true);

	var tempFilePathName = file.getTempFileName();

	excel.setActiveSheet("新店").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("MASTER_INFO_" + (new Date()).format("yyyyMMdd-HHmmss")+".xlsx")
	.deleteAfterDownload();


	return ret;
};
