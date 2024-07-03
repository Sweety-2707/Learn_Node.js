const fs = require("fs");

// Sync write method
// fs.writeFileSync("./file1.txt","Hello World!\n");

// Async write method
// fs.writeFile("./file1.txt","Hello World Async\n",(err)=>{});

// Sync read method
console.log(fs.readFileSync("./file1.txt","utf-8"));

// Async read method
fs.readFile("./file1.txt","utf-8",(err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(res);
    }
})

// append to file
// fs.appendFileSync("./file1.txt","Hello World!\n");


// copt file to other
// fs.cpSync("./file1.txt","./file2.txt");

// delete file
// fs.unlinkSync("./file2.txt")

// display stat of file
console.log(fs.statSync("./file1.txt"));

// create directory
// fs.mkdirSync("./folder1")
// fs.mkdirSync("./folder1/a/",{recursive:true})

console.log(fs.statSync("./folder1/a").isDirectory());