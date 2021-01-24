require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
}).then((r) => console.log(`Successfully connected to MongoDB: ${r}`))
  .catch((e) => console.log(`Error starting up mongo: ${e}`));

const blogScheme = {
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  body: [String],
  url: String
};

const BlogPost = mongoose.model("BlogPost", blogScheme);

// const proj = new BlogPost({
//   title: "sooraj modi website",
//   description: "soorajmodi.com was the first website I have developed and made publicly available. It was a great learning " +
//    "experience and I learned a lot about web development through the process such as HTML, CSS, JavaScript, MongoDB, routing," +
//    "web design, and more. This blog posts goes over some of the skills I've learned through the process, and an inside peak" +
//    "into some of the challenges and features of this website.",
//   body: ["soorajmodi.com is my very first website and I created this to showcase my skills, experience, and other " +
//          "accomplishments I am proud of. It was a learning experience on full-stack development and how to create a web application " +
//          "that anyone in the world can interact with. There were some challenges, which forced me to fortify my understanding of web development " +
//          "concepts. Some of the technologies I worked with were full stack development, HTML, CSS, JavaScript, Node, ESLint, Prettier, Embedded JavaScript Templating, " +
//          "CI/CD, GitHub actions, Heroku, CloudFlare, DNS, and more.",
//          "The basic building blocks of web development are HTML, CSS, and JavaScript. You could build virtually any frontend project " +
//          "with these three. So that's where I began my web development journey. I learned HTML and CSS through various online tutorials " +
//          "as well as just messing around with the inspect element option in the browser. This was fairly straight forward to learn, " +
//          "but there are still features and little intricacies I encounter every now and again. JS was a bit more complicated." +
//          "I was able to pick it up fairly quickly following my first year of University. At that point in time, I had a foundational " +
//          "understanding of programming, and it was substantially easier to understand than C, which is what they taught in my Computer " +
//          "Science classes.",
//          "Next, I had to learn about Node.js and backend development. My knowledge from my first internship at Bell Canada, a telecommunications company, " +
//          "really helped here. I learned a ton about backend development, including routing, writing modular, clean, code. Further, I was able to fill in " +
//          "the gaps of my knowledge with Udemy courses, StackOverflow, and various googling.",
//          "A major component of this website is the incorporation of my personal blog. In order to accomplish this, I had to learn about a database to manage my content." +
//          "I choose MongoDB, a noSQL database, because it was extremely intuitive and modern, which made it very easy to interact with. " +
//          "I really like using MongoDB as opposed to SQL, or Postgres, because it was much easier to integrating with my application and interact with " +
//          "particularly because of Mongoose.",
//          "User Interface (UI) Design. In University I had taken CIS 2170, a course on user interface design. The skills I learned in this course " +
//          "were particularly useful in helping me create a UI for this website. It took a lot of playing around with and googling various issues, " +
//          "such as adapting it to various screen sizes, learning about BootStrap, and more, that helped me create my vision for this webiste."],
//          url: "https://soorajmodi.com"
// });

// proj.save(function (err) {
//   if(err) console.log("Failed MongoDB save");
// });

// BlogPost.updateOne({ title: 'sooraj modi website' }, { title: 'Sooraj Modi Website' }, function(err, res) {
//   // Updated at most one doc, `res.modifiedCount` contains the number
//   // of docs that MongoDB updated
// });

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/experience", function(req, res) {
  res.render("experience");
});

app.get("/blog", function(req, res) {
  BlogPost.find({}, function(err, foundBlogPosts) {
    res.render("blog", {
      blog: foundBlogPosts
    });
  });
});

app.get("/blog/:post", function(req, res) {
  BlogPost.findOne({ title:  _.startCase(req.params.post) }, function(err, foundPost) {
    res.render("post", {
      title: foundPost.title,
      date: foundPost.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      body: foundPost.body,
      url: foundPost.url
    });
  });
});

app.get("/education", function(req, res) {
  res.render("education");
});

app.get("/volunteering", function(req, res) {
  res.render("volunteering");
});

app.get("/resume", function(req, res) {
  res.render("resume");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

// 404 Errors
app.use(function(req, res) {
  res.render("404");
});

let port = process.env.PORT;
if (port == null || port === "") {
  port = 8008;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});
