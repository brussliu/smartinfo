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

	for(var i = 0; i < localtoupdate.length; i ++){

		var localinfo = localtoupdate[i];

		var sku = localinfo[0];
		var asin = localinfo[1];
		var local = localinfo[2];

		var updateResult = db.change(
			"STOCK",
			"updatelocalstock",
			{
				sku : sku,
				asin : asin,
				local : local,
			}
		);










	}

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
