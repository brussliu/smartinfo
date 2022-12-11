var updateshipinfo={};
updateshipinfo.name="发送请求更新";
updateshipinfo.paramsFormat={

	"shipno":null,
};
updateshipinfo.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}


	var shipno = params["shipno"];

	var html = "<option class='c' value='{pid}'>{productnamecn}&nbsp;{color}&nbsp;{size}</option>";

	var selectResult = db.select(
		"SHIPACTINGMASTER",
		"selectProductMst",
		{}
	).getArray();

	ret.runat("#product_name").remove(".c").append(html).withdata(selectResult);

	var selectResult = db.select(
		"SHIPACTING",
		"searchShipInfoByShipno",
		{
			"shipno":shipno
		}
	).getArray();

	var js0 = "$('#txt_shipno').val('"+(selectResult[0]["shipno"]==null?'':selectResult[0]["shipno"])+"');";

	var js1 = "$('#txt_postno').val('"+(selectResult[0]["postno"]==null?'':selectResult[0]["postno"])+"');";

	var js2 = "$('#txt_address1').val('"+(selectResult[0]["address1"]==null?'':selectResult[0]["address1"])+"');";
	var js3 = "$('#txt_address2').val('"+(selectResult[0]["address2"]==null?'':selectResult[0]["address2"])+"');";
	var js4 = "$('#txt_address3').val('"+(selectResult[0]["address3"]==null?'':selectResult[0]["address3"])+"');";

	var js5 = "$('#txt_biko').val('"+(selectResult[0]["biko"]==null?'':selectResult[0]["biko"])+"');";

	//var js6 = "$('#product_name').find(\"option:contains('" + selectResult[0]["shipcontent"] + "')\").attr('selected',true);";
	var js6 = "$('#product_name').val('"+(selectResult[0]["shipcontent"]==null?'':selectResult[0]["shipcontent"])+"');";

	//var js7 = "$('#product_count').find(\"option:contains('" + selectResult[0]["shipcount"] + "')\").attr('selected',true);";

	var js7 = "$('#product_count').val('"+(selectResult[0]["shipcount"]==null?'':selectResult[0]["shipcount"])+"');";

	var js8 = "$('#txt_name').val('"+(selectResult[0]["name"]==null?'':selectResult[0]["name"])+"');";
	var js9 = "$('#txt_tel').val('"+(selectResult[0]["tel"]==null?'':selectResult[0]["tel"])+"');";

	ret.eval(js0);
	ret.eval(js1);
	ret.eval(js2);
	ret.eval(js3);
	ret.eval(js4);
	ret.eval(js5);
	ret.eval(js6);
	ret.eval(js7);
	ret.eval(js8);
	ret.eval(js9);

	ret.eval("$('#cancelbutton').show()");
	ret.eval("$('#savebutton').html('更新')");


	var selectResult = db.select(
		"SHIPACTINGMASTER",
		"searchShipMasterInfoBypno",
		{
			"pid":parseInt(selectResult[0]["shipcontent"])
		}
	).getArray();

	var t = "【管理番号】 " + selectResult[0]["pid"] +
	"【商品分类】" + selectResult[0]["productdiv"] +
	"【商品名称】" + selectResult[0]["productnamecn"] + " " + selectResult[0]["color"] + " " + selectResult[0]["size"] +
	"【数量】" + selectResult[0]["productcount"] +
	"【备考】" + selectResult[0]["biko"];

	var js10 = "$('#img').attr('src','" + selectResult[0]["pic"]+ "');$('#img').show();"

	var js11 = "$('#detailinfo').val('" + t + "');$('#showdetailbutton').show();"


	ret.eval(js10);
	ret.eval(js11);



	return ret.eval("shipacting_inputdialog2.dialog('open')");

};
