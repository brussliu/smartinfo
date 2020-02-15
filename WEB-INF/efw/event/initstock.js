var initstock={};
initstock.name="在庫一覧初期化";
initstock.paramsFormat={
	"#shop":null
};
var shopname = "";
initstock.fire=function(params){
	
	var ret = new Result();
	shopname = params["#shop"];

	var selectResult = db.select(
		"STOCK",
		"searchhistory",
		{shop:shopname}
	);

	var fbaArr = selectResult.seek("importtype","eq","fba").getArray();
	var orderArr = selectResult.seek("importtype","eq","order").getArray();


	var order = "注文基準日：" + orderArr[0]["basetime"];
	var fba = "在庫基準日：" + fbaArr[0]["basetime"]


	// ret.runat("#basedate_order").remove("*").append("注文基準日：" + orderArr[0]["basetime"]);

	// ret.runat("#basedate_fba").remove("*").append("在庫基準日：" + fbaArr[0]["basetime"]);

	var script1 = "$('#basedate_order').html('"+order+"');$('#basedate_order_hidden').val('"+orderArr[0]["basetime"]+"');";
	var script2 = "$('#basedate_stock').html('"+fba+"');$('#basedate_stock_hidden').val('"+fbaArr[0]["basetime"]+"');";

	ret.eval(script1);
	ret.eval(script2);

	// 画面へ結果を返す
	return ret;

};
