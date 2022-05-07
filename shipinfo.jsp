<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


	<title>发送管理</title>

	<script language="JavaScript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
	<script language="javascript" src="//cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.js"></script>
	<link rel="stylesheet" href="//cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css">

	<efw:Client/>
	<script>

		(function ($) {
            $.getUrlParam = function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }
        })(jQuery);


        function searchshipinfo(){

        	Efw('searchshipinfo');

        }

        function addshipinfo(){

        	Efw('addshipinfo')

        }

		function activebutton(){

			$("#updateship").show();
			
		}

		function updateshipinfo(){

			var shipno = $('input:radio[name=selectshipno]:checked').val();

			Efw('updateshipinfo',{'shipno': shipno})

		}

		function changeColor(){


			$("#shipinfotable").find("tr").each(function(){

				if($(this).children().eq(2).html()=="已取消"){

					$(this).children().eq(0).children().eq(0).hide();

					$(this).css("background-color", "gray");

				}

			});
			
		}

  	</script>

</head>
<body style="background-color:ghostwhite;" onload="searchshipinfo();">
<efw:Part path="shipinfo_inputdialog.jsp"/>
<div style="font-size: 30px;color: blue;display: inline-block;width: 100%" id="pagehead">
	发送管理
	<img src="img/home.png" style="width: 64px;height: 64px;" onclick="window.location.href = '/shipinfo/'">
</div>

<br/>
<table class="productlist" border="0" style="width: 100%;">
	<COLGROUP>
		<COL WIDTH="30PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL WIDTH="200PX">
		<COL WIDTH="100PX">
		<COL >
		<COL WIDTH="220PX">
	</COLGROUP>
	<tr>
		<td style="font-size: 20px;font-weight: bold;height: 50px;" colspan="7">
			检索条件
		</td>
		<td style="text-align: right;" colspan="1">
			<input type="button" style="width: 200px;height: 40px;font-size: 20px;" value="发送请求" onclick="addshipinfo()">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			期间
		</td>
		<td style="font-size: 16px;" colspan="5" id="orderTerm">
			<input type="radio" name="orderTerm01" value="7" disabled>7日以内
			<input type="radio" name="orderTerm01" value="30" checked>30日以内
			<input type="radio" name="orderTerm01" value="999" disabled>すべて
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="searchship" style="width: 200px;height: 40px;font-size: 20px;" value="检索" onclick="searchshipinfo()">
		</td>
	</tr>
	<tr>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
		</td>
		<td style="font-size: 16px;font-weight: bold;height: 40px;">
			状态
		</td>
		<td style="font-size: 16px;" colspan="5" id="orderTerm">
			<input type="checkbox" checked id="status0" value="0">请求中
			<input type="checkbox" checked id="status5" value="5">准备中
			<input type="checkbox" checked id="status8" value="8">已发送
			<input type="checkbox" checked id="status9" value="9">已结算
		</td>
		<td style="font-size: 16px;text-align: right;">
			<input type="button" id="updateship" style="width: 200px;height: 40px;font-size: 20px;display: none;" value="更新" onclick="updateshipinfo()">
		</td>
	</tr>
</table>
<br/>
<hr>
<table border="1" id="shipinfotable" style="font-size: 14px;">
	<tr style="font-weight: bold;background-color: rgb(128,255,255);">
		<td style="width: 50px;">选择</td>
		<td style="width: 130px;">NO</td>
		<td style="width: 50px;">状态</td>
		<td style="width: 100px;">发送费用<br>（日元）</td>
		<td style="width: 100px;">合计<br>（人民币）</td>
		<td style="width: 80px;">邮编号码</td>
		<td style="width: 180px;">住所1</td>
		<td style="width: 250px;">住所2</td>
		<td style="width: 250px;">住所3</td>
		<td style="width: 150px;">发送内容</td>
		<td style="width: 60px;">发送数量</td>
		<td style="width: 150px;">发送方式</td>
		<td style="width: 200px;">备考</td>
		<td style="width: 100px;">追踪号码</td>
	</tr>
</table>

</body>
</html>