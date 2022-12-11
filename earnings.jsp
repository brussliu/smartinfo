<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>売上情報</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<!--
	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	-->
	
	<efw:Client/>
	<script>

        function searchearningslistinfo(){

			Efw('earnings/searchearningslist');
		}

        function opendetail(obj){

			var yearmonth = $(obj).html();

			Efw('earnings/openearningsdetail',{'yearmonth': yearmonth});

		}

  	</script>
</head>
<body style="background-color:ghostwhite;" onload="searchearningslistinfo()">
	<efw:Part path="earnings_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/smartinfo/si_menu.jsp'">
</div>
<input type="hidden" id="shop">
<hr>
<table border="1" id="earningslisttable" style="font-size: 16px;">
	<tr style="background-color: aqua;height:40px;font-weight: bold;">
		<td style="width: 120px;">年月</td>
		<td style="width: 100px;">注文数量</td>
		<td style="width: 120px;">注文粗利益</td>
		<td style="width: 120px;">月額登録料</td>
		<td style="width: 120px;">広告費用</td>
		<td style="width: 120px;">返品損失金額</td>
		<td style="width: 120px;">FBA入庫料金</td>
		<td style="width: 120px;">FBA保管料金</td>
		<td style="width: 120px;">振込金額</td>
		<td style="width: 120px;">仕入金額</td>
		<td style="width: 120px;">その他</td>
		<td style="width: 120px;">純利益</td>
	</tr>
</table>

</body>
</html>