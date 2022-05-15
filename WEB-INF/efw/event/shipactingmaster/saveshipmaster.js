var saveshipmaster={};
saveshipmaster.name="発送商品マスタ情報保存";
/**
 * パラメーターフォーマット
 */
 saveshipmaster.paramsFormat={
	"#shipactingmaster_inputdialog":{
		"#productid":null,
		"#productdiv":null,
		"#color":null,
		"#size":null,
		"#productnamejp":null,
		"#productnamecn":null,
		"#productcount":null,
		"#biko":null,
		"#productpicStr":null

	}
};
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
 saveshipmaster.fire=function(params){

	var ret = new Result();

	// 親商品情報登録
	// 商品管理番号
	var productid = params["#shipactingmaster_inputdialog"]["#productid"];
	// 商品分類
	var productdiv = params["#shipactingmaster_inputdialog"]["#productdiv"];
	// 色
	var color = params["#shipactingmaster_inputdialog"]["#color"];
	// サイズ
	var size = params["#shipactingmaster_inputdialog"]["#size"];
	// 商品名称_日本語
	var productnamejp = params["#shipactingmaster_inputdialog"]["#productnamejp"];
	// 商品名称_中国語
	var productnamecn = params["#shipactingmaster_inputdialog"]["#productnamecn"];
	// 数量
	var productcount = parseInt(params["#shipactingmaster_inputdialog"]["#productcount"]);
	// 備考
	var biko = params["#shipactingmaster_inputdialog"]["#biko"];
	// 画像
	var pic = params["#shipactingmaster_inputdialog"]["#productpicStr"];

	productid.debug("BBBBBBBBBB");

	if(productid == null || productid == ""){

		var insertResult = db.change(
			"SHIPACTINGMASTER",
			"insertShipMaster",
			{
				
				"col1":productdiv,
				"col2":productnamecn,
				"col3":productnamejp,

				"col4":color,
				"col5":size,
				"col6":productcount,
				"col7":biko,

				"col8":pic,
			}
		);

	}else{

		var updateResult = db.change(
			"SHIPACTINGMASTER",
			"updateShipMaster",
			{
				"col0":parseInt(productid),
				"col1":productdiv,
				"col2":productnamecn,
				"col3":productnamejp,

				"col4":color,
				"col5":size,
				"col6":productcount,
				"col7":biko,

				"col8":pic,
			}
		);
		
	}


	ret.eval("shipactingmaster_inputdialog.dialog('close');");

	return ret.navigate("shipactingmaster_list.jsp");

};
