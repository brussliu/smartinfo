var cancelshipinfo={};
cancelshipinfo.name="发送情报取消";
cancelshipinfo.paramsFormat={
	"#txt_shipno":null,
};

cancelshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];
	
	var updateResult = db.change(
		"SHIP",
		"updateShipinfoStatus9",
		{
			"no":shipno
		}
	);


	ret.eval("shipinfo_inputdialog.dialog('close');");

	return ret.navigate("shipinfo.jsp");

};
