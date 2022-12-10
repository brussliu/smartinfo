var addshipmaster={};
addshipmaster.name="発送商品登録";
addshipmaster.paramsFormat={};
addshipmaster.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	return ret.eval("shipactingmaster_inputdialog.dialog('open')");
	
};
