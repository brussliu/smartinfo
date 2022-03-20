var outputship={};
outputship.name="発送情報出力";
outputship.paramsFormat={
	"#shop":null,
	"shipno":null,
	"postno":null,
	"shipaddress":null,
	"receiver":null,
	"outputType":null
};

var shopname = "";
outputship.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var shipnoArr = params["shipno"];

	var postnoArr = params["postno"];
	var shipaddressArr = params["shipaddress"];
	var receiverArr = params["receiver"];

	var shipCount = shipnoArr.length;

	var contentArr = new Array();

	var outputType = params["outputType"];


	for(var i = 0; i < shipCount; i ++){

		// shipnoで検索
		var selectResult = db.select(
			"SHIP",
			"selectProductKindToCheck",
			{
				"col0":shipnoArr[i]
			}
		).getArray();

		// 発送商品に商品種別が不明な商品が存在するかを確認する
		if(selectResult.length > 0){

			ret.runat("#productkindtable").withdata(
				{
					".productkey": selectResult[0].productkey,
					".productname": selectResult[0].productname
				}
			);

			var script = "addproductkind();"

			return ret.eval(script);

		}else{

			var selectResult1 = db.select(
				"SHIP",
				"selectProductKind",
				{
					"col0":shipnoArr[i]
				}
			).getArray();

			contentArr.push( selectResult1[0].productkind );

		}

	}

	var selectProductResult = db.select(
		"SHIP",
		"searchShipProduct",
		{
		shop:shopname
		}
	).getArray();

	var excel = new Excel("templates/print_templates.xlsx");

	var tempFilePathName = file.getTempFileName();

	for(var i = 0; i < selectProductResult.length; i ++){

		excel.setCell("Product", "A" + (i+2), selectProductResult[i].productno);
		excel.setCell("Product", "B" + (i+2), selectProductResult[i].productdiv);
		excel.setCell("Product", "C" + (i+2), selectProductResult[i].sku);
		excel.setCell("Product", "D" + (i+2), selectProductResult[i].asin);
		excel.setCell("Product", "E" + (i+2), selectProductResult[i].label);
		excel.setCell("Product", "F" + (i+2), selectProductResult[i].productname);
		excel.setCell("Product", "G" + (i+2), selectProductResult[i].option1);
		excel.setCell("Product", "H" + (i+2), selectProductResult[i].option2);
		excel.setCell("Product", "I" + (i+2), selectProductResult[i].count);

	}


	outputType.debug("AAAAAAAAAAAAA");


	if(outputType == "new"){

		for(var i = 1; i <= shipCount; i ++){

			var postno = postnoArr[i];

			var standardAddressArr = getStandardAddress(shipaddressArr[i]);

			var receiver = receiverArr[i];
			if(receiver.substring(receiver.length-1) != "様"){
				receiver = receiver + "　様"
			}

			var content = contentArr[i];

			excel.setCell("SHIPLIST", "A" + i, "〒" + postno);

			excel.setCell("SHIPLIST", "B" + i, standardAddressArr[0]);

			excel.setCell("SHIPLIST", "C" + i, standardAddressArr[1]);

			excel.setCell("SHIPLIST", "D" + i, "");

			excel.setCell("SHIPLIST", "E" + i, receiver);

			excel.setCell("SHIPLIST", "F" + i, content);

		}

	}else{


		var pagekind = 6;

		var pageCount = Math.ceil( shipCount / pagekind ) ;
	
		var lastPageType = shipCount % pagekind;
		if(lastPageType == 0){
			lastPageType = pagekind;
		}
	
		for(var i = 0; i < shipCount; i ++){
	
	
			var postno = postnoArr[i];
	
			var standardAddressArr = getStandardAddress(shipaddressArr[i]);
	
			var receiver = receiverArr[i];
			if(receiver.substring(receiver.length-1) != "様"){
				receiver = receiver + "　様"
			}
	
			var content = contentArr[i];
	
			var addressno = i + 1;
			var page = Math.ceil( addressno / pagekind ) ;
			var position = addressno % pagekind;
			if(position == 0){
				position = pagekind;
			}
	
			var sheetName = "Address" + page;
	
			var copySheetName = "";
	
			if(page < pageCount){
				copySheetName = "TEMP" + pagekind + "_0" + pagekind;
			}else{
				copySheetName = "TEMP" + pagekind + "_0" + lastPageType;
			}
	
			if(position == 1){
				excel.createSheet(sheetName, copySheetName);
			}
	
			if(position == 1){
	
				// postno
				excel.setCell(sheetName, "F2", postno);
				// shipaddress
				excel.setCell(sheetName, "E3", standardAddressArr[0]);
				excel.setCell(sheetName, "E4", standardAddressArr[1]);
				// receiver
				excel.setCell(sheetName, "E6", receiver);
				// content
				excel.setCell(sheetName, "E10", content);
			}
	
			if(position == 2){
	
				// postno
				excel.setCell(sheetName, "X2", postno);
				// shipaddress
				excel.setCell(sheetName, "W3", standardAddressArr[0]);
				excel.setCell(sheetName, "W4", standardAddressArr[1]);
				// receiverArr
				excel.setCell(sheetName, "W6", receiver);
				// content
				excel.setCell(sheetName, "W10", content);
			}
	
			if(position == 3){
	
				// postno
				excel.setCell(sheetName, "F22", postno);
				// shipaddress
				excel.setCell(sheetName, "E23", standardAddressArr[0]);
				excel.setCell(sheetName, "E24", standardAddressArr[1]);
				// receiverArr
				excel.setCell(sheetName, "E26", receiver);
				// content
				excel.setCell(sheetName, "E30", content);
			}
	
			if(position == 4){
	
				// postno
				excel.setCell(sheetName, "X22", postno);
				// shipaddress
				excel.setCell(sheetName, "W23", standardAddressArr[0]);
				excel.setCell(sheetName, "W24", standardAddressArr[1]);
				// receiverArr
				excel.setCell(sheetName, "W26", receiver);
				// content
				excel.setCell(sheetName, "W30", content);
			}
	
			if(position == 5){
	
				// postno
				excel.setCell(sheetName, "F42", postno);
				// shipaddress
				excel.setCell(sheetName, "E43", standardAddressArr[0]);
				excel.setCell(sheetName, "E44", standardAddressArr[1]);
				// receiverArr
				excel.setCell(sheetName, "E46", receiver);
				// content
				excel.setCell(sheetName, "E50", content);
			}
	
			if(position == 6){
	
				// postno
				excel.setCell(sheetName, "X42", postno);
				// shipaddress
				excel.setCell(sheetName, "W43", standardAddressArr[0]);
				excel.setCell(sheetName, "W44", standardAddressArr[1]);
				// receiverArr
				excel.setCell(sheetName, "W46", receiver);
				// content
				excel.setCell(sheetName, "W50", content);
			}
	
	
		}


	}


	// var sheetArr = excel.getSheetNames();

	// sheetArr.debug("HHHHHHHHHHHHHHHH");

	// for(var k = 0;k < sheetArr.length;k ++){

	// 	if(sheetArr[k].indexOf("TEMP") >= 0){

	// 		excel.hideSheet(sheetArr[k]);

	// 	}

	// }


	excel.setActiveSheet("Product").save(tempFilePathName);

	ret.attach(tempFilePathName)
	.saveas("発送情報_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();

	return ret;

};
