<?php
	//
	include_once("basedatos.php");
	//
	$idcliente = $_POST["registro"];
	$stxtsalida = "";
	//
	$sql = "SELECT * "
	. " FROM clientes "
	. " WHERE idCLIENTE=" . $idcliente;
	//
	$result = mysql_query($sql, $conn) or die("Imposible leer datos de clientes !");
	//
	if($result){
		while ($arrayDatos = mysql_fetch_row($result)){
			foreach($arrayDatos as $out){
				$stxtsalida .= " [ " . $out . " ] ";
			}
			$stxtsalida .= "<br />";
		}
	}
	//
	mysql_free_result($result);
	header('Content-Type: application/json; charset=utf8');
	echo $stxtsalida;		
?>