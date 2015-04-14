<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta name="description" content="a monthly and daliy expense track system"/>
		<meta name="keywords" content="money, MONEY, Money, track, Track"/>
		<title>MoneyTracker</title>
		<link href="css/style.css" rel="StyleSheet" type="text/css"/>
		<link href="css/calendar.css" rel="StyleSheet" type="text/css"/>
		<link href="images/icon.png" rel="icon" type="image/png"/>
		<script type="text/javascript" src="js/jquery-1.7.min.js"></script>
		<script type="text/javascript" src="js/calendar.js"></script>
		<script type="text/javascript" src="js/DateEnhence.js"></script>
		<script type="text/javascript" src="js/MoneyTracker.js"></script>
	</head>
	<body>
		<div id="dialog"><div id="window"><div id="cross">x</div><div id="message"></div></div></div>
		<div id="out_wrap">
			{include file="$tpl_name.tpl"}
		</div>
	</body>
</html>
