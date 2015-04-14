<?php
	require_once("../configure.php");
	session_start();
	if(!array_key_exists("email", $_SESSION) || !array_key_exists("username", $_SESSION) || !array_key_exists("userid", $_SESSION)){
		die("unknow user");
	}
	$sql = sprintf("select * from Cate where userid=%d", $_SESSION["userid"]);
	$result = mysql_query($sql) or(die(mysql_error()));
	$cates = array();
	while($row = mysql_fetch_assoc($result)){
		$cates[] = $row;
	}
	echo json_encode($cates);
?>
