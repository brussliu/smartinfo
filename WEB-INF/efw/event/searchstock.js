var searchstock={};
searchstock.name="在庫一覧検索";
searchstock.paramsFormat={
	"#shop":null,
	"#basedate_order_hidden":null,
	"#basedate_stock_hidden":null,
};
var shopname = "";
searchstock.fire=function(params){
	
	var ret = new Result();
	shopname = params["#shop"];

	var resultHTML = 
	"<tr style='background-color: rgb(205,255,255);height:42px;'>" +
		"<td><input type='checkbox'></td>" +
		"<td>{productno}</td>" +
		"<td>{productdiv}</td>" +
		"<td>{sku}</td>" +
		"<td>{asin}</td>" +
		"<td>{label}</td>" +
		"<td>{productname}</td>" +
		"<td>{selled1}</td>" +
		"<td>{selled7}</td>" +
		"<td>{selled30}</td>" +
		"<td>{selled60}</td>" +
		"<td>{selled90}</td>" +
		"<td>{selledweek}</td>" +
		"<td>{fbm}</td>" +
		"<td>{fba}</td>" +
		"<td>{onsell7}</td>" +
		"<td>{onsell30}</td>" +
		"<td>{onsell60}</td>" +
		"<td>{onsell90}</td>" +
		"<td>{onsellweek}</td>" +
	"</tr>";

	var selectResult = db.select(
		"STOCK",
		"selectstock",
		{
		shop:shopname,
		basedate_order:params["#basedate_order_hidden"]
		}
	).getArray();

	ret.runat("#stocktable").remove("tr").append(resultHTML).withdata(selectResult);

	var script = "$('#stocklist').show();changeColor();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
