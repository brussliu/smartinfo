var global={};
global.name="システム初期化";

var addressList = file.readAllLines("templates/addressList.txt").split("\r\n");
/**
 * グローバルイベント実行関数
 */
global.fire=function(){


};
/**
 * ページング用データの取得<br>
 * <br>
 * select(groupId,getCountSqlId,getDataSqlId,searchCondition)
 * select(groupId,getCountSqlId,getDataSqlId,searchCondition,pageRows)
 * <br>
 * @パラメータ {String}
 *			groupId
 * @パラメータ {String}
 *			getCountSqlId レコードの総数
 * @パラメータ {String}
 *			getDataSqlId 毎ページの記録
 * @パラメータ {Object}
 *			searchCondition 検索条件
 * @パラメータ {String}
 *			pageRows 毎ページの行数
 * @return {Record}
 */
function getPageData(groupId,getCountSqlId,getDataSqlId,searchCondition,pageRows,jdbcResourceName) {
	if(pageRows == null){
		pageRows = 100;
	}
	// レコード総数の取得
	var cnt=db
	.select(
			groupId,																				// 外だしSQLファイル名
			getCountSqlId,																			// 总记录数取得しようのデータを検索するSQL名
			searchCondition,																		// 検索条件
			jdbcResourceName																		// jdbc接続名
	)
	.getValue("cnt");
	var pages = Number.parse((cnt/pageRows).format("0","UP"));
	
	if (pages<cnt/pageRows)pages = pages + 1;
	if (searchCondition.currentPage>pages)searchCondition.currentPage = pages;
	if (searchCondition.currentPage<1)searchCondition.currentPage = 1;
	searchCondition["offset"] = (searchCondition.currentPage - 1) * pageRows;
	searchCondition["limit"] = pageRows;
	if (searchCondition.orderBy != null){
		searchCondition[searchCondition.orderBy] = "true";
	}
	var pageData = db
	.select(
			groupId,																				// 外だしSQLファイル名
			getDataSqlId,																			// 总记录数取得しようのデータを検索するSQL名
			searchCondition,																		// 検索条件
			jdbcResourceName																		// jdbc接続名
	);
	searchCondition.allPages = pages;
	searchCondition.totalNumber = cnt;
	return pageData;
}

function getStandardAddress(address){

	var standardAddress = new Array();

	var address1 = address;
	var address2 = "";

	//addressList.length.debug("000000000000");
	for(var i = 0; i < addressList.length; i ++){

		if(address.indexOf(addressList[i]) >= 0){

			//addressList[i].debug("TTTTTTTTTTTTT");
			//i.debug("IIIIIIIIIIIIIIIIIII");

			address1 = addressList[i];
			break;
		}

	}

	//address1.debug("111111111111111111");

	address2 = address.substring(address1.length);
	//address2.debug("222222222222222222");

	standardAddress.push(address1);
	standardAddress.push(address2);

	//standardAddress.debug("999999999999999")

	return standardAddress;
}

function outputMasterList(excel, selectResult, sheetName, productnameFlg){

	var shop_X = "B";
	var p_no_X = "C";
	var p_category_X = "D";
	var p_type_X = "E";
	var p_color_X = "F";
	var p_size_X = "G";
	var p_sku_X = "H";
	var p_asin_X = "I";
	var p_name_X = "J";

	var row_from = 2;

	for(var i = 0;i < selectResult.length;i ++){

		var y = i + row_from;

		var shopnm = selectResult[i]["shopname"];

		var productno = selectResult[i]["productno"];
		var productdiv = selectResult[i]["productdiv"];
		var producttype = selectResult[i]["producttype"];

		var color = selectResult[i]["color"];
		var size = selectResult[i]["size"];

		var sku = selectResult[i]["sku"];
		var asin = selectResult[i]["asin"];

		var productname = selectResult[i]["productname"];

		excel.setCell(sheetName, shop_X + y, shopnm);

		excel.setCell(sheetName, p_no_X + y, productno);

		excel.setCell(sheetName, p_category_X + y, productdiv);

		excel.setCell(sheetName, p_type_X + y, producttype);

		excel.setCell(sheetName, p_color_X + y, color);

		excel.setCell(sheetName, p_size_X + y, size);

		excel.setCell(sheetName, p_sku_X + y, sku);

		excel.setCell(sheetName, p_asin_X + y, asin);

		if(productnameFlg){
			excel.setCell(sheetName, p_name_X + y, productname);
		}

	}





}