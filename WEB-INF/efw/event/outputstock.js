var outputstock={};
outputstock.name="在庫補足";
outputstock.paramsFormat={

	"#shop":null,
	"#basedate_order_hidden":null,
	"#basedate_stock_hidden":null,
	"productdiv":null

	// 'addproductno': null,
	// 'addproductlabel': null,
	// 'addproductcount': null

};
var shopname = "";
outputstock.fire=function(params){
	
	shopname = params["#shop"];

	var pdArr = params["productdiv"];

	var productdivstr1 = "";
	var productdivstr2 = "";
	var productdivstr3 = "";
	var productdivstr4 = "";
	var productdivstr5 = "";
	var productdivstr6 = "";

	if(pdArr.length > 0){
		productdivstr1 = pdArr[0];
	}
	if(pdArr.length > 1){
		productdivstr2 = pdArr[1];
	}
	if(pdArr.length > 2){
		productdivstr3 = pdArr[2];
	}
	if(pdArr.length > 3){
		productdivstr4 = pdArr[3];
	}
	if(pdArr.length > 4){
		productdivstr5 = pdArr[4];
	}
	if(pdArr.length > 5){
		productdivstr6 = pdArr[5];
	}

	var selectResult = db.select(
		"STOCK",
		"selectstock",
		{
		shop:shopname,
		basedate_order:params["#basedate_order_hidden"],
		productdiv1:productdivstr1,
		productdiv2:productdivstr2,
		productdiv3:productdivstr3,
		productdiv4:productdivstr4,
		productdiv5:productdivstr5,
		productdiv6:productdivstr6
		}
	).getArray();


	// テンプレートにより、EXCELオブジェクトを作成する
	var excel=new Excel("templates/output_stock.xlsx");

	var tempFilePathName=file.getTempFileName();

	// var newSheetName = "在庫補足_" + (new Date()).format("yyyyMMdd");
	// excel.createSheet(newSheetName, "temp_1");


	var labelY_from = 4;
	var labelY_to = 48;
	var labelX = ["F","G","H","I","J","K"];

	var writeStockX = ["L","M","N","O","P","Q"];

	var writeSell30X = ["L","M","N","O","P","Q"];
	var writeSell90X = ["R","S","T","U","V","W"];
	var writeSellWeekX = ["X","Y","Z","AA","AB","AC"];

	for(var i = 0;i < selectResult.length;i ++){

		var productno = selectResult[i]["productno"];
		var labelno = selectResult[i]["label"];
		var fba = selectResult[i]["fba"];
		var selled30 = selectResult[i]["selled30"];
		var selled90 = selectResult[i]["selled90"];selledweek
		var selledweek = selectResult[i]["selledweek"];


		if(productno.substring(0,1) == "T" || productno.substring(0,1) == "P"){
			// 在庫情報シート
			for(var x = 0;x < labelX.length;x ++){
				for(var y = labelY_from;y <= labelY_to;y ++){

					var excellabelno = excel.getValue("在庫情報", labelX[x] + y);
					if(excellabelno == null){
						continue;
					}
					if(excellabelno == labelno){

						excel.setCell("在庫情報", writeStockX[x]+y, fba);

						excel.setCell("販売予測", writeSell30X[x]+y, selled30);

						excel.setCell("販売予測", writeSell90X[x]+y, selled90);

						excel.setCell("販売予測", writeSellWeekX[x]+y, selledweek);

					}

				}
			}
		}



	}



	// for(var i = 0;i < params["addproductno"].length;i ++){

	// 	var productno = params["addproductno"][i];
	// 	var labelno = params["addproductlabel"][i];
	// 	var addcount = params["addproductcount"][i];

	// 	for(var x = 0;x < shapeX.length;x ++){

	// 		for(var y = shapeY_from;y <= shapeY_to;y ++){

	// 			var excellabelno = excel.getValue("temp_1", shapeX[x] + y);

	// 			if(excellabelno == null){
	// 				continue;
	// 			}
	// 			//excellabelno.debug("NNNNNNNNNNNNN");

	// 			if(excel.getValue("temp_1", shapeX[x] + y) == labelno){

	// 				excel.setCell(newSheetName, writeX[x]+y, addcount);

	// 			}
	// 		}
	// 	}
	// }



	excel.setActiveSheet("在庫情報").save(tempFilePathName);


	var ret = new Result();



	ret.attach(tempFilePathName)
	.saveas("在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();

	return (ret);


};
