var sendshipinfo={};
sendshipinfo.name="发送";
sendshipinfo.paramsFormat={
	"#txt_shipno":		"required:true;max-length:20 ;display-name:NO;",
	"#ship_div":		"required:true;max-length:100 ;display-name:発送方式;",
	"#txt_trackingno":	"required:true;max-length:20 ;display-name:発送方式;",

	"#txt_fee":			"required:true;format:#,##0;min:1;max:99999;display-name:発送料金;",
	"#txt_amount":		"required:true;format:#,##0;min:1;max:9999;display-name:合計費用;",

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

sendshipinfo.fire=function(params){
	
	var ret = new Result();

	var shipno = params["#txt_shipno"];

	var shipdiv = params["#ship_div"];
	var fee = params["#txt_fee"] == "" ? null : parseInt(params["#txt_fee"]);

	var trackingno = params["#txt_trackingno"];
	var amount = params["#txt_amount"] == "" ? null : parseInt(params["#txt_amount"]);
	
	var updateResult = db.change(
		"SHIPACTING",
		"updateShipinfoStatus8",
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
