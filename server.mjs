import express from "express";
import cors from "cors"
const app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
let users = [];

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.post('/user', (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.address) {
        res.status(400).send("invalid data");
    } else {
        users.push({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })

        res.send("users created");
    }
})

app.put('/user/:id', (req, res) => {

    if (users[req.params.id]) {

        if (req.body.name) {
            users[req.params.id].name = req.body.name
        }
        if (req.body.email) {
            users[req.params.id].email = req.body.email
        }
        if (req.body.address) {
            users[req.params.id].address = req.body.address
        }

        res.send(users[req.params.id])

    } else {
        res.send("user not found");
    }





})

app.delete('/user/:id', (req, res) => {

    if (users[req.params.id]) {

        users[req.params.id] ={} ;
        res.send("user deleted");

    } else {
        res.send("user not found");
    }
})

app.get("/users", (req, res) => {
    res.send(users)
});

app.listen(port, () => {
    console.log(`server is running at https://localhost:${port}`);
})