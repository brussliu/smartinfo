var addbox={};
addbox.name="箱詰め";
addbox.paramsFormat={

	"#deliveryno":"required:true;display-name:仕入No;",

};

addbox.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var deliveryno = params["#deliveryno"];

	var resultHTML = 
	"<TR style='height:40px;'>" +
		"<TD>{pno}</TD>" +
		"<TD>{color}</TD>" +
		"<TD>{size}</TD>" +
		"<TD>{sku}</TD>" +
		"<TD>{asin}</TD>" +
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

	ret.runat("#boxinfobody").remove("tr");

	ret.runat("#boxinfobody").append(resultHTML).withdata(selectResult);


	return ret.eval("si_box_inputdialog.dialog('open')");


};
