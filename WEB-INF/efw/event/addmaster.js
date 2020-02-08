var addmaster={};
addmaster.name="親商品登録";
addmaster.paramsFormat={};
addmaster.fire=function(params){
	return (new Result())
	.eval("si_master_inputdialog.dialog('open')")
	;
};
