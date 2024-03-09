require('dotenv').config();
const {Worker}=require("bullmq")
const {Queue} =require("bullmq")
const redisConnectionOptions = {
    host: process.env.HOST,
    port: process.env.PORT,
};

const botListenerQueue=new Queue("bot_Listener_Queue",{connection:redisConnectionOptions})
const worker=new Worker("whatsapp_Queue",async (job)=>{
    console.log("receive Data from Whatsapp_Queue",job.data)
    init(job.data)
},{
    connection: redisConnectionOptions,
})


async function init(data){
  const result =await botListenerQueue.add("bot-Listener-Queue",data)
  console.log("job added successfullt in bot-Listener-Queue ",result.id)
}
