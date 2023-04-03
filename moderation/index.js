const express= require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json());
const {randomBytes} =require('crypto');
const cors = require('cors');
const axios=require('axios')
app.use(cors());

app.post('/events',async (req,res)=>{
    console.log('receiveed events',(req.body.type));

    const {type,data}=req.body;
    if(type=== 'CommentCreated'){
        const status=data.content.includes('orange')?'rejected':'approved';
        console.log(status);
        await axios.post('http://event-us-srv:4005/events',{
        type:'CommentModerated',   
        data:{ 
                id:data.id,
                postId:data.postId,
                status,
                content:data.content,
            }
        }).catch((err) => {
            console.log(err.message);
          });
    }
    res.send({});
});
app.listen(4003,()=>{
    console.log('listing on port 4003');
})







