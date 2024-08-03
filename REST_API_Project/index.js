const express = require("express");
const users = require("./MOCK_DATA.json");
const port = 8000;
const fs = require("fs");

const app = express();

//Middleware - Plugin
//Built-in Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    console.log("Middleware 1");
    next();
});

app.use((req,res,next)=>{
    console.log("Middleware 2");
    fs.appendFile("./log.txt",`${Date.now()}:${req.path}:${req.method}\n`,(err,data)=>{
        next();
    });
});

// JSON rendering
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ol>
        ${users.map(
          (user) => `
            <ul>
                <li>Id: ${user.id}</li>
                <li>First Name: ${user.first_name}</li>
                <li>Last Name: ${user.last_name}</li>
                <li>Email: ${user.email}</li>
                <li>Gender: ${user.gender}</li>
            </ul>
            `
        )}
    </ol>
    `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    // GET user with dynamic ID
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    res.json(user);
  })
  .patch((req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);
    if (user) {
      if (user.gender == "Male") {
        user.gender = "Female";
      } else {
        user.gender = "Male";
      }
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Gender Changed!", User: user });
      });
    } else {
      return res.json({ status: "User not Found!" });
    }
  })
  .delete((req, res) => {
    const id = req.params.id;
    if (users.find((user) => user.id == id)) {
      // const user = users.filter((user)=>user.id!==id);
      users.splice(
        users.findIndex((user) => user.id == id),
        1
      );
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: `Deleted Id : ${id}` });
      });
    } else {
      return res.json({ status: "User not Found!" });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Succrssful!", id: users.length });
  });
});

app.listen(port, () => {
  console.log(`Server Started!`);
});
