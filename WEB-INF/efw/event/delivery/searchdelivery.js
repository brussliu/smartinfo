var searchdelivery={};
searchdelivery.name="納品情報検索";
searchdelivery.paramsFormat={
};

searchdelivery.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var resultHTML = 
	"<tr style='height: 28px;background-color: {color};'>" +
		"<td ><input type='radio' name='purchaseitem' onclick='selectitem(this);'></td>" +
		"<td >{delivery_no}</td>" +
		"<td >{delivery_name}</td>" +
		"<td >{quantity}</td>" +
		"<td >{status}</td>" +
		"<td >{registration_date}</td>" +
		"<td >{confirm_date}</td>" +
		"<td >{shipping_date}</td>" +
		"<td >{arrival_date}</td>" +
		"<td >{acceptance_date}</td>" +
		"<td >{amz_delivery_no}</td>" +
		"<td >{amz_delivery_name}</td>" +
		"<td >{amz_delivery_plan_no}</td>" +
	"</tr>";

	var selectResult = db.select(
		"DELIVERY",
		"searchDelivery",
		{
			"shop":getShopId(),
		}
	).getArray();


	ret.runat("#purchasenamelist").remove("tr");

	ret.runat("#purchasenamelist").append(resultHTML).withdata(selectResult);

	var title = "納品管理（" + getShopId() + "）";

	var script = "initTitle('" + title +"')";

	// 画面へ結果を返す
	return ret.eval(script);

};
