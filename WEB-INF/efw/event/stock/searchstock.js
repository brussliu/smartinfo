var searchstock={};
searchstock.name="在庫一覧検索";
searchstock.paramsFormat={
	"#shop":null,
	"productdiv":null,
	"#productno":null,
	"#keyword":null,



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
	var keyword = params["#keyword"].toUpperCase();

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
			keyword : keyword
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
				"<td style='width:120px;' class='display1'>{productdiv}</td>" +
				"<td style='width:80px;' class='display1'>{productno}</td>" +
				"<td style='width:60px;'  class='display1'>{productkinds}</td>" +
				"<td style='width:100px;' class='display1'>{color}</td>" +
				"<td style='width:120px;word-break:break-all;' class='display1'>{size}</td>" +
				"<td style='width:110px;' class='display1'>{sku}</td>" +
				"<td style='width:100px;' class='display1'>{asin}</td>" +
				"<td style='width:100px;' class='display1'>{label}</td>" +
				"<td                      class='display2'>{productname}</td>" +
				"<td style='width: 80px;' class='display3'>{fba}</td>" +
				"<td style='width: 80px;' class='display3'>{fbm}</td>" +
				"<td style='width: 80px;' class='display3'>{localstock}</td>" +
				"<td style='width: 80px;' class='display3'>{onboard}</td>" +
				"<td style='width: 80px;' class='display3'>{stockonsell}</td>" +
				"<td style='width: 80px;' class='display3'>{stockprepare}</td>" +
				"<td style='width: 80px;' class='display3'>{stockall}</td>" +
				"<td style='width:150px;white-space:pre-wrap;' class='display4'>{selled1} / {selled7} / {selled30} / {selled60} / {selled90}</td>" +
				"<td style='width:100px;' class='display4'>{selledweek}</td>" +
				"<td style='width:100px;' class='display4'>{onsellweek}</td>" +
			"</tr>";


		ret.runat("#stocktable").append(resultHTML).withdata(data);

	}

	var script = "$('#stocklist').show();displayResult();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
