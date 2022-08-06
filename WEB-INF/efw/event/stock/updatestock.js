var updatestock={};
updatestock.name="在庫情報更新";
updatestock.paramsFormat={
	"#shop":null,
	"localtoupdate":null,

};
var shopname = "";
updatestock.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var localtoupdate = params["localtoupdate"];

	localtoupdate.debug("WWWWWWWWWWWWWWWWWWWWWWW");



	// var selectResult = db.select(
	// 	"STOCK",
	// 	"selectstock",
	// 	{
	// 		shop : shopname,
	// 		productdivstr1 : productdivstr1,
	// 		productdivstr2 : productdivstr2,
	// 		productdivstr3 : productdivstr3,
	// 		productdivstr4 : productdivstr4,
	// 		productdivstr5 : productdivstr5,
	// 		productdivstr6 : productdivstr6,
	// 		productdivstr7 : productdivstr7,
	// 		productdivstr8 : productdivstr8,
	// 		productno : productno,
	// 		keyword : keyword
	// 	}
	// );

	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
