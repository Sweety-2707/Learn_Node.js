const User = require("../models/Users.js")

async function handleGetAllUsers(req,res){
    const users = await User.find({});
    return res.json(users);
}

async function handleGetAllUsers2(req,res) {
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
}

async function handleGetUserById(req,res){
    // GET user with dynamic ID
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not Found!" });
    }
    console.log(req.headers); // Get Request Headers
    res.setHeader("X-Username", "Sweety"); // Add Custom response header (X-)
    res.json(user);
}

async function handleUpdateUserById(req,res){
    const id = req.params.id;
    // const user = users.find((user) => user.id == id);
    const user = await User.findById(id);
    if (user) {
      if (user.gender == "Male") {
        await user.updateOne({ gender: "Female" });
      } else {
        await user.updateOne({ gender: "Male" });
      }
      // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      //   return res.json({ status: "Gender Changed!", User: user });
      // });
      return res.status(200).json({ status: "Success!" });
    } else {
      return res.status(404).json({ status: "User not Found!" });
    }
}

async function handleDeleteUserById(req,res){
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
    if (User.findById(id)) {
      await User.deleteOne({ _id: id });
      return res.json({ status: `Deleted Id : ${id}` });
    } else {
      return res.status(404).json({ status: "User not Found!" });
    }
}

async function handleCreateUser(req,res) {
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
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
    });
  
    console.log(result);
  
    return res.status(201).json({ msg: "Success" });
}

module.exports ={
    handleGetAllUsers,
    handleGetAllUsers2,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser,
}