/*
 * DIALOGIC CONFIDENTIAL
 *
 * Copyright 2010 Dialogic Corporation. All Rights Reserved.
 * The source code contained or described herein and all documents related to
 * the source code (collectively "Material") are owned by Dialogic Corporation 
 * or its suppliers or licensors ("Dialogic"). 
 *
 * BY DOWNLOADING, ACCESSING, INSTALLING, OR USING THE MATERIAL YOU AGREE TO BE
 * BOUND BY THE TERMS AND CONDITIONS DENOTED HERE AND ANY ADDITIONAL TERMS AND
 * CONDITIONS SET FORTH IN THE MATERIAL. Title to the Material remains with 
 * Dialogic. The Material contains trade secrets and proprietary and 
 * confidential information of Dialogic. The Material is protected by worldwide
 * Dialogic copyright(s) and applicable trade secret laws and treaty provisions.
 * No part of the Material may be used, copied, reproduced, modified, published, 
 * uploaded, posted, transmitted, distributed, or disclosed in any way without
 * prior express written permission from Dialogic Corporation.
 *
 * No license under any applicable patent, copyright, trade secret or other 
 *intellectual property right is granted to or conferred upon you by disclosure
 * or delivery of the Material, either expressly, by implication, inducement, 
 * estoppel or otherwise. Any license under any such applicable patent, 
 * copyright, trade secret or other intellectual property rights must be express
 * and approved by Dialogic Corporation in writing.
 *
 * You understand and acknowledge that the Material is provided on an 
 * AS-IS basis, without warranty of any kind.  DIALOGIC DOES NOT WARRANT THAT 
 * THE MATERIAL WILL MEET YOUR REQUIREMENTS OR THAT THE SOURCE CODE WILL RUN 
 * ERROR-FREE OR UNINTERRUPTED.  DIALOGIC MAKES NO WARRANTIES, EXPRESS OR 
 * IMPLIED, INCLUDING, WITHOUT LIMITATION, ANY WARRANTY OF NON-INFRINGEMENT, 
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  DIALOGIC ASSUMES NO 
 * RISK OF ANY AND ALL DAMAGE OR LOSS FROM USE OR INABILITY TO USE THE MATERIAL. 
 * THE ENTIRE RISK OF THE QUALITY AND PERFORMANCE OF THE MATERIAL IS WITH YOU.  
 * IF YOU RECEIVE ANY WARRANTIES REGARDING THE MATERIAL, THOSE WARRANTIES DO NOT 
 * ORIGINATE FROM, AND ARE NOT BINDING ON DIALOGIC.
 *
 * IN NO EVENT SHALL DIALOGIC OR ITS OFFICERS, EMPLOYEES, DIRECTORS, 
 * SUBSIDIARIES, REPRESENTATIVES, AFFILIATES AND AGENTS HAVE ANY LIABILITY TO YOU 
 * OR ANY OTHER THIRD PARTY, FOR ANY LOST PROFITS, LOST DATA, LOSS OF USE OR 
 * COSTS OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR FOR ANY INDIRECT, 
 * SPECIAL OR CONSEQUENTIAL DAMAGES RELATING TO THE MATERIAL, UNDER ANY CAUSE OF
 * ACTION OR THEORY OF LIABILITY, AND IRRESPECTIVE OF WHETHER DIALOGIC OR ITS 
 * OFFICERS, EMPLOYEES, DIRECTORS, SUBSIDIARIES, REPRESENTATIVES, AFFILIATES AND 
 * AGENTS HAVE ADVANCE NOTICE OF THE POSSIBILITY OF SUCH DAMAGES.  THESE 
 * LIMITATIONS SHALL APPLY NOTWITHSTANDING THE FAILURE OF THE ESSENTIAL PURPOSE 
 * OF ANY LIMITED REMEDY.  IN ANY CASE, DIALOGIC'S AND ITS OFFICERS', 
 * EMPLOYEES', DIRECTORS', SUBSIDIARIES', REPRESENTATIVES', AFFILIATES' AND 
 * AGENTS' ENTIRE LIABILITY RELATING TO THE MATERIAL SHALL NOT EXCEED THE 
 * AMOUNTS OF THE FEES THAT YOU PAID FOR THE MATERIAL (IF ANY). THE MATERIALE 
 * IS NOT FAULT-TOLERANT AND IS NOT DESIGNED, INTENDED, OR AUTHORIZED FOR USE IN 
 * ANY MEDICAL, LIFE SAVING OR LIFE SUSTAINING SYSTEMS, OR FOR ANY OTHER 
 * APPLICATION IN WHICH THE FAILURE OF THE MATERIAL COULD CREATE A SITUATION 
 * WHERE PERSONAL INJURY OR DEATH MAY OCCUR. Should You or Your direct or 
 * indirect customers use the MATERIAL for any such unintended or unauthorized 
 * use, You shall indemnify and hold Dialogic and its officers, employees, 
 * directors, subsidiaries, representatives, affiliates and agents harmless 
 * against all claims, costs, damages, and expenses, and attorney fees and 
 * expenses arising out of, directly or indirectly, any claim of product 
 * liability, personal injury or death associated with such unintended or 
 * unauthorized use, even if such claim alleges that Dialogic was negligent 
 * regarding the design or manufacture of the part.
 */
/*testing */
package web_converged_demo.conference;





import java.io.FileReader;
import java.io.IOException;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.media.mscontrol.MediaErr;
import javax.media.mscontrol.MediaEventListener;
import javax.media.mscontrol.MediaSession;
import javax.media.mscontrol.MsControlException;
import javax.media.mscontrol.MsControlFactory;
import javax.media.mscontrol.Parameters;
import javax.media.mscontrol.networkconnection.NetworkConnection;
import javax.media.mscontrol.networkconnection.SdpPortManager;
import javax.media.mscontrol.networkconnection.SdpPortManagerEvent;
import javax.media.mscontrol.networkconnection.SdpPortManagerException;
import javax.media.mscontrol.spi.Driver;
import javax.media.mscontrol.spi.DriverManager;
import javax.media.mscontrol.spi.PropertyInfo;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.sip.SipApplicationSession;
import javax.servlet.sip.SipServlet;
import javax.servlet.sip.SipServletContextEvent;
import javax.servlet.sip.SipServletListener;
import javax.servlet.sip.SipServletMessage;
import javax.servlet.sip.SipServletRequest;
import javax.servlet.sip.SipServletResponse;
import javax.servlet.sip.SipSession;
import javax.servlet.sip.SipSessionsUtil;
import javax.servlet.sip.SipURI;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.PongMessage;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.ContainerFactory;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@ServerEndpoint("/dialogic/conf/{guest-id}") 

