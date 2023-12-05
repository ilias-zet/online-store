const express = require("express");
const mongoose = require("mongoose");
const { Images, Users } = require("./models");
const { Products } = require("./models");
const authRouter = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error(
    ".env Error: Variable 'MONGO_URL' is not defined or does not exist"
  );
}
if (!PORT) {
  throw new Error(
    ".env Error: Variable 'PORT'  is not defined or does not exist"
  );
}

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server has been conected to Mongo DB");

    app.listen(PORT, () => {
      console.log("Server has been started on port:", PORT);
    });
  } catch (e) {
    console.log("Server error: ", e);
    process.exit(1);
  }
}

start();

app.get("/getCategories", async (req, res) => {
  const categories = await Images.find({});
  res.json(categories);
});

app.get("/getRecommended", async (req, res) => {
  const randomCategories = await Images.aggregate([{ $sample: { size: 6 } }]);
  const findParams = [
    "64987992e4498b4d8473f158",
    "64987992e4498b4d8473f15f",
    "64987992e4498b4d8473f15b",
  ];
  const passFields = "-crawled_at -breadcrumbs -description -sku";
  const products = await Products.find(
    { _id: { $in: findParams } },
    passFields
  );
  const recomended = {
    randomCategories,
    products,
  };
  res.json(recomended);
});

app.post("/saveCart", async (req, res) => {
  let updatedUser;
  if (req.body) {
    const { email, cart } = req.body;
    const filter = { email };
    const update = { cart };
    updatedUser = await Users.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else {
    console.log("You unsigned");
  }
  res.json(updatedUser);
});

app.post("/createNewProductDB", async (req, res) => {
  if (req.body) {
    try {
      const { newProduct } = req.body;
      await Products.create(newProduct);
      res.json({ success: true, message: "Product is successful created!" });
    } catch (e) {
      res.json({ success: false, message: e });
    }
  } else {
    res.json({ success: false, message: "Some troubles (createNewProductDB)" });
  }
});

app.get("/getSearchResults", async (req, res) => {
  const { searchQ, category } = req.query;
  const foundProducts = await Products.find({
    title: { $regex: searchQ, $options: "i" },
    main_category: category,
  });
  if (!foundProducts.length) {
    res.json({ success: false, message: "Products not found" });
  } else {
    res.json({ success: true, foundProducts });
  }
  console.log(foundProducts);
});

app.get("/validation_current_user", async (req, res) => {
  const tokenForValidation = req.query;
  // console.log(tokenForValidation)
  let decoded;
  try {
    decoded = jwt.verify(tokenForValidation.value, process.env.SECRET);
    // If token is verified, response to client success true end user's _id
    if (decoded) {
      const { id: userID } = decoded;
      const foundUser = await Users.findOne({ _id: userID });
      const { _id, email, name, surname, role } = foundUser;
      let cart = foundUser.cart;
      let buyHistory = foundUser.buyHistory;
      if (!cart) {
        cart = [];
      }
      if (!buyHistory) {
        buyHistory = [];
      }
      res.json({
        success: true,
        foundUser: { _id, email, name, surname, role, cart,buyHistory },
      });
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      // If token is expired
      console.log(err);
      res.json({ success: false, message: "Token expired" });
    }
  }
});

app.get("/update_cart", async (req, res) => {
  const { userID, newCart } = req.query;
  if (userID) {
    try {
      const user = await Users.findById(userID);
      user.cart = newCart || [];
      await user.save();
      res.json({ success: true, updatedCart: user.cart });
    } catch (e) {
      console.log(e);
      res.json({ success: false, message: "UpdateCartError: update_cart" });
    }
  } else {
    res.json({ success: false, message: "UpdateCartError: uncorrect userID" });
  }
});

app.get("/update_buy_history", async (req, res) => {
  const { userID, cart } = req.query;
  if (userID) {
    try {
      const user = await Users.findById(userID);
      if(user.buyHistory) {
        const newHistoryObj = {
          date: Date.now(),
          products: cart
        }
        user.buyHistory.push(newHistoryObj)
      } else {
        res.json({ success: false, message: "UpdateBuyHistoryError: buyHistory in user undefined" });
        return
      }
      await user.save();
      console.log(user);
      res.json({ success: true, updatedBuyHistory: user.buyHistory });
    } catch (e) {
      console.log(e);
      res.json({ success: false, message: "UpdateBuyHistoryError: buyHistory" });
    }
  } else {
    res.json({ success: false, message: "UpdateBuyHistoryError: uncorrect userID" });
  }
});

app.use(productsRoutes);

// <Socket>

const http = require("http").Server(app)
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
})
socketIO.on('connection', (socket) => {
  console.log(`${socket.id} connected`)
  
  socket.on('message', (data) => {
    console.log(data)
    socketIO.emit("message_response",data)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})
// </Socket>

http.listen(7000, () => {
  console.log("Socket server working on port 7000")
})