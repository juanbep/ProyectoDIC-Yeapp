'use strict';

// Note: Some Variable names are purposefully prefixed with 'engage' keyword so as not to collide with Application's global variables.
// Only the variables which may potentially collide with Application global variables are prefixed with engage keyword for better readability.

/**
 * When sdk is not explicitly included in the application using the <script> tag, this will be false.
 * If its false, the sdk will be downloaded from the given engageDomain.
 */
let isEngageDigitalSdkLoaded = window.EngageDigital ? true : false;
let engageClickToCallConfig;

let engageMakeCallBtn;
let engageRemoteAudio;

let engageStatusDiv;

let engageDigitalClient;
let engageDigitalSession;
let engagShowimage

/**
 * When engageDigitalClickToCallConfig object is available do the initialization on the fly.
 * If its not there Application has to call initializeEngageDigitalClickToCall() explicitly with right configuration.
 */
if (window.engageDigitalClickToCallConfig) {
  initializeEngageDigitalClickToCall(window.engageDigitalClickToCallConfig);
  document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
  document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
}

function initializeEngageDigitalClickToCall(engageDigitalClickToCallConfig) {
  engageClickToCallConfig = engageDigitalClickToCallConfig;

  engageLog('Starting');
  engageMakeCallBtn = document.getElementById(engageClickToCallConfig.callBtnId)
  engageMakeCallBtn.innerText = engageClickToCallConfig.makeCallText;
  engageMakeCallBtn.addEventListener('click', callController);
  engageMakeCallBtn.disabled = true;
  // engagShowimage = document.getElementById("myP").style.visibility ="visible";
  engageRemoteAudio = document.getElementById(engageClickToCallConfig.remoteAudioId);
  engageStatusDiv = document.getElementById(engageClickToCallConfig.alertDivId);

  if (!engageDigitalClient || !engageDigitalClient.isConnected()) {
    connectToEngageDigital();
  }
}

function callController() {
  handleCallStateChange(engageCallState);
}

// To reset the audio tag controls
function toResetAudioControls() {
  let audio = engageRemoteAudio;
      audio.pause();
      audio.currentTime = 0
}

const callInitialState = {
  execute: () => {
    engageLog('Executing callInitialState');
    engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
    engageMakeCallBtn.disabled = false;
  },
  name: 'callInitialState'
}

const callNewState = {
  execute: () => {
    engageLog('Executing callNewState');
    engageMakeCallBtn.textContent = engageClickToCallConfig.disconnectCallText;
    makeCall();
  },
  name: 'callNewState'
}

const callConnectedState = {
  execute: () => {
    engageLog('Executing callConnectedState');
    engageMakeCallBtn.textContent = engageClickToCallConfig.disconnectCallText;
  },
  name: 'callConnectedState'
}

const callDisconnectedState = {
  execute: () => {
    engageLog('Executing callDisconnectedState');
    engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
    engageLog('Is Client Connected ? ' + engageDigitalClient.isConnected());
    if (!engageDigitalClient.isConnected()) {
      engageMakeCallBtn.disabled = true;
    }
  },
  name: 'callDisconnectedState'
}

const callCanBeEndedState = {
  execute: () => {
    engageLog('Executing callCanBeEndedState');
    engageMakeCallBtn.textContent = engageClickToCallConfig.makeCallText;
    disconnectCall();
  },
  name: 'callCanBeEndedState'
}

callInitialState.nextState = callNewState;
callNewState.nextState = callCanBeEndedState;
callConnectedState.nextState = callCanBeEndedState;
callDisconnectedState.nextState = callNewState;
callCanBeEndedState.nextState = callNewState;

let engageCallState = callInitialState;

