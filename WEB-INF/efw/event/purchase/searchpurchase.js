var searchpurchase={};
searchpurchase.name="仕入情報検索";
searchpurchase.paramsFormat={
	"#shop":null
};
var shopname = "";
searchpurchase.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	shopname = params["#shop"];

	// <td ><input type="radio" name="purchaseitem"></td>
	// <td >20210501-192356</td>
	// <td >20210501_靴下</td>
	// <td >999</td>
	// <td >999,999,999</td>
	// <td >0:新規登録</td>
	// <td >2021/12/31<br>2021/12/31</td>
	// <td >2021/12/31<br>2021/12/31<br>2021/12/31</td>
	// <td >1:空輸(EMS)</td>
	// <td >5</td>
	// <td >123456789<br>123456789<br>123456789</td>
	// <td >123456789<br>123456789<br>123456789</td>
	// <td >123456789<br>123456789</td>

	var resultHTML = 
	"<tr style='height: 28px;background-color: {color};'>" +
		"<td ><input type='radio' name='purchaseitem' onclick='selectitem(this);'></td>" +
		"<td >{purchase_no}</td>" +
		"<td >{purchase_name}</td>" +
		"<td >{quantity}</td>" +
		"<td >{amount}</td>" +
		"<td >{status}</td>" +
		"<td >{registration_date}<br>{confirm_date}</td>" +
		"<td >{shipping_date}<br>{arrival_date}<br>{acceptance_date}</td>" +
		"<td >{ship}</td>" +
		"<td >{rate}</td>" +
		"<td >{product_amount}<br>{ship_amount}<br>{tax_amount}</td>" +
		"<td >{product_amount_jp}<br>{ship_amount_jp}<br>{tax_amount_jp}</td>" +
		"<td >{all_amount}<br>{all_amount_jp}</td>" +
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
