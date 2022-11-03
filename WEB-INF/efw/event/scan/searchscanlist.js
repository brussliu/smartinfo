var searchscanlist={};
searchscanlist.name="スキャン";
searchscanlist.paramsFormat={

};
searchscanlist.fire=function(params){

	var ret = new Result();

	var selectResult = db.select(
		"SCAN",
		"searchallscanlist",
		{
		}
	).getArray();

	var resultHTML = 
	"<tr class='content'>" +
	"	<td><input type='radio' name=''></td>" +
	"	<td>{listno}</td>" +
	"	<td>{listname}</td>" +
	"</tr>" +
	"<tr class='content'>" +
	"	<td colspan='3'>{listcontent}</td>" +
	"</tr>";

	ret.runat("#scanlisttable").remove(".content");

	ret.runat("#scanlisttable").append(resultHTML).withdata(selectResult);

	return ret;


};