/*@javax.servlet.sip.annotation.SipServlet(description = "Converged Conference Demo", name="DlgcConvergedConferenceDemo", applicationName="Dialogic-Converged-Demo", loadOnStartup=0) 

@SipListener

public class DlgcConvergedConferenceDemo extends DlgcBaseDemo*/
/*@javax.servlet.sip.annotation.SipServlet(description = "Dialogic Conference Demo", name="DlgcConvergedConferenceDemo", applicationName="dlgmsc_converged_conference", loadOnStartup=0) 
@SipListener */
public class DlgcConvergedConferenceDemo  extends SipServlet implements Serializable,SipServletListener
{
	/**
	 * 
	 */
	
	/**** new vars ****/
	
	static protected DlgcDemoProperty			demoPropertyObj;
	protected boolean servletInitializedFlag =false;
	static protected Boolean dlgcSipServletLoaded = false;
	protected Boolean myServletLoaded = false;
	protected String platform = null; 
	
	protected ServletConfig cfg;
	
	
	/*** end new vars ***/
	private static final long serialVersionUID = 1;
	protected Boolean confServletInitCalled = false;
	Boolean webRTCInitialized=false;
	protected static String dlgcDriverName = "com.dialogic.dlg309";
	transient protected MsControlFactory mscFactory;
	//transient protected DlgcSdpPortEventListener speListener;
	transient protected Driver dlgcDriver =null;
	
