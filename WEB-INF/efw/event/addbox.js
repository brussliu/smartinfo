var addbox={};
addbox.name="箱詰め";
addbox.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",
	"#shop" : null

};
addbox.fire=function(params){

	var ret = new Result();

	shopname = params["#shop"];
	var deliveryno = params["#deliveryno"];

	var resultHTML = 
	"<TR style='height:40px;'>" +
		"<TD>{pno}</TD>" +
		"<TD>{color}</TD>" +
		"<TD>{size}</TD>" +
		"<TD>{quantity}</TD>" +
		"<TD>0</TD>" +
		"<TD></TD>" +
	"</TR>";

	var selectResult = db.select(
		"DELIVERY",
		"searchDeliveryInfo",
		{
			"col0":deliveryno,
		}
	).getArray();

	selectResult.debug("ZZZZZZZZZZZZZZZZZZZZZZZ");

	ret.runat("#boxinfobody").remove("tr");

	ret.runat("#boxinfobody").append(resultHTML).withdata(selectResult);



	return ret.eval("si_box_inputdialog.dialog('open')");


};
