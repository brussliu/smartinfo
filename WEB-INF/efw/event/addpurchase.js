var addpurchase={};
addpurchase.name="仕入新規登録";
addpurchase.paramsFormat={

	"#purchaseInfo":{

		"#purchasename":"required:true;display-name:仕入名称;",
		"#importfile_purchase":"required:true;display-name:仕入内容;",

	}

};
addpurchase.fire=function(params){


	// 仕入名称
	var purchasename = params["#purchaseInfo"]["#purchasename"];
	// 仕入内容
	var importfile_purchase = params["#purchaseInfo"]["#importfile_purchase"];

	var today = new Date();

	// 新規登録日
	var registrationDate = today.format("yyyyMMdd");

	// 仕入No
	var purchaseNo = today.format("yyyyMMdd-HHmmss");

	// 仕入管理テーブル登録
	var insertResult = db.change(
		"PURCHASE",
		"insertPurchase",
		{
			"col0":purchaseNo,
			"col1":purchasename,
			"col2":"0:新規登録",
			"col3":registrationDate
		}
	);

	// 仕入明細テーブル登録
	// var insertResult = db.change(
	// 	"PURCHASE",
	// 	"insertPurchase",
	// 	{
	// 		"shop":shopname,
	// 		"col0":oya_productid,
	// 		"col1":oya_productdiv,
	// 		"col2":oya_sku,
	// 		"col3":oya_asin,
	// 		"col4":oya_label,
	// 		"col5":oya_productname,
	// 		"col6":oya_price,
	// 		"col7":oya_fbmstock,
	// 		"col8":oya_fbastock,
	// 		"col9":oya_producttype,
	// 		"col10":oya_selltype,
	// 		"col11":picArr[0],
	// 		"col12":oya_sort,
	// 		"col13":oya_color,
	// 		"col14":oya_size
	// 	}
	// );


	return (new Result())
	.eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:''})");
};