function connectToEngageDigital() {

  const engageDomain = engageClickToCallConfig.engageDomain;

  if (isEngageDigitalSdkLoaded) {
    const userIdentity = 'Bobby';

    const config = {
      log: {
        console: { enable: engageClickToCallConfig.consoleLog },
      },
      needRegistration: false,
      headers: {'apiKey': 'eyJ4NXQiOiJZamd5TW1GalkyRXpNVEZtWTJNMU9HRmtaalV3TnpnMVpEVmhZVGRtTnpkaU9HUmhNR1kzWmc9PSIsImtpZCI6ImFwaV9rZXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJyYWRpc3lzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoicmFkaXN5cyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoicnN5cy0xMDA3OC10YWRoYWNrMjMuY29tIiwiaWQiOjI4OSwidXVpZCI6ImRjNzcxZTgzLWJlNDYtNDJlMy1hNWM1LTEwYmQ2OTA2NjUzMyJ9LCJpc3MiOiJodHRwczpcL1wvYXBpbS5lbmdhZ2VkaWdpdGFsLmFpOjQ0M1wvb2F1dGgyXC90b2tlbiIsInRpZXJJbmZvIjp7IlVubGltaXRlZCI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50Iiwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0IjpudWxsfX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiQ2FsbEFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGlcL3YxIiwicHVibGlzaGVyIjoicmFkaXN5cyIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJVbmxpbWl0ZWQifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2VydmljZUFQSVByb2R1Y3QiLCJjb250ZXh0IjoiXC9hcGkiLCJwdWJsaXNoZXIiOiJyYWRpc3lzIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IlVubGltaXRlZCJ9XSwiaWF0IjoxNjk3ODIxMzk4LCJqdGkiOiI4MDdhMDJlNy1kZmFmLTQxN2YtOWRiZS05NDkxOTZhNmUzMDEifQ==.WSKjsUjW5HWoTBqIEy3FEXpoRk8pH9gc4nYCn81z_YND8hS_ECacgeekqhjcRcRbAmFCBX_h8dHKyYwNJnRZBnNb9OuUXAhSi3b7nqYyxqK4usa8pokKcRmMgjzVfafhNYgVWTTvmtA0QY4FLiQK0Qhon6pOMRPSdaWCDfzwgeRyjzoCHBJ62cExp5b7rjJ_-tTCc7I0Kx1NwkxfDO3U0S87lvLLTydtkx_Q17GyzazwbVD3HSwCxazeLuKi9nLwUh0Ts66pgJjDWmfmeDQbFcEKzwSo6-fFMKtgo3XI4tSsGtWKUyU8mdjAWN4OIYvyPuQRntCsQvGBGPavXY9WZg=='}
    };

    engageDigitalClient = new window.EngageDigital.EngageDigitalClient(userIdentity, engageDomain, config);
    registerForEngageDigitalClientEvents();

  } else {
    //Only load for the first time
    loadEngageDigitalSDK(engageDomain);
  }
}

function registerForEngageDigitalClientEvents() {

  /**
   * The Ready event is emitted when the SDK is initialized successfully and is ready
   * for operation. Once this event is received connect() API can be invoked.
   */
  engageDigitalClient.addEventHandler('ready', () => {
    engageDigitalClient.connect();
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
  });

  engageDigitalClient.addEventHandler('connecting', () => {
    updateStatus('Connecting to Engage Digital...');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"

  });

  /*
   * This event is being called when connectivity is established for the first time.
   */
  engageDigitalClient.addEventHandler('connected', () => {
    updateStatus('Connected to Engage Digital');
    engageMakeCallBtn.disabled = false;
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    handleCallStateChange(callInitialState);
  });

  /*
   * This event is emitted when the Connection with the engage domain is lost
   */
  engageDigitalClient.addEventHandler('disconnected', () => {
    updateStatus('Disconnected from Engage Digital');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    toResetAudioControls()
    engageLog('Disconnected from Engage Digital during the call state ' + engageCallState.name);
    //Let the Call Disconnect button be enabled when disconnect happens during the call
    if (engageCallState !== callCanBeEndedState) {
      engageMakeCallBtn.disabled = true;
    }
  });

  /*
   * This event is emitted when the sdk tries to re-connect when the already established connection is lost
   */
  engageDigitalClient.addEventHandler('reconnecting', () => {
    //Let the Call Disconnect button be enabled when reconnect happens during the call
    if (engageCallState !== callCanBeEndedState) {
      engageMakeCallBtn.disabled = true;
    }
    updateStatus('Re-connecting to Engage Digital');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
  });

  /**
   * Fired when the connection is re-established
   */
  engageDigitalClient.addEventHandler('reconnected', () => {
    engageMakeCallBtn.disabled = false;
    updateStatus('Re-connected to Engage Digital');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
  });

  engageDigitalClient.addEventHandler('failed', (error) => {
    callStateHandler(callDisconnectedState);
    updateStatus(JSON.stringify(error));
    toResetAudioControls()
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
  });

  engageDigitalClient.addEventHandler('errorinfo', ({ errorMessage }) => {
    updateStatus(errorMessage);
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    toResetAudioControls()
  });

  /**
   * For an incoming/outgoing call this event will be triggered.
   * This event will carry an instance of EngageDigitalSession, on that call related events can be registered.
   * If the new session is for an incoming call EngageDigitalSession's acceptCall() API can be invoked to accept the call.
   */
  engageDigitalClient.addEventHandler('newRTCSession', onNewEngageSession);
}

function disConnectFromEngageDigital() {

  if (engageDigitalClient) {
    engageDigitalClient.disconnect();
    handleCallStateChange(callInitialState);
    updateStatus('Disconnected from Engage Digital');
  }
}

function makeCall() {

  const callToNum = engageClickToCallConfig.callTo;

  try {
    const isVideoCall = engageClickToCallConfig.callType === 'video';

    engageDigitalClient.makeCall(callToNum, {
      mediaConstraints: {
        audio: true,
        video: isVideoCall
      },
      rtcOfferConstraints: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: isVideoCall ? 1 : 0
      },
    
    });

  } catch (error) {
    updateStatus('Call: Provide valid phone number');
    engageLog('Error in make call : ' + error.errorMessage);
    handleCallStateChange(callInitialState);
  }
}

