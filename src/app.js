const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;
const { initiateCallWithWebSocket } = require('./initiatecall');



// WebSocket route for communication
// Handle Web Socket Connection
wss.on("connection", function connection(ws) {
    console.log("New Connection Initiated");
    
       ws.on("message", function incoming(message) {
        const msg = JSON.parse(message);
        switch (msg.event) {
          case "connected":
            console.log(`A new call has connected.`);
            break;
          case "start":
            console.log(`Starting Media Stream ${msg.streamSid}`);
            break;
          case "media":
            console.log(`Receiving Audio...`)
            break;
          case "stop":
            console.log(`Call Has Ended`);
            break;
        }
      });
    
    });
    

// Route for initiating outbound call
app.get('/', (req, res) => {
  const phoneNumber = '+917970691240'; // Extract the phone number to call
  initiateCallWithWebSocket(phoneNumber, wss);
  res.send('Calling...');
});

app.post('/audiostream',(req,res)=>{
 console.log('got a post req for audio stram');
})

// Listening on the port
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
