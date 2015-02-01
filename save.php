<?php

include "connection.php";

$ipAddress = $_SERVER['REMOTE_ADDR'];
$param = $_POST;
//print_r($param);die();
$sql = "INSERT INTO session (sessionStart, sessionFinish, ipAddress)". 
		"values(CAST('".date("Y-m-d H:i:s",strtotime($param['start']))."' AS DATETIME), NOW(), '$ipAddress' )";	
		

$result = $conn->query($sql);
$last_id = $conn->insert_id;
//echo $last_id;die();

$sql = "INSERT INTO sessiondetail (idSession, xPosition, yPosition, face, createdAt)".
			"VALUES ($last_id, {$param['position'][1]}, {$param['position'][0]}, '{$param['direction']}', now())";
$result = $conn->query($sql);

$sql = "SELECT * FROM session";

$result = $conn->query($sql);

$output = array("insertId"=>$last_id,"status"=>"");

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //echo "id: " . $row["id"]. " - Name: " . $row["sessionStart"]. " " . $row["sessionFinish"]. "<br>";
		
    }
	header('Content-Type: application/json');
	echo json_encode($output);
} else {
    echo "0 results";
}
$conn->close();

?>