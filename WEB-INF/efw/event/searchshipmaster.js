var searchshipmaster={};
searchshipmaster.name="発送商品マスタ検索";
searchshipmaster.paramsFormat={

};

searchshipmaster.fire=function(params){
	
	var ret = new Result();

	var resultHTML = 
	"<tr class='content'>" +
		"<td><input type='button' style='width:50px;' value='削除' onclick=\"delMaster('{pid}')\"></td>" +
		"<td>{pid}</td>" +
		"<td>{div}</td>" +
		"<td>{namecn}</td>" +
		"<td>{namejp}</td>" +
		"<td>{color}</td>" +
		"<td>{size}</td>" +
		"<td>{ct}</td>" +
		"<td>{biko}</td>" +
		"<td><img src='{pic}' width='150px;'></td>" +
	"</tr>";

	var selectResult = db.select(
		"MASTER",
		"selectshipmaster",
		{}
	).getArray();

	ret.runat("#productlist").remove(".content");
	ret.runat("#productlist").append(resultHTML).withdata(selectResult);

	// 画面へ結果を返す
	return ret;

};
