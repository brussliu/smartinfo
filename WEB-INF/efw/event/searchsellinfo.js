var searchsellinfo={};
searchsellinfo.name="販売検索";
searchsellinfo.paramsFormat={
	"#shop":null,
	"#datefrom":null,
	"#dateto":null
};
var shopname = "";
searchsellinfo.fire=function(params){
	
	var ret = new Result();
	shopname = params["#shop"];

	var datefrom = params["#datefrom"];
	var dateto = params["#dateto"];

	if(datefrom == dateto){

		var resultHTML = 
		"<tr >" +
			"<td >{更新日}</td>" +
			"<td >{商品管理番号}</td>" +
			"<td >{評価数}</td>" +
			"<td >{評価度}</td>" +
			"<td >{レベル1種類}</td>" +
			"<td >{レベル1数}</td>" +
			"<td >{レベル2種類}</td>" +
			"<td >{レベル2数}</td>" +
			"<td >{質問数}</td>" +
			"<td >{最新評価1}</td>" +
			"<td >{最新評価2}</td>" +
			"<td >{最新評価3}</td>" +
			"<td >{販売数量(週間平均値)}</td>" +
			"<td >{在库合計}</td>" +
		"</tr>";

			var selectResult = db.select(
				"SELLINFO",
				"selectSellinfo",
				{
				shop:shopname,
				datefrom: datefrom
				}
			).getArray();

			ret.runat("#sellinfolist").remove("tr").append(resultHTML).withdata(selectResult);

	}else{

	}











	// var script = "$('#stocklist').show();changeColor();";
	// ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
