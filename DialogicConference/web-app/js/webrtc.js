var localId, remoteId, caller, pc, iceCandidates = [], inviteSdp;
var wsAddr = ((window.location.protocol == "https:") ? "wss:" : "ws:") + "//" + window.location.host + "/dlgmsc_converged_conference/dialogic/conf/";
var totalHeight, totalWidth, offset, isScreenShareEnable = false, hasCam=false, reinviteFlag=false;
/**
 * If you want to run this application in local host then use the below part
 * of code to connect to websocket. Use the actual ip address of the application 
 * like the one below.
 */
if(window.location.protocol=="http:"){
//	wsAddr="ws://devconf.dialogic.com:8080/dlgmsc_converged_conference/dialogic/conf/";
//	wsAddr="ws://conf.dialogic.com:8080/dlgmsc_converged_conference/dialogic/conf/";
//	wsAddr="ws://146.152.122.185:8080/dlgmsc_converged_conference/dialogic/conf/";
}
//console.log(contextPath);
var audioStream=null;	
var CIF = 
{audio:true, video: 
{
	mandatory:{
		maxWidth:	352,
		maxHeight:	288
	}
}
}
var QCIF = 
{audio:true, video: 
{
	mandatory:{
		maxWidth:	176,
		maxHeight:	144
	}
}
}
var VGA = 
{audio:true, video: 
{
	mandatory:{
		maxWidth:	640,
		maxHeight:	480
	}
}
}
var HD = 
{audio:true, video: 
{
	mandatory:{
		minWidth:	1280,
		minHeight:	720
	}
}
}

var isAdmin = false;
function startWebrtc(){
	var connection = new RTCMultiConnection();
	DetectRTC.load(function() {
	    DetectRTC.hasWebcam
	    DetectRTC.hasMicrophone
	    DetectRTC.hasSpeakers
//	    DetectRTC.isScreenCapturingSupported
//	    DetectRTC.isSctpDataChannelsSupported
//	    DetectRTC.isRtpDataChannelsSupported
//	    DetectRTC.isAudioContextSupported
//	    DetectRTC.isWebRTCSupported
//	    DetectRTC.isDesktopCapturingSupported
//	    DetectRTC.isMobileDevice
//	    
//	    DetectRTC.isWebSocketsSupported
//	    DetectRTC.isWebSocketsBlocked
//	    DetectRTC.checkWebSocketsSupport(callback)
//
//	    DetectRTC.isWebsiteHasWebcamPermissions        // getUserMedia allowed for HTTPs domain in Chrome?
//	    DetectRTC.isWebsiteHasMicrophonePermissions    // getUserMedia allowed for HTTPs domain in Chrome?
//
//	    DetectRTC.audioInputDevices    // microphones
//	    DetectRTC.audioOutputDevices   // speakers
//	    DetectRTC.videoInputDevices    // cameras
//	    
//	    DetectRTC.osName
//	    DetectRTC.osVersion
//	    
	    DetectRTC.browser.name === 'Edge' || 'Chrome' || 'Firefox'
	    DetectRTC.browser.version
	    DetectRTC.browser.isChrome
	    DetectRTC.browser.isFirefox
	    DetectRTC.browser.isOpera
	    DetectRTC.browser.isIE
	    DetectRTC.browser.isSafari
	    DetectRTC.browser.isEdge
//
//	    DetectRTC.browser.isPrivateBrowsing // incognito or private modes
//
//	    DetectRTC.isCanvasSupportsStreamCapturing
//	    DetectRTC.isVideoSupportsStreamCapturing
//
//	    DetectRTC.DetectLocalIPAddress(callback)
	});
	hasCam = DetectRTC.hasWebcam;
//	connection.setDefaultEventsForMediaElement = false;
//	connection.enumerateDevices(function(devices) {
//		devices.forEach(appendOption);		
//		function appendOption(device) {		
//			if (device.kind.indexOf('audio') !== -1) {
////				do nothing
//			} else {
//				hasCam=true;
////				alert("has cam true");
////				selectVideoDevices.appendChild(option);
//			}
//		}
//	});
	$('#myModal').modal('hide');
	$("#remoteVideo").addClass('loader');
	if (openChannel()==false)
		console.log("fail to open websocket");
}

function openChannel() {
	var response = true;
	console.log('Connecting ...' + wsAddr);
	var bool = true;
	room_id = $("#conferenceId").val().trim()
	if(room_id == $("#userid").val()){
		isAdmin=true;
	}
	if (room_id==""){
		var bool = false; 
		return false;
	}
	$('#conferenceButton').prop('disabled', true);
	$('#conferenceId').prop('disabled', true);
	console.log("room_id" + room_id); 
	console.log('Connecting ...' + wsAddr+room_id);
	socket = new WebSocket(wsAddr+room_id);
	socket.onopen = onChannelOpened;
	socket.onmessage = onChannelConnect;
	socket.onerror = onChannelError;
	socket.onclose = onChannelClosed;
	return response;
}

