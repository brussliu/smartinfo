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


	var R_labelY_from = 4;
	var R_labelY_to = 48;
	var R_labelX = ["F","G","H","I","J","K"];

	var R_writeStockX = ["L","M","N","O","P","Q"];
	var R_writeLocalStockX = ["X","Y","Z","AA","AB","AC"];

	var R_writeSell7X = ["AD","AE","AF","AG","AH","AI"];
	var R_writeSell30X = ["AJ","AK","AL","AM","AN","AO"];
	var R_writeSell60X = ["AP","AQ","AR","AS","AT","AU"];
	var R_writeSell90X = ["AV","AW","AX","AY","AZ","BA"];
	var R_writeSellWeekX = ["BB","BC","BD","BE","BF","BG"];

	var W_labelY_from = 4;
	var W_labelY_to = 116;
	var W_labelX = "L";

	var W_writeStockX = "M";
	var W_writeLocalStockX = "N";

	var W_writeSell7X = "O";
	var W_writeSell30X = "P";
	var W_writeSell60X = "Q";
	var W_writeSell90X = "R";
	var W_writeSellWeekX = "S";

	for(var i = 0;i < selectResult.length;i ++){

		var productno = selectResult[i]["productno"];
		var labelno = selectResult[i]["label"];
		var localstock = selectResult[i]["localstock"];
		var fba = selectResult[i]["fba"];
		var selled7 = selectResult[i]["selled7"];
		var selled30 = selectResult[i]["selled30"];
		var selled60 = selectResult[i]["selled60"];
		var selled90 = selectResult[i]["selled90"];
		var selledweek = selectResult[i]["selledweek"];


		if(productno.substring(0,1) == "T" || productno.substring(0,1) == "P"){
			// 在庫情報シート
			for(var x = 0;x < R_labelX.length;x ++){
				for(var y = R_labelY_from;y <= R_labelY_to;y ++){

					var excellabelno = excel.getValue("在庫情報R", R_labelX[x] + y);
					if(excellabelno == null){
						continue;
					}
					if(excellabelno == labelno){

						excel.setCell("在庫情報R", R_writeStockX[x]+y, fba);

						excel.setCell("在庫情報R", R_writeLocalStockX[x]+y, localstock);

						excel.setCell("在庫情報R", R_writeSell7X[x]+y, selled7);

						excel.setCell("在庫情報R", R_writeSell30X[x]+y, selled30);

						excel.setCell("在庫情報R", R_writeSell60X[x]+y, selled60);

						excel.setCell("在庫情報R", R_writeSell90X[x]+y, selled90);

						excel.setCell("在庫情報R", R_writeSellWeekX[x]+y, selledweek);

					}

				}
			}
		}
		if(productno.substring(0,1) == "W"){

			for(var y = W_labelY_from;y <= W_labelY_to;y ++){

					var excellabelno = excel.getValue("在庫情報W", W_labelX + y);

					if(excellabelno == null){
						continue;
					}
					if(excellabelno == labelno){

						excel.setCell("在庫情報W", W_writeStockX+y, fba);

						excel.setCell("在庫情報W", W_writeLocalStockX+y, localstock);

						excel.setCell("在庫情報W", W_writeSell7X+y, selled7);

						excel.setCell("在庫情報W", W_writeSell30X+y, selled30);

						excel.setCell("在庫情報W", W_writeSell60X+y, selled60);

						excel.setCell("在庫情報W", W_writeSell90X+y, selled90);

						excel.setCell("在庫情報W", W_writeSellWeekX+y, selledweek);

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



	excel.setActiveSheet("在庫情報R").save(tempFilePathName);


	var ret = new Result();



	ret.attach(tempFilePathName)
	.saveas("在庫補足_" + (new Date()).format("yyyyMMdd")+".xlsx")
	.deleteAfterDownload();

	return (ret);


};