<?php
	//
	$db_user = "xxxxxxxxxxx";
	$db_name = "xxxxxxxxxxx";
	$db_host = "xxxxxxxxxxx";
	$db_pass = "xxxxxxxxxxx";
	
	//Connect to MySQL
	$conn = mysql_connect($db_host, $db_user, $db_pass);
	//Select database
	mysql_select_db($db_name, $conn);
?>