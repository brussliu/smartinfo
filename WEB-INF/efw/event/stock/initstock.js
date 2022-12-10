var initstock={};
initstock.name="在庫一覧初期化";
initstock.paramsFormat={
	"#shop":null
};
var shopname = "";
initstock.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}
	
	shopname = params["#shop"];

	// var selectResult = db.select(
	// 	"STOCK",
	// 	"searchhistory",
	// 	{shop:shopname}
	// );

	// var fbaArr = selectResult.seek("importtype","eq","fba").getArray();
	// var orderArr = selectResult.seek("importtype","eq","order").getArray();

	// var order = "注文基準日：" + orderArr[0]["basetime"];
	// var fba = "在庫基準日：" + fbaArr[0]["basetime"]

	// var script1 = "$('#basedate_order').html('"+order+"');$('#basedate_order_hidden').val('"+orderArr[0]["basetime"]+"');";
	// var script2 = "$('#basedate_stock').html('"+fba+"');$('#basedate_stock_hidden').val('"+fbaArr[0]["basetime"]+"');";

	// ret.eval(script1);
	// ret.eval(script2);

	// 商品分類
	var selectResult = db.select(
		"STOCK",
		"searchproductdiv",
		{}
	).getArray();

	var resultHTML = "<input type='checkbox' class='content' checked value='{value}'>&nbsp;{text}";

	ret.runat("#productdiv").remove("*").append(resultHTML).withdata(selectResult);

	// 商品管理番号
	var selectResult = db.select(
		"STOCK",
		"searchproducno",
		{}
	).getArray();

	var resultHTML = "<option value='{value}' class='content'>{text}</option>";

	ret.runat("#productno").remove("option .content").append(resultHTML).withdata(selectResult);
	
	var title = "在庫管理（" + getShopId() + "）";
	var script = "initTitle('" + title +"')";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
