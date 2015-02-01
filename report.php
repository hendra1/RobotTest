<?php

include "connection.php";

$param = $_POST['id'];
//print_r($param);die();
$sql="SELECT * FROM sessiondetail where idSession = $param";

$result = $conn->query($sql);
$output = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        //echo "id: " . $row["id"]. " - Name: " . $row["sessionStart"]. " " . $row["sessionFinish"]. "<br>";
		$output['position'] = array($row['xPosition'],$row['yPosition']) ;
		$output['direction'] = strtoupper($row['face']);
    }
	header('Content-Type: application/json');
	echo json_encode($output);
} else {
    echo "0 results";
}
$conn->close();
?>