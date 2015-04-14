<?php
	require_once("../configure.php");
	session_start();
	$sql = sprintf("update Cate set name='%s', RGB='%s' where id=%d AND userid=%d", $_POST['name'], $_POST['RGB'], $_POST['id'], $_SESSION['userid']);
	mysql_query($sql) or die(mysql_error());
	echo $sql;
?>
