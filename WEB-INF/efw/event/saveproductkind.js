var saveproductkind={};
saveproductkind.name="商品種別情報保存";
/**
 * パラメーターフォーマット
 */
saveproductkind.paramsFormat={

	"#si_ship_inputdialog":{

		".productkey" : null,
		".productname" : null,
		"#txt_productkind" : null
	}
};
var shopname = "";
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
saveproductkind.fire=function(params){

	var productkey = params["#si_ship_inputdialog"][".productkey"];

	var productname = params["#si_ship_inputdialog"][".productname"];

	var productkind = params["#si_ship_inputdialog"]["#txt_productkind"];
	

	var insertResult = db.change(
		"SHIP",
		"insertProductKind",
		{
			"col0":productkey,
			"col1":productkind
		}
	);

	var ret = new Result();

	ret.eval("si_ship_inputdialog.dialog('close');");

	ret.eval("outputship();");

	return ret;

};