function onChannelOpened() {
	console.log('Channel opened.');
	navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
	if($("#userid").val().toUpperCase()=="SCREENSHARE"){
		console.log("user name:"+$("#userid").val());
		getScreenId(function (error, sourceId, screen_constraints) {
			if(sourceId && sourceId != 'firefox') {
				screen_constraints = {
						video: {
							mandatory: {
								chromeMediaSource: 'screen',
								maxWidth:		1280,
								maxHeight:		720,
								minWidth:		1280,
								minHeight:		720,
								minAspectRatio:	1.77,
								minFrameRate: 15,
								maxFrameRate: 15

							}
						}
				};
				if (error === 'permission-denied') return alert('Permission is denied.');
				if (error === 'not-chrome') return alert('Please use chrome.');
				if (!error && sourceId) {
					screen_constraints.video.mandatory.chromeMediaSource = 'desktop';
					screen_constraints.video.mandatory.chromeMediaSourceId = sourceId;
				}
			}
			navigator.getUserMedia(screen_constraints,onUserMediaSuccess,onUserMediaError);
		});
	}else if($("#idType").val()=="presenter" && hasCam){
		if($("#res").val()=="QCIF" || $("#res").val()=="qcif"){
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(QCIF, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(QCIF)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
			totalHeight = 99;
			totalWidth = QCIF.video.mandatory.maxWidth;
			offset = 22.5;
		}
		else if($("#res").val()=="CIF" || $("#res").val()=="cif"){
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(CIF, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(CIF)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
			totalHeight = 198;
			totalWidth = CIF.video.mandatory.maxWidth;
			offset = 45;
		}
		else if($("#res").val()=="VGA" || $("#res").val()=="vga"){
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(VGA, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(VGA)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
			totalHeight = 360;
			totalWidth = VGA.video.mandatory.maxWidth;
			offset = 60;
		}
		else{
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(HD, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(HD)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
			totalHeight = HD.video.mandatory.minHeight;
			totalWidth = HD.video.mandatory.minWidth;
			offset = 0;
		}
	}
	else if($("#idType").val()=="participant" || !hasCam){
		if($("#res").val()=="QCIF" || $("#res").val()=="qcif"){
			totalHeight = 99;
			totalWidth = QCIF.video.mandatory.maxWidth;
			offset = 22.5;
			QCIF.video = false;
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(QCIF, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(QCIF)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
		}
		else if($("#res").val()=="CIF" || $("#res").val()=="cif"){
			totalHeight = 198;
			totalWidth = CIF.video.mandatory.maxWidth;
			offset = 45;
			CIF.video = false;
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(CIF, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(CIF)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
		}
		else if($("#res").val()=="VGA" || $("#res").val()=="vga"){
			totalHeight = 360;
			totalWidth = VGA.video.mandatory.maxWidth;
			offset = 60;
			VGA.video = false;
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(VGA, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(VGA)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
		}
		else{
			totalHeight = HD.video.mandatory.minHeight;
			totalWidth = HD.video.mandatory.minWidth;
			offset = 0;
			HD.video = false;
			if(navigator.mediaDevices.getUserMedia === undefined) {
				navigator.getUserMedia(HD, onUserMediaSuccess, onUserMediaError);
			}
			else {
				navigator.mediaDevices.getUserMedia(HD)
				.then(onUserMediaSuccess)
				.catch(function(err) {
				  console.log(err.name + ": " + err.message);
				});
			}
			
		}
	}
}

function onChannelConnect(message) {
	console.log('Channel connected.');
	console.log(message);
	socket.onmessage = onChannelMessage;
}

function onChannelMessage(message) {
	var data = JSON.parse(message.data); 
	console.log("Type----->"+data.type);
	console.log("Data----->"+JSON.stringify(data));
	if (data.type == "answer")
	{
		processAnswerSdp(data);
		connectToChatserver();
	}
	else if(data.type=="error"){
//		console.log("message type:error---->"+JSON.stringify(data))	
		$("#remoteVideo").removeClass('loader');
		if(data.category=="offer"){
			alert(data.description)
		}
		else{
			alert(data.description)
		}

		window.close();
		location.reload();
		return false;
	}

}

function onChannelError() {
	console.log('Channel error.');
	location.reload();
}

function onChannelClosed() {
	console.log('Channel closed.');
	location.reload();
}

var streamAdded = false;
function onUserMediaSuccess(stream) {
	var a = performance.now();
	console.log('Entered onUserMediaSuccess');
	var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	if($("#stun").val()=="NONE" || $("#stun").val()=="none"){
		pc = new PeerConnection(null);
		console.log('Entered onUserMediaSuccess stun negotiation with local stun');
	}
	else{
		pc = new PeerConnection({iceServers: [{url: 'stun:stun.l.google.com:19302'}, {url: 'stun:stun.services.mozilla.com'}]});
		console.log('Entered onUserMediaSuccess stun negotiation with google stun');
	}
	pc.addStream(stream);
	audioStream = stream;


	pc.onicecandidate = function (evt) {
		if (evt.candidate) 
		{
			console.log('get ice candiate ');
			iceCandidates.push(evt.candidate);
		}
		else
		{
			console.log('End of ice candidates list ');
			var b = performance.now();
			console.log("Time taken for stun negotiation and collect all ice candidates====>"+(b-a)+" ms.");
			var offersdp = pc.localDescription.sdp;
			if($("#res").val()=="QCIF" || $("#res").val()=="qcif"){
				offersdp = insertVPXfmtp( pc.localDescription.sdp,30,99);
			}
			else if($("#res").val()=="CIF" || $("#res").val()=="cif"){
				offersdp = insertVPXfmtp( pc.localDescription.sdp,30,396);
			}
			else if($("#res").val()=="VGA" || $("#res").val()=="vga"){
				offersdp = insertVPXfmtp( pc.localDescription.sdp,30,1200);
			}
			else{
				//for HD do nothing
			}
			c = performance.now();
			console.log("Time taken to manipulate sdp====>"+(c-b)+" ms.");
			var msg = {
					userid:$("#userid").val(),
					role:$("#idType").val(),
					type:pc.localDescription.type,
					sdp:offersdp
			}
			console.log('Old Local SDP: ' + JSON.stringify(pc.localDescription.sdp));
			console.log('New Local SDP after string manipulation: ' + JSON.stringify(offersdp));
			socket.send(JSON.stringify(msg));
		}
	};
	pc.onaddstream = function(evt) {
		var d = performance.now();
		console.log("Time taken between sending local SDP and getting the remote stream====>"+(d-c)+" ms.");
		if(window.location.href.indexOf("screenShare") != -1) {
			//do nothing
		}
		else{
			document.getElementById('remoteVideo').src = URL.createObjectURL(evt.stream);
			$("#remoteVideo").removeClass('loader');
		}
		console.log('Remote video stream added');
		var ack="{\"type\":\"ok\" }";
		socket.send(ack);
		if($("#userid").val().toUpperCase()!="SCREENSHARE" && $("#idType").val()=="presenter" && isScreenShareEnable){
			$("#idShareScreen").removeClass('hide');
		}
		if($("#userid").val().toUpperCase()!="SCREENSHARE" && $("#idType").val()=="presenter"){
			$("#idMuteParticipantAudio").removeClass('hide');
		}
		if(isAdmin){
			$("#recordConference").removeClass('hide');
			$("#recordFiles").removeClass('hide');
		}
		streamAdded = true;
		//muteToggle(false);
//		WebRTCstat.init(pc);
	};
	var sdpConstraints = {
			'mandatory': {
				'OfferToReceiveAudio': true,
				'OfferToReceiveVideo': true
			}
	};
	if(DetectRTC.browser.isFirefox){
		sdpConstraints = { "offerToReceiveAudio": true, "offerToReceiveVideo": true };
	}
	if(reinviteFlag){
		createAnswerSdp();
	} else{
		if($("#userid").val().toUpperCase()=="SCREENSHARE"){
			pc.createOffer(onDescCreated, onCreateOfferError);
		}
		else{
			pc.createOffer(onDescCreated, onCreateOfferError,sdpConstraints);
		}
//		pc.createOffer(onDescCreated, onCreateOfferError,sdpConstraints);
	}
	


}
function insertVPXfmtp(sdp, max_fr, max_fs) {
	// Handle VP8 and VP9
	var re = /(a=rtpmap:(\d*) VP[89]\/90000\r\n)/;
//	return sdp.replace(re, "$1" + "a=fmtp:" + "$2" + " max-fs=" + max_fs +"; max-fr=" + max_fr + " \r\n");
	return sdp.replace(re, "$1" + "a=fmtp:" + "$2" + " max-fs=" + max_fs +" \r\n");
}

var userMediaError = false;
function onUserMediaError(msg) {
	if(userMediaError){
		console.log('User media error: Microphone and Camera none are present: ' + JSON.stringify(msg));
		$("#remoteVideo").removeClass('loader');
		alert("No Audio or video device found.")
		window.close();
		location.reload();
		return false;
	}
	else{
		console.log('Trying first time disabling video User media error: ' + JSON.stringify(msg));
		userMediaError = true;
		if($("#res").val()=="QCIF" || $("#res").val()=="qcif"){
			QCIF.video = false;
			navigator.getUserMedia(QCIF, onUserMediaSuccess, onUserMediaError);
		}
		else if($("#res").val()=="CIF" || $("#res").val()=="cif"){
			CIF.video = false;
			navigator.getUserMedia(CIF, onUserMediaSuccess, onUserMediaError);
		}
		else if($("#res").val()=="VGA" || $("#res").val()=="vga"){
			VGA.video = false;
			navigator.getUserMedia(VGA, onUserMediaSuccess, onUserMediaError);
		}
		else{
			HD.video = false;
			navigator.getUserMedia(HD, onUserMediaSuccess, onUserMediaError);
		}
	}
}

function onCreateOfferError(msg) {
	logError('Error creating offer: ' + JSON.stringify(msg));
}

function onDescCreated(desc) {
	pc.setLocalDescription(desc, function() {
		console.log('Storing local sdp');
	}, onLocalDescError);
}

function onLocalDescError(msg) {
	logError('Local description could not be set: ' + JSON.stringify(msg));
}

function storeIceCandidates() {
	console.log('Storing local ice candidates');
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'storeIceCandidates.php');
	if (caller) xhr.onload = checkForRemoteSdp;
	xhr.send(JSON.stringify({id: localId, ice: iceCandidates}));
}

function checkForRemoteSdp() {
	console.log('Checking db for remote sdp');
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'receiveSdp.php?id=' + remoteId);
	xhr.onload = processSdp;
	xhr.send();
}

function createAnswerSdp(){
	console.log('Processing answer sdp------->'+inviteSdp);
	var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
	pc.setRemoteDescription(new SessionDescription(inviteSdp));
	pc.createAnswer(function (answerSDP) {
		pc.setLocalDescription(answerSDP);  
		var msg = {
				userid:$("#userid").val(),
				role:$("#idType").val(),
				type:pc.localDescription.type,
				sdp:pc.localDescription.sdp
		}
		console.log('New Local SDP: ' + JSON.stringify(msg));
		socket.send(JSON.stringify(msg));
	}, onRemoteDescSuccess, onRemoteDescError);
}

function processAnswerSdp(sdp)
{
	console.log('Processing answer sdp');
	var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
	pc.setRemoteDescription(new SessionDescription(sdp), onRemoteDescSuccess, onRemoteDescError);
}

function processSdp() {
	if (this.response) {
		console.log('Processing remote sdp');
		var data = JSON.parse(this.response);
		if (caller) remoteId = data.id;
		var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
		pc.setRemoteDescription(new SessionDescription(JSON.parse(data.sdp)), onRemoteDescSuccess, onRemoteDescError);
	}
	else
		setTimeout(checkForRemoteSdp, 5000);
}

function onRemoteDescSuccess() {
	console.log('Remote sdp successfully set');
}

function onRemoteDescError(msg) {
	logError('Remote sdp could not be set: ' + JSON.stringify(msg));
}

function onCreateAnswerError(msg) {
	logError('Error creating answer: ' + JSON.stringify(msg));
}

/**
 * Audio mute
 */
function muteToggle(isMuted){
	if(isMuted){
		console.log("inside unmute loop")
		$("#statusAudio").addClass('hide');
		for(var i=0;i<audioStream.getAudioTracks().length;i++){	
			audioStream.getAudioTracks()[i].enabled = true;
		}		
	}
	else{
		console.log("inside mute loop")
		$("#statusAudio").removeClass('hide');
		for(var i=0;i<audioStream.getAudioTracks().length;i++){	
			audioStream.getAudioTracks()[i].enabled = false;
		}	
	}
}
var audioMuteFlag = true;
function muteAudio(){
	audioMuteFlag = !audioMuteFlag;
	if(audioMuteFlag){
		console.log("inside unmute loop")
		$("#2").addClass('hide');
		$("#1").removeClass('hide');
		for(var i=0;i<audioStream.getAudioTracks().length;i++){	
			audioStream.getAudioTracks()[i].enabled = true;
		}		
	}
	else{
		console.log("inside mute loop")
		$("#2").removeClass('hide');
		$("#1").addClass('hide');
		for(var i=0;i<audioStream.getAudioTracks().length;i++){	
			audioStream.getAudioTracks()[i].enabled = false;
		}	
	}
}

var participantMuteFlag = true;
function muteParticipantAudio(){
	if(streamAdded && participantList.length > 0){
		participantMuteFlag = !participantMuteFlag;
		var msg="";
		if(participantMuteFlag){
			console.log("inside unmute participant loop")
			$("#6").addClass('hide');
			$("#5").removeClass('hide');
			msg = {
					type:"operation",
					action:"unmute",
					users:participantList
			}
		}
		else{
			console.log("inside mute participant loop")
			$("#6").removeClass('hide');
			$("#5").addClass('hide');
			msg = {
					type:"operation",
					action:"mute",
					users:participantList
			}
		}	
		console.log("msg---->"+JSON.stringify(msg))
		socket.send(JSON.stringify(msg));
	}

}

var videoMuteFlag = true;
function muteVideo(){
	videoMuteFlag = !videoMuteFlag;
	if(videoMuteFlag){
		console.log("inside unmute loop")
		$("#4").addClass('hide');
		$("#3").removeClass('hide');
		for(var i=0;i<audioStream.getVideoTracks().length;i++){	
			audioStream.getVideoTracks()[i].enabled = true;
		}		
	}
	else{
		console.log("inside mute loop")
		$("#4").removeClass('hide');
		$("#3").addClass('hide');
		for(var i=0;i<audioStream.getVideoTracks().length;i++){	
			audioStream.getVideoTracks()[i].enabled = false;
		}	
	}
}

/**
 * Video mute
 */
function videoMuteToggle(isVideoMuted){
	if(isVideoMuted){
		console.log("inside video unmute loop")
		$("#statusVideo").addClass('hide');
		for(var i=0;i<audioStream.getVideoTracks().length;i++){
			audioStream.getVideoTracks()[i].enabled = true;
		}
	}else{
		console.log("inside video mute loop")
		$("#statusVideo").removeClass('hide');
		for(var i=0;i<audioStream.getVideoTracks().length;i++){			
			audioStream.getVideoTracks()[i].enabled = false;
		}
	}
}

/**
 * Video slice toggle
 */
var isSliced=false;
function sliceVideo(){
	if(isSliced){
		if(streamAdded){
			stopLoop();
		}
		$("#row2").addClass('hide');
		$("#row1").show();
		$("#idSlice").removeClass('hide');
		$("#idUnSlice").addClass('hide');
		isSliced = false;
	}else{
		$("#row1").hide();
		$("#row2").removeClass('hide');
		$("#idSlice").addClass('hide');
		$("#idUnSlice").removeClass('hide');
		isSliced = true;
		if(streamAdded){
			keepGoing = true;
			drawCanvasMain();
			drawCanvas();
		}
	}
}
var webrtcData = 0;
var sipData = 0;
var layout="";
var recordListLength = 0;
var participantList=[];
function onMessageReceived(evt) {
	var msg = JSON.parse(evt.data);
	console.log("message ---->"+JSON.stringify(msg))
	if(msg.type=="message"){
		var now = new Date;
		var $messageLine = $('<li class="clearfix">'
				+   '<div class="chat-body clearfix">'
				+       '<div class="">'
				+           '<strong class="primary-font">'+msg.user+'</strong> <small class="pull-right text-muted">'
				+               '<span class="glyphicon glyphicon-time"></span>'+now.toDateString()+'&nbsp;'+ now.toLocaleTimeString()+'</small>'
				+       '</div>'
				+       '<p class="text-justify">'
				+           msg.message
				+       '</p>'
				+   '</div>'
				+'</li>');
		if($("#userid").val()==msg.user){
			//console.log("Same user")
		}else{
//			blink();
		}

		$chatWindow.append($messageLine);
		scrollTop = $('#idPanelBody').scrollTop();
		scrollHeight = parseInt($chatWindow.prop('scrollHeight'));
		if(scrollHeight > 200){			
			$('#idPanelBody').scrollTop(scrollHeight-200);
		}
	} else if(msg.type=="offer"){
		inviteSdp = msg.data;
		reinviteFlag = true;
		onChannelOpened();
	} else if(msg.type=="conf"){
//		console.log("message type:conf---->"+JSON.stringify(msg))
		webrtcData = 0;
		sipData = 0;
		participantList.length = 0;
		var isAllParticipantMuted = true;
		$("#idUserList").empty();
		$("#sideTotal").empty();
		$("#sideWeb").empty();
		$("#sideSip").empty();
		var arr = msg.parties;
		$("#sideTotal").append(arr.length);						
		$.each( arr, function( index, value ){
			var userRole
			var muteParticipant="";
			var $userRole
			var $userLine
			var line
			if(value.role=="presenter" && value.owner==true){
				userRole='<i class="fa fa-user-times" data-toggle="tooltip" data-placement="right" title="Owner"></i> ';
			}
			else if(value.role=="presenter" && value.owner==false){
				userRole='<i class="fa fa-user-plus" data-toggle="tooltip" data-placement="right" title="Presenter"></i> ';
			}
			else if(value.role=="participant"){
				userRole='<i class="fa fa-user" data-toggle="tooltip" data-placement="right" title="Participant"></i> ';
				if(value.mute==true){
					muteParticipant='<i class="fa fa-microphone-slash" style="color: firebrick;"></i> ';
				} else{
					isAllParticipantMuted = false;
					participantMuteFlag = true;
					$("#6").addClass('hide');
					$("#5").removeClass('hide');
				}
				participantList.push(value.id);
			}
			else {
				userRole='<i class="fa fa-user" data-toggle="tooltip" data-placement="right" title="Participant"></i> ';
			}
			
			if(value.session_type=="WEBSOCKET_SESSION"){
				line ='<div class="desc">'
					+'<div class="btn-group btn-xs pull-left hide" role="group">'
					+	'<button type="button" class="btn btn-danger btn-xs hide" data-toggle="tooltip" data-placement="bottom" title="Raised hand"><i class="fa fa-hand-o-up"></i></button>'
					+'</div>'
					+	'<div class="details">'	
					+		'<p>'
					+ userRole
					+'<i class="fa fa-laptop" data-toggle="tooltip" data-placement="right" title="Web user"></i>&nbsp;<a href="#"> '+ value.name +' '+muteParticipant+' </a>'
					+		'</p>'
					+	'</div>';
				webrtcData = webrtcData + 1;
			}
			else if(value.session_type=="SIP_SESSION"){
				line ='<div class="desc">'
					+'<div class="btn-group btn-xs pull-left hide" role="group">'
					+	'<button type="button" class="btn btn-danger btn-xs hide" data-toggle="tooltip" data-placement="bottom" title="Raised hand"><i class="fa fa-hand-o-up"></i></button>'
					+'</div>'
					+	'<div class="details">'	
					+		'<p>'
					+ userRole
					+'<i class="fa fa-phone" data-toggle="tooltip" data-placement="right" title="Sip user"></i>&nbsp;<a href="#"> '+ value.name +' '+muteParticipant+' </a>'
					+		'</p>'
					+	'</div>';
				sipData = sipData + 1;
			}
			if(isAdmin){
				line = line+'<div class="btn-group btn-xs pull-right" role="group">'
				+'<button id="controlVideo" type="button" class="btn btn-default btn-xs" onClick="toggleControlVideo()" data-toggle="tooltip" data-placement="bottom" title="Mute video"><i class="fa fa-camera"></i></button>'
				+'<button id="controlAudio" type="button" class="btn btn-default btn-xs" onClick="toggleControlAudio()" data-toggle="tooltip" data-placement="bottom" title="Mute audio"><i class="fa fa-microphone"></i></button>'
				+'<button id="controlRole" type="button" class="btn btn-default btn-xs" onClick="toggleControlRole()" data-toggle="tooltip" data-placement="bottom" title="Promote as presenter"><i class="fa fa-angle-double-up"></i></button>'
				+'<button id="controlScreenShare" type="button" class="btn btn-default btn-xs" onClick="toggleControlScreenShare()" data-toggle="tooltip" data-placement="bottom" title="Enable screensharing"><i class="fa fa-lock"></i></button>'
				+'</div>'
				+'</div>';
			}
			else{
				line = line+'</div>'
			}
			$("#idUserList").append(line);
		});
		if(participantList.length ==0){
			participantMuteFlag = true;
			$("#6").addClass('hide');
			$("#5").removeClass('hide');
		}
		if(participantList.length > 0 && isAllParticipantMuted){
			participantMuteFlag = false;
			$("#5").addClass('hide');
			$("#6").removeClass('hide');
		}
		$("#sideWeb").append(webrtcData);
		$("#sideSip").append(sipData);
	}
	else if(msg.type=="layout"){
//		console.log("message type:layout---->"+JSON.stringify(msg))	
		layout = msg.regions
		clearCanvas();
	}
	else if(msg.type=="operation_event" && msg.event=="record_started"){
		$("#status").removeClass('hide');
		blinker();
	}
	else if(msg.type=="operation_event" && msg.event=="record_completed"){
		$("#status").addClass('hide')
	}
	else if(msg.type=="record_list" && isAdmin){
		$("#idPlayList").empty();
		$("#fileTotal").empty();
		var a = "file";
		var arr = msg.files;
		recordListLength = arr.length;
		$("#fileTotal").append(arr.length);	
		var playLineWrapper='';	
		var i=1;
		$.each( arr, function( index, value ){
			var playLine = '<li><a id="'+value+'" href="#" onclick="playFile(this.id,'+i+')"><i class="fa fa-file-video-o"></i>File '+i+' <span id="sidePlay'+i+'" class="pull-right"><i class="fa fa-play"></i></span></a></li>';
			playLineWrapper = playLineWrapper + playLine;
			i++;
		});
		$("#idPlayList").append(playLineWrapper);			
	}
	else if(msg.type=="operation_event" && msg.event=="play_started"){
		$("#status").removeClass('hide');
		$("#status").empty();
		$("#status").append('<i class="fa fa-pause"></i>&nbsp;&nbsp;Playing...');
		blinker();
	}
	else if(msg.type=="operation_event" && msg.event=="play_completed"){
		for(var i=1;i<=recordListLength;i++){
			$("#sidePlay"+i).empty();
			$("#sidePlay"+i).append('<i class="fa fa-play"></i>');
		}
		playFlag=false;
		$("#status").addClass('hide');
		$("#status").empty();
		$("#status").append('<i class="fa fa-circle"></i>&nbsp;&nbsp;Recording...');
	}
	else if(msg.type=="rtc_ka"){
		var msg = '{"type":"rtc_ka_ack"}';
		socket.send(msg);
	}
}

function blinker() {
	$('#status').fadeOut(1000,"swing");
	$('#status').fadeIn(1000,"swing");
}
setInterval(blinker, 1000);
/**
 * chat app
 */
function sendMessage() {
	//console.log("Entered sendMessage")
	if($("#message").val() !="" && $("#message").val().trim() !=""){
		var msg = '{"type":"message","message":"' + $("#message").val() + '", "user":"'
		+ $("#userid").val() + '", "timestamp":""}';
		socket.send(msg);
	}
	$("#message").val('').focus();
}

function connectToChatserver() {
	console.log("Entered connectToChatserver")
	socket.onmessage = onMessageReceived;
	$chatWindow = $('#chatbox');
	$(".chat-wrapper h3").removeClass('hide')
	$('.chat-wrapper h3').text('Chat # '+$("#userid").val() + "@ConferenceId=" + room_id);
}

/**
 * Video slicing
 */
function clearCanvas(){
	var canvas = document.getElementById('canvasMain');
	if(canvas){
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < 9; i++) {
			var canvas = document.getElementById('canvas'+i);
			var context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
			$("#main"+i).addClass('hide');
		}
	}
}

function drawCanvasMain(){
//	console.log("totalWidth========>"+totalWidth);
//	console.log("totalHeight========>"+totalHeight);
	var xmsVideo = document.getElementById('remoteVideo');
	if(layout != ""){
		var canvas = document.getElementById('canvasMain');
		var main = document.getElementById('canvasMainContainer');
		var context = canvas.getContext('2d');
		var region = layout[0]
		var video_x = (region.left)/100*totalWidth;
		var video_y = 0;
		video_y = ((eval(region.top))/100*totalHeight)+offset;
		var videoW = (totalWidth/100)*(eval(region.size));
		var videoH = 0;	
		videoH = (totalHeight/100)*(region.size);	
		var canvasW = main.clientWidth;
		var canvasH = main.clientHeight;
		canvas.width = canvasW;
		canvas.height = canvasH;
		var canvasX = canvasY = 0;		    
		context.drawImage(xmsVideo,video_x, video_y,videoW, videoH,canvasX, canvasY, canvasW, canvasH);
		if(keepGoing) {
			setTimeout( drawCanvasMain, 30);
		}
	}
}

function drawCanvas(){
	var xmsVideo = document.getElementById('remoteVideo');
	if(layout != ""){
		for (var i = 0; i < layout.length; i++) {
			var canvas = document.getElementById('canvas'+i);
			var context = canvas.getContext('2d');
			var region = layout[i]
			if(region.id!="mscontrol:////Mixer/StreamGroup.__MostActive__"){
				$("#main"+i).removeClass('hide');
				var main = document.getElementById('main'+i);
				var video_x = (region.left)/100*totalWidth;
				var video_y = 0;
				video_y = ((eval(region.top))/100*totalHeight)+offset;
				var videoW = (totalWidth/100)*(eval(region.size));
				var videoH = 0;	
				videoH = (totalHeight/100)*(region.size);				
				var canvasW = main.clientWidth;
				var canvasH = main.clientHeight;
				canvas.width = canvasW;
				canvas.height = canvasH;
				var canvasX = canvasY = 0;		    
				context.drawImage(xmsVideo,video_x, video_y,videoW, videoH,canvasX, canvasY, canvasW, canvasH);
			}
		}
		if(keepGoing) {
			setTimeout( drawCanvas, 30);
		}
	}
}

function stopLoop() {
	keepGoing = false;
}
Array.prototype.swap = function(a, b) {
	var temp = this[a];
	this[a] = this[b];
	this[b] = temp;
};
String.prototype.contains = function(it) 
{ 
	return this.indexOf(it) != -1; 
};
var activeSpeaker = 0;
$(function () {
	$("canvas").on("click", function (e){
		//console.info(e);
		if(layout != ""){
			var canvasId = e.target.id;
			var id = canvasId.substring(6, 7);
			if(id<layout.length){
//				layout.swap(0, id);
				if(layout[0].id=="mscontrol:////Mixer/StreamGroup.__MostActive__"){
					console.log("id:"+id);
					var canvas = document.getElementById('canvas'+id);
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, canvas.width, canvas.height);
					$("#main"+id).addClass('hide');
					activeSpeaker = id;
					layout.swap(0, id);
				}
				else if(layout[activeSpeaker].id=="mscontrol:////Mixer/StreamGroup.__MostActive__"){
					console.log("next id:"+activeSpeaker);
					var canvas = document.getElementById('canvas'+0);
					var context = canvas.getContext('2d');
					context.clearRect(0, 0, canvas.width, canvas.height);
					$("#main"+0).addClass('hide');
					layout.swap(0, activeSpeaker);
				}
				else{
					layout.swap(0, id);
				}
			}
		}
	});

	$("canvas").on("mouseover", function (e){
		console.info(e);
		var canvasId = e.target.id;
		var id = canvasId.substring(6, 7);
	});
});
var my_window=""
	function popuponclick()
{
	if(my_window==""){
		var url = window.location.origin+contextPath+"/conference/screenShare?userid=screenshare&conf="+$("#conferenceId").val().trim()
		var left = (screen.width/2)-(600/2);
		var top = (screen.height/2)-(600/2);
		my_window = window.open(url,"mywindow",'status=1,centerScreen=1,width=600,height=600,top='+top+', left='+left);
	}	
	else if(false == my_window.closed)
	{
		alert('Already one Screenshare session in progress!');
	}
	else{
		var url = window.location.origin+contextPath+"/conference/screenShare?userid=screenshare&conf="+$("#conferenceId").val().trim()
		var left = (screen.width/2)-(600/2);
		var top = (screen.height/2)-(600/2);
		my_window = window.open(url,"mywindow",'status=1,centerScreen=1,width=600,height=600,top='+top+', left='+left);
	}

}

function closepopup()
{
//	$('#idScreenShare').prop('disabled', false);
	if(my_window==""){
		alert('No Screenshare detected!');
	}	
	else if(false == my_window.closed)
	{
		my_window.close ();
	}
	else
	{
		alert('Screenshare already closed!');
	}
}


function toggleControlVideo(){
	var $this = $("#controlVideo").find('.fa');
	if ($this.hasClass('fa-camera')) {
		$this.removeClass('fa-camera');
		$this.addClass('fa-exclamation-triangle');
		$("#controlVideo").attr("data-original-title","Unmute video")
	} else {
		$this.removeClass('fa-exclamation-triangle');
		$this.addClass('fa-camera');
		$("#controlVideo").attr("data-original-title","Mute video")
	}
}

function toggleControlAudio(){
//	console.log("id--->"+id);
//	var mutelist = [];
//	mutelist.push(id);
//	var msg = {
//			type:"operation",
//			users:mutelist
//	}
//	var $this = $("#controlAudio").find('.fa');
//	if ($this.hasClass('fa-microphone')) {
//		$this.removeClass('fa-microphone');
//		$this.addClass('fa-microphone-slash');
//		$("#controlAudio").attr("data-original-title","Unmute audio");
//		msg.action = "unmute";
//	} else {
//		$this.removeClass('fa-microphone-slash');
//		$this.addClass('fa-microphone');
//		$("#controlAudio").attr("data-original-title","Mute audio");
//		msg.action = "mute";
//	}
//	console.log("msg--->"+JSON.stringify(msg));
//	socket.send(JSON.stringify(msg));
}

function toggleControlRole(){
	var $this = $("#controlRole").find('.fa');
	if ($this.hasClass('fa-angle-double-up')) {
		$this.removeClass('fa-angle-double-up');
		$this.addClass('fa-angle-double-down');
		$("#controlRole").attr("data-original-title","Mark as participant")
	} else {
		$this.removeClass('fa-angle-double-down');
		$this.addClass('fa-angle-double-up');
		$("#controlRole").attr("data-original-title","Promote as presenter")
	}
}

function toggleControlScreenShare(){
	var $this = $("#controlScreenShare").find('.fa');
	if ($this.hasClass('fa-lock')) {
		$this.removeClass('fa-lock');
		$this.addClass('fa-unlock');
		$("#controlScreenShare").attr("data-original-title","Disable screensharing")
	} else {
		$this.removeClass('fa-unlock');
		$this.addClass('fa-lock');
		$("#controlScreenShare").attr("data-original-title","Enable screensharing")
	}
}

function raiseHand(){
	var msg = '{"type":"raiseHand","user":"'+$("#userid").val() + '", "timestamp":""}';
//	socket.send(msg);
}

var recordFlag=false;
function recordConference(){
	if(streamAdded){
		$("#recordButton").empty();
		if(recordFlag){
			$("#recordButton").append("Record Conference");
			var msg = '{"type":"operation","action":"record_stop","user":"'+$("#userid").val() + '"}';
			recordFlag=false;
		}else{
			$("#recordButton").append("Stop Recording");
			var msg = '{"type":"operation","action":"record_start","user":"'+$("#userid").val() + '"}';
			recordFlag=true;
		}	
		socket.send(msg);
	}
}

var playFlag=false;
function playFile(url, index){
	if(streamAdded){
		$("#sidePlay"+index).empty();
		if(playFlag){
			$("#sidePlay"+index).append('<i class="fa fa-play"></i>');
			var msg = '{"type":"operation","action":"play_stop","uri":"'+url+'","user":"'+$("#userid").val() + '"}';
			playFlag=false;
		}else{
			$("#sidePlay"+index).append('<i class="fa fa-pause"></i>');
			var msg = '{"type":"operation","action":"play_start","uri":"'+url+'","user":"'+$("#userid").val() + '"}';
			playFlag=true;
		}
//		console.log("msg sent---->"+msg);
		socket.send(msg);
	}
}

function shareUrl(){
//	if($("#conferenceId").val()!=""){
	var url = window.location.origin+contextPath+"/conference/login?type=presenter&conf="+$("#conferenceId").val().trim();
	$("#conferenceUrl").val(url);
	$('#myModal2').modal('show');
//	}
//	else{
//	alert("You have not created or joined the conference yet.")
//	}
}
function constructUrl(){
	var type = $("input[type='radio'][name='options']:checked").val();
	var url = window.location.origin+contextPath+"/conference/login?type="+type+"&conf="+$("#conferenceId").val().trim();
	$("#conferenceUrl").val(url);

}

//function selectResolution(resolution){
//console.log("resolution---->"+resolution);
//$("#res").val(resolution);

//}
function fullScreen(){
	var elem = document.getElementById("remoteVideo");
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	}
}
$(document).ready(function() {
	$('.audioMute').click(function() {
		$(".audioMute").addClass('hide');
		$(".audioUnmute").removeClass('hide');
		muteToggle(false);
	});
	$('.audioUnmute').click(function() {
		$(".audioMute").removeClass('hide');
		$(".audioUnmute").addClass('hide');
		muteToggle(true);
	});
	$('.muteVideo').click(function() {
		$(".unmuteVideo").removeClass('hide');
		$(".muteVideo").addClass('hide');
		videoMuteToggle(false);
	});
	$('.unmuteVideo').click(function() {
		$(".muteVideo").removeClass('hide');
		$(".unmuteVideo").addClass('hide');
		videoMuteToggle(true);
	});
});
/*********Chrome plugin for screenshare***********/
var isChrome = !!navigator.webkitGetUserMedia;
var DetectRTC = {};
(function () {                    
	var screenCallback;                    
	DetectRTC.screen = {
			chromeMediaSource: 'screen',
			getSourceId: function(callback) {
				if(!callback) throw '"callback" parameter is mandatory.';
				screenCallback = callback;
				window.postMessage('get-sourceId', '*');
			},
			isChromeExtensionAvailable: function(callback) {
				if(!callback) return;                            
				if(DetectRTC.screen.chromeMediaSource == 'desktop') return callback(true);                            
				// ask extension if it is available
				window.postMessage('are-you-there', '*');                            
				setTimeout(function() {
					if(DetectRTC.screen.chromeMediaSource == 'screen') {
						callback(false);
					}
					else callback(true);
				}, 2000);
			},
			onMessageCallback: function(data) {
				if (!(typeof data == 'string' || !!data.sourceId)) return;                            
				console.log('chrome message', data);                            
				// "cancel" button is clicked
				if(data == 'PermissionDeniedError') {
					DetectRTC.screen.chromeMediaSource = 'PermissionDeniedError';
					if(screenCallback) return screenCallback('PermissionDeniedError');
					else throw new Error('PermissionDeniedError');
				}                           
				// extension notified his presence
				if(data == 'rtcmulticonnection-extension-loaded') {
					if(document.getElementById('install-button')) {
						//document.getElementById('install-button').parentNode.innerHTML = '<strong>Great!</strong> <a href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk" target="_blank">Google chrome extension</a> is installed.';
						document.getElementById('install-button').parentNode.innerHTML = '';
					}
					DetectRTC.screen.chromeMediaSource = 'desktop';
				}                            
				// extension shared temp sourceId
				if(data.sourceId) {
					DetectRTC.screen.sourceId = data.sourceId;
					if(screenCallback) screenCallback( DetectRTC.screen.sourceId );
				}
			},
			getChromeExtensionStatus: function (callback) {
				if (!!navigator.mozGetUserMedia) return callback('not-chrome');                            
				var extensionid = 'ajhifddimkapgcifgcodmmfdlknahffk';
				var image = document.createElement('img');
				image.src = 'chrome-extension://' + extensionid + '/icon.png';
				image.onload = function () {
					DetectRTC.screen.chromeMediaSource = 'screen';
//					window.postMessage('are-you-there', '*');
					setTimeout(function () {
						if (!DetectRTC.screen.notInstalled) {
							callback('installed-enabled');
						}
					}, 2000);
				};
				image.onerror = function () {
					DetectRTC.screen.notInstalled = true;
					callback('not-installed');
				};
			}
	};                    
	// check if desktop-capture extension installed.
	if(window.postMessage && isChrome) {
		DetectRTC.screen.isChromeExtensionAvailable();
	}
})();                
DetectRTC.screen.getChromeExtensionStatus(function(status) {
	if(status == 'installed-enabled') {
		$("#id-install-button").addClass('hide');
		isScreenShareEnable = true;
		if($("#userid").val().toUpperCase()!="SCREENSHARE" && $("#idType").val()=="presenter" && streamAdded){
			$("#idShareScreen").removeClass('hide');
		}
		DetectRTC.screen.chromeMediaSource = 'desktop';
	} else {
		$("#id-install-button").removeClass('hide');
		isScreenShareEnable = false;
	}
});                
window.addEventListener('message', function (event) {
	if (event.origin != window.location.origin) {
		return;
	}                    
	DetectRTC.screen.onMessageCallback(event.data);
});               
//console.log('current chromeMediaSource', DetectRTC.screen.chromeMediaSource);
