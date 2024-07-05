const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    console.log(req);
    let log = `${Date.now()} : Request Received from - ${req.url} \n`;
    fs.appendFile('log.txt',log,(err,data)=>{
        if(err){
            console.log("Error!");
        }
        else{
            switch(req.url){
                case '/':
                    res.end("Home Page");
                    break;
                case '/about':
                    res.end("Hi I am Sweety Sharma");
                    break;
                default:
                    res.end("Page No Found!");
                    break;
            }
        }
    })
});

myServer.listen(8000,()=>console.log("Server Started!"));