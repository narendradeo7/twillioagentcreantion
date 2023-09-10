// funtion to intiate a call 
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE;

const client = twilio(twilioAccountSid, twilioAuthToken);

const WebSocket = require('ws');

// intialising call 

function initiateCallWithWebSocket(phoneNumber, ws) {
  console.log('Initiating a call');
  client.calls
    .create({
      twiml: `<Response>
      <Say>Hey, this is Narendra from placeminds how are you doing ? </Say>
      <Start>
      <Stream name="userResponse" url="wss://5712-2405-201-4002-a879-2453-2e5d-7a33-d441.ngrok-free.app/audiostream"/>
    </Start>
       <Pause length="2" />   
      <Stop>
   <Stream name="userResponse" />
</Stop>
      <Say> Whats your name ?</Say>
      <Start>
      <Stream name="userResponse" url="wss://5712-2405-201-4002-a879-2453-2e5d-7a33-d441.ngrok-free.app/audiostream"/>
    </Start>
    <Pause length="2" />   
    <Stop>
 <Stream name="userResponse" />
</Stop>
      </Response>`,
      to: phoneNumber,
      from: twilioPhoneNumber
    })
    .catch((error) => {
      console.error('Error initiating call:', error);
    });
}

module.exports = { initiateCallWithWebSocket };
