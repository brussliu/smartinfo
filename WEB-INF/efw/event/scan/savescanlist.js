var savescanlist={};
savescanlist.name="スキャンリストを保存する";
savescanlist.paramsFormat={

	"skuArr":null,
	"asinArr":null,
	"labelArr":null,
	"countArr":null,

	"#leftdiv":{
		"#listname":"required:true;display-name:名前;",
		"#listcontent":"required:true;display-name:内容;",
		"#listno":null,
	},
	"#shop":null

};
savescanlist.fire=function(params){

	var ret = new Result();

	// 名称
	var scanlistname = params["#leftdiv"]["#listname"];
	// 内容
	var scanlistcontent = params["#leftdiv"]["#listcontent"];
	// リストNO
	var listno = params["#leftdiv"]["#listno"];

	if(listno == null || listno ==""){

		var today = new Date();
		// 新規登録日
		var registrationDate = today.format("yyyy/MM/dd");
		// No
		var scanlistno = today.format("yyyyMMdd-HHmmss");


		// 一時商品リスト管理登録
		var insertResult = db.change(
			"SCAN",
			"insertScanInfo",
			{
				"col0":scanlistno,
				"col1":scanlistname,
				"col2":scanlistcontent,
				"col3":registrationDate,
				"col4":registrationDate
			}
		);

		var skuArr = params["skuArr"];
		var asinArr = params["asinArr"];
		var labelArr = params["labelArr"];
		var countArr = params["countArr"];

		var pCount = skuArr.length;

		for(var i = 0; i < pCount; i ++){

			var insertResult = db.change(
				"SCAN",
				"insertScanListInfo",
				{
					"col0":scanlistno,
					"col1":skuArr[i],
					"col2":asinArr[i],
					"col3":labelArr[i],
					"col4":countArr[i],
				}
			);
		}

	// 更新
	}else{
		var today = new Date();
		// 新規登録日
		var registrationDate = today.format("yyyy/MM/dd");

		// 一時商品リスト管理更新
		var insertResult = db.change(
			"SCAN",
			"updateScanInfo",
			{
				"col0":listno,
				"col1":scanlistname,
				"col2":scanlistcontent,
				"col3":registrationDate
			}
		);

		var deleteResult = db.change(
			"SCAN",
			"deleteScanListInfo",
			{
				"col0":listno,
			}
		);

		var skuArr = params["skuArr"];
		var asinArr = params["asinArr"];
		var labelArr = params["labelArr"];
		var countArr = params["countArr"];

		var pCount = skuArr.length;

		for(var i = 0; i < pCount; i ++){

			var insertResult = db.change(
				"SCAN",
				"insertScanListInfo",
				{
					"col0":scanlistno,
					"col1":skuArr[i],
					"col2":asinArr[i],
					"col3":labelArr[i],
					"col4":countArr[i],
				}
			);
		}

	}


	//return ret.eval(script);
	return (new Result()).eval("Efw('menu_goto',{page:'scan.jsp',shop:'Smart-Bear'})");

};
