var searchpurchase={};
searchpurchase.name="仕入情報検索";
searchpurchase.paramsFormat={
	"#shop":null
};
var shopname = "";
searchpurchase.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var resultHTML = 
	"<tr style='height: 28px;'>" +
		"<td rowspan='2'>{purchase_no}</td>" +
		"<td >{purchase_name}</td>" +
		"<td >{quantity}</td>" +
		"<td >{amount}</td>" +
		"<td >{status}</td>" +
		"<td >{registration_date}</td>" +
		"<td >{confirm_date}</td>" +
		"<td >{shipping_date}</td>" +
		"<td >{arrival_date}</td>" +
		"<td >{acceptance_date}</td>" +
	"</tr>" +
	"<tr style='height: 28px;'>" +
		"<td colspan='4'><input type='file' style='width: 400px;display:{file_display}'></td>" +
		"<td ><input type=button value='更　　新' style='width:80px;display:{update_display}' onclick=''></td>" +
		"<td ><input type=button value='仕入確定' style='width:80px;display:{confirm_display}' onclick=''></td>" +
		"<td ><input type=button value='発送した' style='width:80px;display:{shipping_display}' onclick=''></td>" +
		"<td ><input type=button value='到着した' style='width:80px;display:{arrival_display}' onclick=''></td>" +
		"<td ><input type=button value='受け取り' style='width:80px;display:{acceptance_display}' onclick=''></td>" +
	"</tr>";

	var selectResult = db.select(
		"PURCHASE",
		"searchPurchase",
		{
			"shop":shopname,
		}
	).getArray();


	ret.runat("#purchasenamelist").remove("tr");

	ret.runat("#purchasenamelist").append(resultHTML).withdata(selectResult);


	// 画面へ結果を返す
	return ret;

};
