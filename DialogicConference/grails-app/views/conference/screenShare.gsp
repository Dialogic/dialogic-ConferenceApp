<!DOCTYPE html>
<html lang="en">
<head>
<meta name="layout" content="main">
<meta charset="utf-8">
<title>Dialogic Webrtc Demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<style type="text/css">
.footer {
	position: fixed;
}

.container {
	background-color: transparent;
}
/*
 * Sidebar
 */

/* Hide for mobile, show later */
.sidebar {
	display: none;
}

@media ( min-width : 768px) {
	.sidebar {
		position: fixed;
		top: 51px;
		bottom: 0;
		left: 0;
		display: block;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: auto;
		/* Scrollable contents if viewport is shorter than content. */
		background-color: #f5f5f5;
		border-right: 1px solid #eee;
	}
}

.divider {
	height: 1px;
	margin: 9px 0;
	overflow: hidden;
	background-color: #e5e5e5;
}

.tableFlow {
	max-height: 200px !important;
	overflow: scroll;
}

.general {
	background: #222;
	margin: 0 0 40px 0;
	-webkit-transition: background .4s linear;
	-moz-transition: background .4s linear;
	-o-transition: background .4s linear;
	-ms-transition: background .4s linear;
}

.three {
	box-shadow: 0 0 0 6px #fff, 0 0 0 12px #888;
	margin: 6px 0 0 40px;
}

.loader {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	z-index: 9999;
	background: url('../images/page-loader.gif') 50% 50% no-repeat
		rgb(249, 249, 249);
}

.top-buffer {
	margin-top: 20px;
}

.bottom-buffer {
	margin-bottom: 20px;
}

.divBorder {
	border: 1px solid #1A0F0F;
}
</style>

<script type="text/javascript">
	$(window).load(function() {
		room_id = $("#conferenceId").val().trim()
		if (room_id == null || room_id == "") {
			$('#myModal').modal('show')
			//$('#conferenceId').val('').focus()

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
	});
</script>
</head>
<body class="responsive" onbeforeunload="logError('')">
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 col-lg-2 sidebar">
				
			</div>
			<div
				class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 col-lg-10 col-lg-offset-2">

				<div class="page-header">
					<!--  <h1>Dialogic JSR309 Applications</h1>-->
				</div>

				<div class="row bottom-buffer" id="row1">
					<div class="col-lg-12">
						Screen share in progress. Close the window to terminate it.
						<!--<div class="embed-responsive embed-responsive-16by9 general three">					
							 <video id="remoteVideo" class="embed-responsive-item" controls
								autoplay="autoplay"></video>
						</div>-->
					</div>
				</div>

				<!-- Modal -->
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
								<input type="hidden" name="res" id="res" value="${res}" /> 
								<input type="text" class="form-control" id="conferenceId"
									value="${conf}" placeholder="Conference id" autofocus="autofocus"
									onkeydown="if (event.keyCode == 13) document.getElementById('conferenceButton').click()">
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-success"
									id="conferenceButton" onclick="startWebrtc()">Start
									Conference</button>
							</div>
						</div>
					</div>
				</div>
				<!-- /container -->
			</div>
		</div>
	</div>
	<script src="../js/webrtc.js"></script>
	<script src="../js/getScreenId.js"></script>
	<script src="../js/RTCMultiConnection.js"></script>
	<script src="../js/DetectRTC.js"></script>
</body>
</html>