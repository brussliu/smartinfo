var searchdelivery={};
searchdelivery.name="納品情報検索";
searchdelivery.paramsFormat={
	"#shop":null
};
var shopname = "";
searchdelivery.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var resultHTML = 
	"<tr style='height: 28px;'>" +
		"<td ><input type='radio' name='purchaseitem' onclick='selectitem(this);'></td>" +
		"<td >{purchase_no}</td>" +
		"<td >{purchase_name}</td>" +
		"<td >{quantity}</td>" +
		"<td >{amount}</td>" +
		"<td >{status}</td>" +
		"<td >{registration_date}</td>" +
		"<td >{confirm_date}</td>" +
		"<td >{shipping_date}</td>" +
		"<td >{arrival_date}</td>" +
		"<td >{acceptance_date}</td>" +
	"</tr>";

	var selectResult = db.select(
		"DELIVERY",
		"searchDelivery",
		{
			"shop":shopname,
		}
	).getArray();


	ret.runat("#purchasenamelist").remove("tr");

	ret.runat("#purchasenamelist").append(resultHTML).withdata(selectResult);


	// 画面へ結果を返す
	return ret;

};
