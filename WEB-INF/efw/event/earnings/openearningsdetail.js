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

	var selectResult2 = db.select(
		"EARNINGS",
		"searchearningsdetail2",
		{yearmonth : yearmonth}
	).getArray();

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




	ret.runat("#earnings_inputdialog detialtable").withdata(
		{	"#yearmonth" : selectResult1.getValue("yearmonth"),

		}
	);







	
	return (new Result())
	.eval("earnings_inputdialog.dialog('open')")
	;

};
