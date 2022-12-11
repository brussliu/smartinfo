var adddelivery={};
adddelivery.name="納品新規登録";
adddelivery.paramsFormat={

	"#deliveryInfo":{
		"#deliveryname":"required:true;display-name:納品名称;",
		"#importfile_delivery":"required:true;display-name:納品内容;",
	},
};

adddelivery.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 納品名称
	var deliveryname = params["#deliveryInfo"]["#deliveryname"];
	// 納品内容
	var importfile_delivery = params["#deliveryInfo"]["#importfile_delivery"];

	var today = new Date();
	// 新規登録日
	var registrationDate = today.format("yyyy/MM/dd");
	// 仕入No
	var deliveryno = today.format("yyyyMMdd-HHmmss");
	// 仕入管理テーブル登録
	var insertResult = db.change(
		"DELIVERY",
		"insertDelivery",
		{
			"shop":getShopId(),
			"col0":deliveryno,
			"col1":deliveryname,
			"col2":"0：新規登録",
			"col3":registrationDate
		}
	);

	file.saveUploadFiles("upload");

	var fa = importfile_delivery.split("\\");
	var f = fa[fa.length-1];

	// Excelファイル
	var excelXSSF = new Excel("upload/" + f);

	if(shogetShopId() == "Smart-KM"){

		importProductInfoForSmartKM(getShopId(), excelXSSF, false, true, false, deliveryno);


	}else{

		importProductInfoForSmartBear(getShopId(), excelXSSF, false, true, false, deliveryno);

	}

			// 5, 確定数量を再計算
			var updateResult = db.change(
				"DELIVERY",
				"updateDeliveryCount",
				{
					col0:deliveryno,
					shop:getShopId()
				}
			);
			

	return ret.eval("Efw('menu_goto',{page:'delivery.jsp'})");
};
