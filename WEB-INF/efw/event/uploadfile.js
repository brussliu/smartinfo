var uploadfile={};
uploadfile.name="ファイルアップロード";
uploadfile.paramsFormat={

	// 商品マスタ情報
	"#importfile_master":null,
	// 出品詳細情報
	"#importfile_product":null,
	// FBA在庫情報
	"#importfile_fba":null,
	// 全注文情報
	"#importfile_order":null,
	// 在庫情報導入
	"#importfile_localstock":null,
	// 在庫情報統計
	"#importfile_liststock":null,
	// 納品情報導入
	"#importfile_delivery":null,

	// アマゾン発送情報導入
	"#importfile_ship_amazon":null,
	// Qoo10発送情報導入
	"#importfile_ship_qoo10_order":null,
	"#importfile_ship_qoo10_ship":null,

	"liststock":null,

	"data":null,
	"#shop":null
};
var shopname = "";
var count = 0;
uploadfile.fire=function(params){

	file.saveUploadFiles("upload");

	shopname = params["#shop"];

	var ret = new Result();

	if(params["data"] == "master"){

		count = 0;
		var fa = params["#importfile_master"].split("\\");
		var f = fa[fa.length-1];

		// データ全件削除
		var delResult = db.change(
			"UPLOAD",
			"delAllMaster",
			{shop:shopname}
		);
		
		// Excelファイル
		var excelXSSF = new Excel("upload/" + f);

		var sheetName = "";
		if(shopname == "Smart-Bear"){
			sheetName = "新店";
		}else if(shopname == "Smart-KM"){
			sheetName = "旧店";
		}

		var shop_X = "B";
		var p_no_X = "C";
		var p_category_X = "D";
		var p_type_X = "E";
		var p_color_X = "F";
		var p_size_X = "G";

		var sku_X = "H";
		var asin_X = "I";

		var row_from = 2;
		var row_to = 9999;

		for(var y = row_from;y <= row_to;y++){

			var shop = excelXSSF.getValue(sheetName, shop_X + y);
			var p_no = excelXSSF.getValue(sheetName, p_no_X + y);
			var p_category = excelXSSF.getValue(sheetName, p_category_X + y);
			var p_type = excelXSSF.getValue(sheetName, p_type_X + y);
			var p_color = excelXSSF.getValue(sheetName, p_color_X + y);
			var p_size = excelXSSF.getValue(sheetName, p_size_X + y);
			var sku = excelXSSF.getValue(sheetName, sku_X + y);
			var asin = excelXSSF.getValue(sheetName, asin_X + y);

			if(shop == null || shop.length <= 0){
				break;
			}

			var insertResult = db.change(
				"UPLOAD",
				"insertMaster",
				{
					"col0" : count,
					"col1" : shopname,
					"col2" : p_no,
					"col3" : p_category,
					"col4" : p_type,
					"col5" : p_color,
					"col6" : p_size,
					"col7" : sku,
					"col8" : asin
				}
			);

			count = count + 1;

		}


		//"出品詳細レポート+01-26-2020.txt"
		var d = new Date().format("yyyy-MM-dd");

		var historyResult = db.change(
			"UPLOAD",
			"insertHistory",
			{
				"col0":shopname,
				"col1":"master",
				"col2":d,
				"col3":count
			}
		);
	
	}else if(params["data"] == "product"){

		count = 0;
		var fa = params["#importfile_product"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件削除
		var delResult = db.change(
			"UPLOAD",
			"delAllProduct",
			{shop:shopname}
		);

		// データ全件導入
		csvReader.loopAllLines(importProductInfo);

		//"出品詳細レポート+01-26-2020.txt"
		var d = f.substring(15,19) + "-" + f.substring(9,11) + "-" + f.substring(12,14);

		var historyResult = db.change(
			"UPLOAD",
			"insertHistory",
			{
				"col0":shopname,
				"col1":"product",
				"col2":d,
				"col3":count
			}
		);

	}else if(params["data"] == "fba"){

		count = 0;

		var fa = params["#importfile_fba"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件削除
		var delResult = db.change(
			"UPLOAD",
			"delAllFba",
			{shop:params["#shop"]}
		);

		// データ全件導入
		csvReader.loopAllLines(importFbaInfo);

		//"FBA在庫レポート+01-26-2020.txt"
		var d = f.substring(16,20) + "-" + f.substring(10,12) + "-" + f.substring(13,15);

		var historyResult = db.change(
			"UPLOAD",
			"insertHistory",
			{
				"col0":shopname,
				"col1":"fba",
				"col2":d,
				"col3":count
			}
		);

	}else if(params["data"] == "order"){

		count = 0;

		var fa = params["#importfile_order"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t", "\"", "MS932");

		// データ全件導入
		csvReader.loopAllLines(importOrderInfo);

		//"3630501660018292.txt"
		var d = new Date().format("yyyy-MM-dd");

		var historyResult = db.change(
			"UPLOAD",
			"insertHistory",
			{
				"col0":shopname,
				"col1":"order",
				"col2":d,
				"col3":count
			}
		);

	}else if(params["data"] == "localstock"){

		count = 0;

		var fa = params["#importfile_localstock"].split("\\");
		var f = fa[fa.length-1];

		var excelXSSF = new Excel("upload/" + f);

		if(shopname == "Smart-KM"){

			var sheetNameArr = [
			"廃止予定","NEW","スマホ保護フィルム","カメラ保護","スマホケース","iFace風","花柄ケース","ケーブル",
			"無線充電器","自撮りライト","スタンド","イヤホン","タブレットケース","下着","スマホリング","スポーツ"];

			for(var i = 0;i < sheetNameArr.length;i ++){

				var sheetName = sheetNameArr[i];

				var skuX = "C";
				var asinX = "D";

				var localStockX = "K";
				var onboardStockX = "L";

				var labelY_from = 4;
				var labelY_to = 999;

				for(var y = labelY_from;y <= labelY_to;y++){

					var sku = excelXSSF.getValue(sheetName, skuX + y);
					var asin = excelXSSF.getValue(sheetName, asinX + y);
					var label = "";

					if(sku != null && sku.length > 0 && asin != null && asin.length > 0){

						var localstock = excelXSSF.getValue(sheetName, localStockX + y);
						var onboardstock = excelXSSF.getValue(sheetName, onboardStockX + y);

						if(localstock == null || localstock.length == 0){
							localstock = "0";
						}
						if(onboardstock == null || onboardstock.length == 0){
							onboardstock = "0";
						}

						var delResult = db.change(
							"UPLOAD",
							"delLocalstock",
							{
								"sku":sku,
								"asin":asin
							}
						);

						var insResult = db.change(
							"UPLOAD",
							"insLocalstock",
							{
								"localstock":localstock,
								"onboardstock":onboardstock,
								"sku":sku,
								"asin":asin
							}
						);

						count = count + 1;

					}else{

						break;

					}

				}


			}


		}else{

			var RC_labelX = ["F","G","H","I","J","K"];
			var RC_localStockX = ["X","Y","Z","AA","AB","AC"];
			var RC_onboardStockX = ["AD","AE","AF","AG","AH","AI"];
			var RC_labelY_from = 4;
			var RC_labelY_to = 30;

			var sheetName = "在庫情報（雨衣）";

			sheetName.debug("AAAAAAAAAAAA");

			for(var y = RC_labelY_from;y <= RC_labelY_to;y++){

				for(var x = 0;x < RC_labelX.length;x ++){

					var label = excelXSSF.getValue(sheetName, RC_labelX[x] + y);

					var detailResult = db.select(
						"UPLOAD",
						"searchSKUASIN",
						{
							label:label,
							shop:shopname
						}
					).getArray();

					if(detailResult == null || detailResult.length <= 0){
						continue;
					}

					var sku = detailResult[0]["sku"];
					var asin = detailResult[0]["asin"];

					if(label != null && label.length > 0){

						var localstock = excelXSSF.getValue(sheetName, RC_localStockX[x] + y);
						var onboardstock = excelXSSF.getValue(sheetName, RC_onboardStockX[x] + y);

						if(localstock == null || localstock.length == 0){
							localstock = "0";
						}
						if(onboardstock == null || onboardstock.length == 0){
							onboardstock = "0";
						}

						var delResult = db.change(
							"UPLOAD",
							"delLocalstock",
							{
								"sku":sku,
								"asin":asin
							}
						);

						var insResult = db.change(
							"UPLOAD",
							"insLocalstock",
							{
								"localstock":localstock,
								"onboardstock":onboardstock,
								"sku":sku,
								"asin":asin
							}
						);

						count = count + 1;

					}else{

						continue;

					}

				}

			}


			var PJ_labelX = ["F","G","H","I","J","K"];
			var PJ_localStockX = ["R","S","T","U","V","W"];
			var PJ_onboardStockX = ["X","Y","Z","AA","AB","AC"];
			var PJ_labelY_from = 4;
			var PJ_labelY_to = 11;

			var sheetName = "在庫情報（居家服）";

			sheetName.debug("BBBBBBBBBBB");

			for(var y = PJ_labelY_from;y <= PJ_labelY_to;y++){

				for(var x = 0;x < PJ_labelX.length;x ++){

					var label = excelXSSF.getValue(sheetName, PJ_labelX[x] + y);
					var detailResult = db.select(
						"UPLOAD",
						"searchSKUASIN",
						{
							label:label,
							shop:shopname
						}
					).getArray();
					if(detailResult == null || detailResult.length <= 0){
						continue;
					}

					var sku = detailResult[0]["sku"];
					var asin = detailResult[0]["asin"];
					if(label != null && label.length > 0){

						var localstock = excelXSSF.getValue(sheetName, PJ_localStockX[x] + y);
						var onboardstock = excelXSSF.getValue(sheetName, PJ_onboardStockX[x] + y);

						if(localstock == null || localstock.length == 0){
							localstock = "0";
						}
						if(onboardstock == null || onboardstock.length == 0){
							onboardstock = "0";
						}

						var delResult = db.change(
							"UPLOAD",
							"delLocalstock",
							{
								"sku":sku,
								"asin":asin
							}
						);

						var insResult = db.change(
							"UPLOAD",
							"insLocalstock",
							{
								"localstock":localstock,
								"onboardstock":onboardstock,
								"sku":sku,
								"asin":asin
							}
						);

						count = count + 1;

					}else{

						continue;

					}

				}

			}


			var UB_labelX = ["F"];
			var UB_localStockX = ["H"];
			var UB_onboardStockX = ["I"];
			var UB_labelY_from = 4;
			var UB_labelY_to = 14;

			var sheetName = "在庫情報（雨伞等）";

			sheetName.debug("CCCCCCCCCC");

			for(var y = UB_labelY_from;y <= UB_labelY_to;y++){

				for(var x = 0;x < UB_labelX.length;x ++){

					var label = excelXSSF.getValue(sheetName, UB_labelX[x] + y);
					var detailResult = db.select(
						"UPLOAD",
						"searchSKUASIN",
						{
							label:label,
							shop:shopname
						}
					).getArray();
					if(detailResult == null || detailResult.length <= 0){
						continue;
					}

					var sku = detailResult[0]["sku"];
					var asin = detailResult[0]["asin"];

					if(label != null && label.length > 0){

						var localstock = excelXSSF.getValue(sheetName, UB_localStockX[x] + y);
						var onboardstock = excelXSSF.getValue(sheetName, UB_onboardStockX[x] + y);

						if(localstock == null || localstock.length == 0){
							localstock = "0";
						}
						if(onboardstock == null || onboardstock.length == 0){
							onboardstock = "0";
						}

						var delResult = db.change(
							"UPLOAD",
							"delLocalstock",
							{
								"sku":sku,
								"asin":asin
							}
						);

						var insResult = db.change(
							"UPLOAD",
							"insLocalstock",
							{
								"localstock":localstock,
								"onboardstock":onboardstock,
								"sku":sku,
								"asin":asin
							}
						);

						count = count + 1;

					}else{

						continue;

					}

				}

			}

			var RB_labelX = ["H"];
			var RB_localStockX = ["J"];
			var RB_onboardStockX = ["K"];
			var RB_labelY_from = 4;
			var RB_labelY_to = 142;

			var sheetName = "在庫情報（雨靴）";

			sheetName.debug("DDDDDDDDDDDD");

			for(var y = RB_labelY_from;y <= RB_labelY_to;y++){

				for(var x = 0;x < RB_labelX.length;x ++){

					var label = excelXSSF.getValue(sheetName, RB_labelX[x] + y);
					var detailResult = db.select(
						"UPLOAD",
						"searchSKUASIN",
						{
							label:label,
							shop:shopname
						}
					).getArray();
					if(detailResult == null || detailResult.length <= 0){
						continue;
					}

					var sku = detailResult[0]["sku"];
					var asin = detailResult[0]["asin"];

					if(label != null && label.length > 0){

						var localstock = excelXSSF.getValue(sheetName, RB_localStockX[x] + y);
						var onboardstock = excelXSSF.getValue(sheetName, RB_onboardStockX[x] + y);

						if(localstock == null || localstock.length == 0){
							localstock = "0";
						}
						if(onboardstock == null || onboardstock.length == 0){
							onboardstock = "0";
						}

						var delResult = db.change(
							"UPLOAD",
							"delLocalstock",
							{
								"sku":sku,
								"asin":asin
							}
						);

						var insResult = db.change(
							"UPLOAD",
							"insLocalstock",
							{
								"localstock":localstock,
								"onboardstock":onboardstock,
								"sku":sku,
								"asin":asin
							}
						);

						count = count + 1;

					}else{

						continue;

					}

				}

			}


			var W_labelX = "J";
			var W_localStockX = "M";
			var W_onboardStockX = "N";
			var W_labelY_from = 4;

			var sheetName = "在庫情報（袜子）";

			sheetName.debug("EEEEEEEEEEEEEEEEEEE");

			for(var y = W_labelY_from;y <= 9999;y++){

				var label = excelXSSF.getValue(sheetName, W_labelX + y);

				if(label == null || label.length <= 0){
					break;
				}

				var detailResult = db.select(
					"UPLOAD",
					"searchSKUASIN",
					{
						label:label,
						shop:shopname
					}
				).getArray();

				detailResult.debug("ZZZZZZZZZZZZZZZZZZZZZ");
				if(detailResult == null || detailResult.length <= 0){
					continue;
				}

				var sku = detailResult[0]["sku"];
				var asin = detailResult[0]["asin"];


				var localstock = excelXSSF.getValue(sheetName, W_localStockX + y);
				var onboardstock = excelXSSF.getValue(sheetName, W_onboardStockX + y);

				if(localstock == null || localstock.length == 0){
					localstock = "0";
				}
				if(onboardstock == null || onboardstock.length == 0){
					onboardstock = "0";
				}

				var delResult = db.change(
					"UPLOAD",
					"delLocalstock",
					{
						"sku":sku,
						"asin":asin
					}
				);

				var insResult = db.change(
					"UPLOAD",
					"insLocalstock",
					{
						"localstock":localstock,
						"onboardstock":onboardstock,
						"sku":sku,
						"asin":asin
					}
				);

				count = count + 1;


			}

			var d = new Date().format("yyyy-MM-dd");

			var historyResult = db.change(
				"UPLOAD",
				"insertHistory",
				{
					"col0":shopname,
					"col1":"localstock",
					"col2":d,
					"col3":count
				}
			);

		}

	}else if(params["data"] == "delivery"){


		count = 0;
		var fa = params["#importfile_delivery"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件導入
		csvReader.loopAllLines(importDelivery);

		var d = new Date().format("yyyy-MM-dd");

		var historyResult = db.change(
			"UPLOAD",
			"insertHistory",
			{
				"col0":shopname,
				"col1":"delivery",
				"col2":d,
				"col3":count
			}
		);


	}else if(params["data"] == "liststock"){

		count = 0;

		var opt = params["liststock"];

		var fa = params["#importfile_liststock"].split("\\");
		var f = fa[fa.length-1];

		var excelXSSF = new Excel("upload/" + f);
		var sheetArry = excelXSSF.getSheetNames();

		var inputAll = new Array();
		var inputOneSheet = new Array();

		var excel = new Excel("templates/input_stock.xlsx");

		var tempFilePathName = file.getTempFileName();

		for(var s = 0;s < sheetArry.length; s ++){

			inputOneSheet = new Array();

			var sheetName = sheetArry[s];

			for(var r1 = 1;r1 < 9999; r1 ++){

				var code = excelXSSF.getValue(sheetName, "A" + r1);

				if(code == null || code.length <= 0){
					break;
				}

				var insertResult = db.change(
					"UPLOAD",
					"insertLabel",
					{
						"col0":shopname,
						"col1":code,
						"col2":sheetName
					}
				);

			}

			// シート別集計情報Excel生成
			var selectResult = db.select(
				"UPLOAD",
				"selectLabel",
				{
					"col0":shopname,
					"col1":sheetName
				}
			).getArray();

			excel.createSheet(sheetName, "TEMP");

			for(var r2 = 0;r2 < selectResult.length; r2 ++){

				var countInfo = selectResult[r2];

				excel.setCell(sheetName, "B" + (r2 + 5), countInfo["productno"]);
				excel.setCell(sheetName, "C" + (r2 + 5), countInfo["productdiv"]);
				excel.setCell(sheetName, "D" + (r2 + 5), countInfo["sku"]);
				excel.setCell(sheetName, "E" + (r2 + 5), countInfo["asin"]);
				excel.setCell(sheetName, "F" + (r2 + 5), countInfo["label"]);
				excel.setCell(sheetName, "G" + (r2 + 5), countInfo["productname"]);
				excel.setCell(sheetName, "H" + (r2 + 5), countInfo["color"]);
				excel.setCell(sheetName, "I" + (r2 + 5), countInfo["size"]);
				excel.setCell(sheetName, "J" + (r2 + 5), countInfo["count"]);

			}
			
		}

		// 全体集計情報Excel生成
		var selectResultAll = db.select(
			"UPLOAD",
			"selectAllLabel",
			{
				"col0":shopname,
				"col1":sheetName
			}
		).getArray();

		if(opt == "updateAll"){

			var updateResult0 = db.change(
				"UPLOAD",
				"updateAllLocalStock",
				{
					"col0":shopname
				}
			);
		}

		excel.createSheet("ALL", "TEMP");

		for(var r2 = 0;r2 < selectResultAll.length; r2 ++){

			var countInfo = selectResultAll[r2];

			excel.setCell("ALL", "B" + (r2 + 5), countInfo["productno"]);
			excel.setCell("ALL", "C" + (r2 + 5), countInfo["productdiv"]);
			excel.setCell("ALL", "D" + (r2 + 5), countInfo["sku"]);
			excel.setCell("ALL", "E" + (r2 + 5), countInfo["asin"]);
			excel.setCell("ALL", "F" + (r2 + 5), countInfo["label"]);
			excel.setCell("ALL", "G" + (r2 + 5), countInfo["productname"]);
			excel.setCell("ALL", "H" + (r2 + 5), countInfo["color"]);
			excel.setCell("ALL", "I" + (r2 + 5), countInfo["size"]);
			excel.setCell("ALL", "J" + (r2 + 5), countInfo["count"]);

			if(opt == "output"){

			}else if(opt == "updatePart"){

				var updateResult = db.change(
					"UPLOAD",
					"updateLocalStock",
					{
						"col0":shopname,
						"col1":countInfo["label"],
						"col2":countInfo["count"]
					}
				);

			}else if(opt == "updateAll"){

				var updateResult = db.change(
					"UPLOAD",
					"updateLocalStock",
					{
						"col0":shopname,
						"col1":countInfo["label"],
						"col2":countInfo["count"]
					}
				);

			}else if(opt == "add"){

				var updateResult = db.change(
					"UPLOAD",
					"addLocalStock",
					{
						"col0":shopname,
						"col1":countInfo["label"],
						"col2":countInfo["count"]
					}
				);

			}

		}

		excel.hideSheet("TEMP");

		excel.setActiveSheet("ALL").save(tempFilePathName);

		ret.attach(tempFilePathName)
		.saveas("在庫確認_" + (new Date()).format("yyyyMMdd")+".xlsx")
		.deleteAfterDownload();


		// データ削除
		var deleteResult = db.change(
			"UPLOAD",
			"deleteLabel",
			{
				"col0":shopname
			}
		);



	}else if(params["data"] == "ship_amazon"){

		count = 0;

		var fa = params["#importfile_ship_amazon"].split("\\");
		var f = fa[fa.length-1];


		//var csvReader = new CSVReader("upload/" + f, "\t");
		var csvReader = new CSVReader("upload/" + f, "\t", "\"", "MS932");

		// データ全件導入
		csvReader.loopAllLines(importShipAmazonInfo);


	}else if(params["data"] == "ship_qoo10_order"){

		count = 0;

		var fa = params["#importfile_ship_qoo10_order"].split("\\");
		var f = fa[fa.length-1];

		var txt = file.readAllLines("upload/" + f).split("\r\n");

		for(var i = 1;i < txt.length - 1;i ++){

			var rowArr = txt[i].substring(1,txt[i].length-2).split("\",\"");

			importShipQoo10ProductInfo(rowArr,i);
		}

	}else if(params["data"] == "ship_qoo10_ship"){

		count = 0;

		var fa = params["#importfile_ship_qoo10_ship"].split("\\");
		var f = fa[fa.length-1];

		var txt = file.readAllLines("upload/" + f).split("発注書発行日 : ");

		for(var i = 1;i < txt.length;i ++){


				var tablehtml = txt[i].substring(txt[i].indexOf("<table"), txt[i].indexOf("</table>")+8);

				var orderno_start = "注文番号</td><td class='content'>";
				var orderno_end = "</td>";
				var orderno = getContent(tablehtml, orderno_start, orderno_end);

				var buyername_start = "購入者名</td><td class='content'>";
				var buyername_end = "</td>";
				var buyername = getContent(tablehtml, buyername_start, buyername_end);

				var buyertel_start = "購入者電話番号</td><td class='content'>&nbsp; /";
				var buyertel_end = "</td>";
				var buyertel = getContent(tablehtml, buyertel_start, buyertel_end);

				var recievename_start = "受取人名</td><td class='content'>";
				var recievename_end = "</td>";
				var recievename = getContent(tablehtml, recievename_start, recievename_end);

				var recievetel_start = "受取人電話番号</td><td class='content'>";
				var recievetel_end = "</td>";
				var recievetel = getContent(tablehtml, recievetel_start, recievetel_end);

				var postno_start = "郵便番号</td><td class='content'>";
				var postno_end = "</td>";
				var postno = getContent(tablehtml, postno_start, postno_end);

				var address_start = "住所</td><td style='width:760px;' colspan='3'>";
				var address_end = "</td>";
				var address = getContent(tablehtml, address_start, address_end);

				var updateResult = db.change(
					"UPLOAD",
					"updateShipQoo10ShipInfo",
					{
						"orderno":orderno,
						"col0":buyername,
						"col1":recievename,
						"col2":postno,
						"col3":address,
						"col4":recievetel,
						"col5":recievetel
					}
				);
		}

	}
	
	return ret.navigate("si_upload.jsp?shop=" + shopname);
	//navigate(params["page"] + "?shop=" + params["shop"]);

};
function getContent(tablehtml,start_txt,end_txt){

	var start_index = tablehtml.indexOf(start_txt) + start_txt.length;

	var txt_temp = tablehtml.substring(start_index);

	var end_index = start_index + txt_temp.indexOf(end_txt);

	var content = tablehtml.substring(start_index,   end_index);

	return content;

}

function importShipQoo10ProductInfo(aryField, index) {

	if(index > 0){

		var selectResult = db.select(
			"UPLOAD",
			"selectShipQoo10Product",
			{
				"orderno":aryField[1],
				"cartno":aryField[2]
			}
		);

		if(selectResult.length == 0){

			var insertResult = db.change(
				"UPLOAD",
				"insertShipQoo10Product",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2],
					"col3":aryField[3],
					"col4":aryField[4],
					"col5":aryField[5],
					"col6":aryField[6],
					"col7":aryField[7],
					"col8":aryField[8],
					"col9":aryField[9],
					"col10":aryField[10],
					"col11":aryField[11],
					"col12":aryField[12],
					"col13":aryField[13]
				}
			);
		
			count = count + 1;

		}


	}

};

function importShipAmazonInfo(aryField, index) {

	if(index > 0){

		var selectResult = db.select(
			"UPLOAD",
			"selectShipAmazon",
			{
				"orderno":aryField[0],
				"orderitemno":aryField[1]
			}
		);

		if(selectResult.length == 0){

			var insertResult = db.change(
				"UPLOAD",
				"insertShipAmazon",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2],
					"col3":aryField[3],
					"col4":aryField[4],
					"col5":aryField[5],
					"col6":aryField[6],
					"col7":aryField[7],
					"col8":aryField[8],
					"col9":aryField[9],
					"col10":aryField[10],
					"col11":aryField[11],
					"col12":aryField[12],
					"col13":aryField[13],
					"col14":aryField[14],
					"col15":aryField[15],
					"col16":aryField[16],
					"col17":aryField[17],
					"col18":aryField[18],
					"col19":aryField[19],
					"col20":aryField[20],
					"col21":aryField[21],
					"col22":aryField[22],
					"col23":aryField[23]
				}
			);
		
			count = count + 1;

		}


	}

};


