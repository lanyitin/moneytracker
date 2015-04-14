<?php
	require_once("../configure.php");
	session_start();
	$sql = sprintf("insert into Cate (userid, name, RGB) values (%d, '%s', '%s')", $_SESSION["userid"], $_POST["name"], $_POST["RGB"]);
	mysql_query($sql) or die(mysql_error());
?>
