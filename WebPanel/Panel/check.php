<?php
 session_start();  
?>
<!doctype html>
<html>
       <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<!--Start Header-->
		    <title>CHECK</title>
		    <script src="../css/bootstrap/js/jquery-2.1.1.js"></script>
		   <!-- Latest compiled and minified CSS -->
		 
			<!--Bootsrap-min -->
			<link rel="stylesheet" href="../css/bootstrap/css/bootstrap.min.css">
		 
			<!-- Optional theme -->
			<link rel="stylesheet" href="../css/bootstrap/css/bootstrap-theme.min.css">

			<!-- Latest compiled and minified JavaScript -->
			<script src="../css/bootstrap/js/bootstrap.min.js"></script>
	   
			<link href='../css/bootstrap/font/CheltenhamStd-BoldCond.otf' rel='stylesheet' type='text/css'>
				<link href="../css/morrisjs/morris.css" rel="stylesheet">

			<!--bootstrap-rtl-->
			<link rel="stylesheet" href="../css/bootstrap/css/bootstrap-rtl.css">
			<!--lib css-->
            <link rel="stylesheet" href="../css/hover.css">
            <link rel="stylesheet" type="text/css" href="../css/animate.css">
			<!--Fonts-->
		    <link href='http://fonts.googleapis.com/earlyaccess/notokufiarabic.css' rel='stylesheet' type='text/css'/>
		    <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,500' rel='stylesheet' type='text/css'>
		    <link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet" type='text/css'>
            <style>
body{
       font-family:Cairo;
       background-color:#000;
       font-size:25px;

}

			</style>

      </head>
<body>

<?php 
// session_start();   
include("../config.php");

if(isset($_POST['sub'])){
        $username = mysqli_real_escape_string($condb,$_POST['Username']);
        $password = mysqli_real_escape_string($condb,md5($_POST['Password']));
    if(empty($username) or empty($password)){ 
    
            
                        echo '<meta http-equiv="refresh" content="1;url=login.php" />';  
						echo '<br /><div class="text-center alert alert-danger" role="alert">Empty inputs</div>';
            }else{
            $sql = "SELECT * FROM  users where username='$username' and password='$password'";   		 
            $query = mysqli_query($condb,$sql);
            $data = mysqli_fetch_array($query);
            $rows = mysqli_num_rows($query); 
        
            if($rows == 1){
               
                $_SESSION['id_user'] = $data['id_user'];
                $_SESSION['username']=$username;
                $_SESSION['password']=$password;
               // $_SESSION['rols_user'] = $data['rols_user'];
                header("Location: index.php");
                echo '<meta http-equiv="refresh" content="3;url=index.php" />';
                echo '<br /></div><div class="col-md-12 text-center alert alert-success" role="alert"> <img src="../img/img/loading-green.gif" /> Login success</div>';
            }else{
                echo '<meta http-equiv="refresh" content="3;url=login.php" />';
				echo '<br /><div class="col-md-12 text-center alert alert-danger" role="alert"><img src="../img/img/loading-red.gif" /> Something Wrong , please try again </div>';
        }  
    
    
    }
    }else{
        header("Location: login.php");
    }  
     ?>
	 </body>
</html>