function importProductInfo(aryField, index) {

	if(index > 0){
		var insertResult = db.change(
			"UPLOAD",
			"insertProduct",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":aryField[3],
				"col4":aryField[4],
				"col5":aryField[5],
				"col6":aryField[6],
				"col7":aryField[7],
				"col8":aryField[8],
				"col9":aryField[9],
				"col10":aryField[10],
				"col11":aryField[11],
				"col12":aryField[12],
				"col13":aryField[13],
				"col14":aryField[14],
				"col15":aryField[15],
				"col16":aryField[16],
				"col17":aryField[17],
				"col18":aryField[18],
				"col19":aryField[19],
				"col20":aryField[20],
				"col21":aryField[21],
				"col22":shopname
			}
		);

		var updateResult = db.change(
			"UPLOAD",
			"updateProduct",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col5":aryField[5],
				"col6":aryField[6],
				"col22":shopname
			}
		);

		count = count + 1;

		count.debug("CCCCCCCCCCCCCCCCCCCCc");

	}

};

function importFbaInfo(aryField, index) {

	if(index > 0){
		var insertResult = db.change(
			"UPLOAD",
			"insertFba",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":aryField[3],
				"col4":aryField[4],
				"col5":aryField[5],
				"col6":shopname
			}
		);

		if(aryField[4] == "SELLABLE"){
			var updateResult = db.change(
				"UPLOAD",
				"updateFba",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2],
					// "col3":aryField[3],
					// "col4":aryField[4],
					"col5":aryField[5],
					"col6":shopname
				}
			);
		}
		
		count = count + 1;
	}

};

