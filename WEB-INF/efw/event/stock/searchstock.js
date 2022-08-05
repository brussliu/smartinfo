var searchstock={};
searchstock.name="在庫一覧検索";
searchstock.paramsFormat={
	"#shop":null,
	"productdiv":null,
	"#productno":null,
	"#productname":null,



};
var shopname = "";
searchstock.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var pdArr = params["productdiv"];

	var productdivstr1 = "";
	var productdivstr2 = "";
	var productdivstr3 = "";
	var productdivstr4 = "";
	var productdivstr5 = "";
	var productdivstr6 = "";
	var productdivstr7 = "";
	var productdivstr8 = "";

	if(pdArr.length > 0){	productdivstr1 = pdArr[0];	}
	if(pdArr.length > 1){	productdivstr2 = pdArr[1];	}
	if(pdArr.length > 2){	productdivstr3 = pdArr[2];	}
	if(pdArr.length > 3){	productdivstr4 = pdArr[3];	}
	if(pdArr.length > 4){	productdivstr5 = pdArr[4];	}
	if(pdArr.length > 5){	productdivstr6 = pdArr[5];	}
	if(pdArr.length > 6){	productdivstr7 = pdArr[6];	}
	if(pdArr.length > 7){	productdivstr8 = pdArr[7];	}

	var productno = params["#productno"];
	var productname = params["#productname"].toUpperCase();

	var selectResult = db.select(
		"STOCK",
		"selectstock",
		{
			shop : shopname,
			productdivstr1 : productdivstr1,
			productdivstr2 : productdivstr2,
			productdivstr3 : productdivstr3,
			productdivstr4 : productdivstr4,
			productdivstr5 : productdivstr5,
			productdivstr6 : productdivstr6,
			productdivstr7 : productdivstr7,
			productdivstr8 : productdivstr8,
			productno : productno,
			productname : productname
		}
	).getArray();

	ret.runat("#stocktable").remove("tr");

	for(var i = 0;i < selectResult.length;i ++){

		var data = new Array(selectResult[i]);

		var resultHTML = "";
		var colorHTML = "";
		//var picHTML = "";



		if(selectResult[i]["productdiv"] == "親商品"){

			colorHTML = "<td style='width:100px;'>{color}</td>";
			//picHTML = "<td style='width:100px;'></td>";

		}else if(selectResult[i]["sizeindex"] == 1){

			colorHTML = "<td style='width:100px;' rowspan='{subcq}'>{color}</td>";
			//picHTML = "<td style='width:100px;' rowspan='{subcq}'><img src='{productpic}' width='100px;'/></td>";

		}else{
			
		}

		resultHTML =
			"<tr style='background-color: rgb(205,255,255);height:42px;'>" +
				"<td style='width: 50px;'><input type='checkbox'></td>" +
				"<td style='width:120px;'>{productdiv}</td>" +
				"<td style='width:100px;'>{productno}</td>" +
				"<td style='width:70px;'>{productkinds}</td>" +
				//picHTML +
				"<td style='width:100px;'>{color}</td>" +
				//colorHTML +
				"<td style='width:150px;'>{size}</td>" +
				"<td style='width:120px;' class='moreinfo'>{sku}</td>" +
				"<td style='width:120px;' class='moreinfo'>{asin}</td>" +
				"<td style='width:120px;' class='moreinfo'>{label}</td>" +
				"<td style=''             class='moreinfo'>{productname}</td>" +
				"<td style='width: 80px;'>{fba}</td>" +
				"<td style='width: 80px;'>{fbm}</td>" +
				"<td style='width: 80px;'>{localstock}</td>" +
				"<td style='width: 80px;'>{onboard}</td>" +
				"<td style='width: 80px;'>{stockonsell}</td>" +
				"<td style='width: 80px;'>{stockprepare}</td>" +
				"<td style='width: 80px;'>{stockall}</td>" +
				"<td style='width:100px;'>{selled1}</td>" +
				"<td style='width:100px;'>{selled7}</td>" +
				"<td style='width:100px;'>{selled30}</td>" +
				"<td style='width:100px;'>{selled60}</td>" +
				"<td style='width:100px;'>{selled90}</td>" +
				"<td style='width:100px;'>{selledweek}</td>" +
				"<td style='width:100px;'>{onsellweek}</td>" +
			"</tr>";


		ret.runat("#stocktable").append(resultHTML).withdata(data);

	}

	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
