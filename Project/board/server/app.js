const http = require('http');
const express = require('express');
const app = express()

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let no = 102;
const MemList = [
    {no:101, boardText:"ㅎㅎ", name:"하하"},
    {no:102, boardText:"하이", name:"선일"},
    {no:103, boardText:"사사", name:"준하"}
];
let pNum = 3;
const PostList = [
    {pNum:1, PostText:"좋아요", name:"하하"},
    {pNum:2, PostText:"하이", name:"선일"}
];
app.get('/api/memList', function(req, res) {
    res.json(MemList);

});
app.get('/api/postList', function(req, res) {
    res.json(PostList);
});

app.post('/api/postList', function(req,res){
    const {PostText, name} = req.body;
    PostList.push({
        pNum:pNum++,
        PostText,
        name,
    });
    return res.send('postList success');
});
app.post('/api/memList', function(req,res){
    const {boardText, name} = req.body;
    MemList.push({
        no:no++,
        boardText,
        name,
    });
    return res.send('memList success');
});

const server = http.createServer(app);
server.listen(port, function() {
    console.log("서버 실행 중 >>> http://localhost:"+port);
});
