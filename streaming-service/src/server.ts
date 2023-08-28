import net from 'net';
import { WebSocket, WebSocketServer } from 'ws';
const fs = require('fs');
const TCP_PORT = parseInt(process.env.TCP_PORT || '12000', 10);

const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: 8080 });

interface temperature_list {
    temperatures: number[];
}

let last_check:number = Date.now();
let last_temperatures: number[] = [];
fs.writeFile('incidents.log', "Timestamps of temperature out of range for current session\n", (err:Error) => {
    if (err) throw err;
  }); 

tcpServer.on('connection', (socket) => {
    console.log('TCP client connected');


    socket.on('data', (msg) => {
        console.log(msg.toString());

        // HINT: what happens if the JSON in the received message is formatted incorrectly?
        // HINT: see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

        try{
            let currJSON = JSON.parse(msg.toString());
            last_temperatures.push(currJSON.battery_temperature);
            let currTime = Date.now();
            if (currTime - last_check >= 5000) {
                if (last_temperatures.filter(temp => {return (temp > 80 || temp < 20);}).length >= 3) {
                    fs.writeFile('incidents.log', currTime.toString() + '\n', { flag: "a+" }, (err:Error) => {
                        if (err) throw err;
                      }); 
                }
                last_temperatures = [];
                last_check = currTime;
            }



            websocketServer.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(msg.toString());
                }
              });

        } catch {
            console.log("Incorrectly formatted json");
        }

    });

    socket.on('end', () => {
        console.log('Closing connection with the TCP client');
    });
    
    socket.on('error', (err) => {
        console.log('TCP client error: ', err);
    });
});

websocketServer.on('listening', () => console.log('Websocket server started'));

websocketServer.on('connection', async (ws: WebSocket) => {
    console.log('Frontend websocket client connected to websocket server');
    ws.on('error', console.error);  
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP server listening on port ${TCP_PORT}`);
});


