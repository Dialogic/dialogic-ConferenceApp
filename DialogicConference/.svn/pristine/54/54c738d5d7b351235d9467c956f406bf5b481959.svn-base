<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="layout" content="main">
<link rel="stylesheet" type="text/css"
	href="${resource(dir: 'css', file: 'style.css')}" />
<link rel="stylesheet" type="text/css"
	href="${resource(dir: 'css', file: 'style-responsive.css')}" />
	<link
	href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
	rel="stylesheet">
<!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
<style>
.container>header h1, .container>header h2 {
	color: #fff;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
}
.footer{
	  display: none;
}
</style>
<script type="text/javascript">
	$(window).load(function() {
		type = $("#type").val().trim()
		if (type == null || type == "") {
			$("#type").show();
			$("#type").attr('required','required');
		} else {
			$("#type").hide();
		}		
	});
</script>
</head>
<body>
	  <div id="login-page">
	  	<div class="container">
		      <form class="form-login" role="form" method="POST" action="mobileMeeting">
		        <h2 class="form-login-heading">sign in now</h2>
		        <div class="login-wrap">
		            <input type="text" name="userid" class="form-control" placeholder="User ID" autofocus required>
		            <br>
		            <!--  <input type="password" name="password" class="form-control" placeholder="Password"><br>-->
		            
					<g:select class="form-control" id="type" name="type" value="${type}" 
					    optionKey="value" optionValue="key" noSelection="${['':'Select Type...']}"
					    from="${[[key:"Presenter",value:"presenter"],[key:"Participant",value:"participant"]]}"></g:select><br>
					<div class="btn-group" data-toggle="buttons">
						<label class="btn btn-default" onclick='selectResolution("HD")' data-toggle="tooltip" data-placement="bottom" title="1280 X 720">
		                    <input type="radio" id="res_hd" name="resolution" value="HD"/> HD
		                </label>
		                <label class="btn btn-default active" onclick='selectResolution("VGA")' data-toggle="tooltip" data-placement="bottom" title="640 X 480">
		                    <input type="radio" id="res_vga" name="resolution" value="VGA"/> VGA
		                </label> 
		                <label class="btn btn-default" onclick='selectResolution("CIF")' data-toggle="tooltip" data-placement="bottom" title="352 X 288">
		                    <input type="radio" id="res_cif" name="resolution" value="CIF"/> CIF
		                </label>  
		                <label class="btn btn-default" onclick='selectResolution("QCIF")' data-toggle="tooltip" data-placement="bottom" title="176 X 144">
		                    <input type="radio" id="res_qcif" name="resolution" value="QCIF"/> QCIF
		                </label>			                
		            </div>
					<input type="hidden" name="conf" value="${conf}">
					<input type="hidden" name="stun" value="${stun}">
					<input type="hidden" name="res" id="res" value="VGA" />    
		            <label class="checkbox">
		                <span class="pull-right"></span>
		            </label>
		            <button id="submitButton" class="btn btn-theme btn-block" type="submit" style="margin-top: 20px;margin-bottom: 20px;"><i class="fa fa-lock"></i> SIGN IN</button>
		
		        </div>		
		      </form>	  	
	  	</div>
	  </div>
    <!--BACKSTRETCH-->
    <!-- You can use an image of whatever size. This script will stretch to fit in any screen size.-->
    <script type="text/javascript" src="../js/jquery.backstretch.min.js"></script>
    <script>
        $.backstretch("../images/bg3.jpg", {speed: 500});
        function selectResolution(resolution){
        	console.log("resolution---->"+resolution);
        	$("#res").val(resolution);
        	
        }
    </script>
	</body>
</html>