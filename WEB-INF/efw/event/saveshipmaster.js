var saveshipmaster={};
saveshipmaster.name="発送商品マスタ情報保存";
/**
 * パラメーターフォーマット
 */
 saveshipmaster.paramsFormat={
	"#si_ship_master_inputdialog":{
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

	// 親商品情報登録
	// 商品管理番号
	//var productid = params["#si_ship_master_inputdialog"]["#productid"];
	// 商品分類
	var productdiv = params["#si_ship_master_inputdialog"]["#productdiv"];
	// 色
	var color = params["#si_ship_master_inputdialog"]["#color"];
	// サイズ
	var size = params["#si_ship_master_inputdialog"]["#size"];
	// 商品名称_日本語
	var productnamejp = params["#si_ship_master_inputdialog"]["#productnamejp"];
	// 商品名称_中国語
	var productnamecn = params["#si_ship_master_inputdialog"]["#productnamecn"];
	// 数量
	var productcount = params["#si_ship_master_inputdialog"]["#productcount"];
	// 備考
	var biko = params["#si_ship_master_inputdialog"]["#biko"];


	var pic = params["#si_ship_master_inputdialog"]["#productpicStr"];


	var insertResult = db.change(
		"MASTER",
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




	return (new Result()).eval("si_ship_master_inputdialog.dialog('close')");

};
