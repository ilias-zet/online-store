const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const User = require('./models/userModel')
require('dotenv').config()
// let data = require("C:/FullStack/backend/data.json")
// function randomInteger(min, max) {
//   // случайное число от min до (max+1)
//   let rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// }
// let newData = data.map((product,idx) => {
//   // product.price = product.price[1]
//   // product.currency = product.price[0]
//   // product.amount = product.price[1]
//   // product.price? product.price = product.price.split("$") : null
//   // !product.price? data[idx].price = data[idx-1].price || data[idx+1].price : null
//   // product.price[0] = "$"
//   // product.price[1] = Number(product.price[1])

  
//   // product.breadcrumbs? product.breadcrumbs = product.breadcrumbs.split("~") : null
//   // product.breadcrumbs.splice(0,1)
//   // product.main_category = product.breadcrumbs[0]
//   // product.price = randomInteger(10,3000)
//   // product.product_image = product.images[0]
//   // delete product.product_descrition
//   // delete product.raw_product_description
//   // product.images? product.images = product.images.split(" ~ ") : null
//   // product.breadcrumbs? product.breadcrumbs = product.breadcrumbs.split(" ~ ") : null
//   // product.breadcrumbs.splice(0,1)
//   // product.category? product.category = product.category.split(" | ") : null
//   // !product.category? data[idx].category = data[idx-1].category || data[idx+1].category : null
//   // product.about? product.about = product.about.split(" | ") : null
//   // !product.about? data[idx].about = data[idx-1].about || data[idx+1].about : null
//   // product.details? product.details = product.details.split(" | ") : null
//   // !product.details? data[idx].details = data[idx-1].details || data[idx+1].details : null
//   return product
// })
// console.log(newData)
// let fs = require('fs');
// fs.writeFile('newData.json', `${JSON.stringify(newData)}`, function(error){
//    if(error) throw error; // ошибка чтения файла, если есть
//    console.log('Данные успешно записаны записать файл');
// });

const app = express();

// app.use('/api/auth', require('./routes/auth.routes'))
app.use('/all-products', require('./routes/oneProduct'))

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL
if(!MONGO_URL) {
  throw new Error(".env Error: Some variable is not defined or does not exist")
}

async function start() {
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log("Server has been conected to Mongo DB")
        
        app.listen(PORT, () => {
            console.log('Server has been started on port:', PORT)
        })
    } catch(e) {
        console.log("Server error: ", e)
        process.exit(1)
    }
}

start()

