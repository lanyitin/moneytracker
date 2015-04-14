<?php
	global $template;
	if(array_key_exists("username", $_SESSION) && !is_null($_SESSION["username"]) && $_SESSION['username'] != ""){
		header("Location: ?url=rander");
	}
	if(array_key_exists("username", $_POST) && array_key_exists("email", $_POST)){
		//fetch data from datebase
		//if data fetched -> rander
		//header("Location: /rander");
		$email = $_POST["email"];
		$username = $_POST["username"];
		$sql = sprintf("select * from User where email='%s' and name='%s'", $email, $username);
		$result = mysql_query($sql) or die(mysql_error());
		if(mysql_num_rows($result)){
			$row = mysql_fetch_assoc($result);
			$_SESSION["email"] = $email;
			$_SESSION["username"] = $username;
			$_SESSION['userid'] = $row['id'];
			setcookie("email", $email, 9999999999999999999999999999);
			header("location:/MoneyTracker/rander");
		}
	}
	$template->assign("tpl_name", "login");
?>
