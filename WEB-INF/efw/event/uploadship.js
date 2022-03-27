var uploadship={};
uploadship.name="ファイルアップロード";
uploadship.paramsFormat={

	// 発送情報導入
	"#importfile_ship_info":null,
	// Qoo10発送情報導入
	//"#importfile_ship_qoo10_order":null,
	//"#importfile_ship_qoo10_ship":null,

	"data":null,
	"#shop":null
};
var shopname = "";
var count = 0;
uploadship.fire=function(params){

	file.saveUploadFiles("upload");

	shopname = params["#shop"];

	var ret = new Result();

	if(params["data"] == "product"){


	}else if(params["data"] == "fba"){


	}else if(params["data"] == "order"){


	}else if(params["data"] == "localstock"){


	}else if(params["data"] == "liststock"){


	}else if(params["data"] == "ship_amazon"){

		count = 0;

		var fa = params["#importfile_ship_info"].split("\\");
		var f = fa[fa.length-1];

		var csvReader = new CSVReader("upload/" + f, "\t", "\"", "MS932");

		// データ全件導入
		csvReader.loopAllLines(importShipAmazonInfo);


	}else if(params["data"] == "ship_qoo10_order"){

		// count = 0;

		// var fa = params["#importfile_ship_qoo10_order"].split("\\");
		// var f = fa[fa.length-1];

		// var txt = file.readAllLines("upload/" + f).split("\r\n");

		// for(var i = 1;i < txt.length - 1;i ++){

		// 	var rowArr = txt[i].substring(1,txt[i].length-2).split("\",\"");

		// 	importShipQoo10ProductInfo(rowArr,i);
		// }

	}else if(params["data"] == "ship_qoo10_ship"){

		// count = 0;

		// var fa = params["#importfile_ship_qoo10_ship"].split("\\");
		// var f = fa[fa.length-1];

		// var txt = file.readAllLines("upload/" + f).split("発注書発行日 : ");

		// for(var i = 1;i < txt.length;i ++){


		// 		var tablehtml = txt[i].substring(txt[i].indexOf("<table"), txt[i].indexOf("</table>")+8);

		// 		var orderno_start = "注文番号</td><td class='content'>";
		// 		var orderno_end = "</td>";
		// 		var orderno = getContent(tablehtml, orderno_start, orderno_end);

		// 		var buyername_start = "購入者名</td><td class='content'>";
		// 		var buyername_end = "</td>";
		// 		var buyername = getContent(tablehtml, buyername_start, buyername_end);

		// 		var buyertel_start = "購入者電話番号</td><td class='content'>&nbsp; /";
		// 		var buyertel_end = "</td>";
		// 		var buyertel = getContent(tablehtml, buyertel_start, buyertel_end);

		// 		var recievename_start = "受取人名</td><td class='content'>";
		// 		var recievename_end = "</td>";
		// 		var recievename = getContent(tablehtml, recievename_start, recievename_end);

		// 		var recievetel_start = "受取人電話番号</td><td class='content'>";
		// 		var recievetel_end = "</td>";
		// 		var recievetel = getContent(tablehtml, recievetel_start, recievetel_end);

		// 		var postno_start = "郵便番号</td><td class='content'>";
		// 		var postno_end = "</td>";
		// 		var postno = getContent(tablehtml, postno_start, postno_end);

		// 		var address_start = "住所</td><td style='width:760px;' colspan='3'>";
		// 		var address_end = "</td>";
		// 		var address = getContent(tablehtml, address_start, address_end);

		// 		var updateResult = db.change(
		// 			"UPLOAD",
		// 			"updateShipQoo10ShipInfo",
		// 			{
		// 				"orderno":orderno,
		// 				"col0":buyername,
		// 				"col1":recievename,
		// 				"col2":postno,
		// 				"col3":address,
		// 				"col4":recievetel,
		// 				"col5":recievetel
		// 			}
		// 		);
		// }

	}
	
	return ret.navigate("si_upload.jsp?shop=" + shopname);

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
