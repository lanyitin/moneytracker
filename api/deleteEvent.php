<?php
	require_once("../configure.php");
	$sql = sprintf("delete from Expense where id=%d", (int)$_POST["id"]);
	mysql_query($sql) or die(mysql_error());
?>
