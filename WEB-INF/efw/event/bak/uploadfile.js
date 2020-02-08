var uploadfile={};
uploadfile.name="ファイルアップロード";
uploadfile.paramsFormat={
	"#importfile":"required:true;display-name:出品詳細ファイル;",
};
uploadfile.fire=function(params){

	file.saveUploadFiles("upload");

	var fa = params["#importfile"].split("\\");
	var f = fa[fa.length-1];


	var txtReader = new TXTReader("upload/" + f, "utf-8");


	var txtArray = txtReader.readAllLines();
	txtArray.debug("HHHHHHHHHHHH");

	return (new Result());

};

function importFile(aryField, index) {


	//aryField.length.debug("HHHHHHHHHHHH");

};