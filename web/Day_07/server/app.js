const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('port', 3000);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HTML 파일을 제공하는 폴더 설정
app.use(express.static(path.join(__dirname, '../html')));

// 기본 경로로 접속 시 HTML 파일 제공
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../html', 'ajax.html'));
});

let todoList = [
    
];
const loadTodoList = () => {
    fs.readFile(path.join(__dirname, 'todoList.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading todoList.json:', err);
            return;
        }
        todoList = JSON.parse(data);
    });
};
var noSeq = 106;

app.get('/todo/search', (req, res) => {
    var keyword = req.query.keyword;
    var newTodoList = todoList.filter((todo) => {
        return todo.title.includes(keyword);
    });
    res.send(newTodoList);
});

app.get('/todo', (req, res) => {
    if (req.query.no) {
        var no = req.query.no;
        var todo = todoList.find((t) => t.no == no);
        res.send(todo || null);
    } else {
        res.send(todoList);
    }
});

app.post('/todo', (req, res) => {
    var title = req.body.title;
    todoList.push({ no: noSeq++, title, done: false });
    res.send(todoList);
});

app.put('/todo', (req, res) => {
    var todo = req.body;
    var idx = todoList.findIndex((t) => t.no == todo.no);
    if (idx != -1) {
        todoList[idx] = todo;
    }
    res.send(todoList);
});

app.delete('/todo', (req, res) => {
    var no = parseInt(req.body.no);
    var idx = todoList.findIndex((t) => t.no == no);
    if (idx != -1) {
        todoList.splice(idx, 1);
    }
    res.send(todoList);
});

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log(`노드js 서버 실행 중 >>> http://localhost:${app.get('port')}`);
});