	private static String 									new_connector_sip_address 	= null;
	private static String 									new_connector_sip_port 		= null;
	private static String 									new_connector_sip_transport = null;
	private static String 									new_mediaserver_sip_address = null;
	private static String 									new_mediaserver_sip_port	= null;

	
	@Override
	public void init(ServletConfig cfg) throws ServletException
	{
		super.init(cfg); 
		this.cfg = cfg;
		myServletLoaded = false;
		demoPropertyObj = new DlgcDemoProperty(this.getClass());
		//platform = this.getWebServerPlatform();
		String connectorName = demoPropertyObj.getProperty("dlgc.jsr309.driver.name");	
		if ( connectorName != null)
			dlgcDriverName = connectorName;
		log.debug("JSR309 Driver Name: " + dlgcDriverName);
		
		try {
			loadAppProperties(demoPropertyObj);
		} catch (MsControlException e) {
			log.error("loadAppProperties() - Exception: "+e.getMessage());
		}
		
		sessionsUtil = (SipSessionsUtil) getServletContext().getAttribute(SIP_SESSIONS_UTIL);
	}
	
	
	protected void loadAppProperties(DlgcDemoProperty appProps) throws MsControlException
	{
		log.debug("loadAppProperties() - Entering");
		String errMsg = null;

		if (appProps == null ) {
			errMsg = "loadAppProperties() - No application properties found - ERROR";
			log.error(errMsg);
			throw new MsControlException(errMsg);
		}
		else
		{
			log.debug("loadAppProperties() - Application properties found - SUCCESS");
			try
			{
				new_connector_sip_address = appProps.getProperty("connector.sip.address");
				new_connector_sip_port = appProps.getProperty("connector.sip.port");
				new_connector_sip_transport = appProps.getProperty("connector.sip.transport");
				new_mediaserver_sip_address = appProps.getProperty("mediaserver.sip.address");
				new_mediaserver_sip_port = appProps.getProperty("mediaserver.sip.port");
				
	
				if ( new_connector_sip_address == null )
				{
					errMsg = "loadAppProperties() - Invalid connector.sip.address";
					log.error(errMsg);
					throw new MsControlException(errMsg);
				}
				else if ( new_connector_sip_port == null )
				{
					errMsg = "loadAppProperties() - Invalid connector.sip.port";
					log.error(errMsg);
					throw new MsControlException(errMsg);
				}
				else if ( new_connector_sip_transport == null )
				{
					errMsg = "loadAppProperties() - Invalid connector.sip.transport";
					log.error(errMsg);
					throw new MsControlException(errMsg);
				}
				else if ( new_mediaserver_sip_address == null )
				{
					errMsg = "loadAppProperties() - Invalid mediaserver.sip.address";
					log.error(errMsg);
					throw new MsControlException(errMsg);
				}
				else if ( new_mediaserver_sip_port == null )
				{
					errMsg = "loadAppProperties() - Invalid mediaserver.sip.port";
					log.error(errMsg);
					throw new MsControlException(errMsg);
				}
				log.debug("========== Application properties");
				log.debug("loadAppProperties() connector_sip_address      = " + new_connector_sip_address);
				log.debug("loadAppProperties() connector_sip_port         = " + new_connector_sip_port);
				log.debug("loadAppProperties() connector_sip_transport    = " + new_connector_sip_transport);
				log.debug("loadAppProperties() mediaserver_sip_address    = " + new_mediaserver_sip_address);
				log.debug("loadAppProperties() mediaserver_sip_port       = " + new_mediaserver_sip_port);
				log.debug("========== End of Application properties");

			}
			catch (Exception e)
			{
				log.error("loadAppProperties() - Exception: " + e.toString(), e);
			}
		}

		log.debug("loadAppProperties() - Exiting");

	}
	
	
	@Override
	public void servletInitialized(SipServletContextEvent evt){

		String sName = evt.getSipServlet().getServletName();
		
		if( sName.equalsIgnoreCase("DlgcSipServlet") )
		{
			dlgcSipServletLoaded = true;
			log.info(" DlgcConvergedConference::servletInitialized DlgcSipServlet loaded");			
		}

		if( dlgcSipServletLoaded)
		{
			if ( servletInitializedFlag == false ) {
				log.info("Entering DlgcConvergedConferenceDemo::servletInitialized servletName: " + sName);			
				servletInitializedFlag = true;
				initDriver();
				mySAs = sessionsUtil.getApplicationSessionByKey("DIALOGIC_CONF_DEMO", true);
				Map<String,DlgcConference> confMap =  Collections.synchronizedMap(new HashMap<String,DlgcConference>());
				
				mySAs.setAttribute("CONFERENCE_MAP", confMap);
				
				
				String mxMode = demoPropertyObj.getProperty("media.mixer.mode");
				String confVideoSize = demoPropertyObj.getProperty("media.mixer.video.size");
				String activeTalker = demoPropertyObj.getProperty("media.mixer.video.vas");
				String controlLeg = demoPropertyObj.getProperty("media.mixer.video.controlleg");
				String lectureMode = demoPropertyObj.getProperty("media.mixer.video.lecture");
				if (mxMode==null)
					mxMode="AUDIO_VIDEO";
				if (confVideoSize==null)
					confVideoSize="VGA";
				boolean bVAS=false;
				boolean bControlLeg =false;
				boolean bLecture = false;
				if (controlLeg !=null && controlLeg.equalsIgnoreCase("yes"))
					bControlLeg = true;
				if (lectureMode !=null && lectureMode.equalsIgnoreCase("yes"))
					bLecture = true;
				if (activeTalker !=null && activeTalker.equalsIgnoreCase("yes"))
					bVAS = true;
				mySAs.setAttribute("MIXER_MODE", mxMode);
				mySAs.setAttribute("MIXER_VIDEO_SIZE", confVideoSize);
				mySAs.setAttribute("MIXER_VIDEO_VAS", bVAS);
				mySAs.setAttribute("MIXER_VIDEO_CONTROL_LEG", bControlLeg);
				mySAs.setAttribute("MIXER_LECTURE_MODE", bLecture);
				
				confLock = new ReentrantLock();

			} else {
				log.info("DlgcConvergedConferenceDemo::servletInitialized(): already servletInitialized was called...debouncing " + sName);
			}
		}
	}
	protected void initDriver()
	{
		/*try
		{
			dlgcDriver = DriverManager.getDriver(dlgcDriverName);	

			if ( targetMediaServer != null ) {
				Properties factoryProperties = new Properties();
				factoryProperties.setProperty(MsControlFactory.MEDIA_SERVER_URI, targetMediaServer);
				mscFactory = dlgcDriver.getFactory(factoryProperties);
			}else 
				mscFactory = dlgcDriver.getFactory(null);


			//mscFactory = dlgcDriver.getFactory(null);
		//	speListener = new DlgcSdpPortEventListener();
		}
		catch (Exception e)
		{
			//			throw new ServletException(e);
			log.error("Error in servletInitialized",e.toString());
			e.printStackTrace();
		}*/
		
		log.debug("initDriver() - Entering");	
		try
		{
			dlgcDriver = DriverManager.getDriver(dlgcDriverName);	
			if (dlgcDriver == null  ) {
				String errMsg = "initDriver() - " + dlgcDriverName + " Not Found.";
				log.error(errMsg);
				throw new ServletException(errMsg);
			}else {
				log.debug("initDriver() - Dialogic driver (" + dlgcDriverName + ") detected - SUCCESS.");
			}
			PropertyInfo connectorProperty[] = dlgcDriver.getFactoryPropertyInfo();
			if ( connectorProperty == null ) {
				log.error("initDriver() - Failed to get driver properties - FAILURE");
			}
			log.debug("initDriver() - driver properties retreived - SUCCESS");
			Properties factoryProperties = new Properties();
			log.debug("initDriver() - 309 connector dynamic configuration info and its new values when necessary");
			for ( PropertyInfo prop: connectorProperty ) {
				log.debug("initDriver() - ===================");
				log.debug("initDriver() - Name: " + prop.name);
				log.debug("initDriver() - Description: " + prop.description);
				log.debug("initDriver() - Required: " + new Boolean(prop.required).toString() );
				log.debug("initDriver() - Value: " + prop.defaultValue);

				if ( prop.name.compareToIgnoreCase("connector.sip.address") == 0 ) {
					if (prop.defaultValue.compareToIgnoreCase(new_connector_sip_address.toString()) != 0)  {
						log.debug("initDriver() - New Value: " + new_connector_sip_address);
						prop.defaultValue = new_connector_sip_address;
					}
				}else if ( prop.name.compareToIgnoreCase("connector.sip.port") == 0 ) {
					if (prop.defaultValue.compareToIgnoreCase(new_connector_sip_port.toString()) != 0)  {
						log.debug("initDriver() - New Value: " + new_connector_sip_port);
						prop.defaultValue = new_connector_sip_port;
					}
				}else if ( prop.name.compareToIgnoreCase("connector.sip.transport") == 0 ) {
					if (null== prop.defaultValue || prop.defaultValue.compareToIgnoreCase(new_connector_sip_transport.toString()) != 0)  {
						log.debug("initDriver() - New Value: " + new_connector_sip_transport);
						prop.defaultValue = new_connector_sip_transport;
					}
				}else if ( prop.name.compareToIgnoreCase("mediaserver.sip.ipaddress") == 0 ) {
					if (prop.defaultValue.compareToIgnoreCase(new_mediaserver_sip_address.toString()) != 0) {
						log.debug("initDriver() - New Value: " + new_mediaserver_sip_address);
						prop.defaultValue = new_mediaserver_sip_address;
					}
				}else if (prop.name.compareToIgnoreCase("mediaserver.sip.port") == 0 ) {
					if (prop.defaultValue.compareToIgnoreCase(new_mediaserver_sip_port.toString()) != 0)  {
						log.debug("initDriver() - New Value: " + new_mediaserver_sip_port);
						prop.defaultValue = new_mediaserver_sip_port;
					}
				}
				factoryProperties.setProperty(prop.name, prop.defaultValue);
			}
			log.debug("initDriver() - ===================");
			log.debug("initDriver() - END - 309 connector dynamic configuration");
			mscFactory = dlgcDriver.getFactory(factoryProperties);
		}
		catch (Exception e)
		{
			log.error("initDriver() - Exception: " + e.toString(), e);
			}
		finally{
			log.debug("initDriver() - Exiting");
		}
	}
	
