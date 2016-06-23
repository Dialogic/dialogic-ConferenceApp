![alt tag](https://www.dialogic.com/~/media/shared/graphics/video/nwrkfuel-posterimg.jpg)

Dialogic PowerMedia XMS
=======================
Dialogic’s PowerMedia™ XMS is a powerful next-generation software media server that enables standards-based, real-time multimedia communications solutions for mobile and broadband environments. PowerMedia XMS supports standard media control interfaces such as MSML, VXML, NetAnn, and JSR 309, plus a Dialogic HTTP-based version of a RESTful API.

dialogic-JSR309ConferenceApp
===================
Overview: A JSR309 WebRTC demo that can be used to test conference functionalities with Dialogic JSR 309 connector and Dialogic PowerMedia™ XMS Media Server.

Repository Contents
===================
1. DemoApps - Handles the busincess logic and connectivity to Dialogic PowerMedia™ XMS Media Server via JSR 309 connector. 
2. DialogicConference - Handles the Web UI interface.
3. XMS_JSR309InstallConfigTeleStax-Apache_5.2 - Steps to Install TeleStax AS, JSR 309 Connector.
4. Getting started with “ConvergedConfereceApp“ project in IDE - Steps to build DialogicConference application in IDE to create a war file
5. Getting started with “dlgmsc_conf” project in IDE - Steps to build DemoApps application in IDE to create a war file
6. How To Install & Run WebRTC Converged Conferece Demo - Steps to deploy the demo on AS.

Steps to Install
=============
1. Start by installing TeleStax AS and Dialogic JSR 309 Connector. 
User is responsible to get the AS from www.telestax.com website. Steps to install the AS and connector is provided in XMS_JSR309InstallConfigTeleStax-Apache_5.2
2. Next Import the application source to IDE and follow "Getting started with ConvergedConfereceApp project in IDE" and "Getting started with dlgmsc_conf project in IDE" to build the war files
3. Finally refer to "How To Install & Run WebRTC Converged Conferece Demo" to deploy and run the application.
