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

};

updatepurchase.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 仕入No
	var purchaseno = params["#purchaseno"];
	// 仕入名称
	var purchasename = params["#purchasename"];

	// 仕入名称更新
	var updateResult = db.change(
		"PURCHASE",
		"updatePurchase00",
		{
			"shop":getShopId(),
			"col0":purchaseno,
			"col1":purchasename
		}
	);

	// 物流方式
	var ship = params["#ship"];

	// 為替レート
	var rate = parseFloat(params["#rate"]).toFixed(2);

	if(rate == "NaN"){
		rate = null;
	}

	// 商品費用
	var productamount = parseFloat(params["#productamount"]).toFixed(2);
	// 商品費用（円）
	var productamount_jp = (productamount * 100 / rate).toFixed(2);

	if(productamount == "NaN"){
		productamount = null;
		productamount_jp = null;
	}


	// 物流費用
	var shipamount = parseFloat(params["#shipamount"]).toFixed(2);
	// 物流費用（円）
	var shipamount_jp = (shipamount * 100 / rate).toFixed(2);

	if(shipamount == "NaN"){
		shipamount = null;
		shipamount_jp = null;
	}


	// 税金（円）
	var faxamount_jp = parseFloat(params["#faxamount"]).toFixed(2);
	// 税金
	var faxamount = (faxamount_jp * rate / 100).toFixed(2);

	if(faxamount_jp == "NaN"){
		faxamount = null;
		faxamount_jp = null;
	}


	// 合計仕入費用
	var all_amount = (parseFloat(productamount) + parseFloat(shipamount) + parseFloat(faxamount)).toFixed(2);
	// 合計仕入費用円貨
	var all_amount_jp = (parseFloat(productamount_jp) + parseFloat(shipamount_jp) + parseFloat(faxamount_jp)).toFixed(2);

	if(productamount == null || shipamount == null || faxamount == null){
		all_amount = null;
	}
	if(productamount_jp == null || shipamount_jp == null || faxamount_jp == null){
		all_amount_jp = null;
	}


	// 仕入名称更新
	var updateResult = db.change(
		"PURCHASE",
		"updatePurchase02",
		{
			"shop":getShopId(),
			"col0":purchaseno,
			"col1":ship,
			"col2":rate,
			"col3":productamount,
			"col4":shipamount,
			"col5":faxamount_jp,
			"col6":all_amount,
			"col7":all_amount_jp
		}
	);

	// 仕入明細
	var importfile_purchase = params["#importfile_purchase"];

	if(importfile_purchase == null || importfile_purchase.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'purchase.jsp'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"PURCHASE",
		"selectPurchaseStatus",
		{
			col0:purchaseno,
			shop:getShopId()
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
				shop:getShopId()
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
				shop:getShopId()
			}
		);

	}

	// 受取済みの場合、明細は更新しない
	if(status == "4：受取済み"){
		return ret.eval("Efw('menu_goto',{page:'purchase.jsp'})");

	}

	return ret.eval("Efw('menu_goto',{page:'purchase.jsp'})");
};


function uploadPurchaseDetail(excelfile, purchaseno){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(getShopId() == "Smart-KM"){

		importProductInfoForSmartKM(getShopId(), excelXSSF, false, false, true, purchaseno);

	}else{

		importProductInfoForSmartBear(getShopId(), excelXSSF, false, false, true, purchaseno);

	}

}