function importOrderInfo(aryField, index) {

	if(index > 0){

		var selectResult = db.select(
			"UPLOAD",
			"selectOrder",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":shopname
			}
		).getArray();

		if(selectResult[0].count > 0){

			var insertResult = db.change(
				"UPLOAD",
				"delOrder",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2],
					"col3":shopname
				}
			);
		}

		var insertResult = db.change(
			"UPLOAD",
			"insertOrder",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":aryField[3],
				"col4":aryField[4],
				"col5":aryField[5],
				"col6":aryField[6],
				"col7":aryField[7],
				"col8":aryField[8],
				"col9":aryField[9],
				"col10":aryField[10],
				"col11":aryField[11],
				"col12":aryField[12],
				"col13":aryField[13],
				"col14":aryField[14],
				"col15":aryField[15],
				"col16":aryField[16],
				"col17":aryField[17],
				"col18":aryField[18],
				"col19":aryField[19],
				"col20":aryField[20],
				"col21":aryField[21],
				"col22":aryField[22],
				"col23":aryField[23],
				"col24":aryField[24],
				"col25":aryField[25],
				"col26":aryField[26],
				"col27":aryField[27],
				"col28":aryField[28],
				"col29":shopname
			}
		);

		count = count + 1;


	}

};

function importDelivery(aryField, index) {

	if(index > 8){

		aryField.debug("WWWWWWWWWWWWWWWWWWWWWW");

		var insResult = db.change(
			"UPLOAD",
			"updateLocalstock",
			{
				"delivery":aryField[9],
				"sku":aryField[0],
				"asin":aryField[2],
			}
		);

		count = count + 1;

	}

};