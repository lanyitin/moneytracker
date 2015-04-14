<?php
	require_once("Smarty.class.php");
	require_once("configure.php");
	session_start();
	$url = $_GET["url"];
	$template = new Smarty();
	$template->assign("SESSIONI", session_id());
	if(!array_key_exists("username", $_SESSION) || !array_key_exists("email", $_SESSION) || !array_key_exists("userid", $_SESSION)){
		require_once("actions/login.php");
	}else{
		if($url == "" || $url == null){
			$url = "rander";
		}
		require_once("actions/" . $url . ".php");
	}
	$template->display("index.tpl");
?>
