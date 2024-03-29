var searchProductInfoByLabel={};
searchProductInfoByLabel.name="商品ラベルで商品情報検索";
searchProductInfoByLabel.paramsFormat={

	"labelno": null,

};
searchProductInfoByLabel.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var labelno = params["labelno"];

	var selectResult = db.select(
		"DELIVERY",
		"searchProductInfo",
		{
			"labelno":labelno,
			"shop":getShopId(),
		}
	).getArray();

	if(selectResult.length > 0){
		var pno = selectResult[0]["pno"];
		var color = selectResult[0]["color"];
		var size = selectResult[0]["size"];
	
		var sku = selectResult[0]["sku"];
		var asin = selectResult[0]["asin"];
	
		var script = "displayToTable('" + pno + "','" + color + "','" + size + "','" + sku + "','" + asin + "');";
	}else{

		var script = "errorMsg();";
	}


	return ret.eval(script);


};
