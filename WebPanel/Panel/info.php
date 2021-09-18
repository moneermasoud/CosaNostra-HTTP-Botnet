<?php include('header.php'); ?>

<?php

$hwid = $_GET['hwid'];

if(isset($hwid)){


    $loc = @json_decode(file_get_contents('../upload/'.$hwid.'/info.txt'), true);

    echo '</div><div class="row">
    <div class="col-md-12">
                 <!--Panel News-->
                 <div class="panel panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%); margin-top:10px;">
         <div class="panel-heading">
           <h3 class="panel-title">information Device</h3>
         </div>
         <div class="panel-body">
           <div class="row">
             <div class=" col-md-12 col-lg-12"> 
               <br><br><br><table class="table table-bordered">
                 <tbody>
                             
                   <tr>
                     <td>PC Name : </td>
                     <td>'.$loc['PC Name'].' </td>
                     <td>Operating System : </td>
                     <td>'.$loc['Operating System'].'  </td>
                   </tr>
                   
                   <tr>
                     <td>Anti Virus : </td>
                     <td>'.$loc['Anti virus'].'  </td>
                     <td>Firewall : </td>
                     <td>'.$loc['Firewall'].'  </td>
                   </tr>
                   
                     <tr>
                     <td>Processor : </td>
                     <td>'.$loc['Processor'].'  </td>
                     <td>Memory (RAM) : </td>
                     <td>'.$loc['Memory (RAM)'].'  </td>
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