const { fork } = require('child_process');


const worker1Process = fork('./src/botListener/botListener.js');

const worker2Process = fork('./src/botResponse/botResponse.js');


worker1Process.on('message', (message) => {
  console.log('Message from botListnerWorker:', message);
});

worker2Process.on('message', (message) => {
  console.log('Message from BotResponseWorker:', message);
});

worker1Process.send({ command: 'start' });
worker2Process.send({ command: 'start' });
