var LG01_submit={};
LG01_submit.name="LG01 ログイン 認証処理";
/**
 * パラメーターフォーマット
 */
LG01_submit.paramsFormat={
	"#txt_uid":"required:true;display-name:ユーザID;",																				//アカウント
	"#txt_pwd":"required:true;display-name:パスワード;",																				//パスワード
};
/**
 * 認証処理関数
 */
LG01_submit.fire=function(params){
	
												// cookieにアカウントを設定する
		return (new Result()).navigate("LG02.jsp");													// メニュー画面へ遷移する

};
