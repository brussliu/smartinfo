var updatepurchase={};
updatepurchase.name="仕入情報更新";
updatepurchase.paramsFormat={

	"#purchaseno":"required:true;display-name:仕入No;",
	"#purchasename":"required:true;display-name:仕入名称;",

	"#ship":null,
	"#rate":null,
	"#productamount":null,
	"#shipamount":null,
	"#faxamount":null,

	"#importfile_purchase":null,
	"#shop" : null,
};

var shopname = "";

updatepurchase.fire=function(params){

	shopname = params["#shop"];

	// 仕入No
	var purchaseno = params["#purchaseno"];
	// 仕入名称
	var purchasename = params["#purchasename"];

	// 仕入名称更新
	var updateResult = db.change(
		"PURCHASE",
		"updatePurchase00",
		{
			"shop":shopname,
			"col0":purchaseno,
			"col1":purchasename
		}
	);

	// 物流方式
	var ship = params["#ship"];

	ship.debug("GGGGGGGGGGGGGGGGGGGGGGg");

	// 為替レート
	var rate = parseFloat(params["#rate"]);

	// 商品費用
	var productamount = parseFloat(params["#productamount"]);
	// 商品費用（円）
	var productamount_jp = productamount * 100 / rate;

	// 物流費用
	var shipamount = parseFloat(params["#shipamount"]);
	// 物流費用（円）
	var shipamount_jp = shipamount * 100 / rate;

	// 税金（円）
	var faxamount_jp = parseFloat(params["#faxamount"]);
	// 税金
	var faxamount = faxamount_jp * rate / 100;
	// 合計仕入費用
	var all_amount = productamount + shipamount + faxamount;
	// 合計仕入費用円貨
	var all_amount_jp = productamount_jp + shipamount_jp + faxamount_jp;


	// 仕入名称更新
	var updateResult = db.change(
		"PURCHASE",
		"updatePurchase02",
		{
			"shop":shopname,
			"col0":purchaseno,
			"col1":ship,
			"col2":rate,
			"col3":productamount,
			"col4":shipamount,
			"col5":faxamount,
			"col6":all_amount,
			"col7":all_amount_jp
		}
	);

	// 仕入明細
	var importfile_purchase = params["#importfile_purchase"];

	if(importfile_purchase == null || importfile_purchase.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"PURCHASE",
		"selectPurchaseStatus",
		{
			col0:purchaseno,
			shop:shopname
		}
	).getArray();

	var status = detailResult[0]["status"];

	// 新規登録の場合、仕入明細テーブルを再度導入
	if(status == "0：新規登録" || status == "1：仕入確定"){

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"PURCHASE",
			"delPurchaseDetail",
			{
				"col0":purchaseno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadPurchaseDetail(importfile_purchase, purchaseno);

		// 5, 確定数量及び確定金額を再計算
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchase01",
			{
				col0:purchaseno,
				shop:shopname
			}
		);

	}

	// 発送済みまたは到着済みの場合、途中在庫へ計上する処理を行う
	if(status == "2：発送済み" || status == "3：到着済み"){

		// 1, 途中在庫から既存仕入明細の数量を減らす
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchaseShipping1",
			{
				"col0":purchaseno
			}
		);

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"PURCHASE",
			"delPurchaseDetail",
			{
				"col0":purchaseno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadPurchaseDetail(importfile_purchase, purchaseno);

		// 4, 途中在庫に新しい仕入明細の数量を計上
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchaseShipping2",
			{
				"col0":purchaseno
			}
		);

		// 5, 確定数量及び確定金額を再計算
		var updateResult = db.change(
			"PURCHASE",
			"updatePurchase01",
			{
				col0:purchaseno,
				shop:shopname
			}
		);

	}

	// 受取済みの場合、明細は更新しない
	if(status == "4：受取済み"){
		return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");

	}

	return (new Result()).eval("Efw('menu_goto',{page:'si_purchase.jsp',shop:'"+ shopname + "'})");
};


function uploadPurchaseDetail(excelfile, purchaseno){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
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

}