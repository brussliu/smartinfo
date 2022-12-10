var addmaster={};
addmaster.name="親商品登録";
addmaster.paramsFormat={};
addmaster.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	return ret.eval("si_master_inputdialog.dialog('open')");
	
};
