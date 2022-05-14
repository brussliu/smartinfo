var cancelshipinfo={};
cancelshipinfo.name="发送情报取消";
cancelshipinfo.paramsFormat={
	"#txt_shipno":null,
};

cancelshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];
	
	var updateResult = db.change(
		"SHIPACTING",
		"updateShipinfoStatus9",
		{
			"no":shipno
		}
	);


	ret.eval("shipacting_inputdialog.dialog('close');");

	return ret.navigate("shipacting_list.jsp");

};
