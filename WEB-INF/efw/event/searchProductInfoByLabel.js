var searchProductInfoByLabel={};
searchProductInfoByLabel.name="商品ラベルで商品情報検索";
searchProductInfoByLabel.paramsFormat={

	"labelno": null,
	"#shop" : null

};
searchProductInfoByLabel.fire=function(params){

	var ret = new Result();

	shopname = params["#shop"];
	var labelno = params["labelno"];


	var selectResult = db.select(
		"DELIVERY",
		"searchProductInfo",
		{
			"labelno":labelno,
			"shop":shopname,
		}
	).getArray();

	var sku = detailResult[0]["sku"];
	var asin = detailResult[0]["asin"];

	var script = "displayToTable('" + sku + "','" + asin + "');";

	return ret.eval(script);


};
