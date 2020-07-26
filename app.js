require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const homeStartingContent = "At their most basic, to-dos contain all of the tasks that you need to complete on a given day. It’s a great device for managing time that enables you to lay out everything that you need to accomplish and plan and prioritize your day from there. You can also make to-dos for major tasks like a work assignment or an overall goal. Therefore, the overall purpose of creating a to-do is to remember tasks and create a plan of action to accomplish them. A to-do allows you to better manage your time by allowing you to lay out what you need to accomplish and then coordinate your time from there. When you first compose it, you’ll note the most important tasks and make time for them. You can also see if certain tasks can be easily coordinated. For example, if you have a business lunch near a store that you need to go to, you can plan to accomplish both on the same run. The main purpose of a to-do is to help organize tasks, so learning to effectively use them will benefit you by improving your time management abilities and decreasing your stress levels.";
const aboutContent = "Building the future we want to work in We create tools that promote a calmer, more balanced, more fulfilling way to work and live. Todolist keeps track of all your tasks, projects, and goals in one beautifully simple place. It syncs across all your devices and integrates with all your favorite apps. For people who need less chaos and more peace-of-mind.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque sit amet porttitor eget. Convallis convallis tellus id interdum velit laoreet id. Egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi tristique senectus et netus et malesuada fames. Orci phasellus egestas tellus rutrum tellus pellentesque. At auctor urna nunc id. Interdum velit euismod in pellentesque massa placerat duis ultricies lacus. Urna nunc id cursus metus aliquam eleifend mi in. Vitae justo eget magna fermentum iaculis eu.";

const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
  postTitle: String,
  postBody: String
});

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Post.find(function(err, foundPost) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        content: homeStartingContent,
        posts: foundPost
      });
    }
  });


});

app.get("/post/:postUrl", function(req, res) {
  const postUrl = req.params.postUrl;
  Post.findOne({
    _id: postUrl
  }, function(err, foundPost) {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {
        posts: foundPost
      });
    }
  });

});



app.get("/contact", function(req, res) {
  res.render("contact", {
    content: contactContent
  });

});

app.get("/about", function(req, res) {
  res.render("about", {
    content: aboutContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  });
  newPost.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });


});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started...");
});