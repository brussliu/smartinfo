var deldelivery={};
deldelivery.name="納品削除";
deldelivery.paramsFormat={
	"#delno":null
};

var shopname = "";

deldelivery.fire=function(params){

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	// 納品No
	var delno = params["#delno"];


	// 納品管理TBLを削除する
	var delResult1 = db.change(
		"DELIVERY",
		"delDelivery",
		{
			"col0":delno
		}
	);

	// 納品明細TBLを削除する
	var delResult2 = db.change(
		"DELIVERY",
		"delDeliveryDetail",
		{
			"col0":delno
		}
	);



	return ret.eval("window.location.href = '/smartinfo/si_menu.jsp'");
};
