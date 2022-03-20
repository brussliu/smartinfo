var updateship={};
updateship.name="発送情報更新";
updateship.paramsFormat={
	"#shop":null,
	"shipno":null
};

var shopname = "";
updateship.fire=function(params){
	
	var ret = new Result();
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

	//ret.runat("#ship_productinfo").append(resultHTML1).withdata(selectResult1);







	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
