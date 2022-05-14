var updateshipmasterinfo={};
updateshipmasterinfo.name="発送商品マスタ更新";
updateshipmasterinfo.paramsFormat={

	"shipmasterno":null,
};
updateshipmasterinfo.fire=function(params){

	var ret = new Result();

	var shipmasterno = parseInt(params["shipmasterno"]);

	var selectResult = db.select(
		"MASTER",
		"searchShipMasterInfoBypno",
		{
			"pid":shipmasterno
		}
	).getArray();

	var js0 = "$('#productid').val('"+(selectResult[0]["pid"]==null?'':selectResult[0]["pid"])+"');";

	var js1 = "$('#color').val('"+(selectResult[0]["color"]==null?'':selectResult[0]["color"])+"');";
	var js2 = "$('#size').val('"+(selectResult[0]["size"]==null?'':selectResult[0]["size"])+"');";

	var js3 = "$('#productnamejp').val('"+(selectResult[0]["productnamejp"]==null?'':selectResult[0]["productnamejp"])+"');";
	var js4 = "$('#productnamecn').val('"+(selectResult[0]["productnamecn"]==null?'':selectResult[0]["productnamecn"])+"');";

	var js5 = "$('#biko').val('"+(selectResult[0]["biko"]==null?'':selectResult[0]["biko"])+"');";

	var js6 = "$('#productcount').val('"+(selectResult[0]["productcount"]==null?'':selectResult[0]["productcount"])+"');";

	var js7 = "$('#productdiv').val('" + selectResult[0]["productdiv"] +"');";

	var js8 = "$('#productpicStr').val('" + selectResult[0]["pic"] +"');";

	var js9 = "$('#imgtodisplay').attr('src','" + selectResult[0]["pic"]+ "');$('#imgtodisplay').show();"

	var js10 = "$('#delbutton').show();"

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

	return ret.eval("shipactingmaster_inputdialog.dialog('open')");

};
