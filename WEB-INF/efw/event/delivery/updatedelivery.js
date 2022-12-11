var updatedelivery={};
updatedelivery.name="納品情報更新";
updatedelivery.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",
	"#deliveryname":"required:true;display-name:仕入名称;",
	"#importfile_delivery":null,
};

updatedelivery.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 納品No
	var deliveryno = params["#deliveryno"];
	// 納品名称
	var deliveryname = params["#deliveryname"];
	// 納品名称更新
	var updateResult = db.change(
		"DELIVERY",
		"updateDelivery00",
		{
			"shop":getShopId(),
			"col0":deliveryno,
			"col1":deliveryname
		}
	);

	// 納品明細
	var importfile_delivery = params["#importfile_delivery"];

	if(importfile_delivery == null || importfile_delivery.length == 0){
		return (new Result()).eval("Efw('menu_goto',{page:'delivery.jsp'})");
	}

	// ステータス検索
	var detailResult = db.select(
		"DELIVERY",
		"selectDeliveryStatus",
		{
			col0:deliveryno,
			shop:getShopId()
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

		// 5, 確定数量を再計算
		var updateResult = db.change(
			"DELIVERY",
			"updateDeliveryCount",
			{
				col0:deliveryno,
				shop:getShopId()
			}
		);

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
				shop:getShopId()
			}
		);

	}

	// 受取済みの場合、明細は更新しない
	if(status == "3：納品受領" || status == "4：納品完了"){
		return (new Result()).eval("Efw('menu_goto',{page:'delivery.jsp'})");

	}

	return (new Result()).eval("Efw('menu_goto',{page:'delivery.jsp'})");
};


function uploadDeliveryDetail(excelfile, deliveryno){

	file.saveUploadFiles("upload");

	var fa = excelfile.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(getShopId() == "Smart-KM"){

		importProductInfoForSmartKM(getShopId(), excelXSSF, false, true, false, deliveryno);

	}else{

		importProductInfoForSmartBear(getShopId(), excelXSSF, false, true, false, deliveryno);

	}



}

