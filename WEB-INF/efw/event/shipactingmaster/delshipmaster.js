var delshipmaster={};
delshipmaster.name="発送商品マスタ情報削除";
/**
 * パラメーターフォーマット
 */
 delshipmaster.paramsFormat={
	"#shipactingmaster_inputdialog":{
		"#productid":null,
		// "#productdiv":null,
		// "#color":null,
		// "#size":null,
		// "#productnamejp":null,
		// "#productnamecn":null,
		// "#productcount":null,
		// "#biko":null,
		// "#productpicStr":null
	}
};
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
 delshipmaster.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 親商品情報登録
	// 商品管理番号
	var productid = parseInt(params["#shipactingmaster_inputdialog"]["#productid"]);
	// // 商品分類
	// var productdiv = params["#si_ship_master_inputdialog"]["#productdiv"];
	// // 色
	// var color = params["#si_ship_master_inputdialog"]["#color"];
	// // サイズ
	// var size = params["#si_ship_master_inputdialog"]["#size"];
	// // 商品名称_日本語
	// var productnamejp = params["#si_ship_master_inputdialog"]["#productnamejp"];
	// // 商品名称_中国語
	// var productnamecn = params["#si_ship_master_inputdialog"]["#productnamecn"];
	// // 数量
	// var productcount = parseInt(params["#si_ship_master_inputdialog"]["#productcount"]);
	// // 備考
	// var biko = params["#si_ship_master_inputdialog"]["#biko"];
	// // 画像
	// var pic = params["#si_ship_master_inputdialog"]["#productpicStr"];


	var updateResult = db.change(
		"SHIPACTINGMASTER",
		"delShipMaster",
		{
			"col0":productid,

		}
	);

	// if(productid == null || productid == ""){

	// 	var insertResult = db.change(
	// 		"MASTER",
	// 		"insertShipMaster",
	// 		{
				
	// 			"col1":productdiv,
	// 			"col2":productnamecn,
	// 			"col3":productnamejp,

	// 			"col4":color,
	// 			"col5":size,
	// 			"col6":productcount,
	// 			"col7":biko,

	// 			"col8":pic,
	// 		}
	// 	);

	// }else{

	// 	var updateResult = db.change(
	// 		"MASTER",
	// 		"updateShipMaster",
	// 		{
	// 			"col0":productid,
	// 			"col1":productdiv,
	// 			"col2":productnamecn,
	// 			"col3":productnamejp,

	// 			"col4":color,
	// 			"col5":size,
	// 			"col6":productcount,
	// 			"col7":biko,

	// 			"col8":pic,
	// 		}
	// 	);
		
	// }


	ret.eval("shipactingmaster_inputdialog.dialog('close');");

	return ret.navigate("shipactingmaster_list.jsp");

};
