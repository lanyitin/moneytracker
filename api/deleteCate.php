<?php
	require_once("../configure.php");
	session_start();
	$sql = sprintf("delete from Expense where cateid=%d AND userid=%d", $_POST["id"], $_SEESSION["userid"]);
	mysql_query($sql) or die(mysql_error());
	$sql = sprintf("delete from Cate where id=%d AND userid=%d", $_POST['id'], $_SESSION["userid"]);
	mysql_query($sql) or die(mysql_error());
?>
