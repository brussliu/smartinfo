var updateshipinfo={};
updateshipinfo.name="发送请求更新";
updateshipinfo.paramsFormat={

	"shipno":null,
};
updateshipinfo.fire=function(params){

	var ret = new Result();

	var shipno = params["shipno"];

	var html = "<option id='{pid}'>{namecn}</option>";

	var selectResult = db.select(
		"MASTER",
		"selectProductMst",
		{}
	).getArray();

	ret.runat("#product_name").remove("option").append(html).withdata(selectResult);

	var selectResult = db.select(
		"SHIP",
		"searchShipInfoByShipno",
		{
			"shipno":shipno
		}
	).getArray();

	var status = selectResult[0]["status"];

	var js0 = "$('#txt_shipno').val('"+(selectResult[0]["shipno"]==null?'':selectResult[0]["shipno"])+"');";

	var js1 = "$('#txt_postno').val('"+(selectResult[0]["postno"]==null?'':selectResult[0]["postno"])+"');";

	var js2 = "$('#txt_address1').val('"+(selectResult[0]["address1"]==null?'':selectResult[0]["address1"])+"');";
	var js3 = "$('#txt_address2').val('"+(selectResult[0]["address2"]==null?'':selectResult[0]["address2"])+"');";
	var js4 = "$('#txt_address3').val('"+(selectResult[0]["address3"]==null?'':selectResult[0]["address3"])+"');";

	var js5 = "$('#txt_biko').val('"+(selectResult[0]["biko"]==null?'':selectResult[0]["biko"])+"');";

	var js6 = "$('#product_name').find(\"option:contains('" + selectResult[0]["shipcontent"] + "')\").attr('selected',true);";
	var js7 = "$('#product_count').find(\"option:contains('" + selectResult[0]["shipcount"] + "')\").attr('selected',true);";

	var js8 = "$('#ship_div').find(\"option:contains('" + selectResult[0]["shipdiv"] + "')\").attr('selected',true);";
	var js9 = "$('#txt_fee').val('"+(selectResult[0]["fee"]==null?'':selectResult[0]["fee"])+"');";
	var js10= "$('#txt_trackingno').val('"+(selectResult[0]["trackingno"]==null?'':selectResult[0]["trackingno"])+"');";
	var js11= "$('#txt_amount').val('"+(selectResult[0]["amount"]==null?'':selectResult[0]["amount"])+"');";

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
	ret.eval(js10);
	ret.eval(js11);
	var js12 = ""
	if(status == 0 || status == "0"){
		js12 = 
		"$('#cancelbutton').show()" +
		"$('#acceptbutton').show()" +
		"$('#sendbutton').hide()" +
		"$('#paybutton').hide()";
	}else if(status == 5 || status == "5"){
		js12 = 
		"$('#cancelbutton').show()" +
		"$('#acceptbutton').hide()" +
		"$('#sendbutton').show()" +
		"$('#paybutton').hide()";
		
	}else if(status == 8 || status == "8"){
		js12 = 
		"$('#cancelbutton').hide()" +
		"$('#acceptbutton').hide()" +
		"$('#sendbutton').hide()" +
		"$('#paybutton').show()";
	}
	ret.eval(js12);

	return ret.eval("shipinfo_inputdialog.dialog('open')");

};
