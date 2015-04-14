<?php
	session_start();
	require_once("../configure.php");
	$email = $_POST["email"];
	$username = $_POST["username"];
	if(filter_var($email, FILTER_VALIDATE_EMAIL) == false){die("invalidated email");}
	if(!preg_match("/[\w]*/", $username)){die("invalidated username");}
	$sql = sprintf("select * from User where email='%s' and name='%s'", $email, $username);
	$result = mysql_query($sql);
	if(mysql_num_rows($result)){
		die("identifier repeat");
	}else{
		$sql = sprintf("insert into User (email, name) values ('%s','%s')", $email, $username);
		mysql_query($sql) or die(mysql_error());
		$sql = sprintf("select * from User where email='%s' and name='%s'", $email, $username);
		$result = mysql_query($sql);
		$row = mysql_fetch_assoc($result);
		$_SESSION["email"] = $email;
		$_SESSION["username"] = $username;
		$_SESSION['userid'] = $row['id'];
		setcookie("email", $email, 9999999999999999999999999999);
		echo "successful";
	}
?>
