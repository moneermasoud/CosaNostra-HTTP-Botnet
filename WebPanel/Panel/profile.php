<?php 
include('header.php');

?>
		<!--end content-->

		
		
		
		 
		 <div class="col-md-12">
               <div class="panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%);">
				<div class="panel-body table-bordered" style="font-size:14px; padding-left:40px;padding-right:40px;padding-bottom:25px;padding-top:25px;">
				
				<h2>Change User information</h2>
                <?php 
                
						 if(isset($_GET['id'])){
							//mysql_query("set character_set_server='utf8'"); 
							//mysql_query("SET NAMES 'utf8'");
									
						     $sql = mysqli_query($condb,"select * from users where id_user=".intval($_GET['id'])."");
                             $row=mysqli_fetch_array($sql);
							 
								 echo '<form method="POST">
									<div class="form-group" style="margin-top:10px;">
										<label> ID User </label>
									  <input name="#" id="disabledInput" type="text" class="form-control" placeholder="ID User" value="'.$row['id_user'].'" disabled>
									</div>
									<div class="form-group" style="margin-top:10px;">
									<label> UserName </label>
									  <input name="user" type="text" class="form-control" placeholder="Enter username here " value="'.$row['username'].'">
									</div>
									<div class="form-group" style="margin-top:10px;">
									<label> Password </label>
									  <input name="pass" type="password" class="form-control" placeholder="Enter Password Here">
									</div>

									<button name="submit" type="submit" class="btn-blue"> Save <span class="far fa-save"></span> </button>
								  </form>';
							 
							 
							 /**/
						 }
						 if(isset($_POST['submit'])){
										$user = mysqli_real_escape_string($condb,$_POST['user']);

										$pass = md5($_POST['pass']);
										

												$sql = "UPDATE `users` SET `username`='$user',`password`='$pass' WHERE `id_user`='".intval($_GET['id'])."'";
												//mysqli_query("set character_set_server='utf8'"); 
												//mysqli_query("set names 'utf8'");
												mysqli_query($condb,$sql);	      
							   echo '<div class="col-md-12">';
							   echo '<div style="margin-top:10px;" class="text-center alert alert-success" role="alert">Edited successfully Please login again</div>';  
							   echo '<meta http-equiv="refresh" content="3;url=logout.php" />';  											
							   echo '</div>';		 	    
								 
						 }
						 
						 ?>


		</table>
		 
		 
		 </div>



		</div>

<?php include('footer.php');?>