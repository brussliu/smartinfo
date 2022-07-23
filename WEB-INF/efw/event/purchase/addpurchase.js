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
	var purchaseno = today.format("yyyyMMdd-HHmmss");
	// 仕入管理テーブル登録
	var insertResult = db.change(
		"PURCHASE",
		"insertPurchase",
		{
			"shop":shopname,
			"col0":purchaseno,
			"col1":purchasename,
			"col2":"0：新規登録",
			"col3":registrationDate
		}
	);

	file.saveUploadFiles("upload");

	var fa = importfile_purchase.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(shopname == "Smart-KM"){

		//importProductInfoForSmartKM(shopname, excelXSSF, stockFlg, deliveryFlg, purchaseFlg, no);
		importProductInfoForSmartKM(shopname, excelXSSF, false, false, true, purchaseno);

	}else{

		//importProductInfoForSmartBear(shopname, excelXSSF, stockFlg, deliveryFlg, purchaseFlg, no)
		importProductInfoForSmartBear(shopname, excelXSSF, false, false, true, purchaseno);
	}

	return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");

};
