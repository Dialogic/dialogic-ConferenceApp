package web_converged_demo.conference;
import static java.util.concurrent.TimeUnit.SECONDS;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Serializable;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.media.mscontrol.MediaConfigException;
import javax.media.mscontrol.MediaEvent;
import javax.media.mscontrol.MediaEventListener;
import javax.media.mscontrol.MediaSession;
import javax.media.mscontrol.MsControlException;
import javax.media.mscontrol.MsControlFactory;
import javax.media.mscontrol.Parameters;
import javax.media.mscontrol.join.Joinable;
import javax.media.mscontrol.join.JoinableStream.StreamType;
import javax.media.mscontrol.mediagroup.CodecConstants;
import javax.media.mscontrol.mediagroup.MediaGroup;
import javax.media.mscontrol.mediagroup.Player;
import javax.media.mscontrol.mediagroup.PlayerEvent;
import javax.media.mscontrol.mediagroup.Recorder;
import javax.media.mscontrol.mediagroup.RecorderEvent;
import javax.media.mscontrol.mixer.MediaMixer;
import javax.media.mscontrol.mixer.MixerEvent;
import javax.media.mscontrol.networkconnection.NetworkConnection;
import javax.media.mscontrol.resource.AllocationEvent;
import javax.media.mscontrol.resource.AllocationEventListener;
import javax.media.mscontrol.resource.RTC;
import javax.media.mscontrol.resource.video.VideoLayout;
import javax.media.mscontrol.resource.video.VideoRenderer;
import javax.media.mscontrol.resource.video.VideoRendererEvent;
import javax.sdp.MediaDescription;
import javax.sdp.SdpException;
import javax.sdp.SdpFactory;
import javax.sdp.SdpParseException;
import javax.sdp.SessionDescription;
import javax.websocket.Session;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.DlgcsmilDocument;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.DlgcsmilDocument.Dlgcsmil;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.LayoutDocument.Layout;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.LayoutDocument.Layout.Region;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.ParDocument.Par;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.RefDocument.Ref;
import com.vendor.dialogic.javax.media.mscontrol.dlgcsmil.TextDocument.Text;
	

