var initupload={};
initupload.name="データ導入履歴検索";
initupload.paramsFormat={
};

initupload.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var historyResult = db.select(
		"UPLOAD",
		"searchHistory",
		{shop:getShopId()}
	);

	var masterArr = historyResult.seek("importtype","eq","master").getArray();

	var pfoArr = historyResult.seek("importtype","eq","pfo").getArray();

	var localstockArr = historyResult.seek("importtype","eq","localstock").getArray();
	var onboardstockArr = historyResult.seek("importtype","eq","onboardstock").getArray();
	var deliveryArr = historyResult.seek("importtype","eq","delivery").getArray();

	if(masterArr.length > 0){
		ret.runat("#mastertable").withdata(
			{
				".importtime": masterArr[0].importtime,
				".importcount": masterArr[0].importcount
			}
		);
	}

	if(pfoArr.length > 0){
		ret.runat("#producttable").withdata(
			{
				".importtime": pfoArr[0].importtime,
				".importcount": pfoArr[0].importcount
			}
		);
	}

	if(localstockArr.length > 0){
		ret.runat("#localstocktable").withdata(
			{
				".importtime": localstockArr[0].importtime,
				".importcount": localstockArr[0].importcount
			}
		);
	}

	if(onboardstockArr.length > 0){
		ret.runat("#onboardstocktable").withdata(
			{
				".importtime": onboardstockArr[0].importtime,
				".importcount": onboardstockArr[0].importcount
			}
		);
	}

	if(deliveryArr.length > 0){
		ret.runat("#deliverytable").withdata(
			{
				".importtime": deliveryArr[0].importtime,
				".importcount": deliveryArr[0].importcount
			}
		);
	}

	var title = "データ導入（" + getShopId() + "）";

	var script = "initTitle('" + title +"')";

	// 画面へ結果を返す
	return ret.eval(script);

};
