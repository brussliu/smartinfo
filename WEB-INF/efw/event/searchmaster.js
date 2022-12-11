var searchmaster={};
searchmaster.name="マスタ一覧検索";
searchmaster.paramsFormat={

};

searchmaster.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var oyahtml = 
	"<tr style='background-color:rgb(205,255,255)'>" +
		"<td style='width: 150px; font-size: 14px;' rowspan='{subq}'>{productno}&nbsp;&nbsp;&nbsp;<input type='button' style='width:50px;' value='削除' onclick=\"delMaster('{productno}')\"></td>" +
		"<td style='width: 150px; font-size: 14px;' rowspan='{subq}'>{productdiv}</td>" +
		"<td style='width: 150px; font-size: 14px;' rowspan='{subq}'>{sku}</td>" +
		"<td style='width: 150px; font-size: 14px;' rowspan='{subq}'>{asin}</td>" +
		"<td style='font-size: 14px;' rowspan='{subq}'>{productname}</td>" +
		"<td style='width: 160px; font-size: 14px;' rowspan='{subcq}'><img src='{productpic}' width='150px;'/></td>" +
		"<td style='width: 150px; font-size: 14px;' rowspan='{subcq}'>{subcolor}</td>" +
		"<td style='width: 150px; font-size: 14px;'>{subsize}</td>" +
		"<td style='width: 150px; font-size: 14px;'>{subsku}</td>" +
		"<td style='width: 150px; font-size: 14px;'>{sukuasin}</td>" +
	"</tr>";

	var subhtml = 
	"<tr>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsize}</td>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsku}</td>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subasin}</td>" +
	"</tr>";

	var subhtml2 = 
	"<tr style='background-color:rgb(255,205,255)'>" +
	"<td style='width: 160px; font-size: 14px;background-color:rgb(205,255,255);' rowspan='{subcq}'><img src='{productpic}' width='150px;'></td>" +
	"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);' rowspan='{subcq}'>{subcolor}</td>" +
	"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsize}</td>" +
	"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsku}</td>" +
	"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subasin}</td>" +
	"</tr>";

	var subhtml3 = 
	"<tr>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsize}</td>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subsku}</td>" +
		"<td style='width: 150px; font-size: 14px;background-color:rgb(205,255,255);'>{subasin}</td>" +
	"</tr>";

	var selectResult1 = db.select(
		"MASTER",
		"selectmasterlist1",
		{shop:getShopId()}
	).getArray();

	var selectResult2 = db.select(
		"MASTER",
		"selectmasterlist2",
		{shop:getShopId()}
	);

	var selectResult3 = db.select(
		"MASTER",
		"selectmasterlist3",
		{shop:getShopId()}
	);


	for(var i = 0;i < selectResult1.length;i ++){

		var list1 = new Array(selectResult1[i]);
		ret.runat("#producttable").append(oyahtml).withdata(list1);

		var productno = selectResult1[i]["productno"];
		var list2 = selectResult2.seek("productno","eq",productno).getArray();
		ret.runat("#producttable").append(subhtml).withdata(list2);

		var list3 = selectResult3.seek("productno","eq",productno).seek("subsort","eq","1").getArray();

		for(var j = 0;j < list3.length; j++){

			var list4 = new Array(list3[j]);
			ret.runat("#producttable").append(subhtml2).withdata(list4);

			var color = list3[j]["subcolor"];
			var list5 = selectResult3.seek("productno","eq",productno).seek("subcolor","eq",color).seek("subsort","gt","1").getArray();
			ret.runat("#producttable").append(subhtml3).withdata(list5);

		}

	}




	var subhtml4 = 
	"<tr style='background-color:rgb(255,205,255)'>" +
		"<td colspan='8' style='font-size: 14px;'>{productname}</td>" +
		"<td style='width: 150px; font-size: 14px;'>{sku}</td>" +
		"<td style='width: 150px; font-size: 14px;'>{asin}</td>" +
	"</tr>";
	var selectResult4 = db.select(
		"MASTER",
		"selectmasterlist4",
		{shop:getShopId()}
	).getArray();
	ret.runat("#producttable").append(subhtml4).withdata(selectResult4);

	var title = "マスタ情報一覧（" + getShopId() + "）";
	var script = "initTitle('" + title +"')";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
