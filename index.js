import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const API_URL = "https://api.chucknorris.io/jokes";

app.get("/", (req,res)=>{
    res.render("index.ejs", {content:"Click Random button for a chuck meme"});
});

app.get("/meme", async(req,res)=>{
    try{
        const result = await axios.get(API_URL+"/random");
        console.log(result.data.value);
        res.render("index.ejs",{
            content:result.data.value,
        });
    }
    catch(error){
        res.status(404).send(error.message);
    }
});


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});