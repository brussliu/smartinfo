var liststock={};
liststock.name="ファイルアップロード";
liststock.paramsFormat={
	"groupNameArr":null,
	"groupLabelArr":null,
};
var count = 0;
liststock.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// if(params["data"] == "liststock"){

		var excel = new Excel("templates/input_stock.xlsx");

		var tempFilePathName = file.getTempFileName();

		var groupNameArr = params["groupNameArr"];

		var groupLabelArr = params["groupLabelArr"];

		for(var s = 0;s < groupNameArr.length; s ++){

			var labelArr = groupLabelArr[s];

			for(var i = 0;i < labelArr.length; i ++){

				var insertResult = db.change(
					"UPLOAD",
					"insertLabel",
					{
						"col0":getShopId(),
						"col1":labelArr[i],
						"col2":groupNameArr[s]
					}
				);

			}

			// シート別集計情報Excel生成
			var selectResult = db.select(
				"UPLOAD",
				"selectLabel",
				{
					"col0":getShopId(),
					"col1":groupNameArr[s]
				}
			).getArray();

			var sheetName = groupNameArr[s];

			excel.createSheet(sheetName, "TEMP");

			for(var r2 = 0;r2 < selectResult.length; r2 ++){

				var countInfo = selectResult[r2];

				excel.setCell(sheetName, "B" + (r2 + 5), countInfo["productno"]);
				excel.setCell(sheetName, "C" + (r2 + 5), countInfo["productdiv"]);
				excel.setCell(sheetName, "D" + (r2 + 5), countInfo["sku"]);
				excel.setCell(sheetName, "E" + (r2 + 5), countInfo["asin"]);
				excel.setCell(sheetName, "F" + (r2 + 5), countInfo["label"]);
				excel.setCell(sheetName, "G" + (r2 + 5), countInfo["productname"]);
				excel.setCell(sheetName, "H" + (r2 + 5), countInfo["color"]);
				excel.setCell(sheetName, "I" + (r2 + 5), countInfo["size"]);
				excel.setCell(sheetName, "J" + (r2 + 5), countInfo["count"]);

			}

		}

		// 全体集計情報Excel生成
		var selectResultAll = db.select(
			"UPLOAD",
			"selectAllLabel",
			{
				"col0":getShopId()
			}
		).getArray();


		excel.createSheet("ALL", "TEMP");

		for(var r2 = 0;r2 < selectResultAll.length; r2 ++){

			var countInfo = selectResultAll[r2];

			excel.setCell("ALL", "B" + (r2 + 5), countInfo["productno"]);
			excel.setCell("ALL", "C" + (r2 + 5), countInfo["productdiv"]);
			excel.setCell("ALL", "D" + (r2 + 5), countInfo["sku"]);
			excel.setCell("ALL", "E" + (r2 + 5), countInfo["asin"]);
			excel.setCell("ALL", "F" + (r2 + 5), countInfo["label"]);
			excel.setCell("ALL", "G" + (r2 + 5), countInfo["productname"]);
			excel.setCell("ALL", "H" + (r2 + 5), countInfo["color"]);
			excel.setCell("ALL", "I" + (r2 + 5), countInfo["size"]);
			excel.setCell("ALL", "J" + (r2 + 5), countInfo["count"]);



		}

		excel.hideSheet("TEMP");

		excel.setActiveSheet("ALL").save(tempFilePathName);

		ret.attach(tempFilePathName)
		.saveas("在庫確認_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();


		//データ削除
		var deleteResult = db.change(
			"UPLOAD",
			"deleteLabel",
			{
				"col0":getShopId()
			}
		);
	
	return ret;


};

