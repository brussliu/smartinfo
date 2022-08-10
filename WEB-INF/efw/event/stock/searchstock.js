var searchstock={};
searchstock.name="在庫一覧検索";
searchstock.paramsFormat={
	"#shop":null,
	"productdiv":null,
	"#productno":null,
	"#keyword":null,
	"displayflg2":null,

	"highsearch" : null,
	"#sellfrom" : null,
	"#sellto" : null,
	"#selldayfordelivery" : null,
	"#selldayforpurchase" : null,


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
	var displayflg2 = params["displayflg2"];

	var highsearch = params["highsearch"];
	var sellfrom = params["#sellfrom"];
	var sellto = params["#sellto"];
	var selldayford = params["#selldayfordelivery"];
	var selldayforp = params["#selldayforpurchase"];

	highsearch.debug("AAAAAAAAAAAA");
	sellfrom.debug("BBBBBBBBBBB");
	sellto.debug("CCCCCCCCCCC");
	selldayford.debug("DDDDDDDDDDDD");
	selldayforp.debug("EEEEEEEEEEEE");


	if(highsearch = "sellcount" && sellfrom == "" && sellto == ""){
		highsearch = "";
	}
	if(highsearch = "deliverycount" && selldayford == ""){
		highsearch = "";
	}
	if(highsearch = "purchasecount" && selldayforp == ""){
		highsearch = "";
	}

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
			keyword : keyword,
			highsearch : highsearch,
			sellfrom : sellfrom,
			sellto : sellto,
			selldayford : selldayford,
			selldayforp : selldayforp
		}
	).getArray();

	var subhtml = displayflg2 == "1" ? "" : "style='display: none;'";

	var resultHTML =
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
		"<td " + subhtml +      " class='display2'>{productname}</td>" +
		"<td style='width: 80px;' class='display3'>{fba}</td>" +
		"<td style='width: 80px;' class='display3'>{fbm}</td>" +
		"<td style='width: 80px;' class='display3'><input type='text' style='width: 50px;height: 28px;{displayflg}' value='{localstock}'></td>" +
		"<td style='width: 80px;' class='display3'>{onboard}</td>" +
		"<td style='width: 80px;' class='display3'>{stockonsell}</td>" +
		"<td style='width: 80px;' class='display3'>{stockprepare}</td>" +
		"<td style='width: 80px;' class='display3'>{stockall}</td>" +
		"<td style='width:150px;white-space:pre-wrap;' class='display4'>{selled1} / {selled7} / {selled30} / {selled60} / {selled90}</td>" +
		"<td style='width:100px;' class='display4'>{selledweek}</td>" +
		"<td style='width:100px;' class='display4'>{onsellweek}</td>" +
	"</tr>";

	ret.runat("#stocktable").remove("tr").append(resultHTML).withdata(selectResult);

	var script = "$('#stocklisthead').show();$('#stocklist').show();changeColor();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
