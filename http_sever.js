const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");


// 5 http method- GET POST PUT PATCH DELETE 

const app = express();
// obj.method(path,(req,res)=>{})

app.get('/',(req,res)=>{
    res.send(`HomePage`);
})

app.get('/about',(req,res)=>{
    res.send(`Hello! ${req.query.username}`);
})

function myHandler(req,res){
    if(req.url==='/favicon.ico') return res.end();
    console.log(req);
    let log = `${Date.now()} : ${req.method}: Request Received from - ${req.url} \n`;
    const myurl = url.parse(req.url,true);  // parse create object of query parameter if true
    fs.appendFile('log.txt',log,(err,data)=>{
        if(err){
            console.log("Error!");
        }
        else{
            console.log(myurl);
            switch(myurl.pathname){
                case '/':
                    res.end("Home Page");
                    break;
                case '/about':
                    const username = myurl.query.username
                    res.end(`Hi, ${username}`);
                    break;
                case '/signup':
                    if(req.method==='GET'){
                        res.end(`This is thi SignUp form`);
                    }
                    else if (req.method==='POST'){
                        // DataBase Query

                        res.end("Successfully Registered!");
                    }
                    break;
                default:
                    res.end("Page No Found!");
                    break;
            }
        }
    })
}

// const myServer = http.createServer(app);
// const myServer = http.createServer(myHandler);

// myServer.listen(8000,()=>console.log("Server Started!"));

app.listen(8000,()=>console.log(`Server Started!`));
