var addproductkind={};
addproductkind.name="商品種別登録";
addproductkind.paramsFormat={};
addproductkind.fire=function(params){
	return (new Result())
	.eval("si_ship_inputdialog.dialog('open')")
	;
};
