var searchscanlist={};
searchscanlist.name="スキャン";
searchscanlist.paramsFormat={

};
searchscanlist.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var selectResult = db.select(
		"SCAN",
		"searchallscanlist",
		{
		}
	).getArray();

	var resultHTML = 
	"<tr class='content'>" +
	"	<td><input type='radio' name='' onclick='openScanlist(this)'></td>" +
	"	<td>{listno}</td>" +
	"	<td>{listname}</td>" +
	"</tr>" +
	"<tr class='content'>" +
	"	<td colspan='3'>{listcontent}</td>" +
	"</tr>";

	ret.runat("#scanlisttable").remove(".content");

	ret.runat("#scanlisttable").append(resultHTML).withdata(selectResult);


	var title = "商品スキャン（" + getShopId() + "）";
	var script = "initTitle('" + title +"')";
	ret.eval(script);


	return ret;


};
