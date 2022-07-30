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

	// 売上詳細情報導入
	"#importfile_earnings":null,

	// アマゾン発送情報導入
	"#importfile_ship_amazon":null,
	// Qoo10発送情報導入
	"#importfile_ship_qoo10_order":null,
	"#importfile_ship_qoo10_ship":null,

	"data":null,
	"#shop":null
};
var shopname = "";
var count = 0;
uploadfile.fire=function(params){

	file.saveUploadFiles("upload");

	shopname = params["#shop"];

	var ret = new Result();

	if(params["data"] == "pfo"){

		var ct = "";

		// -----------------------商品詳細-----------------------
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

		ct = ct + count;

		//"出品詳細レポート+01-26-2020.txt"
		//var d = f.substring(15,19) + "-" + f.substring(9,11) + "-" + f.substring(12,14);

		// -----------------------FBA-----------------------
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

		ct = ct + "/"+ count;

		//"FBA在庫レポート+01-26-2020.txt"
		//var d = f.substring(16,20) + "-" + f.substring(10,12) + "-" + f.substring(13,15);

		// -----------------------注文-----------------------
		count = 0;

		var fa = params["#importfile_order"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t", "\"", "MS932");

		// データ全件導入
		csvReader.loopAllLines(importOrderInfo);

		ct = ct + "/"+ count;

		//"3630501660018292.txt"
		//var d = new Date().format("yyyy-MM-dd");

		saveHistory(shopname, params["data"], null, ct);

	// }else if(params["data"] == "fba"){

	// 	saveHistory(shopname, params["data"], d, count);

	// }else if(params["data"] == "order"){

	// 	saveHistory(shopname, params["data"], d, count);

	}else if(params["data"] == "localstock"){

		count = 0;

		var fa = params["#importfile_localstock"].split("\\");
		var f = fa[fa.length-1];

		var excelXSSF = new Excel("upload/" + f);

		if(shopname == "Smart-KM"){

			importProductInfoForSmartKM(shopname, excelXSSF, true, false, false, null);
	
		}else{
	
			importProductInfoForSmartBear(shopname, excelXSSF, true, false, false, null);
	
		}

		saveHistory(shopname, params["data"], null, count);


	}else if(params["data"] == "earnings"){

		count = 0;

		var fa = params["#importfile_earnings"].split("\\");
		var f = fa[fa.length-1];

		var csvReader = new CSVReader("upload/" + f, ",", "\"", "MS932");

		// データ全件導入
		csvReader.loopAllLines(importEarnings);

		saveHistory(shopname, params["data"], null, count);

		var updateResult = db.change(
			"EARNINGS",
			"updateearnings",
			{}
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

};


function importEarnings(aryField, index) {

	if(index >= 8){

		var selectResult = db.select(
			"EARNINGS",
			"selectearnings",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":aryField[3] == null || aryField[3] == "" ? ' ' : aryField[3],
				"col4":aryField[4] == null || aryField[4] == "" ? ' ' : aryField[4],
				"col27":aryField[27]
			}
		).getArray();

		if(selectResult.length > 0){

			var delResult = db.change(
				"EARNINGS",
				"deleteearnings",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2],
					"col3":aryField[3] == null || aryField[3] == "" ? ' ' : aryField[3],
					"col4":aryField[4] == null || aryField[4] == "" ? ' ' : aryField[4],
					"col27":aryField[27]
				}
			);
		}

		var insertResult = db.change(
			"EARNINGS",
			"insertearnings",
			{
				"col0":aryField[0],
				"col1":aryField[1],
				"col2":aryField[2],
				"col3":aryField[3] == null || aryField[3] == "" ? ' ' : aryField[3],
				"col4":aryField[4] == null || aryField[4] == "" ? ' ' : aryField[4],
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
				"col27":aryField[27]
			}
		);

		count = count + 1;


	}

};

function saveHistory(sn, type, baseday, ct){

	var historyResult = db.change(
		"UPLOAD",
		"insertHistory",
		{
			"col0" : sn,
			"col1" : type,
			"col2" : baseday,
			"col3" : ct
		}
	);
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
				//"col1":aryField[1],
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
					//"col1":aryField[1],
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
