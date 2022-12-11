var saveshipinfo={};
saveshipinfo.name="发送情报更新";
saveshipinfo.paramsFormat={
	"#txt_shipno":		null,
	"#product_name":	"required:true;max-length:100;display-name:发送商品;",
	"#product_count":	"required:true;max-length:10; display-name:数量;",
	"#txt_postno":		"required:true;max-length:10; display-name:邮政编码;",
	"#txt_address1":	"required:true;max-length:100;display-name:住所1;",
	"#txt_address2":	"required:true;max-length:100;display-name:住所2;",
	"#txt_address3":	"              max-length:100;display-name:住所2;",
	"#txt_biko":		"              max-length:100;display-name:备考;",
	"#txt_name":		"required:true;max-length:20; display-name:姓名;",
	"#txt_tel":			"required:true;max-length:20; display-name:电话号码;",
};

saveshipinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

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
		var name = params["#txt_name"];
		var tel = params["#txt_tel"];
	
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
				"biko":biko,
				"name":name,
				"tel":tel
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
		var name = params["#txt_name"];
		var tel = params["#txt_tel"];

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
				"biko":biko,
				"name":name,
				"tel":tel
			}
		);

	}

	ret.eval("shipacting_inputdialog2.dialog('close');");

	return ret.navigate("shipacting_list2.jsp");

};
