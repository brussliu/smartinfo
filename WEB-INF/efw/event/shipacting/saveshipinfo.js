var saveshipinfo={};
saveshipinfo.name="发送情报更新";
saveshipinfo.paramsFormat={
	"#txt_shipno":null,
	"#product_name":null,
	"#product_count":null,
	"#txt_postno":null,
	"#txt_address1":null,
	"#txt_address2":null,
	"#txt_address3":null,
	"#txt_biko":null
};

saveshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];

	

	if(shipno == null || shipno == ""){

		shipno = (new Date()).format("yyyyMMdd-HHmmss");

		var productname = params["#product_name"];
		var productcount = parseInt(params["#product_count"]);
		var postno = params["#txt_postno"];
		var address1 = params["#txt_address1"];
		var address2 = params["#txt_address2"];
		var address3 = params["#txt_address3"];
		var biko = params["#txt_biko"];
	
		var updateResult = db.change(
			"SHIPACTING",
			"insertShipinfo",
			{
				"no":shipno,
				"shipcontent":productname,
				"shipcount":productcount,
				"postno":postno,
				"address1":address1,
				"address2":address2,
				"address3":address3,
				"biko":biko
			}
		);

	}else{

		var productname = params["#product_name"];
		var productcount = parseInt(params["#product_count"]);
		var postno = params["#txt_postno"];
		var address1 = params["#txt_address1"];
		var address2 = params["#txt_address2"];
		var address3 = params["#txt_address3"];
		var biko = params["#txt_biko"];
	
		var updateResult = db.change(
			"SHIPACTING",
			"updateShipinfo",
			{
				"no":shipno,
				"shipcontent":productname,
				"shipcount":productcount,
				"postno":postno,
				"address1":address1,
				"address2":address2,
				"address3":address3,
				"biko":biko
			}
		);

	}



	ret.eval("shipacting_inputdialog.dialog('close');");

	return ret.navigate("shipacting_list.jsp");

};
