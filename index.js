const { spawn } = require('child_process');


const worker1Process = spawn('node', ['./src/botListener/botListener.js']);
const worker2Process = spawn('node', ['./src/incomingWhatsapp/incomingWhatsapp.js']);


worker1Process.on('exit', (code) => {
  console.log(`worker1Process exited with code ${code}`);
});

worker2Process.on('exit', (code) => {
  console.log(`worker2Process exited with code ${code}`);
});

