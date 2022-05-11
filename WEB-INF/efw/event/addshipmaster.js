var addshipmaster={};
addshipmaster.name="発送商品登録";
addshipmaster.paramsFormat={};
addshipmaster.fire=function(params){
	return (new Result())
	.eval("si_ship_master_inputdialog.dialog('open')")
	;
};
