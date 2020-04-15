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
		"<td style='width: 50px;'></td>" +
		"<td style='width: 100px;'>{productno}</td>" +
		"<td style='width: 100px;'>{productdiv}</td>" +
		"<td style='width: 100px;'>{sku}</td>" +
		"<td style='width: 100px;'>{asin}</td>" +
		"<td style='width: 100px;'>{label}</td>" +
		"<td style='width: 800px;'>{productname}</td>" +
		"<td style='width: 250px;'>{option1}</td>" +
		"<td style='width: 100px;'>{option2}</td>" +
		"<td style='width: 100px;'>{count}</td>" +
	"</tr>";

	var selectResult1 = db.select(
		"SHIP",
		"searchShipProduct",
		{
		shop:shopname
		}
	).getArray();

	ret.runat("#ship_productinfo").append(resultHTML1).withdata(selectResult1);



	var resultHTML2 = 
	"<tr>" +
		"<td style='width: 50px;'><input type='checkbox' name='orderselect' value='{orderno}' checked></td>" +
		"<td style='width: 80px;'>{div}</td>" +
		"<td style='width: 80px;'>{shipstatus}</td>" +
		"<td style='width: 200px;'>{orderno}</td>" +
		"<td style='width: 250px;'>{shipdate}</td>" +
		"<td style='width: 100px;'>{count}</td>" +
		"<td style='width: 100px;'>{amount}</td>" +
		"<td style='width: 100px;'>{receiver}</td>" +
		"<td style='width: 100px;'>{postno}</td>" +
		"<td style='width: 400px;'>{address}</td>" +
		"<td style='width: 150px;'>{buyer_tel}</td>" +
		"<td style='width: 150px;'><input type='button' value='発送' onclick='ship(this)'></td>" +
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
	"<tr>" +
		"<td style='width: 50px;'></td>" +
		"<td style='width: 80px;'>{div}</td>" +
		"<td style='width: 80px;'>{shipstatus}</td>" +
		"<td style='width: 200px;'>{orderno}</td>" +
		"<td style='width: 250px;'>{shipdate}</td>" +
		"<td style='width: 100px;'>{count}</td>" +
		"<td style='width: 100px;'>{amount}</td>" +
		"<td style='width: 100px;'>{receiver}</td>" +
		"<td style='width: 100px;'>{postno}</td>" +
		"<td style='width: 400px;'>{address}</td>" +
		"<td style='width: 150px;'>{buyer_tel}</td>" +
		"<td style='width: 150px;'><input type='button' style='' value='数量回復' onclick='upship(this)'></td>" +
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
