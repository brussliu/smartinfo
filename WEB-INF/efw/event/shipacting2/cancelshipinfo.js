var cancelshipinfo={};
cancelshipinfo.name="发送情报取消";
cancelshipinfo.paramsFormat={
	"#txt_shipno":null,
};

cancelshipinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}


	var shipno = params["#txt_shipno"];
	
	var updateResult = db.change(
		"SHIPACTING",
		"updateShipinfoStatus9",
		{
			"no":shipno
		}
	);


	ret.eval("shipacting_inputdialog2.dialog('close');");

	return ret.navigate("shipacting_list2.jsp");

};
