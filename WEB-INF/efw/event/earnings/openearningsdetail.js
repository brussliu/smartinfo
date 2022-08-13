var openearningsdetail={};
openearningsdetail.name="売上詳細情報";
openearningsdetail.paramsFormat={
	"yearmonth":null
};

openearningsdetail.fire=function(params){

	var ret = new Result();
	
	var yearmonth = params["yearmonth"];

	/////////////////////////////////////////////////////////////////////////////////
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

	/////////////////////////////////////////////////////////////////////////////////
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

	/////////////////////////////////////////////////////////////////////////////////
	var selectResult3 = db.select(
		"EARNINGS",
		"searchearningsdetail3",
		{yearmonth : yearmonth}
	);

	// 返品数量
	var returncount = selectResult3.seek("トランザクションの種類","eq","返金").getValue("返品数量") + "個　";
	// 返品金額
	var returnamount = selectResult3.seek("トランザクションの種類","eq","返金").getValue("合計") + "円　";
	// 返品作業料
	var returnfee = selectResult3.seek("トランザクションの種類","eq","FBA Customer Return Fee").getValue("合計") + "円　";
	// 返金調整額
	var returnadjust = selectResult3.seek("トランザクションの種類","eq","調整").getValue("合計") + "円　";

	var script4 = "showreturninfo('" 
			+ returncount + "','" 
			+ returnamount + "','" 
			+ returnfee + "','" 
			+ returnadjust + "');";
	ret.eval(script4);

	/////////////////////////////////////////////////////////////////////////////////
	var selectResult4 = db.select(
		"EARNINGS",
		"searchearningsdetail4",
		{yearmonth : yearmonth}
	);
	
	// FBA商品発送料金
	var fbashipfee = selectResult4.seek("説明","eq","FBA商品発送料金").getValue("合計") + "円　";
	// FBA保管手数料
	var fbastockfee = selectResult4.seek("説明","eq","FBA保管手数料").getValue("合計") + "円　";
	// FBA長期保管手数料
	var fbalongtermstockfee = selectResult4.seek("説明","eq","FBA長期在庫保管手数料").getValue("合計") + "円　";
	// FBA廃棄返送手数料
	var fbadiscardfee = selectResult4.seek("説明","eq","FBA廃棄返送手数料").getValue("合計") + "円　";

	var script5 = "showfbainfo('" 
			+ fbashipfee + "','" 
			+ fbastockfee + "','" 
			+ fbalongtermstockfee + "','" 
			+ fbadiscardfee + "');";
	ret.eval(script5);

	/////////////////////////////////////////////////////////////////////////////////
	var selectResult5 = db.select(
		"EARNINGS",
		"searchearningsdetail5",
		{yearmonth : yearmonth}
	).getArray();


	var purchasetitle1 = "&nbsp;振込み（－－－－/－－/－－）";
	var purchaseamount1 = "－円　";
	var purchasetitle2 = "&nbsp;振込み（－－－－/－－/－－）";
	var purchaseamount2 = "－円　";
	var purchasetitle3 = "&nbsp;振込み（－－－－/－－/－－）";
	var purchaseamount3 = "－円　";
	var purchaseamountsum = 0;

	// 仕入費用
	if(selectResult5.length > 0){
		purchasetitle1 = "&nbsp;振込み（" + selectResult5[0]["purchasedate"] + "）";
		purchaseamount1 = selectResult5[0]["purchaseamount"] + "円　";
		purchaseamountsum = purchaseamountsum + selectResult5[0]["purchaseamount"];
	}

	if(selectResult5.length > 1){
		purchasetitle2 = "&nbsp;振込み（" + selectResult5[1]["purchasedate"] + "）";
		purchaseamount2 = selectResult5[1]["purchaseamount"] + "円　";
		purchaseamountsum = purchaseamountsum + selectResult5[1]["purchaseamount"];
	}

	if(selectResult5.length > 2){
		purchasetitle3 = "&nbsp;振込み（" + selectResult5[2]["purchasedate"] + "）";
		purchaseamount3 = selectResult5[2]["purchaseamount"] + "円　";
		purchaseamountsum = purchaseamountsum + selectResult5[2]["purchaseamount"];
	}

	var purchaseamountsumstr = purchaseamountsum + "円　";

	var script6 = "showpurchaseinfo('" 
			+ purchasetitle1 + "','" 
			+ purchaseamount1 + "','" 
			+ purchasetitle2 + "','" 
			+ purchaseamount2 + "','" 
			+ purchasetitle3 + "','" 
			+ purchaseamount3 + "','" 
			+ purchaseamountsumstr + "');";
	ret.eval(script6);

	
	return ret.eval("earnings_inputdialog.dialog('open')");

};
