var initsellinfo={};
initsellinfo.name="販売情報初期化";
initsellinfo.paramsFormat={

};

initsellinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}
	
	var resultHTML = "<option id='W001'>{更新日}</option>";

	var selectResult = db.select(
		"SELLINFO",
		"selectDt",
		{shop:getShopId()}
	).getArray();

	ret.runat("#datefrom").remove("option").append(resultHTML).withdata(selectResult);

	ret.runat("#dateto").remove("option").append(resultHTML).withdata(selectResult);

	var title = "販売情報一覧（" + getShopId() + "）";
	var script = "initTitle('" + title +"')";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
