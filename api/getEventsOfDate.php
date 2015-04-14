<?php
	require_once("../configure.php");
	session_start();
	$sql = sprintf("select *  from Expense where userid=%d AND year=%d AND month=%d AND day=%d", $_SESSION["id"], $_POST["year"], $_POST["month"], $_POST['day']);
	$result = mysql_query($sql) or die(mysql_error());
	$events = array();
	while($row = mysql_fetch_assoc($result)){
		$events[] = $row;
	}
	echo json_encode($events);
?>
