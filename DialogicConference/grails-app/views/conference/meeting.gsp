<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="layout" content="main">
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
<script type="text/javascript">
	$(window).load(function() {
		login_type= $("#idType").val().trim()
		/*if(login_type=="participant"){
			$('.fa-bars').click();
		}
		if(login_type=="presenter"){
			$("#idAudioMenu").removeClass('hide');
		}*/
		room_id = $("#conferenceId").val().trim()
		//$('.fa-bars').click()
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
		$('#myModal2').on('shown.bs.modal', function() {
			$('#conferenceUrl').focus();
		})	
	});
	var contextPath='${request.contextPath}';
	</script>
<script src="../js/webrtc.js"></script>
<script src="../js/getScreenId.js"></script>
<script src="../js/RTCMultiConnection.js"></script>
<script src="../js/DetectRTC.js"></script>
</head>

<body>

	<section id="container">

<!-- **********************************************************************************************************************************************************
MAIN SIDEBAR MENU
*********************************************************************************************************************************************************** -->
		<!--sidebar start-->
		<aside>
			<div id="sidebar" class="nav-collapse ">
				<!-- sidebar menu start-->
				<ul class="sidebar-menu" id="nav-accordion">
					<h5 class="centered">${userid} <!-- <button type="button" class="btn btn-sm btn-default btn-circle" 
						data-toggle="tooltip" data-placement="bottom" title="Raise hand"><i class="fa fa-hand-o-up"></i></button> -->
					</h5>
					<li class="mt"><a class="active" href="#"> <i
							class="fa fa-dashboard"></i> <span>Home</span></a>
					</li>
					<!-- <li class="sub-menu" id="idAudioMenu"><a href="javascript:;"> <i
							class="fa fa-volume-up"></i> <span>Audio</span></a>
						<ul class="sub">
							<li><a href="#" onclick="muteToggle(false)"><i class="fa fa-microphone-slash"></i>Mute</a></li>
							<li><a href="#" onclick="muteToggle(true)"><i class="fa fa-microphone"></i>Unmute</a></li>
						</ul>
					</li> -->
					<li class="menu"><a href="#" onclick="muteAudio()"><i id="1" class="fa fa-microphone"></i> 
						<i id="2" class="fa fa-microphone-slash hide" style="color: firebrick;"></i> <span> Audio</span></a>
					</li>
					<li class="menu"><a href="#" onclick="muteVideo()"><i id="3" class="fa fa-video-camera"></i> 
						<span id="4" class="fa-stack hide">
						  <i class="fa fa-video-camera fa-stack-1x"></i>
						  <i class="fa fa-ban fa-stack-2x text-danger" style="color: firebrick;  font-size: 2em;"></i> 
						</span>
						<span> Video</span></a>
					</li>
					<!-- <li class="menu"><a href="#" onclick="muteParticipantAudio()"><i id="5" class="fa fa-microphone"></i> 
						<i id="6" class="fa fa-microphone-slash hide" style="color: firebrick;"></i> <span> Mute Participant</span></a>
					</li>
					<li class="sub-menu"><a href="javascript:;"> <i
							class="fa fa-video-camera"></i> <span>Video</span></a>
						<ul class="sub">
							<li><a href="#" onclick="videoMuteToggle(false)"><i class="fa fa-eye-slash"></i>Mute</a></li>
							<li><a href="#" onclick="videoMuteToggle(true)"><i class="fa fa-eye"></i>Unmute</a></li>
						</ul>
					</li> -->						
					<li class="sub-menu hide" id="idShareScreen"><a href="javascript:;"> <i
							class="fa fa-desktop"></i> <span>Share Screen</span></a>
						<ul class="sub">
							<li><a href="#" onclick="javascript: popuponclick()"><i class="fa fa-check-circle"></i>Start</a></li>
							<li><a href="#" onclick="javascript: closepopup()"><i class="fa fa-times"></i>Close</a></li>
						</ul>
					</li>
					<li class="sub-menu"><a href="javascript:;"> <i
							class="fa fa-binoculars"></i> <span>View Options</span></a>
						<ul class="sub">
							<li class="hide" id="idUnSlice"><a href="#" onclick="javascript:sliceVideo()"><i class="fa fa-square"></i>Conventional</a></li>
							<li id="idSlice" ><a href="#" onclick="javascript:sliceVideo()"><i class="fa fa-th"></i>Canvas</a></li>
						</ul></li>
					<li class="sub-menu"><a href="javascript:;"> <i
							class="fa fa-users"></i> <span>People</span><span id="sideTotal" class="badge bg-primary pull-right">0</span></a>
						<ul class="sub">
							<li><a href="#"><i class="fa fa-laptop"></i>Webbrtc <span id="sideWeb" class="badge bg-success subBadge pull-right">0</span></a></li>
							<li><a href="#"><i class="fa fa-phone"></i>SIP <span id="sideSip" class="badge bg-info subBadge pull-right">0</span></a></li>
						</ul>
					</li>
					<li class="menu hide" id="recordConference"><a href="#" onclick="javascript:recordConference()"> <i
							class="fa fa-file-video-o"></i> <span id="recordButton">Record Conference</span></a>
					</li>					
					<li class="sub-menu hide" id="recordFiles"><a href="javascript:;"> <i	class="fa fa-files-o"></i> <span>Recorded Files</span>
						<span id="fileTotal" class="badge bg-warning pull-right">0</span></a><ul class="sub" id="idPlayList">
						</ul>
					</li>
					<li class="menu"><a href="#" onclick="javascript:raiseHand()"> <i
							class="fa fa-hand-o-up"></i> <span>Raise Hand</span></a>
					</li>
					<li class="menu"><a href="#" onclick="javascript:shareUrl()"> <i
							class="fa fa-share-alt" ></i> <span>Share URL</span></a>
					</li>
					<!--  <li class="menu"><a href="javascript:;"> <i
							class=" fa fa-bar-chart-o"></i> <span>Charts</span></a>
					</li>-->
					
					<li class="menu"><g:link action="logout"> <i
							class=" fa fa-sign-out"></i> <span>Logout</span></g:link>
					</li>
				</ul>
				<!-- sidebar menu end-->
			</div>
		</aside>
		<!--sidebar end-->

