var delmaster={};
delmaster.name="マスタ削除";
delmaster.paramsFormat={
	"productno":null,
};

delmaster.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var selectResult1 = db.change(
		"MASTER",
		"delmaster",
		{"productno": params["productno"],"shop":getShopId()}
	);

	var selectResult2 = db.change(
		"MASTER",
		"delmasterpic",
		{"productno": params["productno"],"shop":getShopId()}
	);

	var script = "goBackToMenu();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
