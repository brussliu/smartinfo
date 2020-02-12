var searchhistory={};
searchhistory.name="データ導入履歴検索";
searchhistory.paramsFormat={
	"#shop":null
};
var shopname = "";
searchhistory.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var historyResult = db.select(
		"UPLOAD",
		"searchHistory",
		{shop:shopname}
	);

	var productArr = historyResult.seek("importtype","eq","product").getArray();
	var fbaArr = historyResult.seek("importtype","eq","fba").getArray();
	var orderArr = historyResult.seek("importtype","eq","order").getArray();

	ret.runat("#producttable").withdata(
		{
			".importtime": productArr[0].importtime,
			".importcount": productArr[0].importcount
		}
	);
	ret.runat("#fbatable").withdata(
		{
			".importtime": fbaArr[0].importtime,
			".importcount": fbaArr[0].importcount
		}
	);
	ret.runat("#ordertable").withdata(
		{
			".importtime": orderArr[0].importtime,
			".importcount": orderArr[0].importcount
		}
	);
	// 画面へ結果を返す
	return ret;

};
