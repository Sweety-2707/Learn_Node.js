const express = require("express");
// const users = require("./MOCK_DATA.json");
const port = 8000;
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");

//MondoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/Users')
.then(()=> console.log("MongoDb Connected"))
.catch(err=>console.log("Error ",err)
)

//Define Schema

const UserSchema = mongoose.Schema({
  first_name:{
    type: String,
    require:true
  },
  last_name:{
    type: String,
    require:true
  },
  email:{
    type: String,
    require:true,
    unique:true
  },
  gender:{
    type: String
  }
},{timestamps:true});

// create Model(Collection)
const User = mongoose.model('User',UserSchema);

//Middleware - Plugin
//Built-in Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  fs.appendFile(
    "./log.txt",
    `${Date.now()}:${req.path}:${req.method}\n`,
    (err, data) => {
      next();
    }
  );
});

// JSON rendering
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
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
  .get(async (req, res) => {
    // GET user with dynamic ID
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not Found!" });
    }
    console.log(req.headers); // Get Request Headers
    res.setHeader("X-Username", "Sweety"); // Add Custom response header (X-)
    res.json(user);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    // const user = users.find((user) => user.id == id);
    const user = await User.findById(id);
    if (user) {
      if (user.gender == "Male") {
        await user.updateOne({gender:"Female"});
      } else {
        await user.updateOne({gender:"Male"});
      }
      // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      //   return res.json({ status: "Gender Changed!", User: user });
      // });
      return res.status(200).json({status:"Success!"})
    } else {
      return res.status(404).json({ status: "User not Found!" });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    // if (users.find((user) => user.id == id)) {
      // const user = users.filter((user)=>user.id!==id);
      // users.splice(
      //   users.findIndex((user) => user.id == id),
      //   1
      // );
      // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      //   return res.json({ status: `Deleted Id : ${id}` });
      // });
    if(User.findById(id)){
      await User.deleteOne({_id:id});
      return res.json({ status: `Deleted Id : ${id}` });
    } else {
      return res.status(404).json({ status: "User not Found!" });
    }
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email
  ) {
    return res.status(400).json({ alert: "All field are necessary" });
  }
  // console.log(body);
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.json({ status: "Succrssful!", id: users.length });
  // }); 

  const result = await User.create({
    first_name:body.first_name,
    last_name:body.last_name,
    email:body.email,
    gender:body.gender
  });

  console.log(result);
  
  return res.status(201).json({msg:"Success"})
});

app.listen(port, () => {
  console.log(`Server Started!`);
});
