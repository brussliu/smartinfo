var addproductkind={};
addproductkind.name="商品種別登録";
addproductkind.paramsFormat={};
addproductkind.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	return ret.eval("si_ship_inputdialog.dialog('open')");
	
};
