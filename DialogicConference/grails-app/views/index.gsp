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
body {
	padding-top: 60px;
	/*background-image: url(images/jogger-jumping.jpg);
	background-image: url(../images/jogger-front.jpg);*/
	/*background-repeat: no-repeat;
	background-position-x: 15%;
	background-position-y: 30%;*/
	background: #563c55 url(images/bg3.jpg) no-repeat center top;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
	
}

.container {
	background-color: transparent;
}

/* Main marketing message and sign up button */
.jumbotron {
	text-align: center;
	background-color: transparent;
}

.jumbotron .btn {
	padding: 14px 24px;
	font-size: 21px;
}

/* Customize the nav-justified links to be fill the entire space of the .navbar */
.nav-justified {
	background-color: #eee;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.nav-justified>li>a {
	padding-top: 15px;
	padding-bottom: 15px;
	margin-bottom: 0;
	font-weight: bold;
	color: #777;
	text-align: center;
	background-color: #e5e5e5; /* Old browsers */
	background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5),
		to(#e5e5e5));
	background-image: -webkit-linear-gradient(top, #f5f5f5 0%, #e5e5e5 100%);
	background-image: -o-linear-gradient(top, #f5f5f5 0%, #e5e5e5 100%);
	background-image: -webkit-gradient(linear, left top, left bottom, from(top),
		color-stop(0%, #f5f5f5), to(#e5e5e5));
	background-image: linear-gradient(top, #f5f5f5 0%, #e5e5e5 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f5f5f5',
		endColorstr='#e5e5e5', GradientType=0); /* IE6-9 */
	background-repeat: repeat-x; /* Repeat the gradient */
	border-bottom: 1px solid #d5d5d5;
}

.nav-justified>.active>a, .nav-justified>.active>a:hover, .nav-justified>.active>a:focus {
	background-color: #ddd;
	background-image: none;
	-webkit-box-shadow: inset 0 3px 7px rgba(0, 0, 0, .15);
	box-shadow: inset 0 3px 7px rgba(0, 0, 0, .15);
}

.nav-justified>li:first-child>a {
	border-radius: 5px 5px 0 0;
}

.nav-justified>li:last-child>a {
	border-bottom: 0;
	border-radius: 0 0 5px 5px;
}

@media ( min-width : 768px) {
	.nav-justified {
		max-height: 52px;
	}
	.nav-justified>li>a {
		border-right: 1px solid #d5d5d5;
		border-left: 1px solid #fff;
	}
	.nav-justified>li:first-child>a {
		border-left: 0;
		border-radius: 5px 0 0 5px;
	}
	.nav-justified>li:last-child>a {
		border-right: 0;
		border-radius: 0 5px 5px 0;
	}
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
	/* Remove the padding we set earlier */
	.masthead, .marketing, .footer {
		padding-right: 0;
		padding-left: 0;
	}
}

.js-video {
	height: 0;
	padding-top: 25px;
	padding-bottom: 67.5%;
	margin-bottom: 10px;
	position: relative;
	overflow: hidden;
}

.js-video.widescreen {
	padding-bottom: 57.25%;
}

.js-video.vimeo {
	padding-top: 0;
}

.js-video embed, .js-video iframe, .js-video object, .js-video video {
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;
}
</style>
</head>

<body class="responsive">

	<div class="container">
		<!--  <img src="${resource(dir:'images', file:'jogger-front.jpg')}" class="img-responsive"/>-->
		<div class="masthead">
			<h3 class="text-muted">Dialogic Convergent WebRTC Demo Application</h3>
			<ul class="nav nav-justified">
				<li class="active"><a href="#">Home</a></li>
				<li><a href="#">Projects</a></li>
				<li><a href="#">Services</a></li>
				<li><g:link controller="conference" action="downloads">Downloads</g:link></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</div>
		<div class="jumbotron">
			<div class="media">
				<a class="pull-right" href="#"><iframe frameborder="0"
						height="315" src="//www.youtube.com/embed/bbj_zRhmCUg" width="420"
						allowFullScreen="true"></iframe> </a>
			</div>

		</div>
		<div class="well" style="background: transparent;">
			<!---This section for panel component-->
			<div class="panel panel-primary " style="border-color: #959595;">
				<div class="panel-heading" style="background-color: #959595;border-color: #959595;">
					<h3 class="panel-title">Dialogic Conference Application</h3>
				</div>
				<div class="panel-body">
					<!--This section for media-->
					<div class="media">

						<div class="main-body">
							<!-- this section we will add information about the video-->
							<p class="text-justify">Welcome to the Dialogic 3PCC WebRTC Demo.  
							This demo demonstrates Dialogic’s Media Serve WebRTC Video Conferencing capabilities. 
							In addition, the demo source code is provided to help you get started writing a convergent 
							multimedia conferences using a standard media control Java API; namely, the JSR 309 connector. 
							</p>
							<p class="text-justify"> In this context, Convergent Application means the ability for an application 
							to be able to accept connections from either a Google Chrome Browser and/or SIP End Points. 
							</p>
							<p class="text-justify">In addition to this demo application source code, the JSR 309 connector and 
							documentations can be freely downloaded by selecting the download tab in the main demo page.  
							Please note that you still need a licensed Dialogic media server. Please select this 
							<a href="http://www.dialogic.com/en/products/media-server-software/xms.aspx" target="_blank">link </a>
							to request a free trial XMS Media Server. 
							</p>
							<p class="text-justify">Before running the demo, we suggest for the user to first open the above 
							slide show presentation in order to obtain additional important information about the demo; 
							after viewing the presentation then click the View Dialogic Convergent WebRTC Demo button to 
							either join an existing  created conference or to create a new conference.
							</p>
							
							<form class="text-center">								
								<p><g:link controller="conference"
									class="btn btn-lg btn-success" action="login" >View Dialogic Conference Demo</g:link></p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4">
				<h2>JSR 309</h2>
				<p class="text-justify">Java Specification Request (JSR) 309 is a standard Java media server control API for multimedia 
				application development. It provides a generic media server abstraction interface that is independent 
				of the underlying media server control protocol. The multimedia applications, such as IVR, voice-mail, 
				audio conferencing, and call center, are typically deployed in a SIP-based infrastructure. 
				The JSR 309 API provides three areas of functionality:</p>
				<p class="text-justify">
					<ul><li>Network Connection to establish media streams.</li>
					<li>Media Group functions such as to play, record, signal detection and control media content.</li>
					<li>Media Mixer functions to join media functions to a network connection so as to create conferences and call bridges.</li>
					</ul>
				</p>
				<p>
					<a class="btn btn-primary" href="https://www.jcp.org/en/jsr/detail?id=309" target="_blank" role="button">View details &raquo;</a>
				</p>
			</div>
			<div class="col-lg-4">
				<h2>Mobicents/ Telestax</h2>
				
				<p class="text-justify">TeleStax leads and maintains the following Open Source projects that constitute the Open-Core of 
				the TelScale carrier grade communication products: Mobicents is the leading Open Source JSR 289 SIP 
				Servlet implementation.  This implementation runs on both TomCat and JBoss application servers.</p>
				<p>
					<a class="btn btn-primary" href="http://www.telestax.com/opensource" target="_blank" role="button">View details
						&raquo;</a>
				</p>
			</div>
			<div class="col-lg-4">
				<h2>J2EE Websocket</h2>
				
				<p class="text-justify">WebSocket is a key technology used in building WebRTC applications. 
				This technology is supported by HTML 5 at the client’s end point.  Some application servers 
				have started to offer implementation based on the standard Java API for WebSocket (JSR 356), 
				which provides support for creating WebSocket applications. WebSocket is an application protocol 
				that provides full-duplex communications between two peers over the TCP protocol.</p>
				<p>
					<a class="btn btn-primary" href="http://docs.oracle.com/javaee/7/tutorial/doc/websocket.htm" target="_blank" role="button">View details
						&raquo;</a>
				</p>
			</div>
		</div>
	</div>
	<!-- /container -->
</body>
</html>

