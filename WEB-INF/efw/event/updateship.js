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

	var resultHTML1 = 
	"<tr>" +
		"<td style='width: 50px;'></td>" +
		"<td style='width: 100px;'>{productno}</td>" +
		"<td style='width: 100px;'>{productdiv}</td>" +
		"<td style='width: 100px;'>{sku}</td>" +
		"<td style='width: 100px;'>{asin}</td>" +
		"<td style='width: 100px;'>{label}</td>" +
		"<td style='width: 800px;'>{productname}</td>" +
		"<td style='width: 250px;'>{option1}</td>" +
		"<td style='width: 100px;'>{option2}</td>" +
		"<td style='width: 100px;'>{count}</td>" +
	"</tr>";

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
