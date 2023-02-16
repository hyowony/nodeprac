const express = require("express")
const mongoose = require("mongoose")
const port = 3000

const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments") 

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/spart_post")
const db = mongoose.connection

db.on("error", (err)=> console.log(err));
db.once("open", ()=> console.log("디비 연결 "))

app.use(express.json());
app.use('/posts', postRouter); 
app.use("/comments", commentRouter)
app.listen(port, ()=> {
  console.log(port , "서버가 열렸습니다.")
})