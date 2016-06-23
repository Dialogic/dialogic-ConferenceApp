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
/*body {
	padding-top: 80px;
	background: #563c55 url(../images/blurred.jpg) no-repeat center top;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	background-size: cover;
}*/

.container>header h1, .container>header h2 {
	color: #fff;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7);
}

.footer {
	position: absolute;
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
		 //Check if browser is IE or not
        if (navigator.userAgent.search("MSIE") >= 0 || navigator.userAgent.match(/trident/i)) {
            $("#submitButton").prop('disabled', true);
            alert("Webrtc is not supported in Internet Explorer. Please try in Chrome or Firefox.");
        }
        //Check if browser is Chrome or not
        else if (navigator.userAgent.search("Chrome") >= 0) {
            //alert("Browser is Chrome");
        }
        //Check if browser is Firefox or not
        else if (navigator.userAgent.search("Firefox") >= 0) {
            //alert("Browser is FireFox");
        }
        //Check if browser is Safari or not
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
        	$("#submitButton").prop('disabled', true);
            alert("Webrtc is not supported in Safari. Please try in Chrome or Firefox.");
        }
        //Check if browser is Opera or not
        else if (navigator.userAgent.search("Opera") >= 0) {
        	$("#submitButton").prop('disabled', true);
            alert("Webrtc is not supported in Opera. Please try in Chrome or Firefox.");
        }
		
	});
</script>
</head>
<body>

	  <div id="login-page">
	  	<div class="container">
	  	
		      <form class="form-login" role="form" method="POST" action="meeting">
		        <h2 class="form-login-heading">sign in now</h2>
		        <div class="login-wrap">
		            <input type="text" name="userid" class="form-control" placeholder="User ID" autofocus required>
		            <br>
		            <!--  <input type="password" name="password" class="form-control" placeholder="Password"><br>-->
		            
					<g:select class="form-control" id="type" name="type" value="${type}" 
					    optionKey="value" optionValue="key" noSelection="${['':'Select Type...']}"
					    from="${[[key:"Presenter",value:"presenter"],[key:"Participant",value:"participant"]]}"></g:select><br>
					    
					<div class="btn-group" data-toggle="buttons">
						<label class="btn btn-default active" onclick='selectResolution("HD")' data-toggle="tooltip" data-placement="bottom" title="1280 X 720">
		                    <input type="radio" id="res_hd" name="resolution" value="HD"/> HD
		                </label>
		                <label class="btn btn-default" onclick='selectResolution("VGA")' data-toggle="tooltip" data-placement="bottom" title="640 X 480">
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
					<input type="hidden" name="res" id="res" value="HD" />    
		            <!--  <label class="checkbox">
		                <span class="pull-right">
		                    <a data-toggle="modal" href="login.html#myModal"> Forgot Password?</a>		
		                </span>
		            </label>-->
		            <button id="submitButton" class="btn btn-theme btn-block" type="submit" style="margin-top: 20px;margin-bottom: 20px;"><i class="fa fa-lock"></i> SIGN IN</button>
		            <hr>
		            
		            <div class="login-social-link centered hide" id="id-install-button">
		            <p>to share your screen in chrome please install this chrome extension</p>
		            	<a class="btn btn-primary"
							href="https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk"
							target="_blank"	id="install-button">
							Add to chrome | <i class="fa fa-share-alt-square"></i>
						</a>
		               
		            </div>		
		        </div>
		
		          <!-- Modal -->
		          <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
		              <div class="modal-dialog">
		                  <div class="modal-content">
		                      <div class="modal-header">
		                          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                          <h4 class="modal-title">Forgot Password ?</h4>
		                      </div>
		                      <div class="modal-body">
		                          <p>Enter your e-mail address below to reset your password.</p>
		                          <input type="text" name="email" placeholder="Email" autocomplete="off" class="form-control placeholder-no-fix">
		
		                      </div>
		                      <div class="modal-footer">
		                          <button data-dismiss="modal" class="btn btn-default" type="button">Cancel</button>
		                          <button class="btn btn-theme" type="button">Submit</button>
		                      </div>
		                  </div>
		              </div>
		          </div>
		          <!-- modal -->
		
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
//                        window.postMessage('are-you-there', '*');
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
    </script>


  </body>
</html>