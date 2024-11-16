const { default: mongoose } = require("mongoose");
var jwt = require('jsonwebtoken')

const Users = mongoose.model('Users', { 
    mobile:String,
    email:String,
    username: String, 
    password: String,
    likedProducts:[{type:mongoose.Schema.Types.ObjectId,ref:'Products'}]
  });

module.exports.likeProducts=(req,res)=>{
    let productId=req.body.productId;
    let userId=req.body.userId;
  
    Users.updateOne({_id:userId},{$addToSet:{likedProducts:productId}})
    .then(()=>{
      res.send({message:'Added to liked products'})
    })
    .catch(()=>{
      res.send({message:'Error while liking product'})
    })
} 

module.exports.removelikeProducts=(req,res)=>{
  let productId=req.body.productId;
  let userId=req.body.userId;

  Users.updateOne({_id:userId},{ $pull :{likedProducts:productId}})
  .then(()=>{
    res.send({message:'Removed from liked products'})
  })
  .catch(()=>{
    res.send({message:'Error while removing from liked product'})
  })
} 

module.exports.getUserById=(req,res)=>{
  
    const _userId=req.params.uId
  
    Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({ message: "Success",user:{email:result.email,mobile:result.mobile,username:result.username} })
    })
    .catch(() => {
      res.send({ message: "There was a error" })
    })
  }

module.exports.getProfileDetails=(req, res) => {
    let id=req.params.userId;
    Users.findOne({_id:id})
    .then((result)=>{
      res.send({ message: "User details found successfully",user:result });
    })
    .catch((err)=>{
      res.send({ message: "Error fetching user details" })
    })
    return;
  }

module.exports.signup=(req, res) => {
  
    const mobile=req.body.mobile;
    const email=req.body.email;
    const username = req.body.username;
    const password = req.body.password;
  
    const user = new Users({ mobile:mobile, email:email, username:username, password:password });
  
    user.save()
      .then(() => {
        res.send({ message: "Useer details saved successfully" })
      })
      .catch(() => {
        res.send({ message: "There was a error saving the details" })
      })
  }

module.exports.login=(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    Users.findOne({ username: username })
      .then((result) => {
        console.log(result, "user data");
  
        if (!result) {
          return res.send({ message: "User not found" });
        }
  
        if (result.password === password) {
          const token = jwt.sign({
            data: result
          }, 'MYKEY', { expiresIn: 60 * 60 });
  
          return res.send({ message: "Logged in successfully", token: token ,userId:result._id});
        } else {
          return res.send({ message: "Incorrect password" });
        }
      })
      .catch(() => {
        return res.send({ message: "Error logging in" });
      });
  }

module.exports.findLikedProducts=(req, res) => {
    Users.findOne({_id:req.body.userId}).populate('likedProducts')
    .then((result)=>{
      res.send({ message: "Like product details found successfully",products:result.likedProducts });
    })
    .catch((err)=>{
      res.send({ message: "Error fetching details of liked products" })
    })
  }