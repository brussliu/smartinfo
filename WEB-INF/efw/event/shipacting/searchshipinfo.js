var searchshipinfo={};
searchshipinfo.name="发送情报检索";
searchshipinfo.paramsFormat={
};

searchshipinfo.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var resultHTML = 
	"<tr class='content' style=''>" +
		"<td style='width: 40px'><input type='radio' name='selectshipno' value='{shipno}' onclick='activebutton();'></input></td>" +
		"<td style='width: 130px'>{shipno}</td>" +
		"<td style='width: 50px '>{status}</td>" +
		"<td style='width: 80px'>{fee}</td>" +
		"<td style='width: 80px'>{amount}</td>" +
		"<td style='width: 80px '>{postno}</td>" +
		"<td style='width: 400px'>{address1}<br>{address2}<br>{address3}</td>" +
		"<td style='width: 150px'>{name}</td>" +
		"<td style='width: 120px'>{tel}</td>" +
		"<td style='width: 120px'>{shipcontent}</td>" +
		"<td style='width: 60px '>{shipcount}</td>" +
		"<td style='width: 150px'>{shipdiv}</td>" +
		"<td style='width: 200px'>{biko}</td>" +
		"<td style='width: 150px'>{trackingno}</td>" +
	"</tr>";

	var selectResult = db.select(
		"SHIPACTING",
		"searchShipInfo",
		{}
	).getArray();

	ret.runat("#shipinfotable").remove(".content");
	ret.runat("#shipinfotable").append(resultHTML).withdata(selectResult);

	var script = "changeColor();";
	ret.eval(script);


	return ret;

};
