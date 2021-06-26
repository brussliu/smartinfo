var importmaster={};
importmaster.name="マスタデータ導入";
importmaster.paramsFormat={
	// 商品マスタ情報
	"#importfile_master":null,
	"#shop":null
};
var shopname = "";
var count = 0;
importmaster.fire=function(params){

	file.saveUploadFiles("upload");

	shopname = params["#shop"];

	var ret = new Result();

	count = 0;

	var fa = params["#importfile_master"].split("\\");

	var f = fa[fa.length-1];

	var sheetName = "";
	if(shopname == "Smart-Bear"){
		sheetName = "新店";
	}else if(shopname == "Smart-KM"){
		sheetName = "旧店";
	}

	importMasterList(f, sheetName, sheetName);

	var d = new Date().format("yyyy-MM-dd");

	var historyResult = db.change(
		"UPLOAD",
		"insertHistory",
		{
			"col0":shopname,
			"col1":"master",
			"col2":d,
			"col3":count
		}
	);
	
	return ret.navigate("si_upload.jsp?shop=" + shopname);

};