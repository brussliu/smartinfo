var searchshipinfo={};
searchshipinfo.name="发送情报检索";
searchshipinfo.paramsFormat={
	"#product_name":null,
};

searchshipinfo.fire=function(params){
	
	var ret = new Result();
	//shopname = params["#shop"];

	var resultHTML = 
	"<tr class='content' style=''>" +
		"<td style='width: 50px'><input type='radio' name='selectshipno' value='{shipno}' onclick='activebutton();'></input></td>" +
		"<td style='width: 130px'>{shipno}</td>" +
		"<td style='width: 50px '>{status}</td>" +
		"<td style='width: 100px'>{fee}</td>" +
		"<td style='width: 100px'>{amount}</td>" +
		"<td style='width: 80px '>{postno}</td>" +
		"<td style='width: 180px'>{address1}</td>" +
		"<td style='width: 250px'>{address2}</td>" +
		"<td style='width: 250px'>{address3}</td>" +
		"<td style='width: 150px'>{shipcontent}</td>" +
		"<td style='width: 60px '>{shipcount}</td>" +
		"<td style='width: 150px'>{shipdiv}</td>" +
		"<td style='width: 200px'>{biko}</td>" +
		"<td style='width: 100px'>{trackingno}</td>" +
	"</tr>";

	var selectResult = db.select(
		"SHIP",
		"searchShipInfo",
		{}
	).getArray();

	ret.runat("#shipinfotable").remove(".content");
	ret.runat("#shipinfotable").append(resultHTML).withdata(selectResult);

	var script = "changeColor();";
	ret.eval(script);


	return ret;

};
