const express = require("express")



let fs = require("fs")


const app = express()

const cors = require("cors")



let multer = require("multer")
const bodyParser = require("body-parser")
multer = multer({  limits: { fieldSize: 25 * 1024 * 1024 }})


app.use(bodyParser.json({limit:"50mb"}))
app.use(cors())

app.get("/",(req,res)=>{
    console.log("Received")
    res.send("Hello")
})



app.post("/new",async (req,res)=>{
    const data = req.body
    console.log("Received Req")
  
   try {
    

    fs.writeFile(__dirname+`/public/uploads/${data["photo_label"]}.jpg`,data["photo"],'base64',(err)=>{
        if(!err){
            console.log("Uploaded Picture")
            res.status(200).send("Saved")
        }
    })
   } catch (error) {
       console.log(error)
       res.status(500).send()
   }
})

app.listen(3000)
