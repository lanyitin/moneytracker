<?php
	require_once("../configure.php");
	session_start();
	if($_POST["description"] == "" || $_POST["amount"] == "" || $_POST["cateid"] == "" || !array_key_exists("userid", $_SESSION))die(var_dump($_POST));
	$sql = sprintf("insert into Expense (cateid, userid, description, amount, day, month, year) values(%d, %d, '%s', %d, %d, %d, %d)",$_POST["cateid"], $_SESSION["userid"], $_POST["description"], $_POST["amount"], $_POST["day"], (int)$_POST["month"] , $_POST["year"]);
	mysql_query($sql) or die(mysql_error());
	echo json_encode(array("id"=>mysql_insert_id(), "cateid"=>$_POST["cateid"], "description"=>$_POST["description"], "amount"=>$_POST["amount"], "day"=>$_POST["day"], "month"=>(int)$_POST["month"] - 1, "year"=>$_POST["year"]));
?>
