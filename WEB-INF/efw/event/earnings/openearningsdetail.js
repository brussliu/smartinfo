var openearningsdetail={};
openearningsdetail.name="売上詳細情報";
openearningsdetail.paramsFormat={
	"yearmonth":null
};

openearningsdetail.fire=function(params){

	var ret = new Result();
	
	var yearmonth = params["yearmonth"];

	var selectResult1 = db.select(
		"EARNINGS",
		"searchearningsdetail1",
		{yearmonth : yearmonth}
	);

	// 年月
	var yearmonth = selectResult1.getValue("yearmonth");
	// 注文数量
	var ordercount = selectResult1.getValue("ordercount") + "個　";
	// 注文売上
	var orderearnings = selectResult1.getValue("orderearnings") + "円　";
	// 配送料
	var shipfee = selectResult1.getValue("shipfee") + "円　";
	// 包装手数料
	var packfee = selectResult1.getValue("packfee") + "円　";
	// 手数料
	var orderfee = selectResult1.getValue("orderfee") + "円　";
	// FBA手数料
	var fbafee = selectResult1.getValue("fbafee") + "円　";
	// ポイント費用
	var pointfee = selectResult1.getValue("pointfee") + "円　";
	// その他料金
	var others = selectResult1.getValue("others") + "円　";
	// 注文粗利益
	var orderprofit = (selectResult1.getValue("orderearnings")
						+ selectResult1.getValue("shipfee") 
						+ selectResult1.getValue("packfee")
						+ selectResult1.getValue("orderfee")
						+ selectResult1.getValue("fbafee")
						+ selectResult1.getValue("pointfee")
						+ selectResult1.getValue("others")) + "円　";

	var script1 = "showyearmonth('" + yearmonth + "');";
	ret.eval(script1);

	var script2 = "showearnings('" 
			+ ordercount + "','" 
			+ orderearnings + "','" 
			+ shipfee + "','" 
			+ packfee + "','" 
			+ orderfee + "','" 
			+ fbafee + "','" 
			+ pointfee + "','" 
			+ others + "','" 
			+ orderprofit + "');";
	ret.eval(script2);

	var selectResult2 = db.select(
		"EARNINGS",
		"searchearningsdetail2",
		{yearmonth : yearmonth}
	);
	// 広告費用
	var adfee = selectResult2.seek("説明","eq","広告費用").getValue("合計") + "円　";
	// 月額登録料
	var monthlyfee = selectResult2.seek("説明","eq","月額登録料").getValue("合計") + "円　";

	var script3 = "showaddmonthlyfee('" + adfee + "','" + monthlyfee + "');";
	ret.eval(script3);



	var selectResult3 = db.select(
		"EARNINGS",
		"searchearningsdetail3",
		{yearmonth : yearmonth}
	).getArray();

	var selectResult4 = db.select(
		"EARNINGS",
		"searchearningsdetail4",
		{yearmonth : yearmonth}
	).getArray();
	

	// ret.runat("#earnings_inputdialog #detialtable").withdata(
	// 	{	"#yearmonth" : selectResult1.getValue("yearmonth"),

	// 	}
	// );







	
	return ret.eval("earnings_inputdialog.dialog('open')");

};
