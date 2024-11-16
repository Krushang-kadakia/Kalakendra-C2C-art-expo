const { default: mongoose } = require("mongoose");

// let schema = new mongoose.Schema({ 
  
//   userLocation:{
//     type:{
//       type: String,
//       enum:['Point'],
//       default:'Point',
//       required:true
//     },
//     coordinates:{
//       type:[Number],
//       required:true
//     }
//   }
// })

// schema.index({userLocation: '2dsphere'});

const Products = mongoose.model('Products',{
    artname:String, 
    artcategory:String, 
    artimage:String, 
    artimage2:String, 
    artprice:String, 
    artdescription:String,
    addedBy:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
  });

module.exports.search=(req, res) => {
    let search = req.query.search;
  
    if (!search) {
      return res.status(400).send({ message: 'Search query is required' });
    }
  
    console.log(search);
  
    Products.find({
      $or: [
        { artname: { $regex: search, $options: 'i' } },
        { artcategory: { $regex: search, $options: 'i' } },
        { artprice: { $regex: search, $options: 'i' } },
        { artdescription: { $regex: search, $options: 'i' } },
      ]
    })
      .then((results) => {
        res.send({ message: 'Artwork found successfully', products: results });
      })
      .catch((err) => {
        console.error('Server error:', err);
        res.status(500).send({ message: 'Server error' });
      });
  }

module.exports.addProduct=(req, res) => {
  
    // console.log(req.files);;
    // console.log(req.body);
    // return;
  
    const artname = req.body.artname;
    const artcategory = req.body.artcategory;
    const artimage = req.files.artimage[0].path;
    const artimage2 = req.files.artimage2[0].path;
    const artprice = req.body.artprice;
    const artdescription = req.body.artdescription;
    const addedBy = req.body.userId;
    // const Latitude = parseFloat(req.body.userlatitude);
    // const Longitude = parseFloat(req.body.userlongitude);
  
    // Validate coordinates again, ensuring they're properly parsed
    // if (isNaN(Latitude) || isNaN(Longitude)) {
    //   return res.status(400).send({ message: "Invalid latitude or longitude." });
    // }
  
    const product = new Products({
      artname,
      artcategory,
      artimage,
      artimage2,
      artprice,
      artdescription,
      addedBy,
      // userLocation: { type: 'Point', coordinates: [Longitude, Latitude] } // Note: Longitude comes first in GeoJSON
    });
  
    // if (!Array.isArray([Longitude, Latitude])) {
    //   return res.status(400).send({ message: "Coordinates must be an array." });
    // }
  
    product.save()
      .then(() => {
        res.send({ message: "Artwork details saved successfully" });
      })
      .catch((error) => {
        console.error("Error saving product:", error);
        res.status(500).send({ message: "There was an error saving the details", error });
      });
  }

module.exports.getProduct=(req, res) => {
    const catName=req.query.catName;
    console.log(catName);
    
    let _f={}
    if(catName)
    {
      _f={artcategory: catName}
    }
  
    Products.find(_f)
    .then((result)=>{
      console.log(result);
      res.send({ message: "Product details found successfully",products:result})
    })
    .catch((err)=>{
      res.send({ message: "Error fetching products" })
    })
  }

module.exports.getProductsById=(req, res) => {
    console.log(req.params);
    Products.findOne({_id:req.params.pId})
    .then((result)=>{
      res.send({ message: "Art work details found successfully",product:result})
    })
    .catch((err)=>{
      res.send({ message: "Error fetching products" })
    })
  }

module.exports.myProducts=(req, res) => {
  
    const userId=req.body.userId;
    Products.find({addedBy:userId})
    .then((result)=>{
      res.send({ message: "Your art work details found successfully",products:result });
    })
    .catch((err)=>{
      res.send({ message: "Error fetching details of your art work" })
    })
  }

module.exports.deleteProduct=(req, res)=>{
  // console.log(req.body);
  // return;

  Products.findOne({_id:req.body.artId})
  .then((result)=>{
    if(result.addedBy==req.body.userId)
    {
      Products.deleteOne({_id:req.body.artId})
      .then((deleteResult)=>{
        if(deleteResult.acknowledged)
        {
          res.send({message:"Deleted Product successfully"})
        }
      })
      .catch((err)=>{
        res.send({ message: "Server Error" })
      })
    }
  })
  .catch((err)=>{
    res.send({ message: "Server Error" })
  })
}

module.exports.editProduct=(req, res) => {
  
  // console.log(req.files);;
  // console.log(req.body);
  // return;

  const artname = req.body.artname;
  const artcategory = req.body.artcategory;
  const artprice = req.body.artprice;
  const artdescription = req.body.artdescription;
  const pid=req.body.artId
  let artimage='';
  let artimage2='';
  if(req.files && req.files.artimage && req.files.artimage.length > 0) 
  {
    artimage = req.files.artimage[0].path;
  }
  if(req.files && req.files.artimage2 && req.files.artimage2.length > 0) 
    {
      artimage2 = req.files.artimage2[0].path;
    }
  

  // const addedBy = req.body.userId;
  // const Latitude = parseFloat(req.body.userlatitude);
  // const Longitude = parseFloat(req.body.userlongitude);

  // Validate coordinates again, ensuring they're properly parsed
  // if (isNaN(Latitude) || isNaN(Longitude)) {
  //   return res.status(400).send({ message: "Invalid latitude or longitude." });
  // }

  // const product = new Products({
  //   artname,
  //   artcategory,
  //   artimage,
  //   artimage2,
  //   artprice,
  //   artdescription,
  //   addedBy,
  //   // userLocation: { type: 'Point', coordinates: [Longitude, Latitude] } // Note: Longitude comes first in GeoJSON
  // });

  // if (!Array.isArray([Longitude, Latitude])) {
  //   return res.status(400).send({ message: "Coordinates must be an array." });
  // }

  let editObj={};
  
  if(artname){
    editObj.artname=artname;
  }
  if(artcategory){
    editObj.artcategory=artcategory;
  }
  if(artimage){
    editObj.artimage=artimage;
  }
  if(artimage2){
    editObj.artimage2=artimage2;
  }
  if(artprice){
    editObj.artprice=artprice;
  }
  if(artdescription){
    editObj.artdescription=artdescription;
  }
  Products.updateOne({_id:pid},editObj,{new:true})
    .then((result) => {
      res.send({ message: "Artwork details updated successfully",product:result });
    })
    .catch((error) => {
      console.error("Error saving product:", error);
      res.status(500).send({ message: "There was an error saving the details", error });
    });
}
