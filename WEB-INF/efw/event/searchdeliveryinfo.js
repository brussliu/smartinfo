var searchdeliveryinfo={};
searchdeliveryinfo.name="納品明細情報検索";
searchdeliveryinfo.paramsFormat={
	"#deliveryno":"required:true;display-name:仕入No;",
	"#shop" : null
};
var shopname = "";
searchdeliveryinfo.fire=function(params){
	
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


	ret.runat("#boxinfo>tbody").remove("tr");

	ret.runat("#boxinfo>tbody").append(resultHTML).withdata(selectResult);


	// 画面へ結果を返す
	return ret;

};
