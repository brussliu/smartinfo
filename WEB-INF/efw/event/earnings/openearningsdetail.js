var openearningsdetail={};
openearningsdetail.name="売上詳細情報";
openearningsdetail.paramsFormat={

};

openearningsdetail.fire=function(params){
	
	return (new Result())
	.eval("earnings_inputdialog.dialog('open')")
	;

};
