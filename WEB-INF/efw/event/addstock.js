var addstock={};
addstock.name="在庫補足";
addstock.paramsFormat={

	'addproductno': null,
	'addproductcolor': null,
	'addproductsize': null,
	'addproductsku': null,
	'addproductasin': null,
	'addproductlabel': null,
	'addproductnm': null,
	'addproductselledweek': null,
	'addproductfbm': null,
	'addproductfba': null,
	'addproductonsellweek': null

};
addstock.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}
	
	var resultHTML = 
			"<tr>" +
				"<td style='width: 100px;'>{addproductno}</td>" +
				"<td style='width: 100px;'>{addproductcolor}</td>" +
				"<td style='width: 100px;'>{addproductsize}</td>" +
				"<td style='width: 100px;'>{addproductsku}</td>" +
				"<td style='width: 100px;'>{addproductasin}</td>" +
				"<td style='width: 100px;'>{addproductlabel}</td>" +
				"<td style='width: 750px;'>{addproductnm}</td>" +
				"<td style='width: 100px;'>{addproductselledweek}</td>" +
				"<td style='width: 80px;'>{addproductfbm}</td>" +
				"<td style='width: 80px;'>{addproductfba}</td>" +
				"<td style='width: 100px;'>{addproductonsellweek}</td>" +
				"<td style='width: 100px;text-align: center;'><input type='text' value='0' onblur='compute(this);' style='width: 95px;height:50px;text-align: right;font-size:40px;color:red;'></td>" +
				"<td style='width: 100px;'>{addproductonsellweek}</td>" +
			"</tr>";


	var selectResult = new Array();

	for(var i=0;i<params["addproductsku"].length;i++){

		var obj = {
			addproductno:params["addproductno"][i], 
			addproductcolor:params["addproductcolor"][i], 
			addproductsize:params["addproductsize"][i], 
			addproductsku:params["addproductsku"][i], 
			addproductasin:params["addproductasin"][i], 
			addproductlabel:params["addproductlabel"][i], 
			addproductnm:params["addproductnm"][i], 
			addproductselledweek:params["addproductselledweek"][i], 
			addproductfbm:params["addproductfbm"][i], 
			addproductfba:params["addproductfba"][i], 
			addproductonsellweek:params["addproductonsellweek"][i]
			
		};
		selectResult.push(obj);
	}


	ret.runat("#addstocktable").remove("tr").append(resultHTML).withdata(selectResult);

	ret.eval("si_stock_inputdialog.dialog('open');changeDialogColor();");

	return (ret);

};
