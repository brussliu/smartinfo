var addbox={};
addbox.name="箱詰め";
addbox.paramsFormat={};
addbox.fire=function(params){
	return (new Result())
	.eval("si_box_inputdialog.dialog('open')")
	;
};
