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

	session.set("USER_ID", userid);
	session.set("SHOP_ID", shopid);

	var userid = params["#userid"];

	return ret.navigate("si_menu.jsp");
};
