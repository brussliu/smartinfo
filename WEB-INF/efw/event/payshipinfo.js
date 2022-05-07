var payshipinfo={};
payshipinfo.name="发送情报支付";
payshipinfo.paramsFormat={
	"#txt_shipno":null,
};

payshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];


	var updateResult = db.change(
		"SHIP",
		"updateShipinfoPaystatus",
		{
			"no":shipno,
		}
	);


	ret.eval("shipinfo_inputdialog.dialog('close');");

	return ret.navigate("shipinfo.jsp");

};
