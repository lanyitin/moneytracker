<?php
	require_once("../configure.php");
	$sql = sprintf("select * from Expense where cateid=%d", (int)$_POST["id"]);
	$result = mysql_query($sql) or die(mysql_error());
	$events = array();
	while($row = mysql_fetch_assoc($result)){
		$events[] = $row;
	}
	echo json_encode($events);
?>
