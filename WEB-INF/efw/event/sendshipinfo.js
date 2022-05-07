var sendshipinfo={};
sendshipinfo.name="发送";
sendshipinfo.paramsFormat={
	"#txt_shipno":null,
	"#ship_div":null,
	"#txt_fee":null,
	"#txt_trackingno":null,
	"#txt_amount":null,
};

sendshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];

	var shipdiv = params["#ship_div"];
	var fee = params["#txt_fee"]==null ? null : parseInt(params["#txt_fee"]);

	var trackingno = params["#txt_trackingno"];
	var amount = params["#txt_amount"]==null ? null : parseInt(params["#txt_amount"]);
	
	var updateResult = db.change(
		"SHIP",
		"updateShipinfoStatus8",
		{
			"no":shipno,
			"shipdiv":shipdiv,
			"fee":fee,
			"trackingno":trackingno,
			"amount":amount
		}
	);


	ret.eval("shipinfo_inputdialog.dialog('close');");

	return ret.navigate("shipinfo.jsp");

};
