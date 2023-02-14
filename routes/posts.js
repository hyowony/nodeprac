// const { Router } = require("express");
const express = require("express")
const router = express.Router();
const Post = require("./schema/post")

router.get("/", async (req,res) => {
  try {
    const posts = await Post.find().select(("-password"));
    //post에서 찾을 때 패스워드만 빼서 출력해주고 싶다면 select해서 -password 객체를 지워주면 되는것인가? 
    res.json({data: posts})
       
    } catch(err) {
      res.status(500).json({message: err.message})
    } 
});
router.post("/", async (req,res)=> {
  const {user, title,content,password} = req.body
  
  try {
    const post = await Post.create({
      user,
      title,
      content,
      password,

    });
    res.json({data:post})
    
  } catch (err) {
    res.status(500).json({message:err.message});
  }

});
//상세 조회
router.get("/:id", async (req,res)=> {
  const {id}= req.params;

  try {
   const post =  await Post.findById(id).select(["-password"])
   res.json({data:post});
  } catch (err) {
    res.status(500).json({message: err.message})
  }
  
})

module.exports  = router;

