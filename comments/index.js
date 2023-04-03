const express = require('express');
const app = express();
const bodyParser= require('body-parser')
app.use(bodyParser.json());
const {randomBytes} =require('crypto');
const cors = require('cors');
const axios = require('axios');
app.use(cors());
const list_of_comments_of_posts={};

app.post('/posts/:id/comments',async (req,res)=>{
const {content} =req.body;
const comments= list_of_comments_of_posts[req.params.id] || [];
const contentid= randomBytes(4).toString('hex');
comments.push({id:contentid, content,status:'pending'});
list_of_comments_of_posts[req.params.id]=comments;
// console.log(req)
await axios.post('http://event-us-srv:4005/events',{
    type:'CommentCreated',
    data:{
        id:contentid,
        content,
        postId:req.params.id,
        status:'pending'
    }
})

res.status(201).send(comments); 

});

app.get('/posts/:id/comments',(req,res)=>{

res.status(201).send(list_of_comments_of_posts[req.params.id] ||[]);
});

app.post('/events',async (req,res)=>{
    console.log('receiveed events',(req.body.type));
    const {type,data}=req.body;
    if(type==='CommentModerated'){
        const {postId,id,status,content}=data;
        const comments= list_of_comments_of_posts[postId];
        const comment = comments.find(comment=>{
            return comment.id===id;
        });
        console.log(status); 
        comment.status=status;
        console.log(status); 
        await axios.post('http://event-us-srv:4005/events',{
            type:'CommentUpdated',
            data:{
                id,
                postId,
                content,
                status
            }
        })
    }
    
    
    
    res.send({});
})

app.listen(4001,()=>{
    console.log("app is running on port 4001");
});






