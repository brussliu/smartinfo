var searchsubproduct={};
searchsubproduct.name="子商品検索";
searchsubproduct.paramsFormat={
	"#txt_freeWord":null,
};
searchsubproduct.fire=function(params){

	var ret = new Result();
	var selectResult = db.select(
		"MASTER",
		"selectSub",
		{
			"freeword":params["#txt_freeWord"]
		}
	).getArray();

	var subProductHTML = "<TR><TD><input type='checkbox'></TD><TD>{sku}</TD><TD>{asin}</TD><TD>{productname}</TD></TR>";
	ret.runat("#subproduct").remove("tr").append(subProductHTML).withdata(selectResult);

	return ret;
};
