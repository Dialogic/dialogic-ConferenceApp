package web_converged_demo.conference;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import javax.media.mscontrol.MediaErr;
import javax.media.mscontrol.MediaEventListener;
import javax.media.mscontrol.MediaSession;
import javax.media.mscontrol.MsControlException;
import javax.media.mscontrol.Parameters;
import javax.media.mscontrol.Value;
import javax.media.mscontrol.join.Joinable;
import javax.media.mscontrol.mediagroup.CodecConstants;
import javax.media.mscontrol.mediagroup.MediaGroup;
import javax.media.mscontrol.mediagroup.Player;
import javax.media.mscontrol.mediagroup.PlayerEvent;
import javax.media.mscontrol.mediagroup.Recorder;
import javax.media.mscontrol.mediagroup.RecorderEvent;
import javax.media.mscontrol.mediagroup.signals.SignalConstants;
import javax.media.mscontrol.mediagroup.signals.SignalDetector;
import javax.media.mscontrol.mediagroup.signals.SignalDetectorEvent;
import javax.media.mscontrol.networkconnection.NetworkConnection;
import javax.media.mscontrol.resource.RTC;
import javax.servlet.sip.SipServletRequest;
import javax.servlet.sip.SipSession;
import javax.websocket.Session;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DlgcParticipant  implements Serializable{

	/**
	 * 
	 */
	
	private class PlayerEventListener implements MediaEventListener<PlayerEvent>, Serializable
	{
		/**
		 * 
		 */
		private static final long serialVersionUID = -7904645633486909974L;
		private DlgcParticipant participant;
		
		public PlayerEventListener(DlgcParticipant p){
			participant = p;
		}
			
		@Override
		public void onEvent(PlayerEvent event)
		{
			log.info("PlayerEventListener::onEvent()");
			log.info("   EVENT TYPE : " + event.getEventType());
			log.info("    QUALIFIER : " + event.getQualifier());
			log.info("  CHANGE TYPE : " + event.getChangeType());
			log.info("   PLAY INDEX : " + event.getIndex());
			log.info("  PLAY OFFSET : " + event.getOffset());
			log.info("        ERROR : " + event.getError());
			log.info("   ERROR TEXT : " + event.getErrorText());
			
			
			//MediaGroup mg = (MediaGroup) event.getSource().getContainer();
			
			try
			{
				synchronized(participant)
				{
					participant.notify();
				}
			}
			catch(IllegalMonitorStateException e)
			{
				log.error("IllegalMonitorStateException error=" +e.getLocalizedMessage());
			}
			
			JSONObject obj = new JSONObject();
			obj.put("type", "operation_event");
			String eventValue="";
			if ( event.getEventType() == PlayerEvent.PLAY_COMPLETED ) {
				log.info("Received Player Event: Play Complete .");
				eventValue ="play_completed";
				
			} 
			else
			{
				eventValue = event.getEventType().toString();
			}		
			
			obj.put("event", eventValue);
			m_MediaState = MediaState.IDLE;
			participant.SendMsg(obj.toJSONString());
		}	
	}
	
	private class RecorderEventListener implements MediaEventListener<RecorderEvent> ,Serializable
	{
		/**
		 * 
		 */
		private static final long serialVersionUID = 3280547173385430391L;
		
		private DlgcParticipant participant;
		
		public RecorderEventListener(DlgcParticipant p){
			participant = p;
		}
		
		@Override
		public void onEvent(RecorderEvent event)
		{
			log.info("RecorderEventListener::onEvent()");
			log.info("   EVENT TYPE : " + event.getEventType());
			log.info("    QUALIFIER : " + event.getQualifier());
			log.info("     DURATION : " + event.getDuration());
			log.info("        ERROR : " + event.getError());
			log.info("   ERROR TEXT : " + event.getErrorText());
			
		
			JSONObject obj = new JSONObject();
			obj.put("type", "operation_event");
			String eventValue="";
			if ( event.getEventType() ==RecorderEvent.RECORD_COMPLETED ) 
			{
				eventValue ="record_completed";
				participant.SetRecfiletoList();
			}
				
			else
				eventValue = event.getEventType().toString();
			
			m_MediaState = MediaState.IDLE;

			obj.put("event", eventValue);
			participant.SendMsg(obj.toJSONString());
			participant.SendRecFileList();
		}
	}
	
	
	private class SignalDetectorListener implements MediaEventListener<SignalDetectorEvent>, Serializable {
		
		private static final long serialVersionUID = 1L;
		private DlgcParticipant participant;
		int m_retryCount;
		
		String m_retryUri="file://invalid_id_beep.wav";
		String m_confGreetingUri="file://jointoconf.wav";
		String m_confErrorUri="file://server_busy_bye.wav";
		String m_confIdErrorUri="file://invalid_id_bye.wav";
		
		
		public SignalDetectorListener(DlgcParticipant p){
			participant = p;
			m_retryCount = 1;
		}

		@Override
		public synchronized void onEvent(SignalDetectorEvent anEvent) {
			
			//note using the JSR309 qualifier RTC_TRIGGERED not standard way of using this qualifier
			//there were not other way to map the IPMS condition using JSR 309 SPEC
			//so we decided VZ and Dialogic to use this for this purpose
			
			log.info("SignalDetectorListener::Type " + anEvent.getEventType() );
			log.info("SignalDetectorListener::Source " + anEvent.getSource().toString());
			log.info("SignalDetectorListener::ErrorText " + anEvent.getErrorText());	
			
			m_MediaState = MediaState.IDLE;
			
			if (participant.IsInConf())
				return;
			
			if (anEvent.getEventType() == SignalDetectorEvent.RECEIVE_SIGNALS_COMPLETED ) 
			{
				if (!anEvent.getError().equals(MediaErr.NO_ERROR))
				{
					participant.sendBye();
					return;
				}
				Value digits[] = anEvent.getSignalBuffer();
				log.info("SignalDetectorListener:: DTMF signals ="+digits.toString());
				String conf_room="";
				 for (Value item : digits) {
					 conf_room+=GetStringDTMF(item);
		         }
				 
				 log.info("SignalDetectorListener:: Conf room="+conf_room);
				 
				 DlgcConference confMx =m_app.getConference(conf_room);
				 if (confMx!=null ){
					synchronized(participant)
			    	{
					   participant.StartPlaying(m_confGreetingUri);
					    try {
					    	participant.wait(10000);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
			    	 }
					 if (confMx.AddParticipant(participant))
					    {
						    participant.bInConf=true;
					    	ms.setAttribute("PARTICIPANT_OBJ", participant);
					    	//response.setContent(sdp.getMediaServerSessionDescription(), "application/sdp");
					    	//response.send();
					    	//ms.setAttribute("PARTICIPANT_OBJ", p);
					    }
					    else
					    {
					    	log.error("Fail to add participant ="+participant.name+ " to conference room ="+conf_room);
					    	synchronized(participant)
					    	{
							   participant.StartPlaying(m_confErrorUri);
							    try {
							    	participant.wait(10000);
								} catch (InterruptedException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}
					    	 }
					    	participant.sendBye();
					    
					    }
				 }
				 else {
					 if (m_retryCount<3){
						 participant.GetConfRoom(m_retryUri,false);
						 m_retryCount++;
					 }
					 else {
						 log.error("Invalid conf room ="+conf_room);
						 synchronized(participant)
				    	{
						   participant.StartPlaying(m_confIdErrorUri);
						    try {
						    	participant.wait(10000);
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
				    	 }
						 participant.sendBye();
					   
					 }
					 
				 }
				 
				return;
				
			}
			
			if ( anEvent.getQualifier() == SignalDetectorEvent.DURATION_EXCEEDED) {
				log.debug("SignalDetectorListener:: DURATION_EXCEEDED");
			} else if ( anEvent.getQualifier() == SignalDetectorEvent.INITIAL_TIMEOUT_EXCEEDED) {
				log.debug("SignalDetectorListener:: INITIAL_TIMEOUT_EXCEEDED");
			} else if ( anEvent.getQualifier() == SignalDetectorEvent.INTER_SIG_TIMEOUT_EXCEEDED) {
				log.debug("SignalDetectorListener:: INTER_SIG_TIMEOUT_EXCEEDED");
			} else {
				log.debug("SignalDetectorListener:: other: qualifer " + anEvent.getQualifier().toString() );
			}
			
			log.info("SignalDetectorListener ReceiveSignals terminated with: "+anEvent);
			log.info("SignalDetectorListener ReceiveSignals terminated Event: "+anEvent.getEventType().toString());

			// In this example, the collected DTMFs are just logged.
			// In real life they could be returned in a signaling parameter, or propagated to a JSP
			log.info("SignalDetectorListener DTMF Collected: "+anEvent.getSignalString());
			String qualString = anEvent.getQualifier().toString();
			log.info("SignalDetectorListener Qualifier: "+ qualString );
			log.info("SignalDetectorListener ReceiveSignals with Error Type (if any): "+anEvent.getError().toString());
			log.info("SignalDetectorListener ReceiveSignals with Error String (if any): "+anEvent.getErrorText());

			
		}
	}		
	
	private static final long serialVersionUID = 1L;
	DlgcParticipant (String iname, NetworkConnection inc, String itype, String irole,DlgcConvergedConferenceDemo app){
		
		log.debug("Entering DlgcParticipant c-str");
		name = iname;
		nc = inc;
		type = itype;
		bVideo = false;
		ms = nc.getMediaSession();
		role = irole;
		bOwner = false;
		bMute = false;
		m_PingErrorCount =0;
		bInConf = false;
		m_app=app;
		m_MediaState = MediaState.IDLE;
		
		Map<String, String> env = System.getenv();
		String path = env.get("CATALINA_HOME");
		m_RecListfile = path + "/conf/Dialogic/"+this.name+".txt";
		
		
		
		try {
			//MediaSession ms =inc.getMediaSession();
			log.debug("DlgcParticipant c-str: before createMediaGroup");
			m_MediaGroup = ms.createMediaGroup(MediaGroup.PLAYER_RECORDER_SIGNALDETECTOR);
			
			log.debug("DlgcParticipant c-str: mediaGroup uri ="+m_MediaGroup.getURI().toString()+" nc uri = " +nc.getURI().toString());
			m_MediaGroup.getRecorder().addListener(new RecorderEventListener(this));
			m_MediaGroup.getPlayer().addListener(new PlayerEventListener(this));
			m_MediaGroup.getSignalDetector().addListener(new SignalDetectorListener(this));
			
			m_MediaGroup.join(Joinable.Direction.DUPLEX, nc);
		} catch (MsControlException e) {
			// TODO Auto-generated catch block
			log.error("DlgcParticipant c-str: Join exception:  mediaGroup uri ="+m_MediaGroup.getURI().toString()+" nc uri = " +nc.getURI().toString());
			log.error("DlgcParticipant c-str: Join exception: "+e.getMessage());
		}
	
		
	}
	
	public void SendRecFileList()
	{
		Vector<String>  fileList=GetRecfileList();
		
		if (fileList.size()>0)
		{
			JSONObject recObj= new JSONObject();
			recObj.put("type", "record_list");
			 JSONArray list = new JSONArray();
			 for (String recordFile : fileList)
				 list.add(recordFile);
			 recObj.put("files",list);
			 
			SendMsg(recObj.toJSONString()); 
		}
			
	}
	
	public void SendMsg(String msg)
	{
		try {
             if (this.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
          	  {
          		  Session session= (Session)this.ms.getAttribute("WEBSOCKET_SESSION");
          	      session.getBasicRemote().sendText(msg); 
          	  }

		 }
		catch ( IllegalStateException e)
		{
			 log.error("SendMsg Error: Failed to send message to client: "+e.getMessage());
		}
	    catch (IOException e) {
	          log.error("SendMsg Error: Failed to send message to client: "+e.getMessage());
	         
	    }
		catch (Exception e)
		{
			  log.error("SendMsg Error: Failed to send message to client: "+e.getMessage());
		}
	}
	
	public Vector<String> GetRecfileList()
	{
		Vector<String> vectList = new Vector<String>();
		try (BufferedReader br = new BufferedReader(new FileReader(m_RecListfile)))
		{
 
			String sCurrentLine;
			
 
			while ((sCurrentLine = br.readLine()) != null) {
				//System.out.println(sCurrentLine);
				vectList.add(sCurrentLine);
				
			}
 
		} catch (IOException e) {
			log.error("GetRecfileList exception is ok ");
		} 
		return vectList;
	}
	
	

	public void SetRecfiletoList() {
		try
        {
			FileWriter m_FW = new FileWriter(m_RecListfile,true);
            m_FW.write(this.m_currentRecFile+"\n");//appends the string to the file
            m_FW.close();
        }
        catch(IOException ioe)
        {
            System.err.println("IOException: " + ioe.getMessage());
        }
		
		
	}

	public String getCurrentRecordfile() {
		return this.m_currentRecFile;
	}

	
	public String GetStringDTMF(Value item) {
		return dtmfSupportTable.get(item);

	}

	public void sendBye() {
		SipSession session= (SipSession)ms.getAttribute("SIP_SESSION");
			
		if (session!=null){
			if (session.isValid()){
				SipServletRequest bye =	session.createRequest("BYE");
				try 
				{
					bye.send();
					session.invalidate();
					session.getApplicationSession().invalidate();
				} 
				catch (Exception e1) 
				{
					log.error("Terminating: Cannot send BYE: "+e1);
				}
			}
			log.info("Inside terminiate method");
		}
		ms.release();
	}

	public boolean IsInConf() {
		return this.bInConf;
	}

	public synchronized Integer GetPingErrorCount() {
		return m_PingErrorCount;
	}

	public synchronized void IncrementPingErrorCount() {
		this.m_PingErrorCount ++;
	}
	
	public synchronized void ResetPingErrorCount() {
		this.m_PingErrorCount =0;
	}

	public boolean StartPlaying(String uri)
	 {
		boolean bRet =true;
		   if (m_MediaState != MediaState.IDLE)
		   {
			   log.error("media is not in IDLE state");
			   bRet = false;
		   }
		   else
		   {
			  	try
				{
			  		/*Parameters parameters = this.m_MscFactory.createParameters();
					params.put(Player.MAX_DURATION, 10000);
					params.put(Player.FILE_FORMAT, vRecFileFormat);
					params.put(Player.AUDIO_CODEC, vRecAudioCodecs); */
					
					
					
					this.m_MediaGroup.getPlayer().play(URI.create(uri), RTC.NO_RTC, Parameters.NO_PARAMETER);
					m_MediaState = MediaState.PLAYING;
					JSONObject eventObj = new JSONObject();
	    			eventObj.put("type", "operation_event");
	    			eventObj.put("event", "play_started");
	    				
	    			SendMsg(eventObj.toJSONString());
				}
				catch (MsControlException e)
				{
					e.printStackTrace();
					bRet = false;
				} 
				
		   }
		   return bRet;   
	  }
	
	 public boolean StopPlaying()
	   {
	   	boolean bRet =false;
	   	if (m_MediaState == MediaState.PLAYING)
	   	{
	   		bRet=true;
	   		Player testPlayer;
				try {
					testPlayer = m_MediaGroup.getPlayer();
					testPlayer.stop(true);
					m_MediaState = MediaState.IDLE;
				} catch (MsControlException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	   		
	   		
	   	}
	   	else
	   		log.error("Conference Media State is not in Playing");
	   	return bRet;
	   }
	
	public boolean StartRecording()
	{
		   boolean bRet =true;
		   if (m_MediaState != MediaState.IDLE)
		   {
			   log.error("media is not in IDLE state");
			   bRet = false;
		   }
		   else
		   {
			   String timeStamp = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date());
			   m_currentRecFile="file://confapp/"+this.name+"/"+timeStamp+".3gp";
			   Parameters parameters = this.ms.createParameters();
			//parameters.put(Recorder.PROMPT, URI.create(m_currentRecFile));
				parameters.put(Recorder.APPEND, Boolean.FALSE);
					
			/*	//parameters.put(Recorder.MIN_DURATION, new Integer(5000)); 	//any recording over this time constitutes a valid recording.
				parameters.put(Recorder.MIN_DURATION, this.iRecMinDuration); 	//any recording over this time constitutes a valid recording.
				//parameters.put(Recorder.MAX_DURATION, new Integer(30000));  //30 seconds recording
				parameters.put(Recorder.MAX_DURATION, this.iRecMaxDuration);  //30 seconds recording
				//parameters.put(Recorder.AUDIO_CODEC, CodecConstants.ALAW_PCM_64K); 
				//parameters.put(Recorder.FILE_FORMAT, FileFormatConstants.WAV);
				//parameters.put(Recorder.AUDIO_CODEC, CodecConstants.LINEAR_16BIT_128K); 
				//parameters.put(Recorder.SILENCE_TERMINATION_ON, new Boolean(Boolean.TRUE));
				parameters.put(Recorder.SILENCE_TERMINATION_ON, this.bRecSilenceTerminationFlag);
				//parameters.put(SpeechDetectorConstants.FINAL_TIMEOUT, 3000);   //3 sec   default is 4 secs if value not set
				parameters.put(SpeechDetectorConstants.FINAL_TIMEOUT, this.iRecFinalTimeout);   //3 sec   default is 4 secs if value not set
				//parameters.put(SpeechDetectorConstants.INITIAL_TIMEOUT, 6000);   //6 sec   default is 9 secs if value not set - need MSML to publish new schema for it to work June 2013
				parameters.put(SpeechDetectorConstants.INITIAL_TIMEOUT, this.iRecInitialTimeout);   //6 sec   default is 9 secs if value not set - need MSML to publish new schema for it to work June 2013
				
				//parameters.put(Recorder.VIDEO_CODEC, CodecConstants.H263); //video support no 100% ready remove for now
			
				//note implementation is only on Pattern[0] only
				parameters.put(SignalDetector.PATTERN[0], "#000");		//enables pattern for Recorder to detect only use in MSML XMS
				parameters.put(SignalDetector.INTER_SIG_TIMEOUT, new Integer(10000));	//10 sec
			
				//RTC rtcStop = new RTC(SignalDetector.DETECTION_OF_ONE_SIGNAL, Recorder.STOP);  //not needed... can be ignore since RTC is not implemented
				
				if (vRecFileFormat!=null)
					parameters.put(Recorder.FILE_FORMAT, vRecFileFormat);*/
				
				parameters.put(Recorder.AUDIO_CODEC, CodecConstants.AMR);
				parameters.put(Recorder.VIDEO_CODEC, CodecConstants.H264);
				
				String sVideoFMTP="";
				sVideoFMTP+="profile="+"66";
				sVideoFMTP+=";level="+"3.1";
				sVideoFMTP+=";width="+"1280";
				sVideoFMTP+=";height="+"720";
				sVideoFMTP+=";framerate="+"15";
				parameters.put(Recorder.VIDEO_FMTP, sVideoFMTP);
				
				//parameters.put(Recorder.VIDEO_MAX_BITRATE, 768000);
				parameters.put(Recorder.VIDEO_MAX_BITRATE, 2000);
				//parameters.put(Recorder.AUDIO_CLOCKRATE, iRecAudioClockRate);
				/*
				if (vRecVideoCodecs!=null)
				{
					parameters.put(Recorder.VIDEO_CODEC, vRecVideoCodecs);
					String sVideoFMTP="";
					if (sRecVideoProfile!=null)
						sVideoFMTP+="profile="+sRecVideoProfile;
					if (sRecVideoLevel!=null)
						sVideoFMTP+=";level="+sRecVideoLevel;
					if (sRecVideoWidth!=null)
						sVideoFMTP+=";width="+sRecVideoWidth;
					if (sRecVideoHeight!=null)
						sVideoFMTP+=";height="+sRecVideoHeight;
					if (sRecVideoFramerate!=null)
						sVideoFMTP+=";framerate="+sRecVideoFramerate;
					parameters.put(Recorder.VIDEO_FMTP, sVideoFMTP);
				}
				if (iRecVideoMaxBitRate!=null)
					parameters.put(Recorder.VIDEO_MAX_BITRATE, iRecVideoMaxBitRate);
				*/
				
				try
				{
				//	RTC[] rtcs = new RTC[1];
				//	rtcs[0] = MediaGroup.SIGDET_STOPPLAY;		//play barge in
				//	rtcs[1] = MediaGroup.SIGDET_STOPRECORD;     //recorder turn key set to # 
					//mediaGroup.getRecorder().record(URI.create(RECORD_FILE_NAME), new RTC[]{rtcStop}, parameters);
					URI recordingDestURI = URI.create(m_currentRecFile);
					Recorder testRecorder = m_MediaGroup.getRecorder();
					log.info("startRecording:: calling start record");
					testRecorder.record(recordingDestURI,  RTC.NO_RTC, parameters);
					m_MediaState = MediaState.RECORDING;
					log.info("startRecording:: returned from start record");
					
					JSONObject eventObj = new JSONObject();
	    			eventObj.put("type", "operation_event");
	    			eventObj.put("event", "record_started");
	    				
	    			SendMsg(eventObj.toJSONString());
				}
				catch (MsControlException e)
				{
					e.printStackTrace();
					bRet = false;
				} 
		   }
		   return bRet;   
	   }
	
	 public boolean StopRecording()
	    {
	    	boolean bRet =false;
	    	if (m_MediaState == MediaState.RECORDING)
	    	{
	    		bRet=true;
	    		Recorder testRecorder;
				try {
					testRecorder = m_MediaGroup.getRecorder();
					testRecorder.stop();
					m_MediaState = MediaState.IDLE;
				} catch (MsControlException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	    		
	    		
	    	}
	    	else
	    		log.error("Conference Media State is not in Recording");
	    	return bRet;
	    }
	
	public void GetConfRoom(String uri,boolean bBargeIn) {
		Parameters promptOpt =ms.createParameters();
		
		try {
			promptOpt.put(SignalDetector.PROMPT, new URI(uri));
			RTC[] rtcs = new RTC[1];
			
			//HP RI way of doing RTC
			rtcs[0] = MediaGroup.SIGDET_STOPPLAY;			//barge in
			
			log.info("GetConfRoom: mediaGroup uri ="+m_MediaGroup.getURI().toString()+" nc uri = " +nc.getURI().toString());
			
			m_MediaGroup.getSignalDetector().flushBuffer();
			if (bBargeIn)
				m_MediaGroup.getSignalDetector().receiveSignals(4, SignalDetector.NO_PATTERN, rtcs, promptOpt);
			else
			{
				synchronized(this)
		    	{
				   this.StartPlaying(uri);
				    try {
				    	this.wait(10000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
		    	 }
				String deepUri="file://beep.wav";
				Parameters promptbeep=ms.createParameters();
				promptbeep.put(SignalDetector.PROMPT, new URI(deepUri));
				m_MediaGroup.getSignalDetector().receiveSignals(4, SignalDetector.NO_PATTERN, null, promptbeep);
			}
			m_MediaState = MediaState.COLLECTING;
		} catch (MsControlException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			log.error("GetConfRoom: mediaGroup uri ="+m_MediaGroup.getURI().toString()+" nc uri = " +nc.getURI().toString());
			log.error("GetConfRoom: exception:  "+e.getMessage());
			sendBye();
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			log.error("GetConfRoom: mediaGroup uri ="+m_MediaGroup.getURI().toString()+" nc uri = " +nc.getURI().toString());
			log.error("GetConfRoom: exception:  "+e.getMessage());
			sendBye();
		}
		
		
	}
	
	
	
	String name;
	NetworkConnection nc;
	String type;
	boolean bVideo;
	MediaSession ms;
	String role;
	boolean bOwner;
	private static Logger log = LoggerFactory.getLogger(DlgcParticipant.class);
	MediaGroup m_MediaGroup;
	private Integer m_PingErrorCount;
	public boolean bMute;
	boolean bInConf;
	DlgcConvergedConferenceDemo m_app;
	
	enum MediaState {IDLE, RECORDING,PLAYING,COLLECTING};
	private MediaState m_MediaState;
	private String m_currentRecFile;
	private String m_RecListfile;
	
	
	static public  final Map<Value,String> dtmfSupportTable = new HashMap<Value, String>();

	static {
		dtmfSupportTable.put(SignalConstants.DTMF_0 , "0");
		dtmfSupportTable.put(SignalConstants.DTMF_1 , "1");
		dtmfSupportTable.put(SignalConstants.DTMF_2 , "2");
		dtmfSupportTable.put(SignalConstants.DTMF_3 , "3");
		dtmfSupportTable.put(SignalConstants.DTMF_4 , "4");
		dtmfSupportTable.put(SignalConstants.DTMF_5 , "5");
		dtmfSupportTable.put(SignalConstants.DTMF_6 , "6");
		dtmfSupportTable.put(SignalConstants.DTMF_7 , "7");
		dtmfSupportTable.put(SignalConstants.DTMF_8 , "8");
		dtmfSupportTable.put(SignalConstants.DTMF_9 , "9");
		dtmfSupportTable.put(SignalConstants.DTMF_A , "A");
		dtmfSupportTable.put(SignalConstants.DTMF_B , "B");
		dtmfSupportTable.put(SignalConstants.DTMF_C , "C");
		dtmfSupportTable.put(SignalConstants.DTMF_D , "D");
		dtmfSupportTable.put(SignalConstants.DTMF_HASH , "#");
		dtmfSupportTable.put(SignalConstants.DTMF_STAR , "*");
		dtmfSupportTable.put(SignalConstants.VFU_REQUEST , "VideoFastUpdate");
		dtmfSupportTable.put(SignalConstants.CED_TONE , "CED_TONE");
		dtmfSupportTable.put(SignalConstants.CNG_TONE , "CNG_TONE");
	}
	
}
