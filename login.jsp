<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Smart-Infoメニュー</title>
	<efw:Client/>
</head>
<body style="background-color:ghostwhite;">

	<table style="width:1506px;height: 800px;" border="0">
		<tr>
			<td align="center">
				<INPUT TYPE="TEXT" STYLE="WIDTH:400px;height:50px;font-size: 50;color: red;" value="" maxlength="8" id="userid">
				<input type="BUTTON" value="ログイン" style="width:200px;height: 50px;font-size:30;padding-bottom: -20px;" onclick="Efw('login')">
			</td>
		</tr>
	</table>

</body>
</html>