	@Override
	public void doInvite(final SipServletRequest request)
	{
		try
		{
			log.debug("^^^^^^^^^^^^^^^^^ DlgcConvergedConferenceDemo::doInvite()  ^^^^^^^^^^^^^^^^^^^^^");
			
			SipSession session = request.getSession();
			
			request.createResponse(SipServletResponse.SC_RINGING).send();
			
			NetworkConnection nc = null;
			nc = (NetworkConnection)session.getAttribute("NETWORK_CONNECTION");
			
			if (nc == null)
			{
				MediaSession ms = mscFactory.createMediaSession();
				nc = ms.createNetworkConnection(NetworkConnection.BASIC);
				ms.setAttribute("SIP_SESSION", session);
				ms.setAttribute("NETWORK_CONNECTION", nc);
				ms.setAttribute("REQUEST", request);
				
				
				SipURI sipURI= (SipURI)request.getRequestURI();
				log.info("DlgcConvergedConference request header=::"+sipURI.getUser());
				
				session.setAttribute("MEDIA_SESSION", ms);
				session.setAttribute("NETWORK_CONNECTION", nc);
				
			
				nc.getSdpPortManager().addListener(new DlgcSdpPortEventListener());
			}
			else // reinvite
			{
			
				MediaSession ms = (MediaSession)session.getAttribute("MEDIA_SESSION");
				//NetworkConnection nc = (NetworkConnection)session.getAttribute("NETWORK_CONNECTION");
				if (ms != null)
					ms.setAttribute("REQUEST", request);
				//if (session.getAttribute("REINVITE")!=null)
				{
					if (nc!=null)
					{
						SipServletResponse response = request.createResponse(SipServletResponse.SC_OK);
						try
						{
								response.setContent(nc.getSdpPortManager().getMediaServerSessionDescription(), "application/sdp");
								response.send();
								log.info("DlgcConvergedConference get reinvite sdp -- send same sdp back IIIII");
								return;
						}
						catch (SdpPortManagerException e)
						{
							e.printStackTrace();
						}					
					}
				}
				session.setAttribute("REINVITE", "YES");
				
			}
			
				
							
			
			byte[] remoteSdp = request.getRawContent();
			
			if (remoteSdp == null)
			{
				nc.getSdpPortManager().generateSdpOffer();
			}
			else
			{
				nc.getSdpPortManager().processSdpOffer(remoteSdp);
			}
		}
		catch (MsControlException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
	}
	
	@Override
	public void doAck(SipServletRequest request) throws ServletException,IOException 
	{
		log.info("doAck() - Entering");
		SipSession sipSession = request.getSession();
		NetworkConnection nc = (NetworkConnection) sipSession.getAttribute("NETWORK_CONNECTION");
		MediaSession  ms = (MediaSession) sipSession.getAttribute("MEDIA_SESSION");
		byte[] remoteSdp = request.getRawContent();
		if (remoteSdp != null) {
			try {
				log.info("doAck() - setting remote sdp with the answer SDP from ACK");
				nc.getSdpPortManager().processSdpAnswer(remoteSdp);
			} catch (Exception e) {
				log.error("doAck() - Exception: " + e.toString(), e);
			}
		}
		
		if (((String)sipSession.getAttribute("REINVITE"))!=null) {
			log.info("doAck() - it is reinvite do nothing");
			return;
		}
	
		String userName = (String) ms.getAttribute("USRNAME");
		String role = (String) ms.getAttribute("ROLE");
		
		 DlgcParticipant p = new DlgcParticipant(userName,nc,"SIP_SESSION",role,this);
	
		 p.GetConfRoom("file://conf_greeting.wav",true);	
	}
	
	@Override
	protected void doResponse(SipServletResponse response)
		throws ServletException, IOException
	{
		log.debug("doResponse: Method ="+response.getMethod());
		if (response.getMethod().equals("INVITE"))
		{
			if (response.getStatus() == SipServletResponse.SC_OK)
			{
				try
				{
					NetworkConnection nc = (NetworkConnection) response.getRequest().getSession().getAttribute("NETWORK_CONNECTION");
					byte[] remoteSdp = response.getRawContent();
					if (remoteSdp != null)
					{
						response.getSession().setAttribute("RESPONSE", response);
						nc.getSdpPortManager().processSdpAnswer(remoteSdp);
					}
				}
				catch (MsControlException e)
				{
					e.printStackTrace();
				}
			}
		}
	}
	
	@Override
	public void doBye(final SipServletRequest req)
	throws ServletException, IOException
	{
		MediaSession mediaSession= (MediaSession) req.getSession().getAttribute("MEDIA_SESSION");
		if (mediaSession != null) 
		{
			removeSipSessionCleanup(mediaSession);
			mediaSession.release();
		}
			
		req.createResponse(SipServletResponse.SC_OK).send();
		releaseSession(req.getSession());
	}
	
	protected void releaseSession(SipSession session)
	{
		//log.debug(" RRRRRRRRRRRRRRRRRRRR DlgcTest: Releasing session and SAS RRRRRRRRRRRRRRRRRRRR");
		try
		{
			session.invalidate();
			session.getApplicationSession().invalidate();
		}
		catch (Exception e)
		{	
		}
	}
	@SuppressWarnings("unchecked")
	protected DlgcConference getConference(String conf_room)
	{
		confLock.lock();
		DlgcConference confMx=null;
		Map<String,DlgcConference> confMap= (Map<String,DlgcConference>)mySAs.getAttribute("CONFERENCE_MAP");
		confMx =confMap.get(conf_room);
		if (confMx == null)
		{
			Map<String,String> confRoomMap =getConfRoomList();
			if (confRoomMap.get(conf_room)!=null)
			{
			   confMx= new DlgcConference(conf_room,this.mscFactory);					
				log.info("****************CreateMediaMixer = "+conf_room+"***************************");
				String mxMode = (String)mySAs.getAttribute("MIXER_MODE");
				String confSize = (String)mySAs.getAttribute("MIXER_VIDEO_SIZE");
				Boolean bActiveTalker = (Boolean)mySAs.getAttribute("MIXER_VIDEO_VAS");
				Boolean bControlLeg = (Boolean)mySAs.getAttribute("MIXER_VIDEO_CONTROL_LEG");
				Boolean bLecture = (Boolean)mySAs.getAttribute("MIXER_LECTURE_MODE");
				
				if (bActiveTalker == null)
					bActiveTalker = false;
				if (bControlLeg == null)
					bControlLeg = false;
				if (confSize == null)
					confSize ="VGA";
				if (mxMode == null)
					mxMode ="AUDIO_VIDEO";
				
				if (bLecture == null)
					bLecture = false;
					
				Parameters params = mscFactory.createParameters();
								
				if (bActiveTalker == false)
				{
					//ms.setAttribute("connector.asn.louder.sample.time", new Integer(5) );		
					//SVN Add Active Input (ASN) To Mixer
					/*params.put(MediaMixer.ENABLED_EVENTS, MixerEvent.ACTIVE_INPUTS_CHANGED );	   //enable active talker event
					params.put(MediaMixer.MAX_ACTIVE_INPUTS, 4);*/
				}

			
			    if (confMx.CreateConference(mxMode, confSize, params,bActiveTalker,bControlLeg,bLecture))
			    	confMap.put(conf_room, confMx);
			    else
			    	confMx = null;
			}
			else
			{
				log.error("DlgcConference::getConference() conf_rom = " +conf_room+" is not valid room");
			}
		}
		confLock.unlock();
		return confMx;
	}
	
	 Map<String, String> getConfRoomList()
	{
		Map<String,String> json = new HashMap<String,String>();
		Map<String, String> env = System.getenv();
		String path = env.get("CATALINA_HOME");
		String confListFile =  path + "/conf/Dialogic/conf_room.json";
        try{ 
            JSONParser parser = new JSONParser(); 
            ContainerFactory containerFactory = new ContainerFactory(){ public List creatArrayContainer() { return new LinkedList(); }

	                public Map createObjectContainer() {
	                  return new LinkedHashMap();
	                }
	            };
	            json = (Map)parser.parse(new FileReader(confListFile), containerFactory);  
            } 
        catch(ParseException pe){
            	log.error("DlgcConference::getConfRoomList() exception = "+pe.getMessage());
            }
        catch (IOException ex) { 
        	log.error("DlgcConference::getConfRoomList() exception = "+ex.getMessage());
        }
        return json;

	}
		
	
	public class DlgcSdpPortEventListener implements MediaEventListener<SdpPortManagerEvent>, Serializable
	{
		/**
		 * 
		 */
		private static final long serialVersionUID = 5742674704860593132L;

	
		@SuppressWarnings("unchecked")
		@Override
		public void onEvent(SdpPortManagerEvent event)
		{	
			boolean bError=false;
			SdpPortManager sdp = event.getSource();
			MediaSession ms = sdp.getMediaSession();
			SipSession session = (SipSession) ms.getAttribute("SIP_SESSION");
			Session webSocketSession = (Session) ms.getAttribute("WEBSOCKET_SESSION");
			NetworkConnection nc = (NetworkConnection) ms.getAttribute("NETWORK_CONNECTION");
			
			log.info("DlgcSdpPortEventListener::Type " + event.getEventType() );
			log.info("DlgcSdpPortEventListener::Source " + event.getSource().toString());
			log.info("DlgcSdpPortEventListener::ErrorText " + event.getErrorText());	
			
			if (event.getEventType().equals(SdpPortManagerEvent.ANSWER_GENERATED))
			{
				if (!event.getError().equals(MediaErr.NO_ERROR))
				{
					bError = true;
				}
			}
			else if (event.getEventType().equals(SdpPortManagerEvent.ANSWER_PROCESSED))
			{
				log.debug("IIIII SdpPortManagerEvent ANSWER_PROCESSED IIIII");
				if (!event.getError().equals(MediaErr.NO_ERROR))
				{
					log.error("SdpPortManagerEvent ANSWER_PROCESSED with erro: "+event.getErrorText());
					return;
				}
				
				if (webSocketSession!=null)
				{
					try {
						
						JSONObject obj = new JSONObject();
						
						{
							obj.put("type", "answer-ack");
							obj.put("id",nc.getURI().toString());
							//webSocketSession.getUserProperties().put("NETWORK_CONN", nc);
						}
						webSocketSession.getBasicRemote().sendText(obj.toJSONString());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
			    
				else if (session.isValid())
				{
					SipServletResponse response = (SipServletResponse) session.getAttribute("RESPONSE");
					if (response != null)
					{
						try
						{
							response.createAck().send();
						}
						catch (IOException e)
						{
							e.printStackTrace();
						}
					}
				}
				return;
			}
			else if (event.getEventType().equals(SdpPortManagerEvent.UNSOLICITED_OFFER_GENERATED))
			{
				log.debug("IIIII SdpPortManagerEvent UNSOLICITED_OFFER_GENERATED IIIII");
				if (!event.getError().equals(MediaErr.NO_ERROR))
				{
					log.error("SdpPortManagerEvent UNSOLICITED_OFFER_GENERATED with erro: "+event.getErrorText());
					return;
				}
				// Need to send a re-Invite.
				if (webSocketSession!=null)
				{
					byte[] sdpDesc=null;
					try {
						sdpDesc = nc.getSdpPortManager().getMediaServerSessionDescription();
					} catch (SdpPortManagerException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (MsControlException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					try {
						
						JSONObject obj = new JSONObject();
						
						{
							obj.put("type", "offer");
							String s1 = new String(sdpDesc);
							obj.put("sdp", s1);
							obj.put("id",nc.getURI().toString());
							//webSocketSession.getUserProperties().put("NETWORK_CONN", nc);
						}
						webSocketSession.getBasicRemote().sendText(obj.toJSONString());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
				}
				else if (session.isValid())
				{
					SipServletMessage reInviteMessage = session.createRequest("INVITE");
					try
					{
						byte[] sessionDesc = sdp.getMediaServerSessionDescription();
						reInviteMessage.setContent(sessionDesc, "application/sdp");
						reInviteMessage.send();
					}
					catch (SdpPortManagerException e)
					{
						e.printStackTrace();
					}
					catch (UnsupportedEncodingException e)
					{
						e.printStackTrace();
					}
					catch (IOException e)
					{
						e.printStackTrace();
					}
				}
				return;
				
			}
			else if (event.getEventType().equals(SdpPortManagerEvent.NETWORK_STREAM_FAILURE))
			{
				if (webSocketSession!=null)
				{
					
					if (ms != null) 
					{
						removeWebSessionCleanup(webSocketSession);
						String errorMsg ="{\"type\":\"error\",  \"description\" : \"Media Stream Failure\"}";		
						 try {
								webSocketSession.getBasicRemote().sendText(errorMsg);
								webSocketSession.close();
							} catch (IOException e1) {
								// TODO Auto-generated catch block
								log.error("WebScoket exception: "+e1.getMessage());
							}
						
						//ms.release();
					}
				}
			    
				else if (session.isValid())
				{
					if (ms != null) 
					{
						removeSipSessionCleanup(ms);
						//Send bye
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
						ms.release();
					}					
				}
				return;
			}
			else
			{
				log.warn("IIIII SdpPortManagerEvent Unhandle Events IIIII");
				return;
			}
			
			if (webSocketSession!=null)
			{
				byte[] sdpDesc=null;
				try {
					sdpDesc = nc.getSdpPortManager().getMediaServerSessionDescription();
				} catch (SdpPortManagerException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (MsControlException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				try {
				
					JSONObject obj = new JSONObject();
					if (bError)
					{
						obj.put("type", "error");
						obj.put("category", "offer");
						obj.put("description",event.getErrorText());
					}
					else
					{
						obj.put("type", "answer");
						String s1 = new String(sdpDesc);
						obj.put("sdp", s1);
						obj.put("id",nc.getURI().toString());
						webSocketSession.getUserProperties().put("NETWORK_CONN", nc);
					}
					webSocketSession.getBasicRemote().sendText(obj.toJSONString());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			else if (session.isValid())
			{
				SipServletRequest request = (SipServletRequest) ms.getAttribute("REQUEST");
				
				if (event.getEventType().equals(SdpPortManagerEvent.ANSWER_GENERATED))
				{
					log.debug("IIIII SdpPortManagerEvent ANSWER_GENERATED IIIII");
					SipServletResponse response;
					try
					{
						if (bError)
						{
							response= request.createResponse(SipServletResponse.SC_NOT_ACCEPTABLE_HERE);
							response.send();
							return;
						}
						
						response= request.createResponse(SipServletResponse.SC_OK);	
						if (session.getAttribute("REINVITE")!=null)
						{
							//Save the SDP content in a String
							String charset = "UTF-8";
						    byte[] rawContent = request.getRawContent();
						    String sdpContent = new String(rawContent, charset);
							ms.setAttribute("SESSION_SDP", sdpContent);
							response.setContent(sdp.getMediaServerSessionDescription(), "application/sdp");
							response.send();
							log.info("DlgcSdpPortEventListener get reinvite sdp -- do nothing IIIII");
							return;
						}
							
						
					   	SipURI sipURI= (SipURI)request.getRequestURI();
						
						String userName = ( (SipURI)request.getFrom().getURI()).getUser();
						log.debug("getUser() = " + userName);
						
						if (userName==null){
							userName = request.getFrom().getDisplayName();
							log.debug("getDisplayName() = " + userName);
						}
						if (userName==null)
							userName="unknown";
						
						log.info("DlgcSdpPortEventListener request user "+sipURI.getUser());
						
						String tmp[] = sipURI.getUser().split("_");
						String role="participant";

						log.debug("sipURI.getUser().split() = " + tmp[0] + " AND " + tmp[1]);
						
						if (tmp.length > 1)
						{
							if (tmp[1].equalsIgnoreCase("presenter"))
								role ="presenter";
						}
						
						ms.setAttribute("USRNAME", userName);
						ms.setAttribute("ROLE", role);
									
						String charset = "UTF-8";
					    
					    //Save the SDP content in a String
					    byte[] rawContent = request.getRawContent();
					    String sdpContent = new String(rawContent, charset);
					    
					    
					    ms.setAttribute("SESSION_SDP", sdpContent);
					  //  DlgcParticipant p = new DlgcParticipant(userName,nc,"SIP_SESSION",role,m_app);
					    
					    response.setContent(sdp.getMediaServerSessionDescription(), "application/sdp");
				    	response.send();
				    	
					    
				    /*	synchronized(p)
				    	{
						    p.StartPlaying("file:////var/lib/xms/media/en-US/conf_greeting.wav");
						    try {
								p.wait(10000);
							} catch (InterruptedException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
				    	}
					    if (confMx.AddParticipant(p))
					    {
					    	ms.setAttribute("PARTICIPANT_OBJ", p);
					    	//response.setContent(sdp.getMediaServerSessionDescription(), "application/sdp");
					    	//response.send();
					    	//ms.setAttribute("PARTICIPANT_OBJ", p);
					    }
					    else
					    {
					    	log.error("Fail to add participant ="+userName+ " to conference room ="+conf_room);
					    	p = null;
					    	ms.release();
					    }*/
					}
					catch (UnsupportedEncodingException e)
					{
						e.printStackTrace();
					}
					catch (SdpPortManagerException e)
					{
						e.printStackTrace();
					}
					catch (IOException e)
					{
						e.printStackTrace();
					}
				}
			}
		}
	}
	
	 public void onWebRTCAnswerAck(Session webSocketSession,String conf_room)
	 {
		 MediaSession mediaSession= (MediaSession)webSocketSession.getUserProperties().get("MEDIASESSION");
		 
		 String errorMsg=null;
		 DlgcParticipant p = null;
		 if (mediaSession !=null)
		 {
			 NetworkConnection nc = (NetworkConnection) mediaSession.getAttribute("NETWORK_CONNECTION");
			 String userName = (String)webSocketSession.getUserProperties().get("USER_ID");
			 String role = (String)webSocketSession.getUserProperties().get("ROLE");
			 DlgcConference dlgcConf = getConference(conf_room); 
			 if (dlgcConf!=null)
			 {
				 p = new DlgcParticipant(userName,nc,"WEBSOCKET_SESSION",role,this);
				 if (conf_room.contentEquals(userName))
					 p.bOwner = true;
				//p.StartPlaying("file:////var/lib/xms/media/en-US/verification/video_clip_nascar.wav"); 
			
				if ( dlgcConf.AddParticipant(p))
				{
					mediaSession.setAttribute("PARTICIPANT_OBJ", p);
				}
				else
				{
					errorMsg ="{\"type\":\"error\",  \"description\" : \"FAIL TO JOIN THE CONFERENCE\"}";
					p=null;
					
				}
			 }
			 else
				 errorMsg ="{\"type\":\"error\",  \"description\" : \"CONFERENCE NOT FOUND\"}";			
		 }
		 else
			 errorMsg ="{\"type\":\"error\",  \"description\" : \"INVALID MEDIA SESSION\"}";		
			 
		 if (errorMsg !=null)
		 {
			 try {
					webSocketSession.getBasicRemote().sendText(errorMsg);
					
					/*if (mediaSession !=null)
						mediaSession.release();*/
					webSocketSession.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
		 }				
	 }
	 
	 
	 public void onWebRTCOffer(Session webSocketSession ,String SDP)
	 {
		 
		 NetworkConnection networkConnection = null;
		 MediaSession mediaSession=null;
		 try 
		{
			 mediaSession = mscFactory.createMediaSession();
			
			
			Parameters pmap = mediaSession.createParameters();
			
			Integer stimeout = new Integer(5000);
			pmap.put(MediaSession.TIMEOUT, stimeout);
			mediaSession.setParameters(pmap);
			
			networkConnection = mediaSession.createNetworkConnection(NetworkConnection.BASIC);
			
			//not needed for this unit test sample just using it to demonstrate 
			Parameters sdpConfiguration = mediaSession.createParameters();
			Map<String,String>  configurationData = new HashMap<String,String>();
			configurationData.put("SIP_REQ_URI_USERNAME", "msml=777");
			sdpConfiguration.put(SdpPortManager.SIP_HEADERS, configurationData);
			networkConnection.setParameters(sdpConfiguration);
			
			DlgcSdpPortEventListener la = new DlgcSdpPortEventListener();
			networkConnection.getSdpPortManager().addListener(la);
		
			
			log.info("DlgcConferenceTest::onWebRTCOffer.... Setting mediaSession");
			mediaSession.setAttribute("WEBSOCKET_SESSION",webSocketSession);
			mediaSession.setAttribute("NETWORK_CONNECTION", networkConnection);
			mediaSession.setAttribute("SESSION_SDP", SDP);
			
			webSocketSession.getUserProperties().put("MEDIASESSION",mediaSession);
			
			
		}
		catch (MsControlException e)
		{
			try {
				webSocketSession.getBasicRemote().sendText("{\"type\":\"error\",  \"description\" : \"SERVICE UNAVAILABLE\"}");
				
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if (mediaSession!=null)
					mediaSession.release();
			return;
		}
			
			
		try
		{
			byte[] remoteSdp = SDP.getBytes();
			
			if (remoteSdp == null)
			{
				networkConnection.getSdpPortManager().generateSdpOffer();
			}
			else
			{
				networkConnection.getSdpPortManager().processSdpOffer(remoteSdp);
			}
		} 
		catch (MsControlException e)
		{
			try {
				webSocketSession.getBasicRemote().sendText("{\"type\":\"ERROR\",  \"description\" : \"SERVICE UNAVAILABLE\"}");
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if (mediaSession!=null)
				mediaSession.release();
		}
	 }
	 
	 protected void myWebRTCInitialized()
	 {
		 mySAs=sessionsUtil.getApplicationSessionByKey("DIALOGIC_CONF_DEMO",false);
	 }
	 
	
	 
	 @OnMessage
	    public void onTextMessage(@PathParam("guest-id") String guestID, Session session, String msg) {
	        try {
	        
	                 log.info("DlgcConvergedConference::TextMessage: " + msg+" session Id =" + session.getId()+" Guest-id = "+guestID);
	            		                
	                JSONParser parser=new JSONParser();
          
	           
            		Object obj = parser.parse(msg);
            		
            		JSONObject jsonObject = (JSONObject) obj;
             
            		String type = (String) jsonObject.get("type");
            		if (type.equalsIgnoreCase("offer"))
            		{
            			if (isReinvite(session))
            				return;
            			String userId = (String) jsonObject.get("userid");
            			String role = (String) jsonObject.get("role");
            			if (userId == null)
            			{
            				userId = "unknown";
            				 log.warn(" DlgcConvergedConference::TextMessage:  session Id =" + session.getId()+" user-id is missing");
            			}
            			if (role == null)
            			{
            				role = "participant";
            				 log.warn(" DlgcConvergedConference::TextMessage:  session Id =" + session.getId()+" role is missing");
            			}
            			            		
            			session.getUserProperties().put("USER_ID",userId);
            			session.getUserProperties().put("ROLE",role);

            			String Sdp = (String) jsonObject.get("sdp");
            			onWebRTCOffer(session,Sdp);
            		}
            		else if (type.equalsIgnoreCase("ok"))
            		{
            			onWebRTCAnswerAck(session,guestID);
            		}
            		else if (type.equalsIgnoreCase("answer"))
            		{
            			String Sdp = (String) jsonObject.get("sdp");
            			onWebRTCAnswer(session,Sdp);
            		}	
            		else if (type.equalsIgnoreCase("rtc_ka_ack"))
            		{
            			MediaSession mediaSession= (MediaSession) session.getUserProperties().get("MEDIASESSION");
            	    	if (mediaSession != null)
            	    	{
            	    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
            	    		if (p!=null)
            	    		{
            	    			p.ResetPingErrorCount();
            	    		}
            	    	}
             		}
            		else if (type.equalsIgnoreCase("message"))
            		{
            			MediaSession mediaSession= (MediaSession) session.getUserProperties().get("MEDIASESSION");
            	    	if (mediaSession != null)
            	    	{
            	    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
            	    		if (p!=null)
            	    		{
            	    			DlgcConference conf = (DlgcConference)mediaSession.getAttribute("CONFERENCE_OBJ");
            	    			conf.boardcastMsg(msg);
            	    		}
            	    	}
            		}
            		else if (type.equalsIgnoreCase("request"))
            		{
            			MediaSession mediaSession= (MediaSession) session.getUserProperties().get("MEDIASESSION");
            	    	if (mediaSession != null)
            	    	{
            	    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
            	    		if (p!=null)
            	    		{
            	    			DlgcConference conf = (DlgcConference)mediaSession.getAttribute("CONFERENCE_OBJ");
            	    			if (conf !=null)
            	    			{
	            	    			if  (p.bOwner)
			            			{
	            	    				
			            			}
			            			else
			            			{
			            				conf.sendRequestToOwner(msg);
			            			}
            	    			}
            	    		}
            	    	}
             		}
            		else if (type.equalsIgnoreCase("operation"))
            		{
            			MediaSession mediaSession= (MediaSession) session.getUserProperties().get("MEDIASESSION");
            	    	if (mediaSession != null)
            	    	{
            	    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
            	    		if (p!=null)
            	    		{
            	    			DlgcConference conf = (DlgcConference)mediaSession.getAttribute("CONFERENCE_OBJ");
            	    			if (conf !=null)
            	    			{
            	    				String errorMsg="";
            	    				
	            	    			if  (p.bOwner) // owner only
			            			{
	            	    				
	            	    				String action = (String) jsonObject.get("action");
	            	    				if (action.equalsIgnoreCase("record_start"))
	            	    				{
	            	    					if (!conf.StartRecording())
	            	    					//if (!p.StartRecording())
	            	    						errorMsg="Fail to start recording";
	            	    					
	            	    				}
	            	    				else if (action.equalsIgnoreCase("record_stop"))
	            	    				{
	            	    					if (!conf.StopRecording())
	            	    					//if (!p.StopRecording())
	            	    						errorMsg="Fail to stop recording"	;
	            	    				}
	            	    				else if (action.equalsIgnoreCase("play_start"))
	            	    				{
	            	    					String uri = (String) jsonObject.get("uri");
	            	    					if (!conf.StartPlaying(uri))
	            	    					//if (!p.StartPlaying(uri))
	            	    						errorMsg="Fail to start play";
	            	    					
	            	    				}
	            	    				else if (action.equalsIgnoreCase("play_stop"))
	            	    				{
	            	    					if (!conf.StopPlaying())
	            	    					//if (!p.StopPlaying())
	            	    						errorMsg="Fail to stop play";
	            	    				}
			            			}
	            	    			if (p.role.equalsIgnoreCase("presenter")||p.bOwner)
	            	    			{
	            	    				String action = (String) jsonObject.get("action");
	            	    				boolean bMute =true;
	            	    				if (action.equalsIgnoreCase("mute")||action.equalsIgnoreCase("unmute"))
	            	    				{
	            	    					if (action.equalsIgnoreCase("unmute"))
	            	    						bMute = false;
	            	    					JSONArray lists = (JSONArray) jsonObject.get("users");
	            	    					if (lists.isEmpty())
	            	    					{
	            	    						errorMsg="users is empty";
	            	    					}
	            	    					else
	            	    					{
	            	    							if (!conf.DoMute(bMute,lists))
			            	    						errorMsg="Fail to "+action;
			            	    		 	}
	            	    				}
	            	    			}
	            	    			else
			            			{
			            				errorMsg="operation is not  authorized";
			            			}
	            	    			if (errorMsg.length()>0)
	            	    			{
		            	    			try {
		            	    				JSONObject errorObj = new JSONObject();
		            	    				errorObj.put("type", "error");
		            	    				errorObj.put("msg", errorMsg);
											session.getBasicRemote().sendText(errorObj.toJSONString());
										} catch (IOException e) {
											// TODO Auto-generated catch block
											e.printStackTrace();
										}
	            	    			}
	            	    			
            	    			}
            	    		}
            	    	}
             		}
	        } catch (ParseException e) {
	    		e.printStackTrace();
	        } 
	    }

	    private void onWebRTCAnswer(Session session,String sdp) {
	    	
		   MediaSession ms = (MediaSession)session.getUserProperties().get("MEDIASESSION");
		   if (ms == null)
		   {
			   return;
		   }
	    	try
			{
				NetworkConnection nc = (NetworkConnection) ms.getAttribute("NETWORK_CONNECTION");
			
				if (sdp != null && nc !=null)
				{
					byte[] remoteSdp = sdp.getBytes();
					
					if (remoteSdp != null)
						nc.getSdpPortManager().processSdpAnswer(remoteSdp);
				}
			}
			catch (MsControlException e)
			{
				e.printStackTrace();
			}
		
	}

		private boolean isReinvite(Session session) {
		// TODO Auto-generated method stub
	    	MediaSession ms = (MediaSession)session.getUserProperties().get("MEDIASESSION");
	    	if (ms!=null)
	    	{
	    		log.info("IT IS REINVITE on WEB Session Id ="+session.getId());
	    		return true;
	    	}
	    		
		return false;
	}

		@OnMessage
	    public void onBinaryMessage(Session session, ByteBuffer bb,
	            boolean last) {
	        try {
	            if (session.isOpen()) {
	                session.getBasicRemote().sendBinary(bb, last);
	            }
	        } catch (IOException e) {
	            try {
	                session.close();
	            } catch (IOException e1) {
	                // Ignore
	            }
	        }
	    }

	    /**
	     * Process a received pong. This is a NO-OP.
	     *
	     * @param pm    Ignored.
	     */
	    @OnMessage
	    public void onPongMessage(PongMessage pm) {
	        // NO-OP
	    }
	    
	   
	    
	    @OnOpen
	    public void onOpen(Session session, @PathParam("guest-id") String guestID)
	    {
	    	 log.info("DlgcConvergedConference::OnOpen: session Id =" + session.getId()+" Conf-id = "+guestID);
	    	 try {
	             
	                  session.getBasicRemote().sendText("Connection open on session id" +session.getId());
	                 
	                  if (webRTCInitialized==false)
	                  {
	                	  log.info("DlgcConvergedConference::onOpen: webrtc ini is false  Id =" + session.getId());
		                  initDriver();
	                	/*  if(null == mscFactory){
	          				log.info("MSCFactory does not exist ...calling initFactory()");
	          				initDriver();
	          			}*/
						  myWebRTCInitialized();
						  webRTCInitialized=true;
						  session.getUserProperties().put(guestID, session);
	                  }
	          } catch (IOException e) {
	              try {
	                  session.close();
	              } catch (IOException e1) {
	                  // Ignore
	              }
	          }
	    	 
	    	 
	    }
	    
	    @OnClose
	    public void OnClose(Session session) {
	      
	    	log.info(" OnClose: session Id =" + session.getId());
	    	removeWebSessionCleanup(session);
	    	
	    }
	    
	    
	    
	    
	    protected void removeWebSessionCleanup(Session session)
	    {
	    	confLock.lock();
	    	try{
		       	MediaSession mediaSession= (MediaSession) session.getUserProperties().get("MEDIASESSION");
		    	if (mediaSession != null)
		    	{
		    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
		    		if (p!=null)
		    		{
		    			DlgcConference conf = (DlgcConference)mediaSession.getAttribute("CONFERENCE_OBJ");
		    			conf.RemoveParticipant(p);
		    			if (conf.IsEmpty())
		    			{
		    				conf.Release();
		    				Map<String,DlgcConference> confMap= (Map<String,DlgcConference>)mySAs.getAttribute("CONFERENCE_MAP");
		    				confMap.remove(conf.m_ConfName);
		    			}
		    		}
	    			mediaSession.release();
		    	}
	    	}
	    	catch ( IllegalStateException e)
			{
				 log.error("WebSocket is in a invalid state "+e.getMessage());
			}
	       	 catch (Exception e)
			 {
				  log.error("WebSocket is in a invalid state: "+e.getMessage());
			 }
	   
	    	confLock.unlock();
	    }
	    
	    protected void removeSipSessionCleanup(MediaSession mediaSession)
	    {
	    	confLock.lock();
	      // 	MediaSession mediaSession= (MediaSession) req.getSession().getAttribute("MEDIA_SESSION");   	
	    	
	       	if (mediaSession != null)
	    	{
	    		DlgcParticipant p = (DlgcParticipant)mediaSession.getAttribute("PARTICIPANT_OBJ");
	    		if (p!=null)
	    		{
	    			DlgcConference conf = (DlgcConference)mediaSession.getAttribute("CONFERENCE_OBJ");
	    			conf.RemoveParticipant(p);
	    			if (conf.IsEmpty())
	    			{
	    				conf.Release();
	    				Map<String,DlgcConference> confMap= (Map<String,DlgcConference>)mySAs.getAttribute("CONFERENCE_MAP");
	    				confMap.remove(conf.m_ConfName);
	    			}
	    		}
	    		//mediaSession.release();
	    	}
	       	confLock.unlock();
	    }
	    
	    @OnError
	    public void onError(Session session, Throwable t) {
	          	removeWebSessionCleanup(session);
	    }
	
		
	
	private static Logger log = LoggerFactory.getLogger(DlgcConvergedConferenceDemo.class);
	private static Lock confLock;
	public static SipSessionsUtil sessionsUtil;
	private transient SipApplicationSession mySAs = null;
	
}
