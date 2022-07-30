var searchearningslist={};
searchearningslist.name="売上情報検索";
searchearningslist.paramsFormat={
	"#shop":null
};
var shopname = "";
searchearningslist.fire=function(params){
	
	var ret = new Result();

	shopname = params["#shop"];

	var resultHTML = 
	"<tr style='height:40px'>" +
	"	<td style='text-align: right'>2021年01月</td>" +
	"	<td style='text-align: right'>999個</td>" +
	"	<td style='text-align: right'>99999999円</td>" +
	"	<td style='text-align: right'>99999999円</td>" +
	"	<td style='text-align: right'>99999999円</td>" +
	"	<td style='text-align: right'>-99999999円</td>" +
	"	<td style='text-align: right'>-99999999円</td>" +
	"	<td style='text-align: right'>-99999999円</td>" +
	"	<td style='text-align: right'>99999999円</td>" +
	"	<td style='text-align: right'>-99999999円</td>" +
	"	<td style='text-align: right'>-99999999円</td>" +
	"	<td style='text-align: right'>99999999円</td>" +
	"</tr>";

	var selectResult = db.select(
		"PURCHASE",
		"searchPurchase",
		{
			"shop":shopname,
		}
	).getArray();


	ret.runat("#earningslisttable").remove(".content");

	ret.runat("#earningslisttable").append(resultHTML).withdata(selectResult);


	// 画面へ結果を返す
	return ret;

};
