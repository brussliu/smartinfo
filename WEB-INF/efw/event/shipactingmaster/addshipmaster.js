var addshipmaster={};
addshipmaster.name="発送商品登録";
addshipmaster.paramsFormat={};
addshipmaster.fire=function(params){
	return (new Result())
	.eval("shipactingmaster_inputdialog.dialog('open')")
	;
};
