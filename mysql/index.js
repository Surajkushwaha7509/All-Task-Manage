const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Suraj12@",
    database:"shopping"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * from items";
    db.query(sqlGet, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})  //  http://localhost:5000/api/get

app.post("/api/post", (req, res) => {
    // const { itemname, itemprice , itemdetails }= req.body;
    let n = req.body.name;
    let p = req.body.price;
    let d = req.body.detail;
    const sqlInsert = "INSERT INTO items ( itemname , itemprice, itemdetails ) VALUES ('"+n+"', '"+p+"','"+d+"')";

    db.query(sqlInsert, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})  //  http://localhost:5000/api/post

app.delete("/api/remove/:id", (req, res) => {
    const i = req.params.id;
    const sqlRemove = "DELETE FROM items WHERE id =('"+i+"') ";
    db.query(sqlRemove, (error , result )=>{
        if(error){
            console.log(error);  
        }
        res.send(result);  
    })
})  //  http://localhost:5000/api/remove

app.get("/api/edit/:id", (req, res) => {
    const i = req.params.id;
    const sqlGet = "SELECT * from items WHERE id ='"+i+"'";
    db.query(sqlGet, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})  //  http://localhost:5000/api/edit

app.put("/api/put", async(req, res) => {
    let n = req.body.name;
    let p = req.body.price;
    let d = req.body.detail;
    const i = req.body.id;
    const sqlUpdate = "UPDATE items SET itemname=('"+n+"') , itemprice=('"+p+"') , itemdetails=('"+d+"') WHERE id ='"+i+"'  ";
    db.query (sqlUpdate, (error , result )=>{
        if(error){
            console.log(error);
        }
        res.send(result );
    })
})  //  http://localhost:5000/api/put

app.get("/", (req, res)=>{
    // const sqlInsert = "INSERT INTO items ( itemname , itemprice, itemdetails ) VALUES ('Apple13' , '801' , '1good apple')";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log("error = ", error );
    //     console.log("result",result);
    //     res.send("Hello Express suraj Kushwaha 22222"+db);
    // })
})

app.post("/admin/post", (req, res) => {
    let u = req.body.username;
    let e = req.body.emailid;
    let p = req.body.password;
    let cp = req.body.cpassword;
    const sqlInsert =  
    // "INSERT INTO myadmin ( username , email , password, cpassword ) VALUES ('Suraj11', 'suraj11@gmail.com','Suraj11@', 'Suraj11@')"
     "INSERT INTO myadmin ( username , email , password, cpassword ) VALUES ('"+u+"', '"+e+"','"+p+"', '"+cp+"')";

    db.query(sqlInsert, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})  //  http://localhost:5000/admin/post

app.get("/admin/get/:id", (req, res) => {
    const i = req.params.id;
    const sqlGet = "SELECT * from myadmin WHERE id ='"+i+"'";
    db.query(sqlGet, (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})  //  http://localhost:5000/admin/edit
 
app.listen(5000,()=>{
    console.log("server is running on the port 5000");
})


// http://localhost:5000
// null
// result ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: '',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 0
// }
