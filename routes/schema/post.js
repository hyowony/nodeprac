const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  user: {
    type : String,
    required : true,
  },
  title : {
    type : String,
    required : true,
  },
  content : {
    type: String,
    required : true,
  },
  password : {
    type: String,
    required : true,

  },
  createAT : {
   type: Date,
   default : Date.now,
  },
  


});

module.exports = mongoose.model("post", postSchema)

