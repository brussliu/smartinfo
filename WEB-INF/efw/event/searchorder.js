var searchorder={};
searchorder.name="商品一覧検索";
searchorder.paramsFormat={
};
searchorder.fire=function(params){
	
	var ret = new Result();

	var resultHTML = 
	"<tr>" +
		"<td>{col1}</td>" +
		"<td>{col2}</td>" +
		"<td>{col3}</td>" +
		"<td>{col4}</td>" +
		"<td>{col5}</td>" +
		"<td>{col6}</td>" +
		"<td>{col7}</td>" +
		"<td>{col8}</td>" +
		"<td>{col9}</td>" +
		"<td>{col10}</td>" +
		"<td>{col11}</td>" +
		"<td>{col12}</td>" +
		"<td>{col13}</td>" +
		"<td>{col14}</td>" +
		"<td>{col15}</td>" +
		"<td>{col16}</td>" +
		"<td>{col17}</td>" +
		"<td>{col18}</td>" +
		"<td>{col19}</td>" +
		"<td>{col20}</td>" +
		"<td>{col21}</td>" +
		"<td>{col22}</td>" +
		"<td>{col23}</td>" +
		"<td>{col24}</td>" +
		"<td>{col25}</td>" +
		"<td>{col26}</td>" +
		"<td>{col27}</td>" +
		"<td>{col28}</td>" +
		"<td>{col29}</td>" +
		"<td>{col30}</td>" +
	"</tr>";

	var selectResult = db.select(
		"ORDER",
		"selectorderbyorder",
		{}
	).getArray();

	ret.runat("#ordertable").remove("tr").append(resultHTML).withdata(selectResult);

	var script = "$('#orderlist').show();";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
