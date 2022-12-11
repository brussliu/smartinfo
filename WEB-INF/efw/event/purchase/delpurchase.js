var delpurchase={};
delpurchase.name="納品削除";
delpurchase.paramsFormat={
	"#delno":null
};

delpurchase.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 仕入No
	var delno = params["#delno"];


	// 仕入管理TBLを削除する
	var delResult1 = db.change(
		"PURCHASE",
		"delPurchase",
		{
			"col0":delno
		}
	);

	// 仕入明細TBLを削除する
	var delResult2 = db.change(
		"PURCHASE",
		"delPurchaseDetail",
		{
			"col0":delno
		}
	);


	return ret.eval("window.location.href = '/smartinfo/si_menu.jsp'");
};