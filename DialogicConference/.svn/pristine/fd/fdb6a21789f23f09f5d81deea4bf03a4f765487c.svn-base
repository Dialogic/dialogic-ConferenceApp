<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="layout" content="mainMobile">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dialogic</title>
<!-- Custom styles for this template -->
<link rel="stylesheet" type="text/css"
	href="${resource(dir: 'css', file: 'style.css')}" />
<link rel="stylesheet" type="text/css"
	href="${resource(dir: 'css', file: 'style-responsive.css')}" />
<link rel="stylesheet" type="text/css"
	href="${resource(dir: 'css/icons', file: 'style.css')}" />
<link
	href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
	rel="stylesheet">

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<style>
.wrapper{
	  margin-top: 0px !important;
	  padding-bottom: 0px;
}
#main-content{
	margin-left: 0px;
}
</style>
<script type="text/javascript">
	$(window).load(function() {
		$('.fa-bars').click();
		login_type= $("#idType").val().trim()
		room_id = $("#conferenceId").val().trim()
		if (room_id == null || room_id == "") {
			$('#myModal').modal('show')
		} else {
			startWebrtc()
		}	
	});
	$(document).ready(function() {
		$('#conferenceId').on('keyup change', function() {
			if ($('#conferenceId').val().length > 0) {
				$("#conferenceButton").prop('disabled', false);
			} else {
				$("#conferenceButton").prop('disabled', true);
			}
		});
		$('#conferenceId').trigger('change');
		$('#myModal').on('shown.bs.modal', function() {
			$('#conferenceId').focus();
		})	
		$('#myModal2').on('shown.bs.modal', function() {
			$('#conferenceUrl').focus();
		})
		$("#remoteVideo	").on('loadedmetadata', function() {	
			$('.control').fadeIn(500);
			$('.videoContainer').hover(function() {
				$('.control').stop().fadeIn();
			}, function() {
				$('.control').stop().fadeOut();
			});
		});
		$("#remoteVideo").css( "width", document.documentElement.clientWidth);
		$("#remoteVideo").css( "height", document.documentElement.clientHeight);
		
	});
	var contextPath='${request.contextPath}';
	</script>
<script src="../js/webrtc.js"></script>
<script src="../js/getScreenId.js"></script>
</head>

<body>

	<section id="container">

<!-- **********************************************************************************************************************************************************
MAIN CONTENT
*********************************************************************************************************************************************************** -->
		<!--main content start-->
		<section id="main-content">
			<section class="wrapper">
				<div class="row">
					<div class="col-lg-12">
						<div class="row" id="row1">
							<div id="video" class="videoContainer">								
								<video id="remoteVideo" autoplay="autoplay"></video>
								<!--  <div id="status" class="overlay hide"><i class="fa fa-circle"></i>&nbsp;&nbsp;Recording...</div>-->							
								<div class="control">
									<div class="btmControl">
										<div class="btnPlay unmuteVideo btn hide" title="Unmute local video">
											<span class="fa-stack fa-lg" style="color: red;">
											  <i class="fa fa-video-camera fa-stack-1x"></i>
											  <i class="fa fa-ban fa-stack-2x text-danger"></i>
											</span>
										</div>
										<div class="sound muteVideo btn " title="Mute local video">
											<i class="fa fa-2x fa-video-camera"></i>
										</div>
										<div class="sound audioUnmute btn hide" title="Unmute local audio">
											<i class="fa fa-2x fa-microphone-slash" style="color: red;"></i>
										</div>
										<div class="sound audioMute btn " title="Mute local audio">
											<i class="fa fa-2x fa-microphone"></i>											
										</div>
										<div class="btnFS btn" title="Sign out">
											<g:link action="mobileLogout"><i class=" fa fa-2x fa-sign-out" style="color: deepskyblue"></i></g:link>								
										</div>
									</div>			
								</div>
							</div>							
						</div>
						<!-- /row mt -->
					</div>
					<!-- /col-lg-9 END SECTION MIDDLE -->
<!-- **********************************************************************************************************************************************************
RIGHT SIDEBAR CONTENT
*********************************************************************************************************************************************************** -->
					<!--  <div class="col-lg-3 ds">
						
					</div>-->
					<!-- /col-lg-3 -->
				</div>
				<!--/row -->
			</section>
		</section>

		<!--main content end-->
		<!-- Modal for conference id-->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Enter Conference Id</h4>
					</div>
					<div class="modal-body">
						<input type="hidden" name="userid" id="userid" value="${userid}" />
						<input type="hidden" name="type" id="idType" value="${type}" />
						<input type="hidden" name="res" id="res" value="${res}" />
			            <input type="text" class="form-control top-buffer" id="conferenceId"
							value="${conf}" placeholder="Conference id" autofocus="autofocus"
							onkeydown="if (event.keyCode == 13) document.getElementById('conferenceButton').click()"/>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-info"
							id="conferenceButton" onclick="startWebrtc()">Start	Conference</button>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal for conference URL -->
	</section>
</body>
</html>
						