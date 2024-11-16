const express = require('express')
const cors = require('cors')
const path = require('path')
var jwt = require('jsonwebtoken')
const multer =require('multer')
const productController=require('./controllers/productController');
const userController=require('./controllers/userController');
const upload = multer({dest: 'uploads/'})
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const bodyParser = require('body-parser')
const app = express()
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//this function will fetch the list of liked products from the database for a user
app.post('/liked-products', userController.findLikedProducts)

//this function will add products to the database
app.post('/like-products',userController.likeProducts)

app.post('/remove-like-products',userController.removelikeProducts)

app.post('/signup', userController.signup)

app.post('/login', userController.login)

app.get('/get-user/:uId', userController.getUserById)

app.get('/my-profile/:userId', userController.getProfileDetails)

app.get('/get-product/:pId', productController.getProductsById)

app.get('/search', productController.search);

app.post('/my-products', productController.myProducts)

app.post('/add-product', upload.fields([{ name: 'artimage' }, { name: 'artimage2' }]), productController.addProduct);

app.get('/get-products', productController.getProduct);

app.post('/delete-product', productController.deleteProduct);

app.post('/edit-product', upload.fields([{ name: 'artimage' }, { name: 'artimage2' }]), productController.editProduct);
