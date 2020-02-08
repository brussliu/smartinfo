var menu_goto={};
menu_goto.name="menugoto";
menu_goto.paramsFormat={page:null};
menu_goto.fire=function(params){
	params["page"].debug("GGGGGGGGGGGGGGGGGGG");

	return (new Result())
	.navigate(params["page"]);
};
