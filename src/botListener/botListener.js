const { Worker } = require("bullmq")
const { Queue } = require("bullmq")
const { v4: uuidv4 } = require('uuid');

const redisConnectionOptions = {
    host: "127.0.0.1",
    port: 6379,
  };

  
const botListenerQueue = new Queue("bot_Response_Queue", {
    connection: redisConnectionOptions
})

async function processBotListenerQueue(data) {
    const uuid = uuidv4()
    const response = await botListenerQueue.add(`bot-Response-${uuid}`, data)
    console.log(response, "hey a new responsce send to bot_Response_Queue")

}


new Worker("bot_Listener_Queue", (job) => {
    console.log("hey i got a new data in bot_Listener_Queue", job.data)
    processBotListenerQueue(job.data)
},{
    limiter: { max: 10, duration: 1000 },
    connection: redisConnectionOptions,     
})


