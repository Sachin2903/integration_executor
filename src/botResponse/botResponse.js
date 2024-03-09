require('dotenv').config();
const {Worker}=require("bullmq")
const {Queue} =require("bullmq")
const redisConnectionOptions = {
    host: process.env.HOST,
    port: process.env.PORT,
};
const botListenerQueue=new Queue("bot_Response_Queue",{connection:redisConnectionOptions})
const worker=new Worker("bot_Listener_Queue",async (job)=>{
    console.log("receive Data from bot_Listener_Queue",job.data)
    init(job.data)
},{
    connection: redisConnectionOptions,
})


async function init(data){
  const result =await botListenerQueue.add("bot_Response_Queue",data)
  console.log("job added successfullt in bot-Response-Queue",result.id)
}