<!-- **********************************************************************************************************************************************************
MAIN CONTENT
*********************************************************************************************************************************************************** -->
		<!--main content start-->
		<section id="main-content">
			<section class="wrapper">
				<div class="row">
					<div class="col-lg-9 main-chart">

						<div class="row mt" id="row1">
							<!-- <div class="progress progress-striped active">
							  <div class="progress-bar progress-bar-success" style="width: 40%">
							    <span class="sr-only">40% Complete (success)</span>
							  </div>
							</div>-->
							<div id="video" class="embed-responsive embed-responsive-16by9 general three">								
								<video id="remoteVideo" class="embed-responsive-item" controls autoplay="autoplay"></video>
								<div id="status" class="overlay hide"><i class="fa fa-circle"></i>&nbsp;&nbsp;Recording...</div>
								<!-- <div id="statusAudio" class="overlayAudio hide"><i class="fa fa-lg fa-microphone-slash"></i></div>
								<div id="statusVideo" class="overlayVideo hide"><span class="fa-stack" style="color: red;">
									  <i class="fa fa-video-camera fa-stack-1x"></i>
									  <i class="fa fa-ban fa-stack-2x text-danger"></i>
									</span>
								</div> -->
							</div>
							
						</div>
						<!-- /row mt -->

						<div class="row mt hide" id="row2">
							<div class="col-lg-12">
								<div id="canvasMainContainer"
									class="embed-responsive embed-responsive-16by9 ui-state-default">
									<canvas id="canvasMain" style="z-index: 0; position: absolute;"></canvas>
									<ul id="sortable">
										<li class="ui-state-default img-rounded hide" id="main0"
											style="width: 142px; height: 80px;"><canvas id="canvas0"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main1"
											style="width: 142px; height: 80px;"><canvas id="canvas1"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main2"
											style="width: 142px; height: 80px;"><canvas id="canvas2"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main3"
											style="width: 142px; height: 80px;"><canvas id="canvas3"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main4"
											style="width: 142px; height: 80px;"><canvas id="canvas4"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main5"
											style="width: 142px; height: 80px;"><canvas id="canvas5"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main6"
											style="width: 142px; height: 80px;"><canvas id="canvas6"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main7"
											style="width: 142px; height: 80px;"><canvas id="canvas7"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
										<li class="ui-state-default img-rounded hide" id="main8"
											style="width: 142px; height: 80px;"><canvas id="canvas8"
												class="img-rounded divBorder"
												style="z-index: 10; position: relative; width: 142px; height: 80px;"></canvas></li>
									</ul>
								</div>
							</div>
						</div>
						<!-- /row -->

						<!--  <div id="row3" class="tab-pane hide">
							<div class="row mt">
			                      <div class="col-lg-6">
			                          <div class="content-panel">
										  <h4><i class="fa fa-angle-right"></i> Receive Statistics VP8</h4>
			                              <div class="panel-body text-center" style="height:initial;overflow:hidden;">
			                                  <div id="idgraph1" class="embed-responsive-item"></div>
			                              </div>
			                          </div>
			                      </div>
			                      <div class="col-lg-6">
			                          <div class="content-panel">
										  <h4><i class="fa fa-angle-right"></i> Send Statistics VP8</h4>
			                              <div class="panel-body text-center" style="height:initial;overflow:hidden;">
			                                  <div id="idgraph2" class="embed-responsive-item"></div>
			                              </div>
			                          </div>
			                      </div>
			                  </div>							
						</div>
						-->
						<!-- /row -->

					</div>
					<!-- /col-lg-9 END SECTION MIDDLE -->
