var displaymasterinfo={};
displaymasterinfo.name="发送情报检索";
displaymasterinfo.paramsFormat={
	"#product_name":null,
};

displaymasterinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}


	var pid = parseInt(params["#product_name"]);


	var selectResult = db.select(
		"SHIPACTINGMASTER",
		"searchShipMasterInfoBypno",
		{
			"pid":pid
		}
	).getArray();

	var t = "【管理番号】 " + selectResult[0]["pid"] +
	"【商品分类】" + selectResult[0]["productdiv"] +
	"【商品名称】" + selectResult[0]["productnamecn"] + " " + selectResult[0]["color"] + " " + selectResult[0]["size"] +
	"【数量】" + selectResult[0]["productcount"] +
	"【备考】" + selectResult[0]["biko"];

	var js9 = "$('#img').attr('src','" + selectResult[0]["pic"]+ "');$('#img').show();"

	var js10 = "$('#detailinfo').val('" + t + "');$('#showdetailbutton').show();"


	ret.eval(js9);
	ret.eval(js10);


	return ret;

};
