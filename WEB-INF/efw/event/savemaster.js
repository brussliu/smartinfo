var savemaster={};
savemaster.name="マスタ情報保存";
/**
 * パラメーターフォーマット
 */
savemaster.paramsFormat={
	"#si_master_inputdialog":{
		"#productid":"required:true;display-name:商品管理番号;",
		"#productdiv":"required:true;display-name:商品分類;",
		"#sku":"required:true;display-name:SKU番号;",
		"#asin":"required:true;display-name:ASIN番号;",
		"#productname":"required:true;display-name:商品名称;",
		//"#productpic":"required:true;display-name:商品写真;",

		"subsku":"required:true;display-name:子商品SKU番号;",
		"subasin":"required:true;display-name:子商品ASIN番号;",

		"subcolor":"required:true;display-name:子商品color;",
		"subsize":"required:true;display-name:子商品size;",

		"picStr":"required:true;display-name:商品写真;",
		"picColor":null,

	},
};
/**
 * 新規或は修正の場合、保存イベント実行関数
 */
savemaster.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 親商品情報登録
	// 商品管理番号
	var oya_productid = params["#si_master_inputdialog"]["#productid"];
	// 商品分類
	var oya_productdiv = params["#si_master_inputdialog"]["#productdiv"];
	// SKU番号
	var oya_sku = params["#si_master_inputdialog"]["#sku"];
	// ASIN番号
	var oya_asin = params["#si_master_inputdialog"]["#asin"];
	// ラベル番号
	var oya_label = "";
	// 商品名称
	var oya_productname = params["#si_master_inputdialog"]["#productname"];
	// 価格
	var oya_price = "";
	// ローカル在庫数量
	var oya_localstock = "";
	// FBM在庫数量
	var oya_fbmstock = "";
	// FBA在庫数量
	var oya_fbastock = "";
	// 商品種別
	var oya_producttype = "親商品";
	// 出品タイプ
	var oya_selltype = "";

	var oya_sort = "0";

	var oya_color = "";

	var oya_size = "";

	var picArr = params["#si_master_inputdialog"]["picStr"];

	var picColorArr = params["#si_master_inputdialog"]["picColor"];

	var insertResult = db.change(
		"MASTER",
		"insertMaster",
		{
			"shop":getShopId(),
			"col0":oya_productid,
			"col1":oya_productdiv,
			"col2":oya_sku,
			"col3":oya_asin,
			"col4":oya_label,
			"col5":oya_productname,
			"col6":oya_price,
			"col7":oya_fbmstock,
			"col8":oya_fbastock,
			"col9":oya_producttype,
			"col10":oya_selltype,
			"col11":picArr[0],
			"col12":oya_sort,
			"col13":oya_color,
			"col14":oya_size
		}
	);


	// 子商品情報登録
	var skuArr = params["#si_master_inputdialog"]["subsku"];

	var asinArr = params["#si_master_inputdialog"]["subasin"];

	var colorArr = params["#si_master_inputdialog"]["subcolor"];

	var sizeArr = params["#si_master_inputdialog"]["subsize"];

	for(var i = 0;i < skuArr.length;i++){

		// 商品管理番号
		var sub_productid = oya_productid;
		// 商品分類
		var sub_productdiv = oya_productdiv;
		// SKU番号
		var sub_sku = skuArr[i];
		// ASIN番号
		var sub_asin = asinArr[i];

		// 商品種別
		var sub_producttype = "子商品";
		// 出品タイプ
		var sub_selltype = "";


		var selectResult = db.select(
			"MASTER",
			"selectSubInfo",
			{
				"sku":sub_sku,
				"asin":sub_asin,
				"shop":getShopId()
			}
		).getArray();

		// ラベル番号
		var sub_label = selectResult[0].label;
		// 商品名称
		var sub_productname = selectResult[0].productname;
		// 価格
		var sub_price = selectResult[0].price;
		// FBM在庫数量
		var sub_fbmstock = selectResult[0].fbmquantity;
		// FBA在庫数量
		var sub_fbastock = selectResult[0].fbaquantity;
		// 色
		var sub_color = colorArr[i].trim();
		// サイズ
		var sub_size = sizeArr[i].trim();

		var subInsertResult = db.change(
			"MASTER",
			"insertMaster",
			{
				"shop":getShopId(),
				"col0":sub_productid,
				"col1":sub_productdiv,
				"col2":sub_sku,
				"col3":sub_asin,
				"col4":sub_label,
				"col5":sub_productname,
				"col6":sub_price,
				"col7":sub_fbmstock,
				"col8":sub_fbastock,
				"col9":sub_producttype,
				"col10":sub_selltype,
				"col11":"",
				"col12":i+1,
				"col13":sub_color,
				"col14":sub_size
			}
		);

	}

	for(var i = 0;i < picArr.length;i ++){

		var pic = picArr[i];
		var color = picColorArr[i];

		var picInsertResult = db.change(
			"MASTER",
			"insertColor",
			{
				"shop":getShopId(),
				"col0":oya_productid,
				"col1":color,
				"col2":pic
			}
		);

	}

	return ret.eval("si_master_inputdialog.dialog('close')");

};
