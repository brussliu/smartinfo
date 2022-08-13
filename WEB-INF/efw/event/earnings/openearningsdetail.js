var openearningsdetail={};
openearningsdetail.name="売上詳細情報";
openearningsdetail.paramsFormat={
	"yearmonth":null
};

openearningsdetail.fire=function(params){


	var selectResult = db.select(
		"EARNINGS",
		"searchearningslist",
		{}
	).getArray();


















	
	return (new Result())
	.eval("earnings_inputdialog.dialog('open')")
	;

};
