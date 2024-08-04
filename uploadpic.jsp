<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>写真アップロード</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<efw:Client/>
	<script>

			// function initUpload(){
			// 	Efw('initupload');
			// }

			// function importData(){

			// 	var rd = $("input[name='opt_type']:checked").val();

			// 	Efw('uploadfile',{data:'liststock', liststock: rd});

			// }
			function toPhoto(code) {
				let url = contextPath + "/toPhoto.html?code=" + code;
				// 打开拍照界面，回调图片URL
				openDialog("Photo", "拍照", url, 980, 622, true, (o) => {
					if (o != null && o.imgUrl != null && o.imgUrl != undefined) {
						let code = o.code;
						let url = o.imgUrl;
						// 显示图片
						$("#showImage_" + code).prop("src", url).show();
						$("#imageUrl_" + code).val(url);
					}
				}, false);
			}

			function closeDialog (dlgId) {
				$(document).an_dialog('close', dlgId);
			}

			/**
			 * 打开窗口
			 * 
			 * @param dlgId 对话框ID
			 * @param title 标题
			 * @param url 展示内容的链接
			 * @param width 窗口宽度
			 * @param height 窗口长度
			 * @param modalval
			 * @param onClose 关闭对话框时的回调函数
			 */
			function openDialog(dlgId, title, url, width, height, modalval, onClose) {
				$(document).an_dialog({
					title : title,
					id : dlgId,
					width : width || 900,
					height : height || 700,
					modalval : modalval === undefined ? true : modalval,
					url : url,
					onClose : onClose
				});
			}

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;">

<table class="upfile" id="costtable">
	<tr>
		<td >
			<img id="showImage_img1" class="showBigImg pic" style="display:none;height:150px;width: 100%;" alt="暂无">
			<input type="hidden" class="u-input" id="imageUrl_img1" name="img1" v-model="userInfo.img1">
			<input title="上传照片" type="button" id="img1" onclick="toPhoto('img1')">
		</td>
	</tr>
</table>

</body>
</html>