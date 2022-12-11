var searchearningslist={};
searchearningslist.name="売上情報検索";
searchearningslist.paramsFormat={

};

searchearningslist.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var resultHTML = 
	"<tr style='height:40px'> class='content'" +
	"	<td style='text-align: center'><a href='#' onclick='opendetail(this);'>{yearmonth}</a></td>" +
	"	<td style='text-align: right'>{ordercount}個</td>" +
	"	<td style='text-align: right'>{orderprofit}円</td>" +
	"	<td style='text-align: right'>{monthlyfee}円</td>" +
	"	<td style='text-align: right'>{adfee}円</td>" +
	"	<td style='text-align: right'>{ruturnfee}円</td>" +
	"	<td style='text-align: right'>{fbashipfee}円</td>" +
	"	<td style='text-align: right'>{fbastockfee}円</td>" +
	"	<td style='text-align: right'>{remittance}円</td>" +
	"	<td style='text-align: right'>{purchase}円</td>" +
	"	<td style='text-align: right'>{others}円</td>" +
	"	<td style='text-align: right'>{profit}円</td>" +
	"</tr>";

	var selectResult = db.select(
		"EARNINGS",
		"searchearningslist",
		{}
	).getArray();


	ret.runat("#earningslisttable").remove(".content");

	ret.runat("#earningslisttable").append(resultHTML).withdata(selectResult);

	var title = "売上情報（" + getShopId() + "）";
	var script = "initTitle('" + title +"')";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
