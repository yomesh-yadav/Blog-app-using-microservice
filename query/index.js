const express= require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json());
const {randomBytes} =require('crypto');
const cors = require('cors');
const axios=require('axios')
app.use(cors());

const posts={};

app.get('/posts',(req,res)=>{

    res.send(posts);
    
})

function handleEvents(type,data){

    if( type === "PostCreated"){
        const {id,title}=data;
        console.log(id,title);
        posts[id]={id,title,comments:[]};
    }
    if(type== "CommentCreated"){
        const {id,content,postId,status}=data;
        const post= posts[postId];
        post.comments.push({id,content,status});
    }
    if(type ==="CommentUpdated"){
        const {id,content,postId,status}=data;
        const post = posts[postId];
        const comment= post.comments.find(comment=>{
            return comment.id===id;
        });
        comment.status=status; 
        comment.content=content;
    }
}

app.post('/events',(req,res)=>{
    console.log('receiveed events',(req.body.type));

    const {type,data}=req.body;
    handleEvents(type,data);

    res.status(201).send(posts);
})

app.listen(4002,async()=>{
    console.log("Listening on 4002");
    try {
      const res = await axios.get("http://event-us-srv:4005/events");
   
      for (let event of res.data) {
        console.log("Processing event:", event.type);
   
        handleEvents(event.type, event.data);
      }
    } catch (error) {
      console.log(error.message);
    }
})

