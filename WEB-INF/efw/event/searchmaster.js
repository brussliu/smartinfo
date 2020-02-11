var searchmaster={};
searchmaster.name="マスタ一覧検索";
searchmaster.paramsFormat={
	"#shop":null
};
var shopname = "";
searchmaster.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var oyahtml = 
	"<tr style='background-color:rgb(205,255,255)'>" +
		"<td style='width: 150px; font-size: 16px;' rowspan='{subq}'>{productno}&nbsp;&nbsp;&nbsp;<input type='button' style='width:50px;' value='削除' onclick=\"delMaster('{productno}')\"></td>" +
		"<td style='width: 150px; font-size: 16px;' rowspan='{subq}'>{productdiv}</td>" +
		"<td style='width: 150px; font-size: 16px;' rowspan='{subq}'>{sku}</td>" +
		"<td style='width: 150px; font-size: 16px;' rowspan='{subq}'>{asin}</td>" +
		"<td style='font-size: 16px;' rowspan='{subq}'>{productname}</td>" +
		"<td style='width: 150px; font-size: 16px;'>{subsku}</td>" +
		"<td style='width: 150px; font-size: 16px;'>{sukuasin}</td>" +
	"</tr>";

	var subhtml = 
	"<tr>" +
		"<td style='width: 150px; font-size: 16px;background-color:rgb(205,255,255);'>{subsku}</td>" +
		"<td style='width: 150px; font-size: 16px;background-color:rgb(205,255,255);'>{subasin}</td>" +
	"</tr>";

	var selectResult1 = db.select(
		"MASTER",
		"selectmasterlist1",
		{shop:shopname}
	).getArray();

	var selectResult2 = db.select(
		"MASTER",
		"selectmasterlist2",
		{shop:shopname}
	);

	for(var i = 0;i < selectResult1.length;i ++){

		var list1 = new Array(selectResult1[i]);
		ret.runat("#producttable").append(oyahtml).withdata(list1);

		var productno = selectResult1[i]["productno"];
		var list2 = selectResult2.seek("productno","eq",productno).getArray();
		ret.runat("#producttable").append(subhtml).withdata(list2);


	}


	var subhtml2 = 
	"<tr style='background-color:rgb(255,205,255)'>" +
		"<td colspan='5' style='font-size: 16px;'>{productname}</td>" +
		"<td style='width: 150px; font-size: 16px;'>{sku}</td>" +
		"<td style='width: 150px; font-size: 16px;'>{asin}</td>" +
	"</tr>";
	var selectResult3 = db.select(
		"MASTER",
		"selectmasterlist3",
		{shop:shopname}
	).getArray();
	ret.runat("#producttable").append(subhtml2).withdata(selectResult3);


	// 画面へ結果を返す
	return ret;

};
