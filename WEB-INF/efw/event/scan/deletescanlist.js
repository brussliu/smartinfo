var deletescanlist={};
deletescanlist.name="スキャンリストを保存する";
deletescanlist.paramsFormat={

	"#leftdiv":{
		"#listno":null,
	},

};
deletescanlist.fire=function(params){

	var ret = new Result();

	// リストNO
	var listno = params["#leftdiv"]["#listno"];

	if(listno == null || listno ==""){

	// 更新
	}else{

		// 一時商品リスト管理削除
		var deleteResult1 = db.change(
			"SCAN",
			"deleteScanInfo",
			{
				"col0":listno,
			}
		);

		// 一時商品リスト管理削除
		var deleteResult2 = db.change(
			"SCAN",
			"deleteScanListInfo",
			{
				"col0":listno,
			}
		);

	}


	//return ret.eval(script);
	return (new Result()).eval("Efw('menu_goto',{page:'scan.jsp',shop:'Smart-Bear'})");

};
