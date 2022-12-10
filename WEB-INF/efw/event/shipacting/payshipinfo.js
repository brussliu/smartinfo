var payshipinfo={};
payshipinfo.name="发送情报支付";
payshipinfo.paramsFormat={
	"#txt_shipno":null,
};

payshipinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var shipno = params["#txt_shipno"];


	var updateResult = db.change(
		"SHIPACTING",
		"updateShipinfoPaystatus",
		{
			"no":shipno,
		}
	);


	ret.eval("shipacting_inputdialog.dialog('close');");

	return ret.navigate("shipacting_list.jsp");

};
