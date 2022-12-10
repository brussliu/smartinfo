var initsellinfo={};
initsellinfo.name="販売情報初期化";
initsellinfo.paramsFormat={
	"#shop":null
};
var shopname = "";
initsellinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}
	
	shopname = params["#shop"];
	
	var resultHTML = "<option id='W001'>{更新日}</option>";

	var selectResult = db.select(
		"SELLINFO",
		"selectDt",
		{shop:shopname}
	).getArray();

	ret.runat("#datefrom").remove("option").append(resultHTML).withdata(selectResult);

	ret.runat("#dateto").remove("option").append(resultHTML).withdata(selectResult);

	// var script = "$('#productlist').show();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
