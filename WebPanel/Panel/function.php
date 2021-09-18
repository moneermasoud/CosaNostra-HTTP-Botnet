<?php
########################
##### Counter Data  ####      
########################
/*Counter Bots*/
//include("../config.php");
include("../config.php");
function count_bot(){
		 $sql_bot = "SELECT * FROM `bot`";
		 $query_bot = mysqli_query($condb,$sql_bot);
		 $count_bot = mysqli_num_rows($query_bot);
		 echo $count_bot;
}

//echo count_bot();
?>