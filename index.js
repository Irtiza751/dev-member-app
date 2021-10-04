const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");
const app = express();

// Init logger
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HomePage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Member App",
    members
  });
});

// Set static middleware
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/apis/members"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Started on port ${port}`);
});
