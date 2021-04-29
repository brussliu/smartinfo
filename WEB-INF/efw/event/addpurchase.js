var addpurchase={};
addpurchase.name="仕入新規登録";
addpurchase.paramsFormat={

	"#purchaseInfo":{

		"#purchasename":"required:true;display-name:仕入名称;",
		"#importfile_purchase":"required:true;display-name:仕入内容;",

	},
	"#shop":null
};

var shopname = "";

addpurchase.fire=function(params){

	shopname = params["#shop"];

	// 仕入名称
	var purchasename = params["#purchaseInfo"]["#purchasename"];
	// 仕入内容
	var importfile_purchase = params["#purchaseInfo"]["#importfile_purchase"];

	var today = new Date();

	// 新規登録日
	var registrationDate = today.format("yyyy/MM/dd");

	// 仕入No
	var purchaseNo = today.format("yyyyMMdd-HHmmss");

	// 仕入管理テーブル登録
	var insertResult = db.change(
		"PURCHASE",
		"insertPurchase",
		{
			"shop":shopname,
			"col0":purchaseNo,
			"col1":purchasename,
			"col2":"0：新規登録",
			"col3":registrationDate
		}
	);

	// file.saveUploadFiles("upload");

	// var fa = params["#importfile_master"].split("\\");
	// var f = fa[fa.length-1];

	// // Excelファイル
	// var excelXSSF = new Excel("upload/" + f);

	// var shop_X = "B";
	// var p_no_X = "C";
	// var p_category_X = "D";
	// var p_type_X = "E";
	// var p_color_X = "F";
	// var p_size_X = "G";

	// var sku_X = "H";
	// var asin_X = "I";

	// var row_from = 2;
	// var row_to = 9999;

	// for(var y = row_from;y <= row_to;y++){

	// 	var shop = excelXSSF.getValue(sheetName, shop_X + y);
	// 	var p_no = excelXSSF.getValue(sheetName, p_no_X + y);
	// 	var p_category = excelXSSF.getValue(sheetName, p_category_X + y);
	// 	var p_type = excelXSSF.getValue(sheetName, p_type_X + y);
	// 	var p_color = excelXSSF.getValue(sheetName, p_color_X + y);
	// 	var p_size = excelXSSF.getValue(sheetName, p_size_X + y);
	// 	var sku = excelXSSF.getValue(sheetName, sku_X + y);
	// 	var asin = excelXSSF.getValue(sheetName, asin_X + y);

	// 	if(shop == null || shop.length <= 0){
	// 		break;
	// 	}

	// 	var insertResult = db.change(
	// 		"UPLOAD",
	// 		"insertMaster",
	// 		{
	// 			"col0" : count,
	// 			"col1" : shopname,
	// 			"col2" : p_no,
	// 			"col3" : p_category,
	// 			"col4" : p_type,
	// 			"col5" : p_color,
	// 			"col6" : p_size,
	// 			"col7" : sku,
	// 			"col8" : asin
	// 		}
	// 	);

	// 	count = count + 1;

	// }













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
