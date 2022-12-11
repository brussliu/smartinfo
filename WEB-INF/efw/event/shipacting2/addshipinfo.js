var addshipinfo={};
addshipinfo.name="发送请求录入";
addshipinfo.paramsFormat={};
addshipinfo.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var html = "<option class='c' value='{pid}'>{productnamecn}&nbsp;{color}&nbsp;{size}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;剩余{productcount}个</option>";

	var selectResult = db.select(
		"SHIPACTINGMASTER",
		"selectProductMst",
		{}
	).getArray();

	ret.runat("#product_name").remove(".c").append(html).withdata(selectResult);

	var js0 = "$('#txt_shipno').val('');";
	var js1 = "$('#txt_postno').val('');";
	var js2 = "$('#txt_address1').val('');";
	var js3 = "$('#txt_address2').val('');";
	var js4 = "$('#txt_address3').val('');";
	var js5 = "$('#txt_biko').val('');";

	var js6 = "$('#product_name').each(function(){$(this).find('option').eq(0).prop('selected',true)});";

	var js7 = "$('#product_count').val('');";

	//var js7 = "$('#product_count').each(function(){$(this).find('option').eq(0).prop('selected',true)});";

	var js8 = "$('#txt_name').val('');";
	var js9 = "$('#txt_tel').val('');";

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

	ret.eval("$('#cancelbutton').hide()");
	ret.eval("$('#savebutton').html('保存')");

	return ret.eval("shipacting_inputdialog2.dialog('open')");

};