function onNewEngageSession(session) {

  engageLog('Got newRTCSession event direction is %s', session.getDirection());

  engageDigitalSession = session;

  /**
   * Can play some media file indicates call is ringing state
   */
  engageDigitalSession.addEventHandler('ringing', () => {
    updateStatus('Call: Ringing');
    document.getElementById(engageClickToCallConfig.ringingImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.ringingImage).style.display ="block"
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.connectedImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.connectedImage).style.display ="none"
  });

  /**
    * Call is connected, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('connected', () => {
    document.getElementById(engageClickToCallConfig.ringingImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.ringingImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.connectedImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.connectedImage).style.display ="block"
    updateStatus('Call: Connected');
    handleCallStateChange(callConnectedState);
  });

  /**
    * Call is disconnected by the client, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('disconnected', () => {
    updateStatus('Call: DisConnected');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    document.getElementById(engageClickToCallConfig.connectedImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.connectedImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.ringingImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.ringingImage).style.display ="none"
    toResetAudioControls()
    handleCallStateChange(callDisconnectedState);
    clearVideoElements();
  });

  /**
    * Call is disconnected by the remote user, can use this event to update the status of call in UI
    */
  engageDigitalSession.addEventHandler('peerdisconnected', () => {
    updateStatus('Call: Remote party disconnected');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    document.getElementById(engageClickToCallConfig.connectedImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.connectedImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.ringingImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.ringingImage).style.display ="none"
    toResetAudioControls()
    handleCallStateChange(callDisconnectedState);
    clearVideoElements();
  });

  /**
   * Call is failed 
   */
  engageDigitalSession.addEventHandler('failed', () => {
    updateStatus('Call: Failed');
    document.getElementById(engageClickToCallConfig.showImage).style.visibility ="visible"
    document.getElementById(engageClickToCallConfig.showImage).style.display ="block"
    document.getElementById(engageClickToCallConfig.connectedImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.connectedImage).style.display ="none"
    document.getElementById(engageClickToCallConfig.ringingImage).style.visibility ="hidden"
    document.getElementById(engageClickToCallConfig.ringingImage).style.display ="none"
    toResetAudioControls()
    clearVideoElements();
    handleCallStateChange(callDisconnectedState);
  });


  /**
    * On this event attach remote party's stream to the remote video element
    */
  engageDigitalSession.addEventHandler('remotestream', ({ stream }) => {
    handleRemoteStream(stream);
  });

  /**
   * Its an Incoming call, need to invoke acceptCall API on EngageDigitalSession.
   */
  if (engageDigitalSession.getDirection() === 'incoming') {
    handleIncomingCall();
  }

}

function handleRemoteStream(remoteStream) {

  const audioTracks = remoteStream.getAudioTracks();

  /**
   * Once the remote starts streaming audio, onloadedmetadata event
   * handler will be invoked and remote audio will also be available.
   */
  //Disabling the video tracks by default.
  // if (audioTracks.length > 0) {
  //   for (let i = 0; i < audioTracks.length; ++i) {
  //     audioTracks[i].enabled = false;
  //   }
  // }

  //Once audio is available, audio track will be enabled.
  engageRemoteAudio.onloadedmetadata = function () {
    for (let i = 0; i < audioTracks.length; ++i) {
      audioTracks[i].enabled = true;
    }
  };

  engageRemoteAudio.srcObject = null;
  engageRemoteAudio.srcObject = remoteStream;
}

function handleIncomingCall() {

  updateStatus('Incoming call....')
  engageDigitalSession.acceptCall({

    mediaConstraints: {
      audio: true,
      video: engageDigitalSession.isIncomingCallWithVideo(),
    },
  });
}

function disconnectCall() {
  if (engageDigitalSession) {
    engageDigitalSession.disconnectCall();
  }
}

function handleCallStateChange(toCallState) {
  engageLog('Current state ' + engageCallState.name);
  toCallState.execute();
  engageCallState = toCallState.nextState;
  engageLog('Next state ' + engageCallState.name);
}

function clearVideoElements() {
  engageRemoteAudiosrcObject = null;
}

function updateStatus(status) {
  if (engageStatusDiv) {
    engageStatusDiv.innerText = status;
  }
  engageLog(status);
}

function loadEngageDigitalSDK(engageDomain) {

  updateStatus('Loading Engage Digital sdk...')

  const sdkScriptElement = document.createElement('script');

  sdkScriptElement.type = 'text/javascript';
  sdkScriptElement.async = false;
  sdkScriptElement.src = `https://${engageDomain}/engageDigital.js`

  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(sdkScriptElement, firstScriptTag);

  sdkScriptElement.addEventListener('load', () => {
    isEngageDigitalSdkLoaded = true;
    updateStatus('Engage Digital sdk is loaded');
    connectToEngageDigital();
  });

  sdkScriptElement.addEventListener('error', () => {
    updateStatus(`Failed to load ${sdkScriptElement.src}. Is the given domain proper?`);
  });

}

window.addEventListener('unload', function (e) {
  engageDigitalClient.disconnect();
  e.preventDefault();
});

function engageLog(logStmt) {
  if (engageClickToCallConfig.consoleLog) {
    console.log(logStmt);
  }
}