const express = require("express");
const router = express.Router();
const Comment = require("./schema/comment")
const {ObjectId} = require("mongoose").Types

router.get("/", async (_, res) => {

  // (_,) req,res req를 안 쓸때 이렇게 처리한다. 
  try{
    const comments = await Comment.find().select(["-password"])
    res.json({ data : comments})
  } catch (err) {
    res.status(500).json({message:err.message});
  }
});
  router.post("/:postId", async (req,res) => {
    const {postId} = req.params;

    if (!req.body) {
      return res.json({message: "데이터 형식이 올바르지 않습니다."})
    }
    const {user, content, password} = req.body;
    try { 
      const comment = await Comment.create({
        user,content, password,postId
      
      });
      res.json({data: comment});
    } catch(err) {
      res.status(500).json({message:err.message});
    }
  });
  //댓글 상세조회 

  router.get('/:postId', async (req,res)=> {
    const { postId } = req.params;
    try {
      const comments = await Comment.find({postId: ObjectId(postId)})
      res.json({data:comments})
    } catch(err) {
      res.status(500).json({message:err.message})

    }
  });
//댓글 수정
  router.patch("/:id", async (req,res)=> {
    const {id} = req.params;
    const { content,user,password} = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.json({message:"댓글 조회에 실패했습니다."})
    }
    const ispasswordCorrect = comment.password === password;

    if(ispasswordCorrect) {
      if(content) { comment.content = content;

      }
      if(user) {
        comment.user = user;
      }
      try {
        const updateComment = await comment.save();
        res.json({data:updateComment});
      }catch(err) {
        res.status(500).json({message:err.message});
      }
      }else { 
        res.json({message: "비밀번호가 틀렸습니다."})
    }
  });
  router.delete("/:id", async (req,res)=> {
    const {id} = req.params;
    const {password} = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.json({message: "댓글 조회 실패"})
    }
    const ispasswordCorrect = comment.password === password;
    if (ispasswordCorrect) {
      try {
        await comment.remove();
        res.json({message:"댓글을 삭제했습니다."})
      
      }catch (err) {
        res.json({message:err.message})
      }
    }else {
      res.json({ message:"비밀번호가 틀렸습니다."})
    }
    
  })
  

module.exports = router;