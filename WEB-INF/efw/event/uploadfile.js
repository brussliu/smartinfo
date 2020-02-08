var uploadfile={};
uploadfile.name="ファイルアップロード";
uploadfile.paramsFormat={
	"#importfile_product":null,
	"#importfile_fba":null,
	"#importfile_order":null,
	"data":null,
};
uploadfile.fire=function(params){

	file.saveUploadFiles("upload");



	if(params["data"] == "product"){

		var fa = params["#importfile_product"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件削除
		var delResult = db.change(
			"UPLOAD",
			"delAllProduct",
			{}
		);

		// データ全件導入
		csvReader.loopAllLines(importProductInfo);

	}else if(params["data"] == "fba"){

		var fa = params["#importfile_fba"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t");

		// データ全件削除
		var delResult = db.change(
			"UPLOAD",
			"delAllFba",
			{}
		);

		// データ全件導入
		csvReader.loopAllLines(importFbaInfo);

	}else if(params["data"] == "order"){

		var fa = params["#importfile_order"].split("\\");
		var f = fa[fa.length-1];


		var csvReader = new CSVReader("upload/" + f, "\t", "\"", "MS932");

		// // データ全件削除
		// var delResult = db.change(
		// 	"UPLOAD",
		// 	"delAllOrder",
		// 	{}
		// );

		// データ全件導入
		csvReader.loopAllLines(importOrderInfo);

	}
	
	return (new Result());

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
				"col21":aryField[21]
			}
		);

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
				"col5":aryField[5]
			}
		);

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
				"col2":aryField[2]
			}
		).getArray();

		if(selectResult[0].count > 0){

			var insertResult = db.change(
				"UPLOAD",
				"delOrder",
				{
					"col0":aryField[0],
					"col1":aryField[1],
					"col2":aryField[2]
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
				"col28":aryField[28]
			}
		);


	}

};