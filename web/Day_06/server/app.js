const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname +'/views'));
app.set('view engine','ejs');
app.set('port',3000);

// bodyParser 미드웨어 지정 - POST방식의 파라마터 사용 가능
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", function(req,res){
    // 지정된 URL로 자동으로 페이지 이동
    //res.redirect('http://naver.com');

    // end() 문자열을 화면에 출력
    //res.writeHead(200, {"Content-Type":"text/html; charset=UTF-8"});
    //res.end("하핳하");
    //res.end('{"hello":"world"}');
    var obj = {no:120,name:"MUN"};
    //res.end(JSON.stringify(obj));

    // send는 수식이나 문자열을 화면에 보여준다
    // writeHead는 생략
    //res.send(obj);
});

app.get('/data', function(req,res){
    const user = req.query.user;
    const message = req.query.message;

    const jsonData = {user,message};
    res.send(jsonData);
});

// 임시로 todoList 데이터 저장
const todoList = [
    {no: 101,title:'밥 먹기',done:false},
    {no: 102,title:'청소하기',done:true},
    {no: 103,title:'과제하기',done:true},
    {no: 104,title:'운동하기',done:false},
    {no: 105,title:'꿀잠자기',done:false}
];
// AJAX를 REST 방식으로 처리(HTML 폼은 GET와 POST만 가능)
// GET - 출력, 검색
// Post - 입력
// PUT - 수정
// DELETE - 삭제
// FETCH - 부분수정
// ...그 외


app.get('/todo',function(req,res){
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`Nodejs Server >>> http://localhost:${app.get('port')}`);
});