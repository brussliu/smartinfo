var savebox={};
savebox.name="箱詰め情報保存";

savebox.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",
	"#si_box_inputdialog":{
		"skuArr":null,
		"asinArr":null,
		"qArr":null,
	},
	"#shop":null
};
var shopname = "";
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
savebox.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var deliveryno = params["#deliveryno"];

	var skuArr = params["#si_box_inputdialog"]["skuArr"];

	var asinArr = params["#si_box_inputdialog"]["asinArr"];

	var qArr = params["#si_box_inputdialog"]["qArr"];
	
	shopname = params["#shop"];

	var delResult = db.change(
		"DELIVERY",
		"delDeliveryDetail",
		{
			"col0":deliveryno
		}
	);

	for(var i = 0;i < skuArr.length;i++){

		// SKU番号
		var sub_sku = skuArr[i];
		// ASIN番号
		var sub_asin = asinArr[i];
		// 数量
		var sub_q = qArr[i];

		var subInsertResult = db.change(
			"DELIVERY",
			"insertDeliveryDetail",
			{
				"col0":deliveryno,
				"col1":sub_sku,
				"col2":sub_asin,
				"col3":sub_q
			}
		);

	}

	return ret.eval("si_box_inputdialog.dialog('close')");

};
