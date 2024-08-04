<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="efw" uri="efw" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>写真アップロード</title>

	<script type="text/javascript" language="javascript" src="js/common.js"></script>

	<efw:Client/>
	<script>

  	</script>
    <style>

    </style>
</head>
<body style="background-color:ghostwhite;">

	<div style="text-align: center;padding-top: 20px;">
		<video id="video" width="800px" height="400px" autoplay="autoplay"></video>
	</div>
	<div style="float: right;padding-top: 20px">
		<canvas id="canvas" width="400px" height="400px"></canvas>
	</div>
	<button class="noprint u-btn success" onclick="myPhoto()">拍照</button>
	<button class="noprint u-btn texture dark" onclick="closeDialog('Photo')">取消</button>
	
	<script>
		// 回调对象设置
		let o;
		$(function () {
				window.dialogReady = function (dialog, options) {
					o = options;
				};
		})
	
		let code = document.getElementById("code").value;
		// 图片上传地址
		let baseImgUrl = "https://xxxx";
		//获得video摄像头区域
			let video = document.getElementById("video");
			window.onload = function () {
				getMedia();
			}
			// 开启摄像头
			function getMedia() {
				let constraints = {
					video: {width: 500, height: 500},
					audio: true
				};
				let promise = navigator.mediaDevices.getUserMedia(constraints);
				promise.then(function (MediaStream) {
					video.srcObject = MediaStream;
					video.play();
				}).catch(function (PermissionDeniedError) {
					console.log(PermissionDeniedError);
				});
			};
			// 将base64转换为blob
			function dataURLtoFile(dataURI, type) {
				let binary = atob(dataURI.split(',')[1]);
				let array = [];
				for (let i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {type: type});
			}
			// 照片处理
			function myPhoto() {
				//获得Canvas对象
				let canvas = document.getElementById("canvas");
				let ctx = canvas.getContext('2d');
	
				// var image = new Image(); //定义一个图片对象
				// image.src = 'imgs/img.jpg';
				// image.onload = function () { // 此处必须注意！后面所有操作均需在图片加载成功后执行，否则图片将处理无效
					// 截取视频图像
					ctx.drawImage(video, 0, 0, 500, 500);
	
					// 处理拍照图片,获取图片base64显示数据
					let imgUrl = canvas.toDataURL();
					let blob = dataURLtoFile(imgUrl, 'image/jpeg');
					let formData = new FormData();
					let fileOfBlob = new File([blob], new Date() + '.jpg'); // 重命名了
					formData.append("fileId", fileOfBlob);
					$.ajax({
						url: baseImgUrl + "img-api/api/upload/uploadImage", //用于文件上传的服务器端请求地址
						dataType: 'json',
						type: 'POST',
						async: false,
						data: formData,
						processData: false, // 使数据不做处理
						contentType: false, // 不要设置Content-Type请求头
						success: function (r) { //服务器成功响应处理函数
							if (r.state) {
								var data = r.result;
								var url = baseImgUrl + data[0]
								if (url != null && url != "") {
									// 设置回调图片地址
									o.imgUrl = url;
									o.code = code;
									// 关闭摄像头
									// let mediaStreamTrack = video.srcObject;
									// mediaStreamTrack.getTracks().forEach(function(track) {
									//     track.stop();
									// });
									closeDialog('Photo');
								}
							} else {
								message("错误", "上传失败");
							}
						}
					});
				// }
			}
	</script>

</body>
</html>