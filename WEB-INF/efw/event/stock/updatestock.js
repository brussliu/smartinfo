var updatestock={};
updatestock.name="在庫情報更新";
updatestock.paramsFormat={
	"#shop":null,
	"localtoupdate":null,

};
var shopname = "";
updatestock.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

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

		if(updateResult == 0){

			db.change(
				"STOCK",
				"insertlocalstock",
				{
					sku : sku,
					asin : asin,
					local : local,
				}
			);

		}

		//updateResult.debug("DDDDDDDDDDDDDDDDDDDDDDDDd");
	}


	var script = "searchstock();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
