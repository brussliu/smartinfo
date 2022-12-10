var acceptshipinfo={};
acceptshipinfo.name="发送情报接受";
acceptshipinfo.paramsFormat={
	"#txt_shipno":		"required:true;max-length:20 ;display-name:NO;",
	"#ship_div":		"required:true;max-length:100 ;display-name:発送方式;",
	"#txt_trackingno":	"              max-length:20 ;display-name:発送方式;",

	"#txt_fee":			"              format:#,##0;min:1;max:99999;display-name:発送料金;",
	"#txt_amount":		"              format:#,##0;min:1;max:9999;display-name:合計費用;",

	"#product_name":	"required:true;max-length:100;display-name:発送商品;",
	"#product_count":	"required:true;max-length:10; display-name:数量;",
	"#txt_postno":		"required:true;max-length:10; display-name:郵便番号;",
	"#txt_address1":	"required:true;max-length:100;display-name:住所1;",
	"#txt_address2":	"required:true;max-length:100;display-name:住所2;",
	"#txt_address3":	"              max-length:100;display-name:住所2;",
	"#txt_biko":		"              max-length:100;display-name:備考;",
	"#txt_name":		"required:true;max-length:20; display-name:姓名;",
	"#txt_tel":			"required:true;max-length:20; display-name:電話番号;",

};

acceptshipinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var shipno = params["#txt_shipno"];

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

	var shipdiv = params["#ship_div"];
	var fee = params["#txt_fee"] == "" ? null : parseInt(params["#txt_fee"]);

	var trackingno = params["#txt_trackingno"];
	var amount = params["#txt_amount"] == "" ? null : parseInt(params["#txt_amount"]);

	var updateResult = db.change(
		"SHIPACTING",
		"updateShipinfoStatus5",
		{
			"no":shipno,
			"shipdiv":shipdiv,
			"fee":fee,
			"trackingno":trackingno,
			"amount":amount
		}
	);

	ret.eval("shipacting_inputdialog.dialog('close');");

	return ret.navigate("shipacting_list.jsp");

};