//Some test for first connect
const someElectronicData = [
    {
        "_id": {
          "$oid": "647dfc00d4d6d83ac357b0ed"
        },
        "id": "AVpgMuGwLJeJML43KY_c",
        "prices": {
          "amountMax": 69,
          "amountMin": 64.99,
          "availability": "In Stock",
          "condition": "New",
          "currency": "USD",
          "dateSeen": {
            "$date": "2017-12-14T06:00:00.000Z"
          },
          "isSale": true,
          "merchant": "Walmart.com",
          "shipping": "Expedited",
          "sourceURLs": "https://www.walmart.com/ip/BOYTONE-BT210FB-BLACK-2-1-MULTIMEDIA-SPEAKER-SYSTEM-WITH/47368142"
        },
        "asins": "B018K251JE,B00VILQKQ8",
        "brand": "Boytone",
        "categories": "Stereos,Portable Bluetooth Speakers,TV, Video & Home Audio,Speaker Systems,Portable Audio & Video,Electronics,See more Black BOYTONE Bt-210f 30 Watt FM Radio Bluetoo...,Speakers,Home Audio & Theater,All Home Speakers,Consumer Electronics,See more BOYTONE Bt-210f Bluetooth Wireless Speaker Mp3...,Home Theater Systems,MP3 Player Accessories,Home Audio,Audio,Cell,Stereo Shelf Systems",
        "dateAdded": {
          "$date": "2015-05-18T14:14:56.000Z"
        },
        "dateUpdated": {
          "$date": "2018-06-13T19:39:02.000Z"
        },
        "imageURLs": "https://images-na.ssl-images-amazon.com/images/I/61Kics6Lb6L._SL1000_.jpg,https://images-na.ssl-images-amazon.com/images/I/711eiviQlrL._SL1000_.jpg,https://images-na.ssl-images-amazon.com/images/I/81u-s89bgBL._SL1200_.jpg,https://i5.walmartimages.com/asr/74c07193-fdd2-4805-b67f-d2b5553e2cc6_1.4c9f38f2159dccc05a252108d2f0063a.jpeg%25253FodnHeight%25253D450%252526odnWidth%25253D450%252526odnBg%25253DFFFFFF,https://images-na.ssl-images-amazon.com/images/I/61aMLhXEwuL._SL1000_.jpg,https://images-na.ssl-images-amazon.com/images/I/71icdizou0L._SL1000_.jpg,https://images-na.ssl-images-amazon.com/images/I/61h-FVEPPwL._SL1000_.jpg,http://pisces.bbystatic.com/image2/BestBuy_US/images/products/4784/4784804_sa.jpg%25253BcanvasHeight%25253D62%25253BcanvasWidth%25253D105,http://ecx.images-amazon.com/images/I/61sS8kB7%2525252BiL._SS40_.jpg,http://i5.walmartimages.com/asr/74c07193-fdd2-4805-b67f-d2b5553e2cc6_1.4c9f38f2159dccc05a252108d2f0063a.jpeg%25253FodnHeight%25253D450%252526odnWidth%25253D450,http://ecx.images-amazon.com/images/I/51lkrUdWo4L._SS40_.jpg,https://images-na.ssl-images-amazon.com/images/I/911i17jfgSL._SL1200_.jpg,http://ecx.images-amazon.com/images/I/41PV4NULddL._SS40_.jpg,https://images-na.ssl-images-amazon.com/images/I/61tggO6YfJL._SL1000_.jpg,https://i5.walmartimages.com/asr/a45cfc55-5582-477f-864e-98a7eef66dac_1.78537deb0709b060fb2cd0bf4a42a857.jpeg%25253FodnHeight%25253D450%252526odnWidth%25253D450%252526odnBg%25253DFFFFFF,http://ecx.images-amazon.com/images/I/51ppGqqe71L._SS40_.jpg,http://ecx.images-amazon.com/images/I/61i5cYizN3L._SS40_.jpg,http://i5.walmartimages.com/dfw/dce07b8c-ec5f/k2-_35ee0140-64cf-460f-810d-8a45a49d19c4.v1.jpg,https://i5.walmartimages.com/asr/12260342-6ea1-459e-a134-cb5596954db9_1.15f37cbb397bf10de33b96fc7d97e8c9.jpeg%25253FodnHeight%25253D450%252526odnWidth%25253D450%252526odnBg%25253DFFFFFF,https://pisces.bbystatic.com/image2/BestBuy_US/images/products/4784/4784804_sa.jpg,http://i5.walmartimages.com/dfw/dce07b8c-a103/k2-_b13cbfcb-0deb-4710-b77b-f5dc742cf386.v1.jpg%25253FodnHeight%25253D450%252526odnWidth%25253D450,http://ecx.images-amazon.com/images/I/51xVLqpEVML._SX300_QL70_.jpg,https://images-na.ssl-images-amazon.com/images/I/61O5ka-5QVL._SL1000_.jpg,http://ecx.images-amazon.com/images/I/41FYu8uoHYL._SS40_.jpg,http://ecx.images-amazon.com/images/I/519FaJz1PkL._SS40_.jpg,http://ecx.images-amazon.com/images/I/41XrGNCTY2L._SS40_.jpg,https://images-na.ssl-images-amazon.com/images/I/71-mHPUOUGL._SL1200_.jpg,http://i5.walmartimages.com/dfw/dce07b8c-e145/k2-_40b4222d-fe36-4571-8da8-503820367368.v1.jpg,http://ecx.images-amazon.com/images/I/51V4e5NrfPL._SS40_.jpg,http://ecx.images-amazon.com/images/I/51XFpijdESL._SS40_.jpg,http://pisces.bbystatic.com/image2/BestBuy_US/images/products/4784/4784804_sa.jpg,http://ecx.images-amazon.com/images/I/51V4e5NrfPL._SX300_QL70_.jpg,https://images-na.ssl-images-amazon.com/images/I/91z50Cmlr0L._SL1200_.jpg,https://images-na.ssl-images-amazon.com/images/I/71DAPHxdzyL._SL1000_.jpg,http://ecx.images-amazon.com/images/I/51uwNGsNSiL._SS40_.jpg,https://images-na.ssl-images-amazon.com/images/I/713E5mnxSOL._SL1000_.jpg,http://ecx.images-amazon.com/images/I/310imryhfxL._SS40_.jpg,http://ecx.images-amazon.com/images/I/51xVLqpEVML._SS40_.jpg,http://ecx.images-amazon.com/images/I/41hUH7AbcNL._SS40_.jpg",
        "keys": "boytone2500w21chhometheatersystemblackdiamond/b018k251je,boytone2500w21chhometheatersystemblackdiamond/4784804,boytone2500w21chhometheatersystemblackdiamond/b00vilqkq8,boytone/bt210f,boytone2500w21chhometheatersystemblackdiamond/554725012,642014746682",
        "manufacturer": "Boytone",
        "manufacturerNumber": "BT-210F",
        "name": "Boytone - 2500W 2.1-Ch. Home Theater System - Black Diamond",
        "primaryCategories": "Electronics",
        "sourceURLs": "http://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D2,http://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D3,http://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D4,https://reviews.bestbuy.com/3545/4784804/reviews.htm%253Fformat%253Dembedded,http://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D5,https://www.bestbuy.com/site/boytone-2500w-2-1-ch-home-theater-system-black-diamond/4784804.p%25253FskuId%25253D4784804,https://www.walmart.com/ip/BOYTONE-BT210FB-BLACK-2-1-MULTIMEDIA-SPEAKER-SYSTEM-WITH/47368142,https://www.ebay.com/urw/product-reviews/1937905520%25253F_itm%25253D202139757726,http://www.walmart.com/ip/Boytone-Bt210f-Black-2.1-Multimedia-Speaker-System-With/48645984,http://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded,https://www.ebay.com/urw/product-reviews/1937905520%25253F_itm%25253D322655773714,https://www.amazon.com/Boytone-BT-210FB-Wireless-Bluetooth-Excellent/dp/B018K251JE/,http://www.amazon.com/Boytone-BT-210FD-Bluetooth-Smartphones-Computers/dp/B00VILQKQ8,https://www.amazon.com/Boytone-BT-210FD-Bluetooth-Excellent-Smartphones/dp/B00VILQKQ8/,https://www.walmart.com/reviews/product/47368142,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded,http://www.amazon.com/Boytone-BT-210F-Bluetooth-excellent-Smartphones/dp/B00VILQKQ8,http://www.bestbuy.com/site/boytone-2500w-2-1-ch-home-theater-system-black-diamond/4784804.p%25253FskuId%25253D4784804,http://www.walmart.com/ip/Boytone-BT-210F-Bluetooth-Speaker/47368142,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D2,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D7,http://www.amazon.com/Boytone-Bluetooth-excellent-Smartphones-Computers/dp/B00VILQKQ8,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D6,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D5,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D4,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D3,https://www.amazon.com/Boytone-BT-210FD-Bluetooth-Excellent-Smartphones/dp/B00VILQKQ8,https://reviews.bestbuy.com/3545/4784804/reviews.htm%25253Fformat%25253Dembedded%252526page%25253D2,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D8,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D7,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D6,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D5,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D4,https://reviews.bestbuy.com/3545/4784804/reviews.htm%2525253Fformat%2525253Dembedded%25252526page%2525253D3,https://www.walmart.com/ip/Boytone-BT-210F-Bluetooth-Speaker/47368142",
        "upc": 642000000000,
        "weight": "14 pounds"
      },
      {
    "id": "AVphzgbJLJeJML43fA0o",
    "prices": {
      "amountMax": 104.99,
      "amountMin": 104.99,
      "availability": "Yes",
      "condition": "New",
      "currency": "USD",
      "dateSeen": "2017-03-30T06:00:00Z,2017-03-10T22:00:00Z,2017-03-04T10:00:00Z,2017-03-03T14:00:00Z",
      "isSale": false,
      "merchant": "Bestbuy.com",
      "sourceURLs": "http://www.bestbuy.com/site/sanus-tv-wall-mount-for-most-37-84-flat-panel-tvs-extends-10-3-8-black/5689019.p?skuId=5689019"
    },
    "asins": "B00C78VIUE",
    "brand": "Sanus",
    "categories": "Audio & Video Accessories,TV Mounts,TV Accessories & Parts,Electronics,A/V Presentation,Accessories & Supplies,TV Ceiling & Wall Mounts",
    "dateAdded": {
      "$date": "2015-04-13T12:00:51.000Z"
    },
    "dateUpdated": {
      "$date": "2018-05-12T18:59:48.000Z"
    },
    "imageURLs": "https://images-na.ssl-images-amazon.com/images/I/71oVh2UO8xL._SL1500_.jpg,http://pisces.bbystatic.com/image2/BestBuy_US/images/products/5689/5689019_sa.jpg,https://images-na.ssl-images-amazon.com/images/I/81EzIaCamJL._SL1500_.jpg,https://images-na.ssl-images-amazon.com/images/I/71X2tAW39aL._SL1500_.jpg,https://images-na.ssl-images-amazon.com/images/I/71c8xybNthL._SL1500_.jpg,http://static.bhphoto.com/images/smallimages/1368452917000_911749.jpg,http://static.bhphoto.com/images/images500x500/sanus_vlf410_b1_vlf410_super_slim_full_motion_1368452917000_911749.jpg,http://static.bhphoto.com/images/multiple_images/thumbnails/1368452838000_IMG_316474.jpg",
    "keys": "sanusvlf410b110inchsuperslimfullmotionmountfor3784inchestvs/savlf410b1,sanusvlf410b110inchsuperslimfullmotionmountfor3784inchestvs/b00c78viue,sanusvlf410b110inchsuperslimfullmotionmountfor3784inchestvs/5689019,sanus/vlf410b1,793795525420",
    "manufacturerNumber": "VLF410B1",
    "name": "Sanus VLF410B1 10-Inch Super Slim Full-Motion Mount for 37 - 84 Inches TV's",
    "primaryCategories": "Electronics",
    "sourceURLs": "https://www.amazon.com/Sanus-VLF410B1-10-Inch-Super-Full-Motion/dp/B00C78VIUE/,https://www.amazon.com/product-reviews/B00C78VIUE/,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=80,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=81,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=84,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=61,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=83,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=85,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=77,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=54,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=57,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=79,http://reviews.bestbuy.com/3545/5689019/reviews.htm?format=embedded&page=59,http://www.bhphotovideo.com/c/product/911749-REG/sanus_vlf410_b1_vlf410_super_slim_full_motion.html,http://www.amazon.com/Sanus-VLF410B1-10-Inch-Super-Full-Motion/dp/B00C78VIUE,http://www.bestbuy.com/site/sanus-tv-wall-mount-for-most-37-84-flat-panel-tvs-extends-10-3-8-black/5689019.p?skuId=5689019",
    "upc": 794000000000,
    "weight": "32.8 pounds"
  }
]

