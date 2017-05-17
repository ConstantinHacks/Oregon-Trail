<?php 
ini_set('display_errors', 1);

class Common
{	

	var $conn;
    var $debug;
		
	function Common()
	{
        $this->debug = true; 
		$rs = $this->connect("koehler1"); // db name really here
		return $rs;
	}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	
	function connect($db)// connect to MySQL
	{
		$conn = mysqli_connect("studentdb-maria.gl.umbc.edu", "koehler1", "koehler1") or die("Could not connect to MySQL");
		$rs = mysqli_select_db($conn,$db) or die("Could not connect select $db database");
		$this->conn = $conn; 
	}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
	
	function executeQuery($sql, $filename) // execute query
	{
		// if($this->debug == true) { echo("$sql <br>\n"); }
		$rs = mysqli_query($this->conn,$sql) or die("Could not execute query $sql in $filename"); 
        return $rs;
		mysqli_close($con);
	}			
} // ends class, NEEDED!!



$totalDistance = $_POST["totalDistance"];
$name = $_POST["name"];
$DOD = $_POST["DOD"];
$message = $_POST["message"];
$ts = $_POST["ts"];



$sql = "INSERT INTO tombstones (count, timestamp, DOD, name, mile, message) VALUES (0,$ts,$DOD,$name,$totalDistance,$message)";
$db = new Common();
$rs = $db->executeQuery("$sql","getTombStones.php");
echo json_encode($rs);

?>