var delpurchase={};
delpurchase.name="納品削除";
delpurchase.paramsFormat={
	"#delno":null
};

var shopname = "";

delpurchase.fire=function(params){

	var ret = new Result();

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



	return ret;
};