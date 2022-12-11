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

	if(params["page"] == "si_menu.jsp" || params["page"] == "menu.jsp"){
		if(userid == "jly99641" && shopid == "Smart-Bear"){
			return ret.navigate("si_menu.jsp");
		}else if(userid == "12345678" && shopid == "12345678"){
			return ret.navigate("menu.jsp");
		}
	}


	return ret.navigate(params["page"]);
};
