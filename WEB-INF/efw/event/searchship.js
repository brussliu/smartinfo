var searchship={};
searchship.name="発送情報検索";
searchship.paramsFormat={
	"#shop":null,
};

var shopname = "";
searchship.fire=function(params){
	
	var ret = new Result();
	shopname = params["#shop"];

	var resultHTML1 = 
	"<tr>" +
		"<td class='content' style='width: 100px;'>{productno}</td>" +
		"<td class='content' style='width: 120px;'>{productdiv}</td>" +
		"<td class='content' style='width: 120px;'>{sku}</td>" +
		"<td class='content' style='width: 120px;'>{asin}</td>" +
		"<td class='content' style='width: 100px;'>{label}</td>" +
		"<td class='content' style=''>{productname}</td>" +
		"<td class='content' style='width: 250px;'>{option1}</td>" +
		"<td class='content' style='width: 100px;'>{option2}</td>" +
		"<td class='content' style='width: 100px;'>{count}</td>" +
	"</tr>";

	var selectResult1 = db.select(
		"SHIP",
		"searchShipProduct",
		{
		shop:shopname
		}
	).getArray();

	ret.runat("#ship_productinfo").remove(".content");
	ret.runat("#ship_productinfo").append(resultHTML1).withdata(selectResult1);


	ret.runat("#shipinfotable").remove(".content");

	var resultHTML2 = 
	"<tr>" +
		"<td class='content' style='width: 50px;'><input type='checkbox' name='orderselect' value='{orderno}' checked></td>" +
		"<td class='content' style='width: 80px;'>{div}</td>" +
		"<td class='content' style='width: 80px;'>{shipstatus}</td>" +
		"<td class='content' style='width: 200px;'>{orderno}</td>" +
		"<td class='content' style='width: 250px;'>{shipdate}</td>" +
		"<td class='content' style='width: 100px;'>{count}</td>" +
		"<td class='content' style='width: 100px;'>{amount}</td>" +
		"<td class='content' style='width: 100px;'>{receiver}</td>" +
		"<td class='content' style='width: 100px;'>{postno}</td>" +
		"<td class='content' style='width: 400px;'>{address}</td>" +
		"<td class='content' style='width: 150px;'>{buyer_tel}</td>" +
		"<td class='content' style='width: 150px;'><input type='button' value='発送' onclick='ship(this)'></td>" +
	"</tr>";

	var selectResult2 = db.select(
		"SHIP",
		"searchShipAddressUnship",
		{
		shop:shopname
		}
	).getArray();


	ret.runat("#shipinfotable").append(resultHTML2).withdata(selectResult2);

	var resultHTML3 = 
	"<tr style='background-color: rgb(195,195,195);'>" +
		"<td class='content' style='width: 50px;'></td>" +
		"<td class='content' style='width: 80px;'>{div}</td>" +
		"<td class='content' style='width: 80px;'>{shipstatus}</td>" +
		"<td class='content' style='width: 200px;'>{orderno}</td>" +
		"<td class='content' style='width: 250px;'>{shipdate}</td>" +
		"<td class='content' style='width: 100px;'>{count}</td>" +
		"<td class='content' style='width: 100px;'>{amount}</td>" +
		"<td class='content' style='width: 100px;'>{receiver}</td>" +
		"<td class='content' style='width: 100px;'>{postno}</td>" +
		"<td class='content' style='width: 400px;'>{address}</td>" +
		"<td class='content' style='width: 150px;'>{buyer_tel}</td>" +
		"<td class='content' style='width: 150px;'><input type='button' style='' value='数量回復' onclick='upship(this)'></td>" +
	"</tr>";

	var selectResult3 = db.select(
		"SHIP",
		"searchShipAddressShipped",
		{
		shop:shopname
		}
	).getArray();

	ret.runat("#shipinfotable").append(resultHTML3).withdata(selectResult3);

	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
