var searchscandetail={};
searchscandetail.name="スキャン内容検索";
searchscandetail.paramsFormat={
	listno : null
};
searchscandetail.fire=function(params){

	var ret = new Result();

	var listno = params["listno"];

	var selectResult1 = db.select(
		"SCAN",
		"searchallscanlistbylistno",
		{
			listno:listno
		}
	).getSingle();

	var listname = selectResult1["listname"];
	var listcontent = selectResult1["listcontent"];

	var script = "$('#scancode').val('');$('#listname').val('" + listname + "');$('#listcontent').val('" + listcontent + "');";
	

	var selectResult2 = db.select(
		"SCAN",
		"searchscandetail",
		{
			listno:listno
		}
	).getArray();

	var resultHTML = 
	"<tr class='listcontent'>" +
		"<td>{pno}</td>" +
		"<td>{color}</td>" +
		"<td>{size}</td>" +
		"<td>{sku}</td>" +
		"<td>{asin}</td>" +
		"<td>{labelno}</td>" +
		"<td>{pname}</td>" +
		"<td>{count}</td>" +
	"</tr>";


	ret.runat("#lefttable").remove(".listcontent");

	ret.runat("#lefttable").append(resultHTML).withdata(selectResult2);

	return ret.eval(script);


};
