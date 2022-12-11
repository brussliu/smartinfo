var importmaster={};
importmaster.name="マスタデータ導入";
importmaster.paramsFormat={
	// 商品マスタ情報
	"#importfile_master":null,
};

importmaster.fire=function(params){

	file.saveUploadFiles("upload");

	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var fa = params["#importfile_master"].split("\\");

	var f = fa[fa.length-1];

	var sheetName = "";
	if(getShopId() == "Smart-Bear"){
		sheetName = "新店";
	}else if(getShopId() == "Smart-KM"){
		sheetName = "旧店";
	}

	var count = importMasterList(f, getShopId(), sheetName);

	var d = new Date().format("yyyy-MM-dd");

	var historyResult = db.change(
		"UPLOAD",
		"insertHistory",
		{
			"col0":getShopId(),
			"col1":"master",
			"col2":d,
			"col3":count
		}
	);
	
	return ret.navigate("upload.jsp?shop=" + getShopId());

};