var updateship={};
updateship.name="発送情報更新";
updateship.paramsFormat={
	"#shop":null,
	"shipno":null
};

var shopname = "";
updateship.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}
	
	shopname = params["#shop"];

	var shipno = params["shipno"];


	var updateResultA = db.change(
		"SHIP",
		"updateShipA",
		{
		shipno:shipno
		}
	);

	var updateResultQ = db.change(
		"SHIP",
		"updateShipQ",
		{
		shipno:shipno
		}
	);

	var deleteLabelInfo = db.change(
		"SHIP",
		"deleteLabelInfo",
		{
		shipno:shipno
		},
		"jdbc/efw2"
	);



	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
