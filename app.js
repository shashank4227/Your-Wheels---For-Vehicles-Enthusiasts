// Import necessary modules
const express = require("express");
const session = require("express-session");
const connectToMongo = require("./db");
const authRoutes = require("./routes/authRoutes");
const adminLoginRoutes = require("./routes/adminLoginRoutes");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8080;
const searchRoutes = require("./routes/searchRoutes");
const showroomsRoutes = require("./routes/showroomsRoutes");
const serviceCentreRoutes = require("./routes/serviceCentresRoutes");
const { render } = require("ejs");
const rentRoutes = require("./routes/rentRoutes");
const buyRoutes = require("./routes/buyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const fetchReviewRoutes = require("./routes/fetchReviewRoutes");
const rentDetailsRoutes = require("./routes/rentDetailsRoutes");
const displayRentDetails = require("./routes/displayRentDetails");
const adminPageRoutes = require("./routes/adminPageRoutes");
const adminUpdate = require("./routes/adminUpdate");
const sellDetails = require("./routes/sellDetailsRoutes");
const dispalySell = require("./routes/displaySellDetails");
const notifications = require("./routes/notifications");
const employeeLogin = require("./routes/employeeLoginRoutes");
const employeePageRoutes = require("./routes/employeePageRoutes");
const employeeUpdate = require("./routes/employeeUpdate");
const buyDetailsRoutes = require("./routes/buyDetailsRoutes");
const displayBuyDetails = require("./routes/displayBuyDetails");

// Set up session middleware
app.use(
  session({
    secret: "Shashank",
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB
connectToMongo();

// Serve static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));

// Set view engine and body parser middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Render page function
const renderPage = (route, file, props) => {
  app.get(route, async (req, res) => {
    try {
      const userData = req.session.user;
      res.render(file, { ...props, user: userData });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};

// Render pages (unchanged)
renderPage("/", "index");
renderPage("/about", "about");
renderPage("/buy_and_sell_bikes", "buy_and_sell_bikes");
renderPage("/buy_and_sell_cars", "buy_and_sell_cars");
renderPage("/buy", "buy");
renderPage("/contact", "contact");
renderPage("/faqs", "faqs");
renderPage("/futureBikes", "futureBikes");
renderPage("/futureCars", "futureCars");
renderPage("/latestBikes", "latestBikes");
renderPage("/latestCars", "latestCars");
renderPage("/loans", "loans");
renderPage("/owned", "owned");
renderPage("/rent", "rent");
renderPage("/reviewBikes", "reviewBikes");
renderPage("/reviews", "reviews");
renderPage("/search", "search");
renderPage("/sell", "sell");
renderPage("/seriveCenters", "seriveCenters");
renderPage("/showrooms", "showrooms");
renderPage("/trendingBikes", "trendingBikes");
renderPage("/trendingCars", "trendingCars");
renderPage("/update", "update");
renderPage("/searchResults", "searchResults");
renderPage("/showroomsResults", "showroomsResults");
renderPage("/serviceCentresResults", "serviceCentresResults");
renderPage("/accountDetails", "accountDetails");
renderPage("/updateDetails", "updateDetails");
renderPage("/rentResults", "rentResults");
renderPage("/buyResults", "buyResults");
renderPage("/reviewPosting", "reviewPosting");
renderPage("/rentNow", "rentNow");
renderPage("/adminLogin", "adminLogin");
renderPage("/adminSignup", "adminSignup");
renderPage("/adminPage", "adminPage");
renderPage("/ownedVehicles", "ownedVehicles");
renderPage("/vehicleOnSale", "vehicleOnSale");
renderPage("/employeePage", "employeePage");
renderPage("/notifications", "notifications");
renderPage("/employeeLogin", "employeeLogin");
renderPage("/employeeSignup", "employeeSignup");
renderPage("/buyNow", "buyNow");

// Routes
app.use(authRoutes);
app.use(adminLoginRoutes);
app.use(searchRoutes);
app.use(showroomsRoutes);
app.use(serviceCentreRoutes);
app.use(rentRoutes);
app.use(buyRoutes);
app.use(reviewRoutes);
app.use("/", fetchReviewRoutes);
app.use(rentDetailsRoutes);
app.use(displayRentDetails);
app.use(adminPageRoutes);
app.use(adminUpdate);
app.use(sellDetails);
app.use(dispalySell);
app.use(notifications);
app.use(employeeLogin);
app.use(employeePageRoutes);
app.use(employeeUpdate);
app.use(buyDetailsRoutes);
app.use(displayBuyDetails);

// // Start server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
