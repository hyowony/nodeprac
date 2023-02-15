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
router.patch("/:id", async (req,res)=> {
  const {id} = req.params;

  if (!req.body || !id) {
    return res.json({messsage: "데이터 형식이 올바르지 않습니다."})
  }
  const {user,title, content,password} = req.body;
  const post = await Post.findById(id);

  if(!post) {
    return res.json({message:"게시글 조회에 실패했습니다."})
  }
  const ispasswordCorrect = post.password === password

  if (ispasswordCorrect) {
    if(user) {
      post.user = user;
    }
  
  if (user) {
    post.user = user;
  }
  if (title) {
    post.title = title
  }
  if(content) {
    post.content = content;
  }
  try {
    const updatePost = await post.save();
    res.json({date:updatePost});
  } catch(err) {
    res.status(500).json({message:err.message});
  }
  }else {
    res.status(401).json({message : "비밀번호가 틀렸습니다"})
  }

});

//게시글 삭제
router.delete("/:id",async (req,res)=> {
  const {id} = req.params;
  const {password} = req.body;

  const post = await Post.findById(id);

  if(!post) {
    return res.json({message: "게시글 조회에 실패했습니다"})
  
  } const ispasswordCorrect = post.password === password

  if(ispasswordCorrect) {
    try {
      await post.remove();
      res.json({message: "게시글을 삭제했습니다."})
  
    }catch(err) {
      res.status(500).json({message:err.message})
  
  
    }
  }else {
    res.status(401).json({message : "비밀번호가 틀렸습니다"})


  }  
 
})

module.exports  = router;

