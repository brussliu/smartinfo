var searchshipmaster={};
searchshipmaster.name="発送商品マスタ検索";
searchshipmaster.paramsFormat={

};

searchshipmaster.fire=function(params){
	
	var ret = new Result();

	if (checkLoginInfo() == false) {
		return ret.navigate("login.jsp");
	}

	var userid = session.get("USER_ID");
	var shopid = session.get("SHOP_ID");

	var onclick = "";

	if(userid == "jly99641" && shopid == "Smart-Bear"){
		onclick = "activebutton();"
	}else if(userid == "12345678" && shopid == "12345678"){
		onclick = ""
	}

	var resultHTML = 
	"<tr class='content'>" +
		"<td><input type='radio' name='selectshipmasterno' value='{pid}' onclick='" + onclick + "'></input></td>" +
		"<td>{pid}</td>" +
		"<td>{div}</td>" +
		"<td>{namecn}&nbsp;{color}&nbsp;{size}</td>" +
		"<td>{namejp}</td>" +
		"<td>{ct}</td>" +
		"<td>{biko}</td>" +
		"<td><img src='{pic}' width='150px;'></td>" +
	"</tr>";

	var selectResult = db.select(
		"SHIPACTINGMASTER",
		"selectshipmaster",
		{}
	).getArray();

	ret.runat("#productlist").remove(".content");
	ret.runat("#productlist").append(resultHTML).withdata(selectResult);

	if(userid != "jly99641" || shopid != "Smart-Bear"){
		ret.eval("hiddenbutton()");
	}

	// 画面へ結果を返す
	return ret;

};
