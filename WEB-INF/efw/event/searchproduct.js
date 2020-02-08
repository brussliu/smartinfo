var searchproduct={};
searchproduct.name="商品一覧検索";
searchproduct.paramsFormat={
};
searchproduct.fire=function(params){
	
	var ret = new Result();

	var resultHTML = 
	"<tr>" +
		"<td>{productno}</td>" +
		"<td>{sku}</td>" +
		"<td>{asin}</td>" +
		"<td>{label}</td>" +
		"<td>{productname}</td>" +
		"<td>{fbm}</td>" +
		"<td>{fba}</td>" +
		"<td>{price}</td>" +
		"<td>{productdiv}</td>" +
		"<td>{selltype}</td>" +
	"</tr>";

	var selectResult = db.select(
		"PRODUCT",
		"selectproduct",
		{}
	).getArray();

	ret.runat("#producttable").remove("tr").append(resultHTML).withdata(selectResult);

	var script = "$('#productlist').show();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
