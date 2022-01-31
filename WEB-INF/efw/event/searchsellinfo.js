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

		var resultHTML1 = 
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
				"selectSellinfo1",
				{
				shop:shopname,
				datefrom: datefrom
				}
			).getArray();

			ret.runat("#sellinfolist").remove("tr").append(resultHTML1).withdata(selectResult);

	}else{

		var resultHTML2 = 
		"<tr >" +
			"<td class='topcol1'>{比較先-更新日}</td>" +
			"<td class='topcol2'>{商品管理番号}</td>" +
			"<td class='topcol3'>{比較先-評価数}</td>" +
			"<td class='topcol4'>{比較先-評価度}</td>" +
			"<td class='topcol5'>{比較先-レベル1種類}</td>" +
			"<td class='topcol6'>{比較先-レベル1数}</td>" +
			"<td class='topcol7'>{比較先-レベル2種類}</td>" +
			"<td class='topcol8'>{比較先-レベル2数}</td>" +
			"<td class='topcol9'>{比較先-質問数}</td>" +
			"<td class='topcol10'>{比較先-最新評価1}</td>" +
			"<td class='topcol11'>{比較先-最新評価2}</td>" +
			"<td class='topcol12'>{比較先-最新評価3}</td>" +
			"<td class='topcol13'>{比較先-販売数量(週間平均値)}</td>" +
			"<td class='topcol14'>{比較先-在库合計}</td>" +
			"<td class='topcol15' rowspan='2'>{ASIN番号}</td>" +
		"</tr>" +
		"<tr >" +
			"<td class='bottomrow'>{比較元-更新日}</td>" +
			"<td class='bottomrow'>{商品管理番号}</td>" +
			"<td class='bottomrow'>{比較元-評価数}</td>" +
			"<td class='bottomrow'>{比較元-評価度}</td>" +
			"<td class='bottomrow'>{比較元-レベル1種類}</td>" +
			"<td class='bottomrow'>{比較元-レベル1数}</td>" +
			"<td class='bottomrow'>{比較元-レベル2種類}</td>" +
			"<td class='bottomrow'>{比較元-レベル2数}</td>" +
			"<td class='bottomrow'>{比較元-質問数}</td>" +
			"<td class='bottomrow'>{比較元-最新評価1}</td>" +
			"<td class='bottomrow'>{比較元-最新評価2}</td>" +
			"<td class='bottomrow'>{比較元-最新評価3}</td>" +
			"<td class='bottomrow'>{比較元-販売数量(週間平均値)}</td>" +
			"<td class='bottomrow'>{比較元-在库合計}</td>" +
		"</tr>";


		var selectResult = null;

		if(datefrom > dateto){
			selectResult = db.select(
				"SELLINFO",
				"selectSellinfo2",
				{
				shop:shopname,
				datefrom: datefrom,
				dateto: dateto
				}
			).getArray();
		}else{
			selectResult = db.select(
				"SELLINFO",
				"selectSellinfo2",
				{
				shop:shopname,
				datefrom: dateto,
				dateto: datefrom
				}
			).getArray();
		}

		ret.runat("#sellinfolist").remove("tr").append(resultHTML2).withdata(selectResult);

	}


	var script = "changeColor()";
	ret.eval(script);

	// 画面へ結果を返す
	return ret;

};