public class DlgcConference  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 
	 *  Implement the ping/pong method
	 *
	 */
	
	public class WebClientPing {
		
		/*  Timer timer;

		  public WebClientPing(int seconds) {
		   // toolkit = Toolkit.getDefaultToolkit();
		    timer = new Timer();
		   // timer.schedule(new RemindTask(), seconds * 1000);
		    timer.scheduleAtFixedRate(new RemindTask(), seconds * 1000, seconds * 1000);
		    //timer.cancel();
		  }

		  class RemindTask extends TimerTask {
		    public void run() {
		      System.out.println("Time's up!");
		      // toolkit.beep();
		      //timer.cancel(); //Not necessary because we call System.exit
		      // System.exit(0); //Stops the AWT thread (and everything else)
		      String msg = "{\"type\":\"rtc_ka\"}";
		      for (DlgcParticipant client : m_ParticipantMap) {
					 try {
			                  synchronized (client) {      
			                	  if (client.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
			                	  { 
			                		  Session session= (Session)client.ms.getAttribute("WEBSOCKET_SESSION");
			                		  Integer errorCount = client.GetPingErrorCount();
			                		  log.error("Client:  "+client.name+" in conf ="+m_ConfName+"Ping Error Count = "+errorCount);
			                		  if (errorCount>=3)
			                		  {
			                			 session.close();
			                		  }
			                		  else
			                		  {		                		 
				                		  client.IncrementPingErrorCount();
				                	      session.getBasicRemote().sendText(msg); 
			                		  }
			                	  }
			 	              }
					 }
					catch ( IllegalStateException e)
					{
						 log.error("Chat Error: Failed to send message to client: "+e.getMessage());
					}
			         catch (IOException e) {
			                log.error("Chat Error: Failed to send message to client: "+e.getMessage());
			               
			        }
					 catch (Exception e)
					 {
						  log.error("Chat Error: Failed to send message to client: "+e.getMessage());
					 }
				 }
		    }
		  }*/
	
		private  final ScheduledExecutorService scheduler =
			     Executors.newScheduledThreadPool(1);
		private  final ScheduledFuture<?> beeperHandle;

	   public WebClientPing(int seconds) 
	   {
	     Runnable PingClient = new Runnable() 
	     {
	       public void run() 
	       { 
	    	   String msg = "{\"type\":\"rtc_ka\"}";
			      for (DlgcParticipant client : m_ParticipantMap) {
						 try {
				                  synchronized (client) {      
				                	  if (client.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
				                	  { 
				                		  Session session= (Session)client.ms.getAttribute("WEBSOCKET_SESSION");
				                		  Integer errorCount = client.GetPingErrorCount();
				                		  log.info("Client:  "+client.name+" in conf ="+m_ConfName+" Ping Error Count = "+errorCount);
				                		  if (errorCount>=3)
				                		  {
				                			 session.close();
				                		  }
				                		  else
				                		  {		                		 
					                		  client.IncrementPingErrorCount();
					                	      session.getBasicRemote().sendText(msg); 
				                		  }
				                	  }
				 	              }
						 }
						catch ( IllegalStateException e)
						{
							 log.error("Failed to send message to client =  "+client.name+ " error= "+e.getMessage());
						}
				         catch (IOException e) {
				        	 log.error("Failed to send message to client =  "+client.name+ " error= "+e.getMessage());      
				        }
						 catch (Exception e)
						 {
							 log.error("Failed to send message to client =  "+client.name+ " error= "+e.getMessage());
						 }
					 }
	       }
	     };
	    beeperHandle =  scheduler.scheduleAtFixedRate(PingClient, seconds, seconds, SECONDS);
	   }
	   
	   public void  stop()
	   {
		   beeperHandle.cancel(true);
		   scheduler.shutdown();
	   }
	
	}
	

	
	
	
	public static class regionLayout
	{
		public regionLayout(String sTop, String sLeft, String size) {
			top = sTop;
			left = sLeft;
			relativeSize=size;
		}
		String top;
		String left;
		String relativeSize;
	}
	
	static public final Map<Integer,regionLayout[]> dlgcsmilLectureRegionTable = new HashMap<Integer,regionLayout[]>();
	

	static {
		dlgcsmilLectureRegionTable.put(1, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(100))});
		dlgcsmilLectureRegionTable.put(2, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(5),String.valueOf(90)),
				new regionLayout(String.valueOf(90),String.valueOf(0),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(10),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(20),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(30),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(40),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(50),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(60),String.valueOf(10)),
				new regionLayout(String.valueOf(90),String.valueOf(70),String.valueOf(10))
		});
	}
	
	static public final Map<Integer,regionLayout[]> dlgcsmilSupportRegionTable = new HashMap<Integer,regionLayout[]>();

	static {
		dlgcsmilSupportRegionTable.put(1, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(100))});
		
		dlgcsmilSupportRegionTable.put(2, new regionLayout[] {new regionLayout(String.valueOf(25),String.valueOf(0),String.valueOf(50)),
				new regionLayout(String.valueOf(25),String.valueOf(50),String.valueOf(50)),
		});

		dlgcsmilSupportRegionTable.put(4, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(50)),
				new regionLayout(String.valueOf(0),String.valueOf(50),String.valueOf(50)),
				new regionLayout(String.valueOf(50),String.valueOf(50),String.valueOf(50)),
				new regionLayout(String.valueOf(50),String.valueOf(0),String.valueOf(50))
		});

		dlgcsmilSupportRegionTable.put(6, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(66.666)),
				new regionLayout(String.valueOf(0),String.valueOf(66.666),String.valueOf(33.333)),
				new regionLayout(String.valueOf(33.333),String.valueOf(66.666),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(66.666),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(33.333),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(0),String.valueOf(33.333))
		});

		dlgcsmilSupportRegionTable.put(8, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(75)),
				new regionLayout(String.valueOf(0),String.valueOf(75),String.valueOf(25)),
				new regionLayout(String.valueOf(25),String.valueOf(75),String.valueOf(25)),
				new regionLayout(String.valueOf(50),String.valueOf(75),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(75),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(50),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(25),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(0),String.valueOf(25))
		});


		dlgcsmilSupportRegionTable.put(9, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(33.333)),
				new regionLayout(String.valueOf(0),String.valueOf(33.333),String.valueOf(33.333)),
				new regionLayout(String.valueOf(0),String.valueOf(66.666),String.valueOf(33.333)),
				new regionLayout(String.valueOf(33.333),String.valueOf(0),String.valueOf(33.333)),
				new regionLayout(String.valueOf(33.333),String.valueOf(33.333),String.valueOf(33.333)),
				new regionLayout(String.valueOf(33.333),String.valueOf(66.666),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(0),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(33.333),String.valueOf(33.333)),
				new regionLayout(String.valueOf(66.666),String.valueOf(66.666),String.valueOf(33.333))
		});

		dlgcsmilSupportRegionTable.put(10, new regionLayout[] {new regionLayout(String.valueOf(0),String.valueOf(0),String.valueOf(50)),
				new regionLayout(String.valueOf(0),String.valueOf(50),String.valueOf(50)),
				new regionLayout(String.valueOf(50),String.valueOf(0),String.valueOf(25)),
				new regionLayout(String.valueOf(50),String.valueOf(25),String.valueOf(25)),
				new regionLayout(String.valueOf(50),String.valueOf(50),String.valueOf(25)),
				new regionLayout(String.valueOf(50),String.valueOf(75),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(0),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(25),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(50),String.valueOf(25)),
				new regionLayout(String.valueOf(75),String.valueOf(75),String.valueOf(25))
		});

	
	}	
	private class DlgcConfVideoRendererListener  <T extends MediaEvent<?>> implements MediaEventListener<T>, Serializable {
		
		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		/**
		 * 
		 */
	

		@Override
		public void onEvent(T theEvent) {
			log.info("Entering DlgcConfVideoRendererListener::onEvent");
			log.info("DlgcConfVideoRendererListener::Type " + theEvent.getEventType() );
			log.info("DlgcConfVideoRendererListener::Source " + theEvent.getSource().toString());
			log.info("DlgcConfVideoRendererListener::ErrorText " + theEvent.getErrorText());				
		}
	}
	
	private class MixerAllocationEventListener implements AllocationEventListener, Serializable {
		/**
		 * 
		 */
		private static final long serialVersionUID = 17564463L;
		private boolean m_bAllocationSuccessful;
		private MediaMixer m_MediaMixer;

		public MixerAllocationEventListener(MediaMixer mx){
			m_bAllocationSuccessful = false;
			m_MediaMixer= mx;
		}
		@Override
		public void onEvent(AllocationEvent anEvent) {
			// Check if mixer confirmation was successful
			log.info(" MIXER ALLOCATION EVENT: "+anEvent.getEventType());
		//	MediaMixer mx = (MediaMixer) anEvent.getSource();
			
			if (anEvent.getEventType().equals(AllocationEvent.ALLOCATION_CONFIRMED)) {
					/*if (anEvent.isSuccessful())
					{
						log.info(" RECEIVED ALLOCATION CONFIRMED FOR CONFERENCE: ");
						m_bAllocationSuccessful = true;
					}
					else
					{
						log.error("RECEIVED ALLOCATION CONFIRMED FOR CONFERENCE with error = "+anEvent.getErrorText());
						m_bAllocationSuccessful = false;
					}	*/
				log.info(" RECEIVED ALLOCATION CONFIRMED FOR CONFERENCE: ");
				m_bAllocationSuccessful = true;
			}
			else if (anEvent.getEventType().equals(AllocationEvent.IRRECOVERABLE_FAILURE)) {
					log.error("Can't enter conference...IRRECOVERABLE_FAILURE ");
					m_bAllocationSuccessful = false;
			}
			if (m_MediaMixer!= null)
			{
				try
				{
					synchronized(m_MediaMixer)
					{
						m_MediaMixer.notify();
					}
				}
				catch(IllegalMonitorStateException e)
				{
					log.error("IllegalMonitorStateException error=" +e.getLocalizedMessage());
				}
			}
		}
		
		public boolean isAllocationSuccessful()
		{
			return m_bAllocationSuccessful;
		}

		
	}

		
	//SVN Add Active Input (ASN) To Mixer
	private class ActiveTalkerListener implements MediaEventListener<MixerEvent>, Serializable {
		
		private static final long serialVersionUID = 1L;

		@Override
		public void onEvent(MixerEvent activeTalkerEvent ) {
			log.info(" MIXER Active Talker EVENT: "+ activeTalkerEvent.getEventType());
			
			Joinable[] activeTalkerList =  activeTalkerEvent.getActiveInputs();
			if ( activeTalkerList != null) {
				NetworkConnection nc = null;
				for( Joinable j : activeTalkerList ) {
					nc = (NetworkConnection) j;
					try {
						String NCID = nc.toString();
						String NCURI = nc.getURI().toString();
						log.debug("DlgcConvergedConference::ActiveTalker NC: " +NCID);
						log.debug("DlgcConvergedConference::ActiveTalker NC URI: " + NCURI); 
					}catch ( Exception e) {
						log.error(e.toString());
					}
					
				}
			}else {
				log.debug("DlgcConvergedConference::ActiveTalkerListener:: receive Active Talker but got a Null Active Talker List");
			}
		}

		
	}
	
	
	private class PlayerEventListener implements MediaEventListener<PlayerEvent>, Serializable
	{
		/**
		 * 
		 */
		private static final long serialVersionUID = -7904645633486909974L;
		private DlgcConference m_dlgcConf ;
		
		public PlayerEventListener(DlgcConference dlgcConf){
			 m_dlgcConf = dlgcConf;
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
			
			m_MediaState = MediaState.IDLE;
			obj.put("event", eventValue);
			
			m_dlgcConf.boardcastMsg(obj.toJSONString());			
		}	
	}
	
	private class RecorderEventListener implements MediaEventListener<RecorderEvent> ,Serializable
	{
		/**
		 * 
		 */
		private static final long serialVersionUID = 3280547173385430391L;
		private DlgcConference m_dlgcConf ;
		
		public RecorderEventListener(DlgcConference dlgcConf){
			 m_dlgcConf = dlgcConf;
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
			
			//String recordFile= m_dlgcConf.getCurrentRecordfile();
			m_dlgcConf.SetRecfiletoList();
			
			JSONObject obj = new JSONObject();
			obj.put("type", "operation_event");
			String eventValue="";
			if ( event.getEventType() ==RecorderEvent.RECORD_COMPLETED ) 
				eventValue ="record_completed";
				
			else
				eventValue = event.getEventType().toString();
			
			m_MediaState = MediaState.IDLE;

			obj.put("event", eventValue);
			m_dlgcConf.boardcastMsg(obj.toJSONString());
			m_dlgcConf.SendRecFileListToOwer();
			
		/*	DlgcParticipant p = m_dlgcConf.getOwner();
			
			if (p == null)
				return;
			
			Session webSession = (Session)p.ms.getAttribute("WEBSOCKET_SESSION");
			
			if (webSession==null)
				return;

			Vector<String>  fileList=m_dlgcConf.GetRecfileList();
			
			try {
				
				
				if (fileList != null)
				{
					JSONObject recObj= new JSONObject();
					recObj.put("type", "record_list");
					 JSONArray list = new JSONArray();
					 for (String recordFile : fileList)
						 list.add(recordFile);
					 recObj.put("files",list);
					 
					 webSession.getBasicRemote().sendText(recObj.toJSONString()); 
				}
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	*/
		}
	}
	

	private class ConfRegion{
		public String Id;
		public String top;
		public String left;
		public String relativeSize;
		
	    ConfRegion(String sTop, String sLeft, String sSize,String sId)
		{
			Id = sId;
			top = sTop;
			left = sLeft;
			relativeSize = sSize;
		}
	}

	private class LayoutSet{
		public VideoLayout vl;
		public Vector<ConfRegion> regionSet;
		
		public LayoutSet(){
			vl = null;
			regionSet = new Vector<ConfRegion>();
		}
	}


	
	
	DlgcConference(String conf_name,MsControlFactory mscFactory ){
		m_ConfName = conf_name;
		
		Map<String, String> env = System.getenv();
		String path = env.get("CATALINA_HOME");
      /*  for (String envName : env.keySet()) {
            System.out.format("%s=%s%n",
                              envName,
                              env.get(envName));
        }*/
		m_RecListfile = path + "/conf/Dialogic/"+conf_name+".txt";
		m_MscFactory = mscFactory;
		m_MediaMixer = null;
		m_bVAS = false;
		m_bControlLeg = false;
		m_VideoRenderer = null;
		
		m_ParticipantLock = new ReentrantLock();
		m_ParticipantMap=null;
		m_bRecordStated =false;
		
		
	}
	
	
	public void SendRecFileListToOwer()
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
			 
			sendRequestToOwner(recObj.toJSONString()); 
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
			e.printStackTrace();
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

	public DlgcParticipant getOwner() {
		DlgcParticipant participant = null;
    	for (DlgcParticipant client : m_ParticipantMap) {
    		 synchronized (client) {	
    			if (client.bOwner)
    			{
    				participant = client;
    				break;
    			}
    		 }
    	}
    	return participant;
	}

	private DlgcParticipant addNextPantipantToVideo() {
		DlgcParticipant participant = null;
    	for (DlgcParticipant client : m_ParticipantMap) {
    		 synchronized (client) {	
    			if (!client.bVideo)
    			{
    				//log.info(" DlgcConferenceTest::Find next video partipant");
    				client.bVideo=true;
    				participant = client;
    				break;
    			}
    		 }
    	}
    	return participant;
	}
	
	
	
	protected boolean isScreenShareEabled()
	{
		boolean bRet = false;
		for (DlgcParticipant client : m_ParticipantMap) {
			 synchronized (client) {	
				if (client.name.equalsIgnoreCase("screenshare"))
				{
					bRet = true;
					break;
				}
			 }
		}
		return bRet;
	}
	
	protected LayoutSet getVideoLayout()
	{
			LayoutSet layoutSet= null;
			int pVSize = this.getVideoPanticipantSize();
			
			log.info("Video Client size ="+pVSize);
			
			
			
			layoutSet = new LayoutSet();
			
			regionLayout selRegionlayout[]=null;
			DlgcsmilDocument doc = DlgcsmilDocument.Factory.newInstance();
			
			Dlgcsmil dlgcsmil = doc.addNewDlgcsmil();
			Layout  layout = dlgcsmil.addNewHead().addNewLayout();
			layout.setSize(m_ConfVideoSize);
			Par par = dlgcsmil.addNewBody().addNewPar();
			Integer i = 1;
			
			/*if (pVSize == 0 )
				return layoutSet;*/
			
			/*if (m_bLecture)
			{
				log.info("In elearning get region size");
				if (pVSize == 1)
				{
					selRegionlayout = dlgcsmilLectureRegionTable.get(1);
					
				}
				else if (pVSize == 2)
				{
					selRegionlayout = dlgcsmilLectureRegionTable.get(2);
					
				}
			}
			else*/ if (m_bVAS)
			{
				selRegionlayout = dlgcsmilSupportRegionTable.get(8);	
								
				Region region =  layout.addNewRegion();
				Ref ref = par.addNewRef();
				Text text=par.addNewText();
				region.setId("1");
				ref.setSrc(VideoLayout.mostActiveStream.toString());
				region.setLeft(selRegionlayout[0].left);
				region.setTop(selRegionlayout[0].top);
				region.setRelativesize(selRegionlayout[0].relativeSize);
				ref.setRegion("1");
				
				text.setRegion("1");
				text.setLeftPosition(50);
				text.setTopPosition(0);
				text.setHorizontalSize(40);
				text.setVerticalSize(10);
				text.setBackgroundOpacity(0);
				text.setTextBackgroundOpacity(0);
				text.setPriority((float) 0.4);
				text.setText("Most Active Talker");
				
				
				ConfRegion confRegion = new ConfRegion(selRegionlayout[0].top.toString(),
																				  selRegionlayout[0].left.toString(),
																				  selRegionlayout[0].relativeSize.toString(),
																				  VideoLayout.mostActiveStream.toString());
				layoutSet.regionSet.add(confRegion);
				i++;
			}
			else
			{
				if (pVSize == 1)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(1);
					
				}
				else if (pVSize == 2)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(2);
					
				}
				else if (pVSize <5)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(4);
					
				}
				else if (pVSize < 7)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(6);
					
				}
				else if (pVSize < 9)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(8);
					
				}
				else if (pVSize >=9)
				{
					selRegionlayout = dlgcsmilSupportRegionTable.get(9);
					
				}
			}
			
		/*	if (m_bLecture)
			{
				//NetworkConnection screenshareNc = null;
				if (isScreenShareEabled())
				{
					for (DlgcParticipant client : this.m_ParticipantMap) {
						 synchronized (client) {	
							 log.info("elearning client name: "+client.name);
							if (client.name.equalsIgnoreCase("screenshare"))
							{
								 log.info("elearning client name is screenshare");
								//screenshareNc = client.nc;
								Region region =  layout.addNewRegion();
								Ref ref = par.addNewRef();
								//Text text=par.addNewText();
								//region.setPriority((float) 0.2);
								region.setId(i.toString());
								region.setLeft(selRegionlayout[0].left);
								region.setTop(selRegionlayout[0].top);
								region.setRelativesize(selRegionlayout[0].relativeSize);
								ref.setRegion(i.toString());						
								ref.setSrc(client.nc.getURI().toString());
								//text.setText(client.name);				
								
								 log.info("elearning add screenshare region to xmldoc");
								
								ConfRegion confRegion = new ConfRegion(selRegionlayout[0].top.toString(),
																								selRegionlayout[0].left.toString(),
																								selRegionlayout[0].relativeSize.toString(),
																								client.nc.getURI().toString());	
								 log.info("elearning add screenshare region to regionSet");
								layoutSet.regionSet.add(confRegion);
								 log.info(" after elearning add screenshare region toregionSet");
								i++;
								log.info("set screenshare region");
							}
							else if (client.role.equalsIgnoreCase("presenter"))
							{
								//screenshareNc = client.nc;
								Region region =  layout.addNewRegion();
								Ref ref = par.addNewRef();
								Text text=par.addNewText();
								region.setPriority((float) 0.2);
								region.setId(i.toString());
								region.setLeft(selRegionlayout[1].left);
								region.setTop(selRegionlayout[1].top);
								region.setRelativesize(selRegionlayout[1].relativeSize);
								ref.setRegion(i.toString());						
								ref.setSrc(client.nc.getURI().toString());
							
								text.setRegion(i.toString());
								text.setLeftPosition(60);
								text.setTopPosition(0);
								text.setHorizontalSize(40);
								text.setVerticalSize(10);
								text.setBackgroundOpacity(0);
								text.setTextBackgroundOpacity(0);
								text.setPriority((float) 0.4);
								text.setText(client.name);	
								
								ConfRegion confRegion = new ConfRegion(selRegionlayout[1].top.toString(),
																								selRegionlayout[1].left.toString(),
																								selRegionlayout[1].relativeSize.toString(),
																								client.nc.getURI().toString());	
								layoutSet.regionSet.add(confRegion);
								i++;
							}
							
						 }
					}
				}
				else
				{
					for (DlgcParticipant client : this.m_ParticipantMap) {
						 synchronized (client) {	
						    if (client.role.equalsIgnoreCase("presenter"))
							{
								//screenshareNc = client.nc;
								Region region =  layout.addNewRegion();
								Ref ref = par.addNewRef();
								Text text=par.addNewText();
								region.setPriority((float) 0.2);
								region.setId(i.toString());
								region.setLeft(selRegionlayout[0].left);
								region.setTop(selRegionlayout[0].top);
								region.setRelativesize(selRegionlayout[0].relativeSize);
								ref.setRegion(i.toString());						
								ref.setSrc(client.nc.getURI().toString());
							
								text.setRegion(i.toString());
								text.setLeftPosition(60);
								text.setTopPosition(0);
								text.setHorizontalSize(40);
								text.setVerticalSize(10);
								text.setBackgroundOpacity(0);
								text.setTextBackgroundOpacity(0);
								text.setPriority((float) 0.4);
								text.setText(client.name);					
								
								ConfRegion confRegion = new ConfRegion(selRegionlayout[0].top.toString(),
																								selRegionlayout[0].left.toString(),
																								selRegionlayout[0].relativeSize.toString(),
																								client.nc.getURI().toString());	
								layoutSet.regionSet.add(confRegion);
								i++;
							}
						 }
					}
				}
			}
			else */if (isScreenShareEabled() && !m_bVAS)
			{
				if (pVSize == 1)
				{
					selRegionlayout = dlgcsmilLectureRegionTable.get(1);
					
				}
				else if (pVSize > 1)
				{
					selRegionlayout = dlgcsmilLectureRegionTable.get(2);
				}
					
				
				//selRegionlayout = dlgcsmilSupportRegionTable.get(8);
				
				// Set Screenshare region
				
				NetworkConnection screenshareNc = null;
				for (DlgcParticipant client : this.m_ParticipantMap) {
					 synchronized (client) {	
						if (client.name.equalsIgnoreCase("screenshare"))
						{
							screenshareNc = client.nc;
							Region region =  layout.addNewRegion();
							Ref ref = par.addNewRef();
							//Text text=par.addNewText();
							region.setId(i.toString());
							region.setLeft(selRegionlayout[0].left);
							region.setTop(selRegionlayout[0].top);
							region.setRelativesize(selRegionlayout[0].relativeSize);
							ref.setRegion(i.toString());						
							ref.setSrc(client.nc.getURI().toString());
							//text.setText(client.name);				
							ConfRegion confRegion = new ConfRegion(selRegionlayout[0].top.toString(),
																							selRegionlayout[0].left.toString(),
																							selRegionlayout[0].relativeSize.toString(),
																							client.nc.getURI().toString());	
							layoutSet.regionSet.add(confRegion);
							i++;
							break;
							
						}
					 }
				}
				for (DlgcParticipant client : m_ParticipantMap) {
					 synchronized (client) {	
						if (client.nc !=screenshareNc && client.bVideo)
						{
							Region region =  layout.addNewRegion();
							Ref ref = par.addNewRef();
							
							region.setId(i.toString());
							region.setLeft(selRegionlayout[i-1].left);
							region.setTop(selRegionlayout[i-1].top);
							region.setRelativesize(selRegionlayout[i-1].relativeSize);
							ref.setRegion(i.toString());
							ref.setSrc(client.nc.getURI().toString());
							
							Text text=par.addNewText();
							text.setRegion(i.toString());
							text.setLeftPosition(60);
							text.setTopPosition(0);
							text.setHorizontalSize(40);
							text.setVerticalSize(10);
							text.setBackgroundOpacity(0);
							text.setTextBackgroundOpacity(0);
							text.setPriority((float) 0.4);
							text.setText(client.name);			
							
							
							ConfRegion confRegion = new ConfRegion(selRegionlayout[i-1].top.toString(),
																							selRegionlayout[i-1].left.toString(),
																							selRegionlayout[i-1].relativeSize.toString(),
																							client.nc.getURI().toString());
							layoutSet.regionSet.add(confRegion);
							i++;
						}
					 }
					
					 if (i>9)
						 break;
				}
				
				
			}
			else
			{
		        for (DlgcParticipant client : m_ParticipantMap) {
					 synchronized (client) {	
					if (client.bVideo)
					{
						Region region =  layout.addNewRegion();
						Ref ref = par.addNewRef();
						
						region.setId(i.toString());
						region.setLeft(selRegionlayout[i-1].left);
						region.setTop(selRegionlayout[i-1].top);
						region.setRelativesize(selRegionlayout[i-1].relativeSize);
						ref.setRegion(i.toString());
						ref.setSrc(client.nc.getURI().toString());
						
						Text text=par.addNewText();
						text.setRegion(i.toString());
						text.setLeftPosition(60);
						text.setTopPosition(0);
						text.setHorizontalSize(40);
						text.setVerticalSize(10);
						text.setBackgroundOpacity(0);
						text.setTextBackgroundOpacity(0);
						text.setPriority((float) 0.4);			
						text.setText(client.name);	
						
						ConfRegion confRegion = new ConfRegion(selRegionlayout[i-1].top.toString(),
																						selRegionlayout[i-1].left.toString(),
																						selRegionlayout[i-1].relativeSize.toString(),
																						client.nc.getURI().toString());
						layoutSet.regionSet.add(confRegion);
						i++;
					 }
					 
					 if (m_bVAS)
					 {
						 if (i>8)
							 break;
					 }
					 else
					 {
						 if (i>9)
							 break;
					 }
			      }
		        }
			}
			 log.info(doc.toString());

			
			InputStream is;
			try {
				is = new ByteArrayInputStream(doc.toString().getBytes("UTF-8"));
				InputStreamReader in = new InputStreamReader(is, "UTF-8");
				try {
					layoutSet.vl = m_MscFactory.createVideoLayout(MSML_LAYOUT_MIME, in);
				} catch (MediaConfigException e) {
					e.printStackTrace();
					log.error("Fail to create video layout :"+e.getMessage());
					layoutSet= null;
				}
			} catch (IOException ioex) {
				ioex.printStackTrace();
				log.error("Fail to create video layout :"+ioex.getMessage());
				layoutSet= null;
			}
			
			return layoutSet;

	}
	    
    protected int getVideoPanticipantSize()
    {
    	int size = 0;
    	for (DlgcParticipant client : m_ParticipantMap) {
    		 synchronized (client) {	
    			if (client.bVideo)
    				size++;
    		 }
    	}
    	return size;
    }
    
    public boolean AddParticipant(DlgcParticipant p)
    {
    	m_ParticipantLock.lock();
    	boolean bRet = true;
    	
    	String sdpContent =(String) p.ms.getAttribute("SESSION_SDP");
    	
    	 //Use the static method of SdpFactory to parse the content
		
		 
		try { 
			SdpFactory sdpFactory = SdpFactory.getInstance();
		    SessionDescription  sessionDescription= sdpFactory.createSessionDescription(sdpContent); 
		    @SuppressWarnings("rawtypes")
			Vector mediaVector = sessionDescription.getMediaDescriptions(false);
			log.info("AddParticipant()  Participant mediaDescription size  "+mediaVector.size());
			
			
			    
		    boolean IsVideo=false, IsAudio=false;
		    for (int i=0;i<mediaVector.size();i++)
		    {
		    	MediaDescription md = (MediaDescription) mediaVector.get(i);
		        if (md.getMedia().getMediaType().equalsIgnoreCase("video"))
		        	IsVideo = true;
		        else if (md.getMedia().getMediaType().equalsIgnoreCase("audio"))
		        	IsAudio = true;
		    }
		    		    
			if (IsVideo)
			{				
				if (p.name.equalsIgnoreCase("screenshare"))
				{
					if (isScreenShareEabled() && !m_bVAS)
					{
						bRet=false;
						if (p.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
	                	{
	                		  Session session= (Session)p.ms.getAttribute("WEBSOCKET_SESSION");
	                	      try {
								session.getBasicRemote().sendText("{\"type\":\"error\", \"category\":\"screenshare\", \"description\" : \"Screenshare is being used\"}");
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
	                	}
						log.error("Screenshare is being used");
					}
				}
				if (bRet)
				{
					m_ParticipantMap.add(p);
					
					if ( m_VideoRenderer != null ) 
					{
						LayoutSet layout=null;
				    	if (m_bLecture)	   
				    	{
				    		if (p.name.equalsIgnoreCase("screenshare"))
							{
				    			p.bVideo=true;
								layout = getVideoLayout();
							}		
				    		else if (p.role.equalsIgnoreCase("presenter"))
				    		{
				    			p.bVideo=true;
								layout = getVideoLayout();
				    		}
				    	}
				    	else
				    	{
						//log.debug("Found both videoLayout and VideoRender... setting Mixer video renderer layout...");
							int vPSize = getVideoPanticipantSize();
							
							 if (isScreenShareEabled() || m_bVAS)
							 {
								 if (vPSize<9)
								 {
									 p.bVideo=true;
									 layout = getVideoLayout();
								 }
							 }
							 else
							 {
								 if (vPSize<9)
								 {
									 p.bVideo=true;
									 layout = getVideoLayout();
								 }
							 }
				    	}
						if (layout!=null)
						{
							try{
								log.info("About to Set Video layout ");
								m_VideoRenderer.setLayout(layout.vl);
								/*if (m_bRecordStated == false)
								{
									if (StartRecording())
										m_bRecordStated =true;
								}*/
									
							}catch (MsControlException e) {
								// TODO Auto-generated catch block
								// e.printStackTrace();
								log.error("Fail to set layout " + e.getMessage());
								bRet = false;
								
							}
							log.info("Set Video layout successful ");
						}
						if (bRet)
						{
							try{
								 if (p.bVideo)
								 {
									 if (p.name.equalsIgnoreCase("screenshare"))
										 p.nc.join(Joinable.Direction.SEND, m_MediaMixer);
									 else
										 m_MediaMixer.join(Joinable.Direction.DUPLEX,p.nc);
									 if (layout!=null)
								    {
										 String layoutMsg = createLayoutChangeMsg(layout);
										 if (layoutMsg!=null)
											 boardcastMsg( layoutMsg);
								    }
								 }
								 else
								 {
									 if (m_bVAS || m_bLecture)
										 m_MediaMixer.join(Joinable.Direction.DUPLEX,p.nc);
									 else
										 p.nc.join(Joinable.Direction.RECV, m_MediaMixer);
									 LayoutSet curLayout= getVideoLayout();
									 String curLayoutMsg = createLayoutChangeMsg(curLayout);
									 try{
										 if (p.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
					                	  {
					                		  Session session= (Session)p.ms.getAttribute("WEBSOCKET_SESSION");
					                		  if (curLayoutMsg !=null)
					                			  session.getBasicRemote().sendText(curLayoutMsg); 
					                	  }
										
									 } catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									} 
								 }
							}catch (MsControlException e) {
								// TODO Auto-generated catch block
								// e.printStackTrace();
								log.error("Fail to Join the conference " + e.getMessage());
								bRet = false;
								
							}
						}
						JSONObject eventObj = new JSONObject();
		    			eventObj.put("type", "operation_event");
		    			boolean bSend =false;
		    				
		    		   if (p.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
		    		   {
		    			   Session session= (Session)p.ms.getAttribute("WEBSOCKET_SESSION");
				    		
							if (this.m_MediaState==MediaState.PLAYING)
							{
								eventObj.put("event", "play_started");
								bSend= true;
							}
							else if (this.m_MediaState==MediaState.RECORDING)
							{
								eventObj.put("event", "record_started");
								bSend= true;
							}
							boardcastMsg(eventObj.toJSONString());
		    		   }
		    		   
		    		   if (bSend)
		    		   {
		    			   try{
		    				   Session session= (Session)p.ms.getAttribute("WEBSOCKET_SESSION");
		    				   session.getBasicRemote().sendText(eventObj.toJSONString()); 
		    			   } catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} 
		    		   }
								
							
					}
					else
					{
						 try {
							m_MediaMixer.join(Joinable.Direction.DUPLEX,p.nc);
						} catch (MsControlException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
				
			}
			else if (IsAudio)
			{
				m_ParticipantMap.add(p);
				try{
					p.nc.getJoinableStream(StreamType.audio).join(Joinable.Direction.DUPLEX, m_MediaMixer);
				}catch (MsControlException e) {
					// TODO Auto-generated catch block
					// e.printStackTrace();
					log.error("Fail to Join the conference " + e.getMessage());
					bRet = false;
					
				}
			}
			else
			{
				log.error("AddParticipant()  sdp does not either audio or video media" );
				bRet = false;
			}
					
		} catch (SdpParseException e1) {
			// TODO Auto-generated catch block
			log.error("Invalid SDP for client =  "+p.name );
			e1.printStackTrace();
			bRet = false;
		} catch (SdpException e) {
			// TODO Auto-generated catch block
			log.error("Invalid SDP for client =  "+p.name );
			e.printStackTrace();
			bRet = false;
		}
		    
	if (bRet == false)
		m_ParticipantMap.remove(p);
	else
	{
		p.ms.setAttribute("CONFERENCE_OBJ", this);
		String msg = createConfChangeMsg();
	     if (msg!=null)
	    	 boardcastMsg(msg);
	     if (p.bOwner)
				//this.SendRecFileListToOwer();
	    	 p.SendRecFileList();
	}

	m_ParticipantLock.unlock();
    return bRet;
}
    
    public void RemoveParticipant(DlgcParticipant p)
    {
    	m_ParticipantLock.lock();
    	long threadId = Thread.currentThread().getId();
    	log.info("lock thread id =" + threadId);
    	
    	m_ParticipantMap.remove(p);
    	
    	
		if ( m_VideoRenderer!= null ) {
			
			 LayoutSet layout = null;
			 DlgcParticipant vP = null;
			 if (p.bVideo)
			 {
				 if (this.m_bLecture == false)
					 vP = addNextPantipantToVideo();
				 layout =getVideoLayout();	
			 }
			if (layout != null)
			{	
				try {
					log.info("setlayout thread id =" + threadId);
					m_VideoRenderer.setLayout(layout.vl);
					 if (vP !=null)
					 {
						 log.info(" DlgcConferenceTest::Get next video partipant");
						 m_MediaMixer.unjoin(vP.nc); 
						 m_MediaMixer.join(Joinable.Direction.DUPLEX,vP.nc);
					 }
					
					String layoutMsg = createLayoutChangeMsg(layout);
					if (layoutMsg!=null)
						boardcastMsg(layoutMsg);
					
				} catch (MsControlException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		} else
			try {
				m_MediaMixer.unjoin(p.nc);
			} catch (MsControlException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
		
		
		 String msg = createConfChangeMsg();
	     if (msg!=null)
	    	 boardcastMsg(msg);
	    p.ms.release();
	    log.info("unlock thread id =" + threadId); 
	    
	 /*   if (m_ParticipantMap.isEmpty())
	    {
	    	if (m_MediaState != MediaState.RECORDING)
	    	{
	    		this.m_MediaGroup.getRecorder().stop();
	    	}
	    }*/
		m_ParticipantLock.unlock();
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
    
   public boolean StartRecording()
   {
	   boolean bRet =true;
	   if (m_MediaState != MediaState.IDLE)
	   {
		   log.error("Conference media is not in IDLE state");
		   bRet = false;
	   }
	   else
	   {
		   String timeStamp = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date());
		   m_currentRecFile="file://confapp/"+this.m_ConfName+"/"+timeStamp+".3gp";
		   Parameters parameters = this.m_MscFactory.createParameters();
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
    				
    			boardcastMsg(eventObj.toJSONString());
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
   
  public boolean StartPlaying(String uri)
  {
	   boolean bRet =true;
	   if (m_MediaState != MediaState.IDLE)
	   {
		   log.error("Conference media is not in IDLE state");
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
    				
    			boardcastMsg(eventObj.toJSONString());
			}
			catch (MsControlException e)
			{
				e.printStackTrace();
				bRet = false;
			} 
			
	   }
	   return bRet;   
  }
   
	public boolean CreateConference(String mixMode,String mixerSize,Parameters params,boolean bVAS,boolean bControlLeg,boolean bLecture)
	{
		boolean bRet = true;
		if (m_MediaMixer==null){
			try {
				m_bVAS = bVAS;
				m_bControlLeg = bControlLeg;
				m_bLecture=bLecture;
				MediaSession ms = m_MscFactory.createMediaSession();
				if (m_bVAS == false)
					ms.setAttribute("connector.asn.louder.sample.time", new Integer(5) );		
				
				
				log.info("****************CreateMediaMixer = "+m_ConfName+"***************************");
				
				if (mixerSize == null)
					mixerSize ="VGA";
				else
				{
					m_ConfVideoSize =Layout.Size.Enum.forString(mixerSize);
				}
				if (mixMode == null)
					mixMode ="AUDIO_VIDEO";
				ms.setAttribute("CONFERENCE_VIDEO_SIZE", mixerSize);
				if (mixMode.equalsIgnoreCase("AUDIO_VIDEO_RENDERING"))
				{
					m_MediaMixer = ms.createMediaMixer(MediaMixer.AUDIO_VIDEO_RENDERING, params);
					
					m_VideoRenderer  = m_MediaMixer.getResource(VideoRenderer.class);
					 if ( m_VideoRenderer == null ) {
							log.error("Sorry the mixer has returned a null for the VideoRenderer.. can't apply video layout...");
					 } else {
							log.info ("Found both videoLayout and VideoRender... setting Mixer video renderer layout...");
					
							DlgcConfVideoRendererListener<VideoRendererEvent> VRL= new DlgcConfVideoRendererListener<VideoRendererEvent>()		;
							m_VideoRenderer.addListener(VRL);
					 }
				}
				else  if (mixMode.equalsIgnoreCase("AUDIO_VIDEO"))
					m_MediaMixer = ms.createMediaMixer(MediaMixer.AUDIO_VIDEO, params);
				else
					m_MediaMixer = ms.createMediaMixer(MediaMixer.AUDIO, params);
				
				m_ParticipantMap = new CopyOnWriteArraySet<DlgcParticipant>();
				
				MixerAllocationEventListener mxAllocationEventListener = new MixerAllocationEventListener(m_MediaMixer);
				m_MediaMixer.addListener(mxAllocationEventListener);
				
				MediaEventListener<MixerEvent> activeTalkerListener = new ActiveTalkerListener();
				m_MediaMixer.addListener(activeTalkerListener);
				
				m_MediaGroup = ms.createMediaGroup(MediaGroup.PLAYER_RECORDER_SIGNALDETECTOR);
				
				
				
				if ( m_bControlLeg)
				{
					synchronized(m_MediaMixer)
					{
						m_MediaMixer.confirm();
						try {
							m_MediaMixer.wait(5000);
							bRet = mxAllocationEventListener.isAllocationSuccessful();
							
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							log.error(e.getLocalizedMessage());
							bRet = false;
						}
					}
				}
				
				m_MediaGroup.getRecorder().addListener(new RecorderEventListener(this));
				m_MediaGroup.getPlayer().addListener(new PlayerEventListener(this));
				
				m_MediaGroup.join(Joinable.Direction.DUPLEX, m_MediaMixer);
				
				m_MediaState=MediaState.IDLE;
				
				//StartRecording();
				
				m_pingClient = new WebClientPing(5);
	
			}catch (MsControlException e) {
				log.error(e.getLocalizedMessage());
				bRet = false;
			}
		}
		
		if (bRet==false)
		{
			if (m_MediaMixer!=null)
			{
				m_MediaMixer.getMediaSession().release();
				m_MediaMixer = null;
			}
		}
			
			
		return bRet;
	}
	
	@SuppressWarnings("unchecked")
	protected String createLayoutChangeMsg(LayoutSet layoutSet)
	{
		 String layout=null;

		if (layoutSet!=null)
		{
			JSONObject obj = new JSONObject();
			 obj.put("type", "layout");
			 JSONArray list = new JSONArray();
			for(int i =0;i<layoutSet.regionSet.size(); i++)
			{
				JSONObject regionObj = new JSONObject();
		    	 regionObj.put("top",layoutSet.regionSet.get(i).top);
		    	 regionObj.put("left",layoutSet.regionSet.get(i).left);
		    	 regionObj.put("size",layoutSet.regionSet.get(i).relativeSize);
		    	 regionObj.put("id", layoutSet.regionSet.get(i).Id);
		    	 list.add(regionObj);
			}
			
			obj.put("regions",list);
			layout =obj.toJSONString();
			log.info("Entering  createLayoutChangeMsg: " + layout);
		}
		
		
		return layout;
	}
	 
	 @SuppressWarnings("unchecked")
	protected String createConfChangeMsg()
	 {
	     if (m_ParticipantMap.size()==0)
	    	 return null;
	    
	     JSONObject obj = new JSONObject();
		 obj.put("type", "conf");
		 JSONArray list = new JSONArray();
		
		 for (DlgcParticipant client : m_ParticipantMap) {
			
	                  synchronized (client) {      
	                	  JSONObject p = new JSONObject();
	     		    	  p.put("name",client.name);
	     		    	  p.put("id", client.nc.getURI().toString());
	     		    	  p.put("session_type",client.type);
	     		    	  p.put("role",client.role);
	     		    	  p.put("owner", client.bOwner);
	     		    	  p.put("mute", client.bMute);
	                	  list.add(p);
	 	              }
		 }
	     
	     obj.put("parties", list);
	     
	    return obj.toJSONString();
	 }
	 
	 protected void boardcastMsg(String msg)
	 {
		if (msg ==null)
			return;
		 for (DlgcParticipant client : m_ParticipantMap) {
			 try {
	                  synchronized (client) {      
	                	  if (client.type.equalsIgnoreCase("WEBSOCKET_SESSION"))
	                	  {
	                		  Session session= (Session)client.ms.getAttribute("WEBSOCKET_SESSION");
	                	      session.getBasicRemote().sendText(msg); 
	                	  }
	 	              }
			 }
			catch ( IllegalStateException e)
			{
				 log.error("Chat Error: Failed to send message to client: "+e.getMessage());
			}
	         catch (IOException e) {
	                log.error("Chat Error: Failed to send message to client: "+e.getMessage());
	               
	        }
			 catch (Exception e)
			 {
				  log.error("Chat Error: Failed to send message to client: "+e.getMessage());
			 }
		 }

	 }

	public void sendRequestToOwner(String msg) {
		if (msg ==null)
			return;
		 for (DlgcParticipant client : m_ParticipantMap) {
			 try {
	                  synchronized (client) {      
	                	  if (client.bOwner)
	                	  {
	                		  Session session= (Session)client.ms.getAttribute("WEBSOCKET_SESSION");
	                	      session.getBasicRemote().sendText(msg); 
	                	      break;
	                	  }
	 	              }
			 }
			catch ( IllegalStateException e)
			{
				 log.error("Chat Error: Failed to send message to client: "+e.getMessage());
			}
	         catch (IOException e) {
	                log.error("Chat Error: Failed to send message to client: "+e.getMessage());
	               
	        }
			 catch (Exception e)
			 {
				  log.error("Chat Error: Failed to send message to client: "+e.getMessage());
			 }
		 }

		
	}
	
	public boolean IsEmpty() {
		boolean bRet =false;
		m_ParticipantLock.lock();
		
		bRet=m_ParticipantMap.isEmpty();
		log.info("conf ="+this.m_ConfName+" is empty ="+bRet);
		m_ParticipantLock.unlock();
		return bRet;
	}
	
	public void Release() {
	/*	if (m_MediaState == MediaState.RECORDING)
    	{
    		try {
				m_MediaGroup.getRecorder().stop();
			} catch (MsControlException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
		else if (m_MediaState == MediaState.PLAYING)
		{
			try {
				m_MediaGroup.getPlayer().stop(true);
			} catch (MsControlException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}*/
		
		if (m_MediaState == MediaState.RECORDING)
    			this.SetRecfiletoList();
				
		m_MediaState = MediaState.IDLE; 
		m_MediaMixer.release();
		
		m_pingClient.stop();
		m_pingClient = null;
	}
	
	
	public boolean DoMute(boolean bMute, JSONArray lists) {
		// TODO Auto-generated method stub
		m_ParticipantLock.lock();
		Iterator<String> iterator =lists.iterator();
		String muteStr="mute";
		while (iterator.hasNext()) {
			//System.out.println(iterator.next()); 
			
			String id = iterator.next();
			for (DlgcParticipant client : m_ParticipantMap) 
			{
					try {
	                  synchronized (client) {      
	                	  if (client.nc.getURI().toString().equals(id))
	                	  { 
	                		 if (bMute == client.bMute)
	                			 break;
	                		 if (bMute)
	                		 {
	                			client.nc.join(Joinable.Direction.RECV, m_MediaMixer);
	                			client.bMute = true;
	                		 }
							 else
							 {
								 muteStr ="unmute";
								 m_MediaMixer.join(Joinable.Direction.DUPLEX,client.nc);
								 client.bMute = false;
							 }
	                	  }
	 	           }
				 }
				catch (MsControlException e) {
		        	 log.error("Failed to  "+muteStr+" client="+client.name+ " error= "+e.getMessage());   
		        }
				catch (Exception e)
				{
					 log.error("Failed to  "+muteStr+" client="+client.name+ " error= "+e.getMessage());      
				}
		 }
		}
		String msg = createConfChangeMsg();
	     if (msg!=null)
	    	 boardcastMsg(msg);
		m_ParticipantLock.unlock();
		return true;
	}

	/**
	 * 
	 */
	private Layout.Size.Enum m_ConfVideoSize;
	private MediaMixer m_MediaMixer;
	private MediaGroup m_MediaGroup;
	public String m_ConfName;
	private MsControlFactory m_MscFactory;
	private boolean m_bVAS;
	private boolean m_bControlLeg;
	private boolean m_bLecture;
	private VideoRenderer m_VideoRenderer;
	private static Logger log = LoggerFactory.getLogger(DlgcConference.class);
	private Lock m_ParticipantLock;
	static public final String MSML_LAYOUT_MIME = "application/dlgcsmil+xml";
	private CopyOnWriteArraySet<DlgcParticipant> m_ParticipantMap;
	enum MediaState {IDLE, RECORDING,PLAYING};
	private MediaState m_MediaState;
	private String m_currentRecFile;
	private boolean m_bRecordStated;
	private String m_RecListfile;
	private WebClientPing m_pingClient;
	

}
