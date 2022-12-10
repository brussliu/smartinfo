var menu_goto={};
menu_goto.name="menugoto";
menu_goto.paramsFormat={
	page:null
};

menu_goto.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	return ret.navigate(params["page"]);
};
