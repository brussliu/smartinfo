var delmaster={};
delmaster.name="マスタ削除";
delmaster.paramsFormat={
	"productno":null,
	"#shop":null
};
var shopname = "";
delmaster.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	shopname = params["#shop"];

	var selectResult1 = db.change(
		"MASTER",
		"delmaster",
		{"productno": params["productno"],"shop":shopname}
	);

	var selectResult2 = db.change(
		"MASTER",
		"delmasterpic",
		{"productno": params["productno"],"shop":shopname}
	);

	var script = "window.location.href = '/smartinfo/si_master.jsp?shop=" + shopname +"';";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