<!-- **********************************************************************************************************************************************************
RIGHT SIDEBAR CONTENT
*********************************************************************************************************************************************************** -->
					<div class="col-lg-3 ds">
						<h3>Chat</h3>
						<div class="panel-group " id="accordion">
							<div class="panel panel-danger">
								<div id="" class="panel-collapse ">
									<div class="panel-body" id="idPanelBody">
										<ul class="chat" id="chatbox"></ul>
									</div>
								</div>
								<div class="panel-footer">
									<div class="input-group">
										<input id="message" type="text" class="form-control input-sm"
											placeholder="Type your message here..."
											onkeydown="if (event.keyCode == 13) document.getElementById('chatButton').click()">
										<span class="input-group-btn">
											<button id="chatButton" class="btn btn-warning btn-sm"
												id="btn-chat" onclick="sendMessage()">Send</button>
										</span>
									</div>
								</div>
							</div>
						</div>						
						<!-- USERS ONLINE SECTION -->
						<h3>People</h3>
						<div class="btn-group btn-group-justified hide" role="group" id="idMuteParticipantAudio">
						  	<div class="btn-group btn-xs" role="group">
						    	<button id="5" type="button" class="btn btn-default" onclick="muteParticipantAudio()" 
						    	data-toggle="tooltip" data-placement="bottom" title="Mute partipants' audio">
						    	<i class="fa fa-microphone"></i> Mute Audio</button>
						    	<button id="6" type="button" class="btn btn-danger hide" onclick="muteParticipantAudio()" 
						    	data-toggle="tooltip" data-placement="bottom" title="Unmute partipants' audio">
						    	<i class="fa fa-microphone-slash"></i> Unmute Audio</button>
						  	</div>
						  	<div class="btn-group" role="group">
						    	<button type="button" class="btn btn-default">&nbsp;</button>
						  	</div>
						</div>
						<div id="idUserList" style="overflow-y: scroll; height: 350px;"></div>
					</div>
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
						<input type="hidden" name="stun" id="stun" value="${stun}" />
						<input type="hidden" name="res" id="res" value="${res}" />
						<p id="id-install-button" class="hide">
							For chrome screensharing to work...<br> <a
								href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk"
								target="_blank">Install chrome extension</a>.
							<a class="btn btn-primary"
								href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk"
								target="_blank"	id="install-button">
								Add to chrome | <i class="fa fa-share-alt-square"></i>
							</a>
						</p>
						
			            <input type="text" class="form-control top-buffer" id="conferenceId" value="${conf}" 
			            	placeholder="Conference id" autofocus="autofocus"
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
		<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="myModalLabel">Conference URL</h4>
					</div>
					<div class="modal-body">
						<input type="radio" name="options" id="option1" value="presenter" autocomplete="off" checked onclick="constructUrl()"> Presenter
						<input type="radio" name="options" id="option2" value="participant" autocomplete="off" onclick="constructUrl()"> Participant
						<input type="text" class="form-control top-buffer" id="conferenceUrl"
							value="" placeholder="Conference URL" autofocus="autofocus">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- js placed at the end of the document so the pages load faster -->
	<script class="include" type="text/javascript"
		src="../js/jquery.dcjqaccordion.2.7.js"></script>
	<script src="../js/jquery.scrollTo.min.js"></script>
	<script src="../js/jquery.nicescroll.js" type="text/javascript"></script>
	<script src="../js/jquery.sparkline.js"></script>
	<!--common script for all pages-->
	<script src="../js/general.js"></script>
</body>
</html>
						