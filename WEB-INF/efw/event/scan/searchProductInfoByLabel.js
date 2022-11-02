var searchProductInfoByLabel={};
searchProductInfoByLabel.name="スキャン";
searchProductInfoByLabel.paramsFormat={

	"label": null

};
searchProductInfoByLabel.fire=function(params){

	var ret = new Result();

	var label = params["label"];

	var selectResult = db.select(
		"SCAN",
		"searchProductInfoByLabel",
		{
			"label":label,
		}
	).getSingle();

	var pno = selectResult["商品管理番号"];
	var color = selectResult["色"];
	var size = selectResult["サイズ"];
	var sku = selectResult["SKU番号"];
	var asin = selectResult["ASIN番号"];
	var labelno = selectResult["ラベル番号"];
	var pname = selectResult["商品名"];


	var script = "addRecord('" + pno + "','" + color + "','" + size + "','" + sku + "','" + asin + "','" + labelno + "','" + pname + "')"


	return ret.eval(script);


};
