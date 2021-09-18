<?php

		 function count_bot(){
            $sql_bot1 = "SELECT * FROM `bot`";
            ##########################################
            #####################
            #Connection Database#
            #####################
            $dbhost1 = "localhost";
            $dbname1 = "cosanostra";
            $dbuser1 = "root";
            $dbpass1 = "";
            ##########################################
			$condb2 = mysqli_connect($dbhost1,$dbuser1,$dbpass1,$dbname1);
			$query_bot2 = mysqli_query($condb2,$sql_bot1);
			$count_bot2 = mysqli_num_rows($query_bot2);
		   
			echo $count_bot2;
         } 
		  echo '<h2>Total Bots : ';
		  echo count_bot();
		  echo ' </h2>';

?>