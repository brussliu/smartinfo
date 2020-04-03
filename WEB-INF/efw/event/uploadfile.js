var uploadfile={};
uploadfile.name="ファイルアップロード";
uploadfile.paramsFormat={
	"#importfile_product":null,
	"#importfile_fba":null,
	"#importfile_order":null,
	"#importfile_localstock":null,
	"data":null,
	"#shop":null
};
var shopname = "";
var count = 0;
uploadfile.fire=function(params){

	file.saveUploadFiles("upload");

	shopname = params["#shop"];

	if(params["data"] == "product"){

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

		var R_labelX = ["F","G","H","I","J","K"];
		var R_localStockX = ["X","Y","Z","AA","AB","AC"];

		var R_labelY_from = 4;
		var R_labelY_to = 48;

		for(var x = 0;x < R_labelX.length;x ++){

			for(var y = R_labelY_from;y <= R_labelY_to;y ++){

				var label = excelXSSF.getValue("在庫情報R", R_labelX[x] + y);

				if(label != null && label.length > 0){

					var localstock = excelXSSF.getValue("在庫情報R", R_localStockX[x] + y);

					if(localstock == null || localstock.length == 0){
						localstock = "0";
					}

					var updateResult = db.change(
						"UPLOAD",
						"updateLocalstock",
						{
							"localstock":localstock,
							"label":label
						}
					);

					count = count + 1;
				}

			}
		}

		var W_labelX = "L";
		var W_localStockX = "O";
		var W_labelY_from = 4;
		var W_labelY_to = 116;

		for(var y = W_labelY_from;y <= W_labelY_to;y++){

			var label = excelXSSF.getValue("在庫情報W", W_labelX + y);

			if(label != null && label.length > 0){

				var localstock = excelXSSF.getValue("在庫情報W", W_localStockX + y);

				if(localstock == null || localstock.length == 0){
					localstock = "0";
				}

				var updateResult = db.change(
					"UPLOAD",
					"updateLocalstock",
					{
						"localstock":localstock,
						"label":label
					}
				);

				count = count + 1;

			}

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
	
	return (new Result().navigate("si_upload.jsp?shop=" + shopname));
	//navigate(params["page"] + "?shop=" + params["shop"]);

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