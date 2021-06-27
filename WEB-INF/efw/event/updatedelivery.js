var updatedelivery={};
updatedelivery.name="納品情報更新";
updatedelivery.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",
	"#deliveryname":"required:true;display-name:仕入名称;",
	"#importfile_delivery":null,
	"#shop" : null
};

var shopname = "";

updatedelivery.fire=function(params){

	shopname = params["#shop"];

	// 納品No
	var deliveryno = params["#deliveryno"];
	// 納品名称
	var deliveryname = params["#deliveryname"];
	// 納品名称更新
	var updateResult = db.change(
		"DELIVERY",
		"updateDelivery00",
		{
			"shop":shopname,
			"col0":deliveryno,
			"col1":deliveryname
		}
	);

	// 納品明細
	var importfile_delivery = params["#importfile_delivery"];

	if(importfile_delivery == null || importfile_delivery.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"DELIVERY",
		"selectDeliveryStatus",
		{
			col0:deliveryno,
			shop:shopname
		}
	).getArray();

	var status = detailResult[0]["status"];


	// 新規登録の場合、仕入明細テーブルを再度導入
	if(status == "0：新規登録"){

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"DELIVERY",
			"delDeliveryDetail",
			{
				"col0":deliveryno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadDeliveryDetail(importfile_delivery, deliveryno);

	}

	if(status == "1：納品確定" || status == "2：納品発送"){

		// 2, 既存仕入明細を全件削除
		var delResult = db.change(
			"DELIVERY",
			"delDeliveryDetail",
			{
				"col0":deliveryno
			}
		);

		// 3, 新しい仕入明細を挿入
		uploadDeliveryDetail(importfile_delivery, deliveryno);

		// 5, 確定数量を再計算
		var updateResult = db.change(
			"DELIVERY",
			"updateDeliveryCount",
			{
				col0:deliveryno,
				shop:shopname
			}
		);

	}

	// 受取済みの場合、明細は更新しない
	if(status == "3：納品受領" || status == "4：納品完了"){
		return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");

	}

	return (new Result()).eval("Efw('menu_goto',{page:'si_delivery.jsp',shop:'"+ shopname + "'})");
};


function uploadDeliveryDetail(excelfile, deliveryno){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(shopname == "Smart-KM"){

		//importProductInfoForSmartKM(shopname, excelXSSF, stockFlg, deliveryFlg, purchaseFlg, no);
		importProductInfoForSmartKM(shopname, excelXSSF, false, true, false, deliveryno);

	}else{

		//importProductInfoForSmartBear(shopname, excelXSSF, stockFlg, deliveryFlg, purchaseFlg, no)
		importProductInfoForSmartBear(shopname, excelXSSF, false, true, false, deliveryno);

	}



}

