var login={};
login.name="ログイン";
login.paramsFormat={
	"#userid":		"required:true;max-length:8 ;display-name:ユーザーID;",
};
login.fire=function(params){

	var ret = new Result();

	var userid = params["#userid"];
	var shopid = "";

	if(userid == "jly99641"){
		shopid = "Smart-Bear";
	}

	if(userid == "12345678"){
		shopid = "12345678";
	}

	session.set("USER_ID", userid);
	session.set("SHOP_ID", shopid);

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	if(userid == "jly99641" && shopid == "Smart-Bear"){
		return ret.navigate("si_menu.jsp");
	}else if(userid == "12345678" && shopid == "12345678"){
		return ret.navigate("menu.jsp");
	}else{
		return ret.navigate("login.jsp");
	}

};
