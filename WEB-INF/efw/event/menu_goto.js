var menu_goto={};
menu_goto.name="menugoto";
menu_goto.paramsFormat={page:null,shop:null};
menu_goto.fire=function(params){

	var ret = new Result();

	var script = "$('#pagehead')";


	params["shop"].debug("==========================================================");

	"shop".debug("==========================================================");

	return (new Result())
	.navigate(params["page"] + "?shop=" + params["shop"]);
};