app.get('/all-products', (request, response) => {
    response.json({
        "someElectronicData":someElectronicData
    })
})

app.get('/api', (request, response) => {
    response.json({
        messages: [
            "Hello frontend, i'm backend",
            "Hello frontend, i'm backend",

        ]
    })
})

app.get('/getProductsByCategory',async (request, response) => {
  const { category } = request.query
  let products = await Product.find({"main_category":category}).limit(100)
  await response.json(products)
})

app.get('/getProductAllInformation',async (request, response) => {
  const { product_id } = request.query
  console.log(product_id)
  let product = await Product.find({"_id":product_id})
  console.log(product)
  await response.json(product)
})

app.get('/SignUpNewUser',async (request, response) => {
  const { user } = request.query
  const { name,surName,email,pass } = user;
  let findedUser = await User.findOne({"email":email})
  let succesSignUp;
  if(findedUser) {
    console.log(findedUser)
  }
  else {
    let newUser = new User({ name,surName,email,pass })
    try {
      await newUser.save();
      succesSignUp = true;
    } catch(e) {
      console.log("User save error: ", e)
    }
    
    console.log(succesSignUp)
    console.log(name,surName,email,pass)
  }
  await response.json({ succesSignUp,findedUser })
})

app.get('/getAllCategories',async (request, response) => {
  const categories = await Product.distinct("main_category")
  console.log(categories)
  await response.json(categories)
})