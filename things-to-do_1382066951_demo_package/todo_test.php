<html>
<style type="text/css">
*{
	margin: 10px;
	padding: 10px;
}
body{
	width: 520px;
	min-height: 600px;
	text-align: center;
}
#main{
	width: 100%;
	height: auto;
	text-align: left; 
	background-color:#006699;
}
#cover{
	margin: 10px;
	background-color:#009900;
}
#plates{
	background-color:#CCCCCC;
	margin: 2px;
}
#plates p{
	padding-right: 20px;
	float:left;
	font: 18px bold tahoma;
	color: #333333;
}

#hid{
	font-size: 1em;
    color: transparent; /* Fix for Firefox */
    border-style: none;
    border-width: 0;
    padding: 0 0 0 16px !important; /* Fix for Internet Explorer */
    text-align: left;
    width: 25px;
    height: 25px;
    line-height: 1 !important;
    background: transparent url(x.png) no-repeat scroll 0 0;
    overflow: hidden;
    cursor: pointer;
	}
</style>

<div id="main" >
<p style="color: #a2a2a2; font: bold 14px tahoma;"> This Demo requires mySql database. So, this won't run here.., but you can download and use the source by connecting it with your database. </p> <p style="color: #a2a2a2; font: bold 14px tahoma;"> OR, </p> <a href="http://teampixfx.com/downloads/firefox/todo_test.php" style="color: WHITE; font: bold 14px tahoma;"> Watch the working demo here. <a/>

<form action="todo_test.php" method="post" >

<input name="item" placeholder="Type todo item" />
<input name="date" placeholder="proposed date dd/mm/YYYY" />
<input type="submit" name="sub" value="Submit"  />
<div id="cover" >


<?php
$item = $_POST['item'];
$date = $_POST['date'];
$set_id = 0;

$dbhost = 'localhost';
$dbuser = '';
$dbpass = '';


$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
  die('Could not connect: ' . mysql_error());
}


mysql_select_db("jubin");
/*$max = mysql_query(" SELECT MAX(id) AS maximum FROM todo_test") or die(mysql_error());
while($row = mysql_fetch_array($max))
{
echo "max data is: ".$row[maximum]."<br />";
$set_id = $row[maximum] + 1;
} */

//getting no of rows
$max = mysql_query(" SELECT * FROM todo_test") or die(mysql_error());
$num_rows = mysql_num_rows($max);
//echo "max data is: $num_rows <br />";

// Checking whether delete button is pressed
if(isset($_POST['id']))
{
$max = mysql_query(" DELETE FROM todo_test WHERE id = ".$_POST['id']) or die(mysql_error());
//echo $_POST['id'];
}
// Checking whether submit button is pressed
if(isset($_POST['sub']))
{

//Inserting new value
$conv_date = date('Y-m-d', strtotime($date));
$sql = "INSERT INTO todo_test ( item, timestamp)
VALUES('$item',STR_TO_DATE('$date', '%d/%m/%Y'))";


$retval = mysql_query( $sql, $conn );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}

//echo "Entered data successfully <br />";
//echo "entered data is: ".$item."<br />";

} // Closing if loop


//updating id to numbering
$sql ="SET @rownumber = 0";
$sql1 = "update todo_test set id = (@rownumber:=@rownumber+1)";
$retval = mysql_query( $sql, $conn );
$retval = mysql_query( $sql1, $conn );
if(! $retval )
{
  die('Could not enter data: ' . mysql_error());
}



$result = mysql_query("SELECT * FROM todo_test WHERE 1", $conn );

while($row = mysql_fetch_array($result))
{
   // echo $row['id'] . "<br />";
	echo " <div id='plates'> <p> ".$row['id'] .") ".$row['item']." Date: ".$row['timestamp']." </p>  <input type='submit' id='hid' name='id' value =".$row['id'] ." /> </div> ";
} 

mysql_close($conn);
?>
 
 </div></form></div>
</html>