<!doctype html>
<html>
       <head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
			<!--Start Header-->
		    <title>Login</title>
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
       background-color:#121212;
	   background-image: url(../img/img/Dark.jpg);
	   /*background-image: url(../img/Dark.jpg);*/
       /*background-repeat: no-repeat;*/

}
			
#login-form {
	   background-color: #232323;
	   border-radius: 5px;
	   -moz-border-radius: 5px;
	   -webkit-border-radius: 5px;		
	   margin: 15% auto;
	   width: 300px;
	   font-family: 'Open Sans', sans-serif;
	   font-size: 16px;
	   -webkit-box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
	   box-shadow:  0px 10px 20px 0px rgba(0, 0, 0, 0.3);
	   opacity: 0.7;
  
}
#sub{
	   background-color: #232323;
	   border: none;
	   border-radius: 3px;
	   -moz-border-radius: 3px;
	   -webkit-border-radius: 3px;
	   color: #404040;
	   cursor: pointer;
	   float: none;
	   font-weight: bold;
	   color:#fff;
	   padding: 12px 12px;
	   -webkit-appearance: none;
}		 
.flog{
	   border: 1px solid #292829;
	   border-top: none;
	   direction:ltr;
	   border-radius: 0px 0px 3px 3px;
	   -moz-border-radius: 0px 0px 3px 3px;
	   -webkit-border-radius: 0px 0px 3px 3px;
	   -webkit-appearance:none;
}
			

			</style>

      </head>
   <body>

           <div class="container">

            <form action="check.php" method="post">
                <div class="row" style="margin-top:8%;">
                    <div class="col-md-4"></div>
                    <div class="col-md-4">   
                            <div class="caption text-center" id="login-form"  >
                                <div class="panel panel-default" style="background-color:#232323;">
								  <div class="panel-heading" style="background-color:#232323;">
								    <h3 class="panel-title text-center" style="color:#000;letter-spacing:3px;font:20px 'Cairo';">CosaNostra v1.0</h3>
							     </div>
                                    <div class="panel-body" >
                                        <div class="form-group">
                                            <input type="text" class="form-control flog" name="Username" id="usr" placeholder="Username">

                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control flog" name="Password" id="pwd" placeholder="********">
                                        </div>
                                    </div>
                                     <div class="panel-footer"><button type="submit" name="sub"  class="btn btn-lg btn-block btn-default" style="color:#000;letter-spacing:5px;font:15px 'Cairo';">LOGIN</button></div>
                                </div>
               
                            </div>
                        
                    </div>
					<div class="col-md-4"></div>
                </div>
            </form>
				
        </div>
				
 </body>
</html>
