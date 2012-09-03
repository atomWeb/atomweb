<?php
	//
	include_once("basedatos.php");
	//
	$sql = "SELECT idCLIENTE, NOMBRE, CONCAT(APELLIDO1, ' ',APELLIDO2) AS APELLIDO, NIF "
	. " FROM clientes ";
	//. " WHERE c.group_id = g.id";
	//
	$result = mysql_query($sql, $conn) or die("Imposible leer datos de clientes !");
	//	
	$data = array('items' => array());
	//
	if(mysql_num_rows($result) > 0) {
		while($row = mysql_fetch_assoc($result)) {
			$data['items'][] = $row;
		}
	}
	//
	mysql_free_result($result);
	header('Content-Type: application/json; charset=utf8');
	echo json_encode($data);
?>	