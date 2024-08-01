const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')

app.set('views', path.join(__dirname,'/views','index.html'));
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
    //res.end(JSON.stringify(obj));

    // send는 수식이나 문자열을 화면에 보여준다
    //res.send(obj);
    const filePath = path.join(__dirname,'views', 'index.html');
    res.sendFile(filePath);
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
var noSeq = 106;
// AJAX를 REST 방식으로 처리(HTML 폼은 GET와 POST만 가능)
// GET - 출력, 검색
// Post - 입력
// PUT - 수정
// DELETE - 삭제
// FETCH - 부분수정
// ...그 외

// 검색
app.get('/todo/search',function(req,res){
    var keyword = req.query.keyword;
    var newTodoList = todoList.filter(function(todo){
        return todo.title.findIndex(keyword) != -1;
    });


    res.send(newTodoList);
    
});

// 상세보기
app.get('/todo',function(req,res){
    if(req.query.no){
        var no = req.query.no;
        var idx = todoList.filter(function(todo){
            return todo.no == no;
        });
        if(idx != -1){
            res.send(todoList[idx]);
        }else{
            res.send(null);
        }
        return;
    }
    
    res.send(todoList);
});

// 입력
app.post('/todo/input',function(req,res){
    var title = req.body.title;
    todoList.push({no:noSeq++,title,done:false});
    res.send(todoList);
});

// 수정
app.put('/todo/edit',function(req,res){
    //var no = req.body.no;
    //var title = req.body.title;
    //var done = req.body.done; // 문자열로 받아옴 boolean으로 변경해야함
    var todo = req.body;
    console.dir(todo);
    var idx = todoList.findIndex(function(t){
        return t.no == todo.no;
    });
    if(idx != -1){
        todoList[idx] = todo;
    }

    res.send(todoList);
});

// 삭제
app.delete('/todo/delete',function(req,res){
    var no = parseInt(req.body.no);
    var idx = todoList.findIndex(function(t){
        return t.no == no;
    });
    if(idx != -1){
        todoList.splice(idx,1);
    }
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log(`Nodejs Server >>> http://localhost:${app.get('port')}`);
});